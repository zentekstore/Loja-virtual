"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import Link from "next/link";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal } = useCart();
  const [cep, setCep] = useState("");
  const [freteCalculado, setFreteCalculado] = useState<boolean>(false);

  if (!isCartOpen) return null;

  const handleCalcFrete = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setFreteCalculado(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-bold text-gray-900">Seu Carrinho</h2>
              <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4 stroke-[1.5]" />
                <p className="text-gray-600 font-medium">Seu carrinho está vazio</p>
                <p className="text-gray-400 text-sm mt-1 max-w-xs">
                  Explore nossas ofertas e adicione os melhores produtos de tecnologia e estilo!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                    {item.variantTitle && (
                      <p className="text-xs text-gray-500 mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-sm font-bold text-sky-600 mt-1">
                      {formatCurrency(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 space-y-4">
              {/* Simulador de Frete */}
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <form onSubmit={handleCalcFrete} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Calcular CEP..."
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      maxLength={9}
                      className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition"
                  >
                    Calcular
                  </button>
                </form>
                {freteCalculado && (
                  <div className="mt-2.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Frete Expresso Dropshipping
                    </span>
                    <span className="font-bold">GRÁTIS (5 a 12 dias)</span>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Frete</span>
                  <span className="text-emerald-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-sky-600 text-lg">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              {/* Botão de Finalizar */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-emerald-800 transition active:scale-[0.99]"
              >
                <span>Finalizar Pedido Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <p className="text-[11px] text-gray-400">
                  🔒 Pagamento 100% Criptografado & Garantia de Entrega
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
