import type { Localized } from "@/lib/i18n";
import productsData from "./data/products.json";

export type Product = {
  slug: string;
  image: string;
  price: number;
  rating: number;
  badge: Localized;
  category: Localized;
  name: Localized;
  description: Localized;
};

export const products = productsData as Product[];
