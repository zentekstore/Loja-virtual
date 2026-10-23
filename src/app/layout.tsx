import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Zentek Store | Loja Virtual & Hub de Dropshipping Multicanal",
  description:
    "E-commerce de alta performance integrado com Shopify, Nuvemshop, Mercado Livre e fornecedores globais de dropshipping.",
  keywords: ["loja virtual", "dropshipping", "e-commerce", "shopify", "nuvemshop", "mercado livre"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
