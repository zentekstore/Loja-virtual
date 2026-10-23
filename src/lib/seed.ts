import { prisma } from "./prisma";

export async function runSeed() {
  console.log("Iniciando população de dados iniciais...");

  // 1. Limpar dados anteriores caso existam
  await prisma.syncLog.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.integrationChannel.deleteMany({});

  // 2. Criar Fornecedores de Dropshipping
  const cjSupplier = await prisma.supplier.create({
    data: {
      name: "CJ Dropshipping Oficial",
      type: "CJ_DROPSHIPPING",
      contactEmail: "support@cjdropshipping.com",
      websiteUrl: "https://cjdropshipping.com",
    },
  });

  const aliSupplier = await prisma.supplier.create({
    data: {
      name: "AliExpress Direct / Choice",
      type: "ALIEXPRESS",
      contactEmail: "business@aliexpress.com",
      websiteUrl: "https://aliexpress.com",
    },
  });

  const nationalSupplier = await prisma.supplier.create({
    data: {
      name: "Fornecedor Dropshipping Nacional (SP)",
      type: "NACIONAL",
      contactEmail: "contato@dropshipbrasil.com.br",
      websiteUrl: "https://dropshipbrasil.com.br",
    },
  });

  // 3. Criar Canais de Integração
  const channels = [
    {
      channel: "SHOPIFY",
      name: "Shopify Store",
      isEnabled: true,
      syncStatus: "SUCCESS",
      settings: JSON.stringify({ defaultMarkup: 120, autoSyncStock: true }),
    },
    {
      channel: "NUVEMSHOP",
      name: "Nuvemshop Brasil",
      isEnabled: true,
      syncStatus: "SUCCESS",
      settings: JSON.stringify({ defaultMarkup: 110, autoSyncStock: true }),
    },
    {
      channel: "MERCADOLIVRE",
      name: "Mercado Livre Full/Coleta",
      isEnabled: true,
      syncStatus: "SUCCESS",
      settings: JSON.stringify({ defaultMarkup: 130, listingType: "gold_special" }),
    },
    {
      channel: "SHOPEE",
      name: "Shopee Marketplace",
      isEnabled: false,
      syncStatus: "IDLE",
      settings: JSON.stringify({ defaultMarkup: 100 }),
    },
  ];

  for (const ch of channels) {
    await prisma.integrationChannel.create({ data: ch });
  }

  // 4. Criar Produtos Campeões de Dropshipping
  const p1 = await prisma.product.create({
    data: {
      title: "Smartwatch Ultra Pro Max 49mm com NFC & Chamadas Bluetooth",
      slug: "smartwatch-ultra-pro-max-49mm",
      description:
        "O smartwatch mais vendido do momento. Caixa em liga de titânio de 49mm, tela AMOLED de 2.02 polegadas com alta resolução, monitor cardíaco avançado, medição de oxigênio no sangue, mais de 100 modos de esporte e bateria de longa duração até 7 dias. Resistente à água IP68.",
      category: "Eletrônicos & Smart Gadgets",
      tags: "smartwatch, tecnologia, fitness, bluetooth, nfc",
      costPrice: 58.5,
      sellingPrice: 199.9,
      compareAtPrice: 299.9,
      markupPercent: 241.7,
      stockQuantity: 420,
      featured: true,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      ]),
      supplierId: cjSupplier.id,
      supplierSku: "CJ-WATCH-ULTRA-01",
      syncChannels: JSON.stringify(["SHOPIFY", "NUVEMSHOP", "MERCADOLIVRE"]),
      variants: {
        create: [
          {
            title: "Preto Espacial / Pulseira Oceano",
            sku: "WATCH-ULTRA-BLK",
            costPrice: 58.5,
            sellingPrice: 199.9,
            stockQuantity: 210,
            attributes: JSON.stringify({ cor: "Preto Espacial", pulseira: "Oceano" }),
          },
          {
            title: "Laranja Aventura / Pulseira Alpine",
            sku: "WATCH-ULTRA-ORG",
            costPrice: 58.5,
            sellingPrice: 199.9,
            stockQuantity: 210,
            attributes: JSON.stringify({ cor: "Laranja Aventura", pulseira: "Alpine" }),
          },
        ],
      },
    },
  });

  const p2 = await prisma.product.create({
    data: {
      title: "Fone de Ouvido TWS Wireless Pro com Cancelamento Ativo de Ruído (ANC)",
      slug: "fone-tws-wireless-pro-anc",
      description:
        "Áudio imersivo de alta fidelidade com cancelamento ativo de ruído inteligente até 35dB. Microfone quádruplo com redução de ruídos de vento para chamadas cristalinas. Estojo com carregamento sem fio e autonomia total de até 30 horas.",
      category: "Áudio & Acessórios",
      tags: "fones, tws, bluetooth, anc, fone sem fio",
      costPrice: 38.0,
      sellingPrice: 149.9,
      compareAtPrice: 229.0,
      markupPercent: 294.4,
      stockQuantity: 650,
      featured: true,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      ]),
      supplierId: aliSupplier.id,
      supplierSku: "ALI-TWS-PRO-ANC",
      syncChannels: JSON.stringify(["SHOPIFY", "NUVEMSHOP", "MERCADOLIVRE"]),
      variants: {
        create: [
          {
            title: "Branco Glacial",
            sku: "TWS-ANC-WHT",
            costPrice: 38.0,
            sellingPrice: 149.9,
            stockQuantity: 350,
            attributes: JSON.stringify({ cor: "Branco Glacial" }),
          },
          {
            title: "Grafite Fosco",
            sku: "TWS-ANC-GRF",
            costPrice: 38.0,
            sellingPrice: 149.9,
            stockQuantity: 300,
            attributes: JSON.stringify({ cor: "Grafite Fosco" }),
          },
        ],
      },
    },
  });

  const p3 = await prisma.product.create({
    data: {
      title: "Mochila Executiva Antifurto Impermeável com Porta USB e Trava TSA",
      slug: "mochila-executiva-antifurto-impermeavel",
      description:
        "Design ergonômico moderno, tecido oxford 100% impermeável e resistente a riscos. Compartimento acolchoado para notebook até 15.6 polegadas, trava de segurança com segredo numérico TSA e saída externa USB para carregar o celular durante deslocamentos.",
      category: "Acessórios & Viagem",
      tags: "mochila, antifurto, notebook, impermeavel, viagem",
      costPrice: 62.0,
      sellingPrice: 189.9,
      compareAtPrice: 269.9,
      markupPercent: 206.2,
      stockQuantity: 180,
      featured: true,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      ]),
      supplierId: nationalSupplier.id,
      supplierSku: "BR-MOC-EXEC-TSA",
      syncChannels: JSON.stringify(["SHOPIFY", "NUVEMSHOP"]),
    },
  });

  const p4 = await prisma.product.create({
    data: {
      title: "Luminária Inteligente LED RGB Touch com Carregador por Indução 15W",
      slug: "luminaria-inteligente-led-rgb-inducao",
      description:
        "3 em 1: Luminária de cabeceira com 7 modos de iluminação ambiente RGB, base de carregamento rápido sem fio por indução 15W compatível com iPhone e Android, e caixa de som Bluetooth embutida de alta qualidade sonora.",
      category: "Casa & Decoração Inteligente",
      tags: "luminaria, led, rgb, carregador por inducao, decoracao",
      costPrice: 52.0,
      sellingPrice: 169.9,
      compareAtPrice: 239.0,
      markupPercent: 226.7,
      stockQuantity: 240,
      featured: true,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      ]),
      supplierId: cjSupplier.id,
      supplierSku: "CJ-LAMP-G-RGB",
      syncChannels: JSON.stringify(["SHOPIFY", "NUVEMSHOP", "MERCADOLIVRE"]),
    },
  });

  // 5. Criar Pedidos de Exemplo com Dropshipping ativo
  await prisma.order.create({
    data: {
      orderNumber: "PED-9824",
      customerName: "Lucas Fernandes Rocha",
      customerEmail: "lucas.rocha@email.com",
      customerPhone: "(11) 98765-4321",
      shippingAddress: JSON.stringify({
        street: "Av. Paulista",
        number: "1000, Apto 82",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100",
      }),
      status: "SHIPPED",
      originChannel: "SHOPIFY",
      externalOrderId: "SHP-10492",
      totalAmount: 199.9,
      costAmount: 58.5,
      profitAmount: 141.4,
      trackingCode: "NL839210491BR",
      trackingUrl: "https://rastreamento.correios.com.br",
      carrier: "Correios Prime",
      supplierOrderId: "CJ-BR-829104",
      items: {
        create: [
          {
            productId: p1.id,
            title: p1.title,
            variantTitle: "Preto Espacial / Pulseira Oceano",
            quantity: 1,
            unitPrice: 199.9,
            unitCost: 58.5,
            totalPrice: 199.9,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "PED-9825",
      customerName: "Mariana Alencar Guimarães",
      customerEmail: "mariana.alencar@email.com",
      customerPhone: "(21) 99123-8877",
      shippingAddress: JSON.stringify({
        street: "Rua Visconde de Pirajá",
        number: "305",
        neighborhood: "Ipanema",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "22410-003",
      }),
      status: "ORDERED_SUPPLIER",
      originChannel: "NUVEMSHOP",
      externalOrderId: "NUV-8841",
      totalAmount: 299.8,
      costAmount: 76.0,
      profitAmount: 223.8,
      supplierOrderId: "ALI-BR-554190",
      items: {
        create: [
          {
            productId: p2.id,
            title: p2.title,
            variantTitle: "Branco Glacial",
            quantity: 2,
            unitPrice: 149.9,
            unitCost: 38.0,
            totalPrice: 299.8,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "PED-9826",
      customerName: "Rodrigo Silveira Pinto",
      customerEmail: "rodrigo.silveira@email.com",
      shippingAddress: JSON.stringify({
        street: "Rua XV de Novembro",
        number: "720",
        neighborhood: "Centro",
        city: "Curitiba",
        state: "PR",
        zipCode: "80020-310",
      }),
      status: "PAID",
      originChannel: "STOREFRONT",
      totalAmount: 189.9,
      costAmount: 62.0,
      profitAmount: 127.9,
      items: {
        create: [
          {
            productId: p3.id,
            title: p3.title,
            quantity: 1,
            unitPrice: 189.9,
            unitCost: 62.0,
            totalPrice: 189.9,
          },
        ],
      },
    },
  });

  console.log("Banco de dados populado com sucesso com dados de dropshipping e omnichannel!");
}

// Executar quando invocado diretamente
if (require.main === module) {
  runSeed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
