import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";



export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { variants: true },
  });

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION DE ALTO IMPACTO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-12 pb-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Texto & Call to Action */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Tecnologia & Inovação Direto dos Melhores Fornecedores</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  Os Gadgets Mais Desejados do Mundo,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                    Na Porta da Sua Casa.
                  </span>
                </h1>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Produtos originais com garantia de 7 dias (direito de arrependimento), frete grátis expresso e
                  código de rastreio em tempo real atualizado a cada etapa.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/produtos"
                    className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Explorar Ofertas Exclusivas</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/admin"
                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Acessar Hub & Canais</span>
                  </Link>
                </div>

                {/* Mini Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0 text-left">
                  <div>
                    <span className="text-xl font-black text-slate-900 block">+15.000</span>
                    <span className="text-xs text-slate-500">Pedidos Entregues</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900 block">4.9 / 5.0</span>
                    <span className="text-xs text-slate-500">Satisfação dos Clientes</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-emerald-600 block">100%</span>
                    <span className="text-xs text-slate-500">Envio Seguro</span>
                  </div>
                </div>
              </div>

              {/* Hero Image / Banner Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Glow decorativo */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>

                  <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80"
                      alt="Smartwatch Ultra Pro Max"
                      className="rounded-2xl w-full object-cover aspect-[4/3]"
                    />

                    {/* Card Flutuante de Conversão */}
                    <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Novo Pedido Aprovado</span>
                        <span className="text-sm font-bold text-slate-800">Smartwatch Ultra • SP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS RÁPIDOS */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Frete Expresso Grátis</h4>
                  <p className="text-xs text-slate-500">Para todas as capitais e regiões</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Compra Blindada</h4>
                  <p className="text-xs text-slate-500">Checkout 100% criptografado</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Devolução Fácil</h4>
                  <p className="text-xs text-slate-500">7 dias conforme o Código de Defesa do Consumidor</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Até 12x no Cartão</h4>
                  <p className="text-xs text-slate-500">Ou 5% de desconto no PIX</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATÁLOGO DE PRODUTOS VENCEDORES */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">
                Catálogo em Alta
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Produtos Mais Vendidos da Semana
              </h2>
            </div>

            <Link
              href="/produtos"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 transition"
            >
              <span>Ver todos os {products.length} produtos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* BANNER DROPSHIPPING TRANSPARENTE & RASTREIO */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-sky-900/60 to-indigo-900/60 rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <span className="bg-sky-500/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/30">
                  Rastreamento Inteligente
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Já fez um pedido? Acompanhe o seu pacote em tempo real
                </h3>
                <p className="text-slate-300 text-sm">
                  Consulte a qualquer momento o status do seu envio com o código fornecido pelos Correios
                  ou transportadora parceira.
                </p>
              </div>

              <div className="w-full lg:w-auto">
                <Link
                  href="/rastreio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-2xl transition shadow-lg shadow-sky-500/25"
                >
                  <Truck className="w-5 h-5" />
                  <span>Consultar Rastreio de Pedido</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
