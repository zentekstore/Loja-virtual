"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, Zap, Truck } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    category: string;
    sellingPrice: number;
    compareAtPrice: number | null;
    images: string;
    variants?: any[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const images: string[] = JSON.parse(product.images || "[]");
  const mainImage =
    images[0] ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.sellingPrice) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      productId: product.id,
      title: product.title,
      price: product.sellingPrice,
      image: mainImage,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Imagem do Produto */}
      <Link href={`/produtos/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Flutuantes */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-white" /> -{discountPercent}%
            </span>
          )}
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
            <Truck className="w-2.5 h-2.5" /> Frete Grátis
          </span>
        </div>
      </Link>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          <Link href={`/produtos/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Avaliações em Estrelas */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">(4.9)</span>
          </div>
        </div>

        {/* Preços e Ação */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
          <div>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            <div className="text-lg font-black text-gray-900">
              {formatCurrency(product.sellingPrice)}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold block">
              ou 12x de {formatCurrency(product.sellingPrice / 12)}
            </span>
          </div>

          <button
            onClick={handleQuickBuy}
            className="p-3 bg-gray-900 text-white hover:bg-sky-600 rounded-xl transition-all shadow-md group-hover:shadow-sky-500/20 active:scale-95 flex items-center justify-center"
            title="Adicionar ao Carrinho"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
