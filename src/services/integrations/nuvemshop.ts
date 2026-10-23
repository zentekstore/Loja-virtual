export class NuvemshopService {
  private userId: string;
  private token: string;

  constructor(userId?: string, token?: string) {
    this.userId = userId || process.env.NUVEMSHOP_USER_ID || "";
    this.token = token || process.env.NUVEMSHOP_ACCESS_TOKEN || "";
  }

  isConfigured(): boolean {
    return Boolean(this.userId && this.token);
  }

  /**
   * Converte para o schema da API da Nuvemshop (Tiendanube)
   */
  formatProduct(product: {
    title: string;
    description: string;
    sellingPrice: number;
    stockQuantity: number;
    supplierSku?: string | null;
    images: string;
  }) {
    const imagesList: string[] = JSON.parse(product.images || "[]");

    return {
      name: {
        pt: product.title,
      },
      description: {
        pt: product.description,
      },
      variants: [
        {
          price: product.sellingPrice.toFixed(2),
          stock: product.stockQuantity,
          sku: product.supplierSku || `SKU-${Date.now()}`,
        },
      ],
      images: imagesList.map((src) => ({ src })),
    };
  }

  /**
   * Sincroniza produto com a Nuvemshop
   */
  async syncProduct(product: any): Promise<{ success: boolean; externalId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Credenciais da Nuvemshop não configuradas no painel ou .env",
      };
    }

    try {
      const response = await fetch(`https://api.nuvemshop.com.br/v1/${this.userId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `bearer ${this.token}`,
          "User-Agent": "NexusDrop E-commerce Hub (contato@nexusdrop.com)",
        },
        body: JSON.stringify(this.formatProduct(product)),
      });

      if (!response.ok) {
        const err = await response.text();
        return { success: false, error: `Erro na Nuvemshop API (${response.status}): ${err}` };
      }

      const data = await response.json();
      return { success: true, externalId: String(data.id) };
    } catch (err: any) {
      return { success: false, error: err.message || "Erro de conexão com Nuvemshop" };
    }
  }
}

export const nuvemshopService = new NuvemshopService();
