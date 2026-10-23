import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = body;

    const orderNumber = `PED-${Math.floor(1000 + Math.random() * 9000)}`;

    // Calcular custo total dos itens buscando os produtos no banco
    let totalCost = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      const unitCost = product?.costPrice || item.price * 0.35;
      const unitPrice = item.price;
      const quantity = item.quantity || 1;

      totalCost += unitCost * quantity;

      orderItemsData.push({
        productId: item.productId,
        title: item.title,
        variantTitle: item.variantTitle || null,
        quantity,
        unitPrice,
        unitCost,
        totalPrice: unitPrice * quantity,
      });
    }

    const profitAmount = totalAmount - totalCost;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: JSON.stringify(shippingAddress),
        status: "PAID",
        originChannel: "STOREFRONT",
        totalAmount,
        costAmount: totalCost,
        profitAmount,
        items: {
          create: orderItemsData,
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      orderId: newOrder.id,
    });
  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erro interno ao processar pedido" },
      { status: 500 }
    );
  }
}
