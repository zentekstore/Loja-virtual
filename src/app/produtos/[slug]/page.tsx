import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetailsClient } from "./ProductDetailsClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      supplier: true,
    },
  });

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
