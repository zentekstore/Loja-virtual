import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminProductsClient } from "./AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      supplier: true,
      variants: true,
    },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Gestão de Produtos, Fornecedores & Markup
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure a margem de lucro de dropshipping e exporte o catálogo para Shopify, Nuvemshop e Mercado Livre.
        </p>
      </div>

      <AdminProductsClient initialProducts={products} />
    </div>
  );
}
