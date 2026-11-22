import { products, type Product } from "@/content/products";

export type AdminStatus = "Published" | "Draft";

export type AdminProduct = {
  slug: string;
  sku: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  stock: number | null;
  status: AdminStatus;
  image: string;
  description: string;
  roast: string;
  origin: string;
  harvest: string;
  notes: string[];
};

function toAdminProduct(product: Product): AdminProduct {
  const slug = product.slug;

  return {
    slug,
    sku: "",
    name: product.name.en,
    category: product.category.en.replace(/\s*•\s*\d+\s*g/i, "").trim(),
    weight: product.category.en.match(/\d+\s*g/i)?.[0] ?? "—",
    price: product.price,
    stock: null,
    status: "Published",
    image: product.image,
    description: product.description.en,
    roast: "",
    origin: product.badge.en,
    harvest: "",
    notes: product.description.en.split(/[,;.]/).map((note) => note.trim()).filter(Boolean).slice(0, 4),
  };
}

export const adminProductSeed = products.map(toAdminProduct);

export const adminContentSeed = [
  { id: "homepage-hero", title: "The Soul of Vietnamese Coffee, Elevated.", subtitle: "Homepage Section • Hero headline & terroir manifesto", type: "Homepage Section", status: "Published" as const, image: adminProductSeed[0]?.image ?? "" },
  ...adminProductSeed.map((product) => ({ id: product.slug, title: product.name, subtitle: `${product.category} • ${product.weight}`, type: "Product", status: product.status, image: product.image })),
  { id: "contact-information", title: "Atelier Flagship Tasting Salon", subtitle: "68 Đồng Khởi, Bến Nghé, Quận 1", type: "Contact Information", status: "Published" as const, image: adminProductSeed[1]?.image ?? "" },
];

export type AdminContentItem = (typeof adminContentSeed)[number];
