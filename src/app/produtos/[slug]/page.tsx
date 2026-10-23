import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ select: { slug: true } });
    return products.map((p) => ({ slug: p.slug }));
  } catch (e) {
    return [
      { slug: "smartwatch-ultra-pro-max-49mm" },
      { slug: "fone-tws-wireless-pro-anc" },
      { slug: "mochila-executiva-antifurto-impermeavel" },
      { slug: "luminaria-inteligente-led-rgb-inducao" },
    ];
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        supplier: true,
      },
    });
  } catch (e) {
    // Fallback se o db não estiver presente
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ProductDetailsClient product={product} />
      </main>

      <Footer />
    </div>
  );
}
