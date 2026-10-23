import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";



export default async function ProductsCatalogPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { variants: true },
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Cabeçalho */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Catálogo de Produtos
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Explore nossa seleção completa de produtos com tecnologia de ponta e envio prioritário.
          </p>

          {/* Categorias Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white cursor-pointer shadow-sm">
              Todos ({products.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600 cursor-pointer transition shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
