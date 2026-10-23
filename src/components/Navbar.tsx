"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Search,
  Truck,
  ShieldCheck,
  Zap,
  Menu,
  X,
  SlidersHorizontal,
} from "lucide-react";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      {/* Top Banner de Conversão */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3 overflow-hidden">
        <span className="flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 inline text-sky-200" /> <b>FRETE GRÁTIS</b> para todo o Brasil
        </span>
        <span className="hidden sm:inline opacity-40">|</span>
        <span className="hidden sm:flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-300" /> Garantia de 30 Dias
        </span>
        <span className="hidden md:inline opacity-40">|</span>
        <span className="hidden md:flex items-center gap-1 text-amber-200">
          <Zap className="w-3.5 h-3.5 inline" /> Parcelamento em até 12x
        </span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1">
                NEXUS<span className="text-sky-600">DROP</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                Omnichannel Hub
              </span>
            </div>
          </Link>

          {/* Links Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-sky-600 transition">
              Início
            </Link>
            <Link href="/produtos" className="hover:text-sky-600 transition">
              Catálogo Completo
            </Link>
            <Link href="/rastreio" className="hover:text-sky-600 transition flex items-center gap-1">
              <Truck className="w-4 h-4 text-sky-500" /> Rastrear Pedido
            </Link>
          </nav>
        </div>

        {/* Busca e Ações */}
        <div className="flex items-center gap-3">
          {/* Link para o Painel Admin / Hub */}
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
            <span>Painel Admin & Hub</span>
          </Link>

          {/* Carrinho */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-sky-50 text-gray-700 hover:text-sky-600 transition border border-gray-100"
            aria-label="Ver Carrinho"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Menu Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            Início
          </Link>
          <Link
            href="/produtos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            Catálogo Completo
          </Link>
          <Link
            href="/rastreio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sky-600 font-medium"
          >
            Rastrear Meu Pedido
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-indigo-600 font-semibold"
          >
            Painel Admin & Canais Integrados
          </Link>
        </div>
      )}
    </header>
  );
}
