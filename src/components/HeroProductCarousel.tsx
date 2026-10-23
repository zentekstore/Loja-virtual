"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Zap,
  Star,
  ShoppingBag,
} from "lucide-react";

export interface CarouselProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  badge: string;
  recentBuyer: {
    city: string;
    state: string;
    timeAgo: string;
  };
}

const defaultProducts: CarouselProduct[] = [
  {
    id: "1",
    title: "Smartwatch Ultra Pro Max 49mm com NFC",
    slug: "smartwatch-ultra-pro-max-49mm",
    price: 199.9,
    compareAtPrice: 299.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
    badge: "🔥 Mais Vendido #1",
    recentBuyer: {
      city: "São Paulo",
      state: "SP",
      timeAgo: "há 3 minutos",
    },
  },
  {
    id: "2",
    title: "Fone TWS Wireless Pro com Cancelamento Ativo (ANC)",
    slug: "fone-tws-wireless-pro-anc",
    price: 149.9,
    compareAtPrice: 229.0,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&auto=format&fit=crop&q=80",
    badge: "⭐ Destaque de Áudio",
    recentBuyer: {
      city: "Rio de Janeiro",
      state: "RJ",
      timeAgo: "há 7 minutos",
    },
  },
  {
    id: "3",
    title: "Mochila Executiva Antifurto Impermeável com Trava TSA",
    slug: "mochila-executiva-antifurto-impermeavel",
    price: 189.9,
    compareAtPrice: 269.9,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80",
    badge: "💼 Escolha Executiva",
    recentBuyer: {
      city: "Curitiba",
      state: "PR",
      timeAgo: "há 12 minutos",
    },
  },
  {
    id: "4",
    title: "Luminária Inteligente LED RGB com Indução 15W",
    slug: "luminaria-inteligente-led-rgb-inducao",
    price: 169.9,
    compareAtPrice: 239.0,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80",
    badge: "✨ Casa Inteligente",
    recentBuyer: {
      city: "Belo Horizonte",
      state: "MG",
      timeAgo: "há 15 minutos",
    },
  },
];

export function HeroProductCarousel({ products = defaultProducts }: { products?: CarouselProduct[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentProduct = products[currentIndex] || products[0];

  // Auto-play a cada 4 segundos
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, products.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const discount = currentProduct.compareAtPrice
    ? Math.round(
        ((currentProduct.compareAtPrice - currentProduct.price) /
          currentProduct.compareAtPrice) *
          100
      )
    : 0;

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Efeito Glow Neon no fundo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-purple-500/25 rounded-3xl blur-2xl transition-all duration-700"></div>

      {/* Container Principal do Card Carrossel */}
      <div className="relative bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Banner do Produto com Link Direto */}
        <Link
          href={`/produtos/${currentProduct.slug}`}
          className="block relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 group/img"
        >
          <img
            key={currentProduct.id}
            src={currentProduct.image}
            alt={currentProduct.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105 animate-fadeIn"
          />

          {/* Gradiente sutil na base da imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

          {/* Badge Top Left */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/20">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentProduct.badge}</span>
            </span>
            {discount > 0 && (
              <span className="bg-red-500 text-white text-[11px] font-extrabold px-2 py-1 rounded-full shadow-md">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Informações de Preço sobrepostas na Imagem */}
          <div className="absolute bottom-3 left-3 right-3 z-10 text-white flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-300 font-medium line-clamp-1">
                {currentProduct.title}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {formatCurrency(currentProduct.price)}
                </span>
                {currentProduct.compareAtPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(currentProduct.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs font-bold bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-lg group-hover/img:bg-sky-500 group-hover/img:text-white transition">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ver Produto</span>
            </div>
          </div>
        </Link>

        {/* Botões de Navegação Anterior / Próximo */}
        <button
          onClick={handlePrev}
          aria-label="Produto anterior"
          className="absolute left-6 top-1/2 -translate-y-8 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-sky-600 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Próximo produto"
          className="absolute right-6 top-1/2 -translate-y-8 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-sky-600 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores / Dots de Navegação */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para ${p.title}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? "w-7 h-2 bg-sky-600"
                  : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Card Flutuante de Conversão Atualizado Dinamicamente */}
        <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30 transition-all duration-500">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-semibold block">
                Pedido Aprovado
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-emerald-600 font-bold">
                {currentProduct.recentBuyer.timeAgo}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              {currentProduct.title.split(" ").slice(0, 3).join(" ")} • {currentProduct.recentBuyer.city}/{currentProduct.recentBuyer.state}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
