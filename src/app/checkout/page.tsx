"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Truck, CheckCircle2, Lock, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "Carlos Eduardo Silva",
    email: "carlos.silva@gmail.com",
    phone: "(11) 98765-4321",
    cep: "01310-100",
    street: "Avenida Paulista",
    number: "1578",
    complement: "Apto 42",
    city: "São Paulo",
    state: "SP",
    paymentMethod: "pix",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData,
          items: items.map((i) => ({
            productId: i.productId,
            title: i.title,
            variantTitle: i.variantTitle,
            quantity: i.quantity,
            price: i.price,
          })),
          totalAmount: subtotal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessOrder(data.orderNumber);
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-slate-900">Pedido Confirmado!</h2>
          <p className="text-sm text-slate-600">
            Parabéns! Seu pedido de número <b className="text-slate-900">{successOrder}</b> foi registrado e encaminhado
            para o nosso centro de despacho de dropshipping.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-600">Aguardando Despacho no Fornecedor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Prazo de Entrega:</span>
              <span className="font-bold text-slate-800">5 a 12 dias úteis</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rastreamento:</span>
              <span className="font-bold text-sky-600">Enviado por e-mail em até 24h</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/rastreio"
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm transition"
            >
              Acompanhar Rastreio
            </Link>
            <Link
              href="/admin/dropshipping"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
            >
              Ver no Painel de Dropshipping (Admin)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-200">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Voltar para a Loja
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Ambiente Seguro SSL 256-bit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário de Entrega & Pagamento */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dados Pessoais */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">1. Dados do Comprador</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-600 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">E-mail para Rastreio</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                <span>2. Endereço de Entrega</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Frete Grátis Aplicado
                </span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">CEP</label>
                  <input
                    type="text"
                    required
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-slate-600 block mb-1">Rua / Logradouro</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Número</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Cidade</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Estado</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">3. Forma de Pagamento</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "pix" })}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex flex-col justify-between ${
                    formData.paymentMethod === "pix"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  <span className="text-sm">PIX Instantâneo</span>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1">Aprovação imediata & 5% OFF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition flex flex-col justify-between ${
                    formData.paymentMethod === "card"
                      ? "border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  <span className="text-sm">Cartão de Crédito</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">Até 12x parcelado</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido Lateral */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Resumo da Compra</h3>

              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4">Nenhum item adicionado.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{item.title}</p>
                          <p className="text-slate-400">Qtd: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Frete Expresso</span>
                  <span className="text-emerald-600 font-bold">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-sky-600">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loading ? "Processando Pedido..." : "Confirmar & Finalizar Pedido"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantia de 7 dias com reembolso total</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
