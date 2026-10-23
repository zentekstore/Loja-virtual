"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Truck,
  PackageCheck,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";

interface Props {
  initialOrders: any[];
}

export function AdminDropshippingClient({ initialOrders }: Props) {
  const [orders, setOrders] = useState(initialOrders);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const handleDispatchSupplier = async (orderId: string) => {
    setProcessingId(orderId);
    setFeedback((prev) => ({ ...prev, [orderId]: "Enviando ordem para o fornecedor de dropshipping..." }));

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "DISPATCH_SUPPLIER_ORDER",
          orderId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: "ORDERED_SUPPLIER",
                  supplierOrderId: data.supplierOrderId,
                  trackingCode: data.trackingCode,
                }
              : o
          )
        );
        setFeedback((prev) => ({
          ...prev,
          [orderId]: `Sucesso! Ordem criada no fornecedor (${data.supplierOrderId}). Rastreio: ${data.trackingCode}`,
        }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          [orderId]: "Erro ao processar despacho no fornecedor.",
        }));
      }
    } catch (e) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: "Falha na comunicação com o fornecedor.",
      }));
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase">Aguardando Envio</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {orders.filter((o) => o.status === "PAID").length} pedidos
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase">Processando Fornecedor</span>
          <p className="text-2xl font-black text-sky-600 mt-1">
            {orders.filter((o) => o.status === "ORDERED_SUPPLIER").length} pedidos
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase">Despachados / Rastreio Ativo</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {orders.filter((o) => o.status === "SHIPPED").length} pedidos
          </p>
        </div>
      </div>

      {/* Lista de Pedidos de Dropshipping */}
      <div className="space-y-4">
        {orders.map((o) => {
          let address: any = {};
          try {
            address = JSON.parse(o.shippingAddress || "{}");
          } catch (e) {}

          const isPending = o.status === "PAID";
          const isShipped = o.status === "SHIPPED" || o.status === "ORDERED_SUPPLIER";

          return (
            <div
              key={o.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-800 text-sm">
                    {o.orderNumber.replace("PED-", "#")}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {o.customerName}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Canal: <b className="text-slate-800">{o.originChannel}</b> • {address.city || "São Paulo"} - {address.state || "SP"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total / Lucro:</span>
                    <span className="font-black text-slate-900 block text-sm">
                      {formatCurrency(o.totalAmount)}
                    </span>
                    <span className="text-emerald-600 font-bold text-xs block">
                      +{formatCurrency(o.profitAmount)} líquido
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      o.status === "SHIPPED"
                        ? "bg-emerald-100 text-emerald-800"
                        : o.status === "ORDERED_SUPPLIER"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {o.status === "SHIPPED"
                      ? "Enviado ao Cliente"
                      : o.status === "ORDERED_SUPPLIER"
                      ? "Processando Fornecedor"
                      : "Aguardando Despacho"}
                  </span>
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-2 uppercase tracking-wider text-[11px]">
                    Itens para Compra no Fornecedor:
                  </span>
                  <div className="space-y-2">
                    {o.items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          {item.variantTitle && (
                            <p className="text-slate-500 text-[11px]">{item.variantTitle}</p>
                          )}
                          <p className="text-slate-400 text-[11px]">
                            Fornecedor: {item.product?.supplier?.name || "CJ Dropshipping"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-700 block">
                            Qtd: {item.quantity}
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            Custo: {formatCurrency(item.unitCost * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking & Ações */}
                <div className="space-y-3">
                  <span className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
                    Dados de Despacho & Rastreio:
                  </span>

                  {o.supplierOrderId && (
                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-sky-900 space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>ID Fornecedor:</span>
                        <span>{o.supplierOrderId}</span>
                      </div>
                      {o.trackingCode && (
                        <div className="flex justify-between font-bold text-emerald-700">
                          <span>Código Rastreio:</span>
                          <span className="underline cursor-pointer">{o.trackingCode}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {isPending && (
                    <button
                      onClick={() => handleDispatchSupplier(o.id)}
                      disabled={processingId === o.id}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition shadow-md shadow-amber-500/20 text-xs flex items-center justify-center gap-2"
                    >
                      <Truck className="w-4 h-4" />
                      <span>
                        {processingId === o.id
                          ? "Comprando no Fornecedor..."
                          : "Despachar no Fornecedor Automaticamente (1-Clique)"}
                      </span>
                    </button>
                  )}

                  {feedback[o.id] && (
                    <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                      {feedback[o.id]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
