import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminIntegrationsClient } from "./AdminIntegrationsClient";

export const dynamic = "force-dynamic";

export default async function AdminIntegrationsPage() {
  const channels = await prisma.integrationChannel.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Canais de Venda, Marketplaces & Plataformas
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Conecte sua loja virtual com Shopify, Nuvemshop, Mercado Livre, Shopee e fornecedores de dropshipping.
        </p>
      </div>

      <AdminIntegrationsClient initialChannels={channels} />
    </div>
  );
}
