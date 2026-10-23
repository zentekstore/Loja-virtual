# 🚀 NexusDrop — Loja Virtual Omnichannel & Hub de Dropshipping

Plataforma completa de **Loja Virtual de Alta Conversão**, integrada a um **Hub Omnichannel** para sincronização com **Shopify**, **Nuvemshop**, **Mercado Livre**, **Shopee** e fornecedores de **Dropshipping** (CJ Dropshipping, AliExpress e Fornecedores Nacionais).

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 15 (App Router, React 19, Server Components & Server Actions)
- **Linguagem:** TypeScript com tipagem estrita
- **Estilização:** Tailwind CSS v3 com design moderno (Shadcn-style) e Lucide Icons
- **Banco de Dados & ORM:** Prisma ORM com SQLite (pronto para migração para PostgreSQL/Supabase em produção)
- **Gerenciamento de Estado:** React Context API para Carrinho Flutuante e Checkout
- **Integrações Multicanal:** Serviços modulares para Shopify, Nuvemshop, Mercado Livre e CJ Dropshipping

---

## 📂 Estrutura do Projeto

```plaintext
Loja Virtual/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Vitrine Principal de Alta Conversão
│   │   ├── layout.tsx                   # Layout global com CartProvider e SEO
│   │   ├── checkout/                    # Checkout seguro com endereço e formas de pagamento
│   │   ├── produtos/                    # Catálogo completo de produtos
│   │   │   └── [slug]/                  # Página do produto com variantes e cálculo de frete
│   │   ├── rastreio/                    # Rastreamento de pedidos em tempo real (Correios / Transportadora)
│   │   ├── admin/                       # Painel Administrativo do Lojista
│   │   │   ├── page.tsx                 # Dashboard de Faturamento, CMV, Lucro e Origem por Canal
│   │   │   ├── produtos/                # Gestão de Markup, Custo e Sincronização em 1-Clique
│   │   │   ├── dropshipping/            # Central de Despacho Automático de Pedidos aos Fornecedores
│   │   │   └── integracoes/             # Central de Conexão com Shopify, Nuvemshop e Marketplaces
│   │   └── api/
│   │       ├── orders/                  # Endpoint de criação e processamento de pedidos
│   │       └── sync/                    # Sincronizador de catálogo e webhooks
│   ├── components/                      # Componentes reutilizáveis (Navbar, Footer, ProductCard, CartDrawer)
│   ├── context/                         # Contexto do Carrinho de Compras (CartContext)
│   ├── lib/                             # Instância do Prisma, utilitários de moeda (BRL) e Seed
│   ├── services/
│   │   ├── dropshipping/                # Integração com fornecedores de dropshipping
│   │   └── integrations/                # Adaptadores de API para Shopify, Nuvemshop e Mercado Livre
│   └── prisma/
│       └── schema.prisma                # Modelos de Dados (Product, Variant, Order, Supplier, Integration)
└── .env                                 # Variáveis de ambiente e tokens de integração
```

---

## 🚀 Como Executar o Projeto

### 1. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: [http://localhost:3000](http://localhost:3000)

### 2. Acessar o Painel Administrativo & Hub
Acesse: [http://localhost:3000/admin](http://localhost:3000/admin)

- **Dashboard:** Visão geral de faturamento, margem e vendas por canal.
- **Produtos & Markup:** Ajuste de margem percentual e exportação para canais.
- **Despacho Dropshipping:** Envio de ordens de compra para o fornecedor em 1-clique.
- **Canais & Marketplaces:** Conexão com Shopify, Nuvemshop, Mercado Livre e Shopee.

### 3. Rastreamento de Pedidos pelo Cliente
Acesse: [http://localhost:3000/rastreio](http://localhost:3000/rastreio)
- Para testar com dados simulados, digite o código: `NL839210491BR` ou o número do pedido `PED-9824`.

---

## 🔌 Configuração das Integrações no `.env`

Para conectar suas contas reais de plataformas e marketplaces, preencha o arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"

# Shopify
SHOPIFY_STORE_DOMAIN="sua-loja.myshopify.com"
SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxxxxxxxxxxxxxxxxxxx"

# Nuvemshop
NUVEMSHOP_USER_ID="1234567"
NUVEMSHOP_ACCESS_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Mercado Livre
MERCADOLIVRE_APP_ID="xxxxxxxxxxxxxxxx"
MERCADOLIVRE_SECRET_KEY="xxxxxxxxxxxxxxxx"

# CJ Dropshipping
CJ_DROPSHIPPING_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```
