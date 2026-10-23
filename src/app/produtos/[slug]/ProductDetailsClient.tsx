"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Truck,
  ShieldCheck,
  Check,
  ArrowRight,
  RefreshCw,
  Zap,
} from "lucide-react";

interface Props {
  product: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    sellingPrice: number;
    compareAtPrice: number | null;
    images: string;
    variants: Array<{
      id: string;
      title: string;
      sku: string;
      sellingPrice: number;
      stockQuantity: number;
      attributes: string;
    }>;
  };
}

export function ProductDetailsClient({ product }: Props) {
  const images: string[] = JSON.parse(product.images || "[]");
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
  );
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [cepResult, setCepResult] = useState<string | null>(null);

  const { addItem, setIsCartOpen } = useCart();

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.sellingPrice) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(
      {
        id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant ? selectedVariant.title : undefined,
        price: selectedVariant ? selectedVariant.sellingPrice : product.sellingPrice,
        image: selectedImage,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  const handleCalcFrete = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setCepResult("Frete Grátis Express (Entrega garantida de 5 a 12 dias úteis)");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Galeria de Fotos */}
      <div className="lg:col-span-7 space-y-4">
        <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                  selectedImage === img
                    ? "border-sky-600 shadow-md ring-2 ring-sky-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detalhes do Produto & Compra */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">4.9 (148 avaliações de clientes)</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Em Estoque
            </span>
          </div>
        </div>

        {/* Box de Preço */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          {product.compareAtPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
              <span className="bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                ECONOMIZE {discountPercent}%
              </span>
            </div>
          )}

          <div className="text-3xl font-black text-slate-900">
            {formatCurrency(product.sellingPrice)}
          </div>

          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-emerald-600" /> Em até 12x de{" "}
            {formatCurrency(product.sellingPrice / 12)} ou com 5% OFF no PIX
          </p>
        </div>

        {/* Variantes */}
        {product.variants.length > 0 && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Escolha a Versão / Cor:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                    selectedVariant?.id === v.id
                      ? "border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  <span>{v.title}</span>
                  {selectedVariant?.id === v.id && (
                    <Check className="w-4 h-4 text-sky-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantidade e Botões */}
        <div className="space-y-3 pt-2">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Adicionar ao Carrinho
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Comprar Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulador de Frete */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <form onSubmit={handleCalcFrete} className="flex gap-2">
            <input
              type="text"
              placeholder="Digite seu CEP (Ex: 01310-100)"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="flex-1 text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition"
            >
              Calcular
            </button>
          </form>

          {cepResult && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{cepResult}</span>
            </div>
          )}
        </div>

        {/* Selos de Confiança */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Garantia de 30 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-sky-600" />
            <span>Troca grátis e sem complicação</span>
          </div>
        </div>

        {/* Descrição */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Descrição do Produto</h3>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
