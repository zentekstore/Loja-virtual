import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Headphones, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Frete Grátis</h4>
              <p className="text-sm text-gray-400 mt-1">
                Envio expresso para todo o Brasil com código de rastreamento.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Compra 100% Segura</h4>
              <p className="text-sm text-gray-400 mt-1">
                Seus dados protegidos com criptografia SSL de ponta a ponta.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Garantia Legal de 7 Dias</h4>
              <p className="text-sm text-gray-400 mt-1">
                7 dias para devolução ou troca sem burocracia (Art. 49 CDC).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Suporte Humanizado</h4>
              <p className="text-sm text-gray-400 mt-1">
                Atendimento via WhatsApp e E-mail de segunda a sábado.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Sobre */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-gray-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-base">
                Z
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                ZENTEK<span className="text-sky-400">STORE</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              A sua loja virtual com os produtos mais inovadores e tecnológicos do mercado global,
              conectada diretamente aos melhores fornecedores internacionais e nacionais.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white transition">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/rastreio" className="hover:text-white transition">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sky-400 hover:text-sky-300 transition">
                  Acesso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Políticas & Termos
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Políticas de Envio e Prazos
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Trocas e Devoluções
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Privacidade e Termos de Uso
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Perguntas Frequentes (FAQ)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Canais & Formas de Pagamento
            </h5>
            <p className="text-xs text-gray-400 mb-3">
              Aceitamos as principais bandeiras e PIX com aprovação imediata:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700 font-semibold">
                PIX (5% OFF)
              </span>
              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                Cartão de Crédito
              </span>
              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                Boleto Bancário
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Conectado com Shopify & Nuvemshop
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Zentek Store. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com tecnologia de última geração para alta performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
