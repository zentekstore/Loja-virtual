export interface ShopifyProductPayload {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: Array<{
    price: string;
    sku: string;
    inventory_quantity: number;
  }>;
  images: Array<{
    src: string;
  }>;
}

export class ShopifyService {
  private domain: string;
  private token: string;

  constructor(domain?: string, token?: string) {
    this.domain = domain || process.env.SHOPIFY_STORE_DOMAIN || "";
    this.token = token || process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "";
  }

  isConfigured(): boolean {
    return Boolean(this.domain && this.token);
  }

  /**
   * Converte um produto do nosso banco para o formato oficial da API da Shopify
   */
  formatProduct(product: {
    title: string;
    description: string;
    category: string;
    tags: string;
    sellingPrice: number;
    stockQuantity: number;
    supplierSku?: string | null;
    images: string;
  }): ShopifyProductPayload {
    const imagesList: string[] = JSON.parse(product.images || "[]");

    return {
      title: product.title,
      body_html: `<p>${product.description}</p>`,
      vendor: "Dropshipping Hub",
      product_type: product.category,
      tags: product.tags.split(",").map((t) => t.trim()).filter(Boolean),
      variants: [
        {
          price: product.sellingPrice.toFixed(2),
          sku: product.supplierSku || `SKU-${Date.now()}`,
          inventory_quantity: product.stockQuantity,
        },
      ],
      images: imagesList.map((url) => ({ src: url })),
    };
  }

  /**
   * Exporta ou atualiza um produto na Shopify
   */
  async syncProduct(product: any): Promise<{ success: boolean; externalId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Credenciais da Shopify não configuradas no painel ou .env",
      };
    }

    try {
      const payload = { product: this.formatProduct(product) };
      const response = await fetch(`https://${this.domain}/admin/api/2024-01/products.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.text();
        return { success: false, error: `Erro na Shopify API (${response.status}): ${err}` };
      }

      const data = await response.json();
      return { success: true, externalId: String(data.product.id) };
    } catch (err: any) {
      return { success: false, error: err.message || "Erro desconhecido na sincronização com Shopify" };
    }
  }
}

export const shopifyService = new ShopifyService();
