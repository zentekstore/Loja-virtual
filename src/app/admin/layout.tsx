import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Truck,
  Share2,
  ExternalLink,
  Layers,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800">
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-sky-500/20">
              Z
            </div>
            <div>
              <span className="font-black text-white text-base tracking-tight block">
                ZENTEK<span className="text-sky-400">HUB</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Omnichannel & Dropship
              </span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <LayoutDashboard className="w-4 h-4 text-sky-400" />
            <span>Dashboard Geral</span>
          </Link>

          <Link
            href="/admin/produtos"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>Produtos & Markup</span>
          </Link>

          <Link
            href="/admin/dropshipping"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Despacho Dropshipping</span>
          </Link>

          <Link
            href="/admin/integracoes"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Canais & Marketplaces</span>
          </Link>
        </nav>

        {/* Status de Integrações Rápidas no Rodapé da Sidebar */}
        <div className="p-4 m-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-white text-[11px] uppercase tracking-wider">
            <span>Canais Ativos</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Shopify</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Nuvemshop</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Mercado Livre</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
        </div>

        {/* Voltar para a Loja */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
          >
            <span>Ver Vitrine da Loja</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
}
