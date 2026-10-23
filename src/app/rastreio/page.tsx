"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Truck, CheckCircle2, Clock, MapPin, Package } from "lucide-react";

export default function TrackingPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    // Simulação inteligente de busca por código ou pedido
    setTimeout(() => {
      setLoading(false);
      const clean = query.trim().toUpperCase();

      if (clean.includes("PED") || clean.includes("NL") || clean.length >= 8) {
        setResult({
          code: clean.startsWith("PED") ? "NL839210491BR" : clean,
          orderNumber: clean.startsWith("PED") ? clean : "PED-9824",
          carrier: "Correios / Linha Direta Express",
          service: "Pacote Internacional Prioritário",
          status: "Em Trânsito",
          destination: "São Paulo, SP",
          steps: [
            {
              title: "Objeto em trânsito para o Centro de Distribuição",
              location: "Unidade de Tratamento Internacional - Curitiba / PR",
              date: "Hoje, às 09:34",
              completed: true,
            },
            {
              title: "Fiscalização aduaneira finalizada com sucesso",
              location: "Centro Internacional de Triagem",
              date: "Ontem, às 14:12",
              completed: true,
            },
            {
              title: "Objeto recebido pelos Correios do Brasil",
              location: "Curitiba / PR",
              date: "21/10/2026, às 11:05",
              completed: true,
            },
            {
              title: "Pacote despachado pelo fornecedor no exterior",
              location: "Armazém Internacional de Origem",
              date: "18/10/2026, às 16:40",
              completed: true,
            },
            {
              title: "Saiu para entrega ao destinatário",
              location: "São Paulo / SP",
              date: "Previsão: nos próximos dias",
              completed: false,
            },
          ],
        });
      } else {
        setError("Nenhum pedido ou código encontrado com esses dados. Verifique e tente novamente.");
      }
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center space-y-4 mb-10">
          <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Truck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Rastreamento de Encomendas
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Acompanhe cada etapa do seu pedido em tempo real. Digite seu código de rastreio ou número do pedido.
          </p>
        </div>

        {/* Formulário de Busca */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex: NL839210491BR ou PED-9824"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition shadow-md shadow-sky-600/20 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Consultando...</span>
              ) : (
                <>
                  <Truck className="w-4 h-4" />
                  <span>Rastrear Agora</span>
                </>
              )}
            </button>
          </form>

          {/* Dica para teste rápido */}
          <div className="mt-3 text-center sm:text-left">
            <span className="text-xs text-slate-400">
              💡 Dica para teste: digite <b>PED-9824</b> ou <b>NL839210491BR</b>
            </span>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* Linha do Tempo de Rastreamento */}
        {result && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider block">
                  Código de Rastreio
                </span>
                <span className="text-xl font-black text-slate-900">{result.code}</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Pedido: {result.orderNumber} • Destino: {result.destination}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{result.status}</span>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100 space-y-8">
              {result.steps.map((step: any, idx: number) => (
                <div key={idx} className="relative">
                  {/* Ponto / Ícone */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        step.completed ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {step.location}
                      </span>
                      <span>•</span>
                      <span>{step.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
