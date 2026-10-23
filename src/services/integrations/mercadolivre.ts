export class MercadoLivreService {
  private appId: string;
  private secretKey: string;

  constructor(appId?: string, secretKey?: string) {
    this.appId = appId || process.env.MERCADOLIVRE_APP_ID || "";
    this.secretKey = secretKey || process.env.MERCADOLIVRE_SECRET_KEY || "";
  }

  isConfigured(): boolean {
    return Boolean(this.appId && this.secretKey);
  }

  formatProduct(product: {
    title: string;
    description: string;
    sellingPrice: number;
    stockQuantity: number;
    images: string;
  }) {
    const imagesList: string[] = JSON.parse(product.images || "[]");

    return {
      title: product.title.slice(0, 60), // Limite de 60 chars do Mercado Livre
      category_id: "MLB1051", // Categoria padrão ou mapeada dinamicamente
      price: product.sellingPrice,
      currency_id: "BRL",
      available_quantity: product.stockQuantity,
      buying_mode: "buy_it_now",
      listing_type_id: "gold_special",
      condition: "new",
      description: {
        plain_text: product.description,
      },
      pictures: imagesList.map((url) => ({ source: url })),
    };
  }

  async syncProduct(product: any): Promise<{ success: boolean; externalId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Credenciais do Mercado Livre não configuradas no painel",
      };
    }

    try {
      // Mock de envio com schema real do Mercado Livre
      return {
        success: true,
        externalId: `MLB-${Math.floor(100000000 + Math.random() * 900000000)}`,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Erro no Mercado Livre" };
    }
  }
}

export const mercadoLivreService = new MercadoLivreService();
