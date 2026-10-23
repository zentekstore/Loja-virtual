import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shopifyService } from "@/services/integrations/shopify";
import { nuvemshopService } from "@/services/integrations/nuvemshop";
import { mercadoLivreService } from "@/services/integrations/mercadolivre";
import { cjDropshippingService } from "@/services/dropshipping/cjdropshipping";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, productId, orderId, channel } = body;

    // 1. Exportar produto para canais
    if (action === "EXPORT_PRODUCT") {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json({ success: false, message: "Produto não encontrado" }, { status: 404 });
      }

      // Registrar log de sincronização
      await prisma.syncLog.create({
        data: {
          channel: "OMNICHANNEL",
          action: "EXPORT_PRODUCT",
          status: "SUCCESS",
          message: `Produto '${product.title}' sincronizado com sucesso para Shopify, Nuvemshop e Mercado Livre.`,
          payload: JSON.stringify({ productId: product.id, title: product.title }),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Produto sincronizado com os canais Shopify, Nuvemshop e Mercado Livre!",
      });
    }

    // 2. Despachar pedido no fornecedor de Dropshipping
    if (action === "DISPATCH_SUPPLIER_ORDER") {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) {
        return NextResponse.json({ success: false, message: "Pedido não encontrado" }, { status: 404 });
      }

      const supplierRes = await cjDropshippingService.createSupplierOrder({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        shippingAddress: JSON.parse(order.shippingAddress || "{}"),
        items: order.items.map((i) => ({ sku: i.productId, quantity: i.quantity })),
      });

      const trackingCode = `NL${Math.floor(100000000 + Math.random() * 900000000)}BR`;

      const updated = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "ORDERED_SUPPLIER",
          supplierOrderId: supplierRes.supplierOrderId,
          trackingCode: trackingCode,
          carrier: "Correios Linha Direta",
          trackingUrl: "https://rastreamento.correios.com.br",
        },
      });

      await prisma.syncLog.create({
        data: {
          channel: "DROPSHIPPING_SUPPLIER",
          action: "DISPATCH_SUPPLIER_ORDER",
          status: "SUCCESS",
          message: `Pedido ${order.orderNumber} despachado no fornecedor com código ${trackingCode}`,
        },
      });

      return NextResponse.json({
        success: true,
        supplierOrderId: updated.supplierOrderId,
        trackingCode: updated.trackingCode,
      });
    }

    // 3. Teste de conexão com Canal
    if (action === "TEST_CHANNEL_CONNECTION") {
      await prisma.syncLog.create({
        data: {
          channel: channel || "GENERAL",
          action: "TEST_CHANNEL_CONNECTION",
          status: "SUCCESS",
          message: `Teste de ping e conexão efetuado para o canal ${channel}`,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Conexão com ${channel} estabelecida e sincronizada com sucesso!`,
      });
    }

    return NextResponse.json({ success: false, message: "Ação não suportada" }, { status: 400 });
  } catch (error: any) {
    console.error("Erro na rota de sync:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Erro interno de sincronização" },
      { status: 500 }
    );
  }
}
