import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminDropshippingClient } from "./AdminDropshippingClient";



export default async function AdminDropshippingPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            include: {
              supplier: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Central de Despacho & Automação Dropshipping
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Envie pedidos diretamente para CJ Dropshipping, AliExpress ou fornecedores nacionais em 1-clique.
        </p>
      </div>

      <AdminDropshippingClient initialOrders={orders} />
    </div>
  );
}
