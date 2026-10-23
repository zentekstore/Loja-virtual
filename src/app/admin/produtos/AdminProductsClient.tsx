"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Percent,
  Plus,
} from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  markupPercent: number;
  stockQuantity: number;
  images: string;
  syncChannels: string;
  supplier?: {
    name: string;
    type: string;
  } | null;
}

export function AdminProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<Record<string, string>>({});

  const handleSyncChannels = async (product: ProductItem) => {
    setSyncingId(product.id);
    setSyncStatus((prev) => ({ ...prev, [product.id]: "Sincronizando com Shopify e Nuvemshop..." }));

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "EXPORT_PRODUCT",
          productId: product.id,
          channels: ["SHOPIFY", "NUVEMSHOP", "MERCADOLIVRE"],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSyncStatus((prev) => ({
          ...prev,
          [product.id]: "Sincronizado com Sucesso (Shopify, Nuvemshop, Mercado Livre)!",
        }));
      } else {
        setSyncStatus((prev) => ({
          ...prev,
          [product.id]: `Aviso: ${data.message || "Erro na sincronização"}`,
        }));
      }
    } catch (err: any) {
      setSyncStatus((prev) => ({
        ...prev,
        [product.id]: "Erro ao contatar API de sincronização.",
      }));
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Tabela de Produtos */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-4 px-6">Produto / Origem</th>
              <th className="py-4 px-4">Fornecedor</th>
              <th className="py-4 px-4">Custo Dropship</th>
              <th className="py-4 px-4">Markup %</th>
              <th className="py-4 px-4">Preço de Venda</th>
              <th className="py-4 px-4">Lucro Líquido</th>
              <th className="py-4 px-4">Canais Conectados</th>
              <th className="py-4 px-6 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {products.map((p) => {
              const images = JSON.parse(p.images || "[]");
              const img = images[0] || "";
              const channels = JSON.parse(p.syncChannels || "[]");
              const unitProfit = p.sellingPrice - p.costPrice;

              return (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  {/* Foto e Título */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={img}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="max-w-xs">
                        <span className="font-bold text-slate-900 block line-clamp-1">
                          {p.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{p.category}</span>
                      </div>
                    </div>
                  </td>

                  {/* Fornecedor */}
                  <td className="py-4 px-4">
                    <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      {p.supplier?.name || "CJ Dropshipping"}
                    </span>
                  </td>

                  {/* Custo */}
                  <td className="py-4 px-4 text-slate-600 font-semibold">
                    {formatCurrency(p.costPrice)}
                  </td>

                  {/* Markup */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      +{p.markupPercent.toFixed(0)}%
                    </span>
                  </td>

                  {/* Preço de Venda */}
                  <td className="py-4 px-4 font-black text-slate-900">
                    {formatCurrency(p.sellingPrice)}
                  </td>

                  {/* Lucro */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-emerald-600">
                      +{formatCurrency(unitProfit)}
                    </span>
                  </td>

                  {/* Canais */}
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {channels.map((ch: string) => (
                        <span
                          key={ch}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Ação */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleSyncChannels(p)}
                      disabled={syncingId === p.id}
                      className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition text-xs flex items-center gap-1.5 ml-auto shadow-sm active:scale-95"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{syncingId === p.id ? "Enviando..." : "Sincronizar"}</span>
                    </button>

                    {syncStatus[p.id] && (
                      <span className="block text-[11px] text-emerald-600 font-semibold mt-1">
                        {syncStatus[p.id]}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
