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
  origin: Localized;
  highlights: Localized<string[]>;
  notes: Localized<string[]>;
  featured?: boolean;
};

export const products = productsData as Product[];
