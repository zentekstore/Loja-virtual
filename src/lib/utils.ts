import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function calculateMarkup(costPrice: number, markupPercent: number): number {
  return Number((costPrice * (1 + markupPercent / 100)).toFixed(2));
}

export function calculateProfit(sellingPrice: number, costPrice: number) {
  const profit = sellingPrice - costPrice;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  return {
    profit: Number(profit.toFixed(2)),
    margin: Number(margin.toFixed(1)),
  };
}
