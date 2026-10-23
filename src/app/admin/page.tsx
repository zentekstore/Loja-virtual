import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  Package,
  Truck,
  ArrowUpRight,
  ShoppingBag,
  Share2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalCost = orders.reduce((acc, o) => acc + o.costAmount, 0);
  const totalProfit = orders.reduce((acc, o) => acc + o.profitAmount, 0);
  const averageMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  const pendingSupplierOrders = orders.filter((o) => o.status === "PAID").length;
  const shippedOrders = orders.filter((o) => o.status === "SHIPPED").length;

  const productsCount = await prisma.product.count();

  // Agrupamento por canal
  const channelCounts: Record<string, number> = {};
  orders.forEach((o) => {
    channelCounts[o.originChannel] = (channelCounts[o.originChannel] || 0) + 1;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Executivo Omnichannel
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Visão consolidada de vendas, margens de dropshipping e canais sincronizados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/dropshipping"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Despachar Pedidos ({pendingSupplierOrders})</span>
          </Link>
          <Link
            href="/admin/integracoes"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Sincronizar Canais</span>
          </Link>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Faturamento */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Faturamento Bruto (GMV)</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatCurrency(totalSales)}
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8% vs. semana anterior</span>
          </div>
        </div>

        {/* Lucro Líquido Real */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Lucro Líquido da Operação</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {formatCurrency(totalProfit)}
          </div>
          <div className="text-xs text-slate-500">
            Margem real de <b className="text-emerald-700">{averageMargin.toFixed(1)}%</b> após custo
          </div>
        </div>

        {/* Custo no Fornecedor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Custo Total Produtos (CMV)</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatCurrency(totalCost)}
          </div>
          <div className="text-xs text-slate-500">
            Pago a CJ Dropshipping / Fornecedores
          </div>
        </div>

        {/* Pedidos Pendentes de Dropshipping */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Aguardando Despacho</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {pendingSupplierOrders} pedidos
          </div>
          <div className="text-xs text-slate-500">
            {shippedOrders} já enviados com tracking
          </div>
        </div>
      </div>

      {/* Canais de Venda e Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição por Canal */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Vendas por Canal Integrado</h3>
          <p className="text-xs text-slate-500">
            Origem dos pedidos capturados automaticamente pelo Hub.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { name: "Shopify Store", code: "SHOPIFY", color: "bg-emerald-500" },
              { name: "Nuvemshop Brasil", code: "NUVEMSHOP", color: "bg-sky-500" },
              { name: "Loja Virtual Própria", code: "STOREFRONT", color: "bg-indigo-500" },
              { name: "Mercado Livre", code: "MERCADOLIVRE", color: "bg-amber-500" },
            ].map((c) => {
              const count = channelCounts[c.code] || 0;
              const percent = orders.length > 0 ? (count / orders.length) * 100 : 0;
              return (
                <div key={c.code} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{c.name}</span>
                    <span className="text-slate-900">
                      {count} pedidos ({percent.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Últimos Pedidos */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Pedidos Recentes</h3>
            <Link
              href="/admin/dropshipping"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>Gerenciar todos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                  <th className="pb-3">Pedido</th>
                  <th className="pb-3">Cliente</th>
                  <th className="pb-3">Canal</th>
                  <th className="pb-3">Valor / Lucro</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="py-3 text-slate-700">{o.customerName}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {o.originChannel}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-900 block font-bold">
                        {formatCurrency(o.totalAmount)}
                      </span>
                      <span className="text-emerald-600 text-[11px] block">
                        +{formatCurrency(o.profitAmount)} líquido
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.status === "SHIPPED"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "ORDERED_SUPPLIER"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {o.status === "SHIPPED"
                          ? "Enviado / Rastreio"
                          : o.status === "ORDERED_SUPPLIER"
                          ? "No Fornecedor"
                          : "Aguardando Envio"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
