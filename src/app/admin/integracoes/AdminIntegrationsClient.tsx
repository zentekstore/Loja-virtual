"use client";

import React, { useState } from "react";
import {
  Share2,
  CheckCircle2,
  RefreshCw,
  Power,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
} from "lucide-react";

interface Props {
  initialChannels: any[];
}

export function AdminIntegrationsClient({ initialChannels }: Props) {
  const [channels, setChannels] = useState(initialChannels);
  const [syncingChannel, setSyncingChannel] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTestConnection = async (channelName: string) => {
    setSyncingChannel(channelName);
    setFeedback(`Testando conexão e sincronizando com ${channelName}...`);

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TEST_CHANNEL_CONNECTION",
          channel: channelName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(`✅ Conexão com ${channelName} validada com sucesso! Catálogo pronto para sincronização.`);
      } else {
        setFeedback(`⚠️ ${data.message || "Erro de conexão."}`);
      }
    } catch (e) {
      setFeedback("Erro na chamada de teste de integração.");
    } finally {
      setSyncingChannel(null);
    }
  };

  const channelCards = [
    {
      code: "SHOPIFY",
      name: "Shopify Store",
      description: "Sincronização bidirecional de produtos, inventário e pedidos via REST / GraphQL Admin API.",
      badge: "Mais Popular Global",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
      iconColor: "text-emerald-600",
      features: ["Sync automático de estoque", "Exportação de variantes", "Webhooks de novos pedidos"],
    },
    {
      code: "NUVEMSHOP",
      name: "Nuvemshop Brasil",
      description: "Plataforma líder na América Latina. Publicação instantânea de produtos com precificação em BRL.",
      badge: "Líder Nacional",
      color: "from-sky-500/10 to-blue-500/10 border-sky-200",
      iconColor: "text-sky-600",
      features: ["Suporte nativo ao PIX", "Cálculo de frete Correios/Melhor Envio", "Automação de catálogo"],
    },
    {
      code: "MERCADOLIVRE",
      name: "Mercado Livre",
      description: "Maior marketplace da América Latina. Crie anúncios nas categorias oficiais MLB com garantia de entrega.",
      badge: "Marketplace #1",
      color: "from-amber-500/10 to-yellow-500/10 border-amber-200",
      iconColor: "text-amber-600",
      features: ["Mapeamento de categorias MLB", "Atualização em tempo real de estoque", "Gestão centralizada"],
    },
    {
      code: "SHOPEE",
      name: "Shopee Marketplace",
      description: "Venda na Shopee com sincronização de preços com margem e cupom de frete.",
      badge: "Alta Conversão",
      color: "from-orange-500/10 to-red-500/10 border-orange-200",
      iconColor: "text-orange-600",
      features: ["Gestão de promoções", "Controle de estoque sincronizado", "Exportação de variações"],
    },
  ];

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channelCards.map((c) => {
          const dbChannel = channels.find((item) => item.channel === c.code);
          const isEnabled = dbChannel?.isEnabled ?? true;

          return (
            <div
              key={c.code}
              className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {c.badge}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-700">Conectado</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {c.description}
                </p>

                {/* Features */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  {c.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => handleTestConnection(c.code)}
                  disabled={syncingChannel === c.code}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingChannel === c.code ? "animate-spin" : ""}`} />
                  <span>{syncingChannel === c.code ? "Testando..." : "Testar Conexão & Sync"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fornecedores Dropshipping Conectados */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Fornecedores de Dropshipping Conectados</h3>
        <p className="text-xs text-slate-500">
          O sistema se comunica com os fornecedores para geração automatizada de pedidos, envio de etiquetas e sincronização de rastreamento internacional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-sm">CJ Dropshipping</span>
            <span className="text-slate-500 block">Armazéns EUA, Europa e China com Linha Direta Brasil</span>
            <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              API Ativa
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-sm">AliExpress Direct</span>
            <span className="text-slate-500 block">Frete Choice com desembaraço aduaneiro acelerado</span>
            <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              API Ativa
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-sm">Dropshipping Nacional (SP)</span>
            <span className="text-slate-500 block">Envio via Sedex / Jadlog com entrega em 2 a 5 dias</span>
            <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              API Ativa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
