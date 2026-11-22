"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminImage from "@/components/admin/AdminImage";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import Textarea from "@/components/ui/Textarea";
import { adminContentSeed, type AdminContentItem, type AdminProduct, type AdminStatus } from "@/content/admin";
import { formatVnd } from "@/lib/utils";

function PageHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-space-xl flex flex-col gap-space-md sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{eyebrow}</Text>
        <Text as="h1" scale="headline-lg" className="mt-space-xs text-on-surface tracking-tight">{title}</Text>
        <Text as="p" scale="body-sm" className="mt-space-xs text-on-surface-variant">{description}</Text>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-space-sm">{actions}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: AdminStatus }) {
  return <Badge variant={status === "Published" ? "secondary" : "surface"} className={status === "Draft" ? "text-on-surface-variant" : ""}>{status}</Badge>;
}

function MetricCard({ title, value, note, icon }: { title: string; value: string; note: string; icon: "inventory" | "globe" | "article" | "alert" }) {
  return (
    <Card className="p-space-md sm:p-space-lg">
      <div className="flex items-start justify-between gap-space-sm">
        <div><Text as="span" scale="label-sm" className="text-outline uppercase tracking-wider">{title}</Text><Text as="p" scale="headline-md" className="mt-space-xs text-on-surface">{value}</Text></div>
        <div className="rounded-lg bg-secondary-container/50 p-space-sm text-primary"><Icon name={icon} className="w-5 h-5" /></div>
      </div>
      <Text as="p" scale="label-sm" className="mt-space-md text-on-surface-variant">{note}</Text>
    </Card>
  );
}

export function AdminDashboard({ products }: { products: AdminProduct[] }) {
  const published = products.filter((product) => product.status === "Published").length;
  const drafts = products.length - published;
  const categories = new Set(products.map((product) => product.category)).size;

  return (
    <>
      <PageHeading eyebrow="Management Suite" title="Dashboard overview" description="A snapshot of your coffee catalog and website content." actions={<Button type="button" variant="ghost" size="sm" onClick={() => window.location.reload()}><Icon name="refresh" className="w-4 h-4" />Refresh metrics</Button>} />
      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Catalog products" value={String(products.length)} note="Product records in this browser" icon="inventory" />
        <MetricCard title="Published products" value={String(published)} note="Visible in the admin preview" icon="globe" />
        <MetricCard title="Content sections" value="2" note="Homepage and contact information" icon="article" />
        <MetricCard title="Drafts" value={String(drafts)} note="Awaiting publication" icon="alert" />
      </div>

      <div className="mt-space-xl grid grid-cols-1 gap-space-lg xl:grid-cols-12">
        <Card className="p-space-md sm:p-space-lg xl:col-span-7">
          <div className="mb-space-md flex items-center justify-between gap-space-sm"><div><Text as="span" scale="label-sm" className="text-secondary uppercase tracking-wider">Latest records</Text><Text as="h2" scale="headline-sm" className="mt-1">Recent catalog activity</Text></div><Link href="/admin/products" className="inline-flex items-center gap-space-xs font-sans text-label-sm uppercase tracking-wider text-primary hover:text-secondary">All products<Icon name="arrowForward" className="w-4 h-4" /></Link></div>
          <div className="divide-y divide-outline-variant/30">
            {products.slice(0, 5).map((product) => (
              <Link key={product.slug} href={`/admin/content/editor/${product.slug}`} className="flex items-center gap-space-md py-space-sm first:pt-0 last:pb-0 hover:bg-surface-container-low/60 rounded px-space-xs transition-colors">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-surface-container"><AdminImage src={product.image} alt="" sizes="48px" /></div>
                <div className="min-w-0 flex-1"><Text as="p" scale="title-md" className="truncate text-on-surface">{product.name}</Text><Text as="p" scale="label-sm" className="mt-0.5 truncate text-on-surface-variant">{product.category} · {product.sku}</Text></div>
                <StatusBadge status={product.status} />
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1">
          <Card className="p-space-md sm:p-space-lg"><Text as="span" scale="label-sm" className="text-secondary uppercase tracking-wider">Curatorial shortcuts</Text><div className="mt-space-md grid grid-cols-1 gap-space-sm sm:grid-cols-2 xl:grid-cols-1">
            <Link href="/admin/content/editor/new" className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container-low p-space-md hover:bg-surface-container transition-colors"><span><Text as="span" scale="label-sm" className="block text-outline">Catalog</Text><Text as="span" scale="title-md" className="block text-on-surface">Create product</Text></span><Icon name="plus" className="w-5 h-5 text-primary" /></Link>
            <Link href="/admin/content" className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container-low p-space-md hover:bg-surface-container transition-colors"><span><Text as="span" scale="label-sm" className="block text-outline">Website</Text><Text as="span" scale="title-md" className="block text-on-surface">Manage content</Text></span><Icon name="article" className="w-5 h-5 text-primary" /></Link>
          </div></Card>
          <Card className="p-space-md sm:p-space-lg"><div className="flex items-center justify-between"><div><Text as="span" scale="label-sm" className="text-secondary uppercase tracking-wider">Terroir allocation</Text><Text as="h2" scale="title-lg" className="mt-1">Catalog by coffee type</Text></div><Icon name="chart" className="w-5 h-5 text-primary" /></div><div className="mt-space-md flex flex-col gap-space-sm">{[...new Set(products.map((p) => p.category))].map((category) => { const count = products.filter((p) => p.category === category).length; return <div key={category}><div className="mb-1 flex justify-between gap-space-sm"><Text as="span" scale="label-sm" className="text-on-surface-variant">{category}</Text><Text as="span" scale="label-sm" className="text-primary">{count}</Text></div><div className="h-1.5 overflow-hidden rounded-full bg-surface-container"><div className="h-full rounded-full bg-primary" style={{ width: `${(count / Math.max(products.length, 1)) * 100}%` }} /></div></div>; })}</div><Text as="p" scale="label-sm" className="mt-space-md text-outline">{categories} categories in the current catalog</Text></Card>
        </div>
      </div>
    </>
  );
}

function exportCsv(products: AdminProduct[]) {
  const columns = ["name", "sku", "category", "weight", "price", "status"] as const;
  const quote = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
  const csv = [columns.join(","), ...products.map((product) => columns.map((key) => quote(product[key])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "orbis-coffee-catalog.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function AdminProducts({ products }: { products: AdminProduct[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [sort, setSort] = useState("name");
  const categories = [...new Set(products.map((product) => product.category))];
  const filtered = useMemo(() => {
    const rows = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesQuery && (category === "all" || product.category === category) && (visibility === "all" || product.status === visibility);
    });
    if (sort === "price-high") rows.sort((a, b) => b.price - a.price);
    else if (sort === "price-low") rows.sort((a, b) => a.price - b.price);
    else rows.sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }, [products, query, category, visibility, sort]);

  return (
    <>
      <PageHeading eyebrow="Catalog repository" title="Coffee products & harvest reserves" description="Manage product information, pricing, and storefront visibility." actions={<><Button type="button" variant="ghost" size="md" onClick={() => exportCsv(filtered)}><Icon name="download" className="w-4 h-4" />Export catalog</Button><Button href="/admin/content/editor/new" variant="secondary" size="md"><Icon name="plus" className="w-4 h-4" />Add product</Button></>} />
      <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-3">
        <MetricCard title="Active products" value={String(products.length)} note="Current catalog records" icon="inventory" />
        <MetricCard title="Published" value={String(products.filter((p) => p.status === "Published").length)} note="Marked visible in admin" icon="globe" />
        <MetricCard title="Stock tracking" value="Not connected" note="Inventory is not available yet" icon="alert" />
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-space-sm border-b border-outline-variant/30 p-space-md lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1"><Icon name="search" className="absolute left-space-md top-1/2 h-4 w-4 -translate-y-1/2 text-outline" /><Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search products" placeholder="Search by product, SKU, or origin" className="pl-10" /></div>
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-3 lg:w-[min(100%,540px)]">
            <Select aria-label="Filter category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</Select>
            <Select aria-label="Filter visibility" value={visibility} onChange={(event) => setVisibility(event.target.value)}><option value="all">All visibility</option><option value="Published">Published</option><option value="Draft">Draft</option></Select>
            <Select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Sort: Name</option><option value="price-high">Price: High to Low</option><option value="price-low">Price: Low to High</option></Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead className="bg-surface-container-low"><tr>{["Coffee product & lot origin", "SKU / Identification", "Terroir category", "Format & net wt.", "Unit price", "Stock status", "Visibility", ""].map((heading) => <th key={heading} scope="col" className="px-space-md py-space-md font-sans text-label-sm uppercase tracking-wider text-outline">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-outline-variant/20">{filtered.map((product) => (
              <tr key={product.slug} className="hover:bg-surface-container-low/60">
                <td className="px-space-md py-space-sm"><div className="flex items-center gap-space-sm"><div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-surface-container"><AdminImage src={product.image} alt="" sizes="48px" /></div><div><Text as="p" scale="title-md" className="max-w-[250px] text-on-surface">{product.name}</Text><Text as="p" scale="label-sm" className="mt-0.5 text-on-surface-variant">{product.origin}</Text></div></div></td>
                <td className="px-space-md py-space-sm font-mono text-body-sm text-on-surface-variant">{product.sku || "—"}</td>
                <td className="px-space-md py-space-sm"><Text as="span" scale="body-sm">{product.category}</Text></td>
                <td className="px-space-md py-space-sm whitespace-nowrap text-body-sm text-on-surface-variant">{product.weight}</td>
                <td className="px-space-md py-space-sm whitespace-nowrap font-semibold text-on-surface">{formatVnd(product.price)}</td>
                <td className="px-space-md py-space-sm text-body-sm text-outline">Not tracked</td>
                <td className="px-space-md py-space-sm"><StatusBadge status={product.status} /></td>
                <td className="px-space-md py-space-sm"><Button type="button" variant="ghost" size="sm" onClick={() => router.push(`/admin/content/editor/${product.slug}`)}><Icon name="edit" className="w-4 h-4" />Edit</Button></td>
              </tr>
            ))}</tbody>
          </table>
          {filtered.length === 0 && <div className="p-space-2xl text-center"><Text as="p" scale="body-md" className="text-on-surface-variant">No products match these filters.</Text></div>}
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/30 px-space-md py-space-sm"><Text as="span" scale="label-sm" className="text-outline">Showing {filtered.length} of {products.length} products</Text><Text as="span" scale="label-sm" className="text-outline">Stock data is not connected</Text></div>
      </Card>
    </>
  );
}

export function AdminContent({ products }: { products: AdminProduct[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const records: AdminContentItem[] = [adminContentSeed[0], ...products.map((product) => ({ id: product.slug, title: product.name, subtitle: `${product.category} • ${product.weight}`, type: "Product", status: product.status, image: product.image })), adminContentSeed[adminContentSeed.length - 1]];
  const types = [...new Set(records.map((record) => record.type))];
  const visibleRecords = records.filter((record) => record.title.toLowerCase().includes(query.toLowerCase()) && (type === "all" || record.type === type) && (status === "all" || record.status === status));
  const publishedCount = records.filter((record) => record.status === "Published").length;
  const draftCount = records.filter((record) => record.status === "Draft").length;

  return (
    <>
      <PageHeading eyebrow="Content repository" title="Website content" description="Curate product stories, homepage sections, and atelier information." actions={<><Button type="button" variant="ghost" size="md" onClick={() => window.location.reload()}><Icon name="refresh" className="w-4 h-4" />Rebuild cache</Button><Button href="/admin/content/editor/new" variant="secondary" size="md"><Icon name="plus" className="w-4 h-4" />Add new content</Button></>} />
      <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-3"><MetricCard title="Total entries" value={String(records.length)} note="Across catalog and public pages" icon="article" /><MetricCard title="Published" value={String(publishedCount)} note="Currently marked published" icon="globe" /><MetricCard title="Draft revisions" value={String(draftCount)} note="Not shown in the storefront" icon="alert" /></div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-space-sm border-b border-outline-variant/30 p-space-md md:flex-row md:items-center">
          <div className="relative min-w-0 flex-1"><Icon name="search" className="absolute left-space-md top-1/2 h-4 w-4 -translate-y-1/2 text-outline" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or reference" aria-label="Search content" className="pl-10" /></div>
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 md:w-[360px]"><Select aria-label="Filter content type" value={type} onChange={(event) => setType(event.target.value)}><option value="all">All content types</option>{types.map((item) => <option key={item} value={item}>{item}</option>)}</Select><Select aria-label="Filter content status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All status</option><option value="Published">Published</option><option value="Draft">Draft</option></Select></div>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left"><thead className="bg-surface-container-low"><tr>{["Thumbnail", "Title & reference", "Content type", "Status", "Actions"].map((heading) => <th key={heading} scope="col" className="px-space-md py-space-md font-sans text-label-sm uppercase tracking-wider text-outline">{heading}</th>)}</tr></thead>
          <tbody className="divide-y divide-outline-variant/20">{visibleRecords.map((record) => { const product = products.find((item) => item.slug === record.id); return <tr key={record.id} className="hover:bg-surface-container-low/60"><td className="px-space-md py-space-sm"><div className="relative h-12 w-16 overflow-hidden rounded bg-surface-container">{record.image && <AdminImage src={record.image} alt="" sizes="64px" />}</div></td><td className="px-space-md py-space-sm"><Text as="p" scale="title-md" className="text-on-surface">{record.title}</Text><Text as="p" scale="label-sm" className="mt-0.5 text-on-surface-variant">{record.subtitle}</Text></td><td className="px-space-md py-space-sm text-body-sm text-on-surface-variant">{record.type}</td><td className="px-space-md py-space-sm"><StatusBadge status={record.status} /></td><td className="px-space-md py-space-sm">{product ? <Button type="button" variant="ghost" size="sm" onClick={() => router.push(`/admin/content/editor/${product.slug}`)}><Icon name="edit" className="w-4 h-4" />Edit</Button> : <span className="text-body-sm text-outline">Managed in page source</span>}</td></tr>; })}</tbody>
        </table>{visibleRecords.length === 0 && <div className="p-space-2xl text-center"><Text as="p" scale="body-md" className="text-on-surface-variant">No content matches these filters.</Text></div>}</div>
        <div className="border-t border-outline-variant/30 px-space-md py-space-sm"><Text as="span" scale="label-sm" className="text-outline">Viewing {visibleRecords.length} of {records.length} entries</Text></div>
      </Card>
    </>
  );
}

export function AdminProductEditor({
  product,
  onSave,
}: {
  product?: AdminProduct;
  onSave: (product: AdminProduct) => void;
}) {
  const router = useRouter();
  const existing = Boolean(product);
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [category, setCategory] = useState(product?.category ?? "Specialty Arabica");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [weight, setWeight] = useState(product?.weight ?? "");
  const [roast, setRoast] = useState(product?.roast ?? "");
  const [origin, setOrigin] = useState(product?.origin ?? "");
  const [harvest, setHarvest] = useState(product?.harvest ?? "");
  const [notes, setNotes] = useState(product?.notes.join(", ") ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [status, setStatus] = useState<AdminStatus>(product?.status ?? "Draft");
  const [message, setMessage] = useState("");

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedSlug = slug.trim() || name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const next: AdminProduct = {
      slug: normalizedSlug,
      sku: sku.trim(),
      name: name.trim(),
      category,
      weight: weight.trim() || "—",
      price: Number(price),
      stock: product?.stock ?? null,
      status,
      image: image.trim() || product?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuD9jii5w_r9dbhdbQ0icjwdg5Acro07U3l-pfz_C1K04_YATONjVLMC32u588M5AtO52uYfjP3U8R4_1ZagwEQo9uZkvgD3IND8jH-thNLgwXffZZ9OUwtf5AO8gz_OybgrjSSu0hxfItMMXlfmmYB8l94ic-LbpZATmaSXsmHNGXD3wdcNdgPYAOjuyBb0fbO7-3YH2_Krypi2Z1ysLmk-tSfm_LIRyS3NFioXRi0G",
      description: description.trim(),
      roast: roast.trim(),
      origin: origin.trim(),
      harvest: harvest.trim(),
      notes: notes.split(",").map((note) => note.trim()).filter(Boolean),
    };
    onSave(next);
    setMessage("Changes saved in this browser’s admin workspace.");
    window.setTimeout(() => router.push("/admin/products"), 650);
  }

  return (
    <>
      <div className="mb-space-md flex items-center gap-space-xs font-sans text-label-sm uppercase tracking-wider text-secondary"><Link href="/admin/content" className="hover:text-primary">Website content</Link><span>/</span><Link href="/admin/products" className="hover:text-primary">Products</Link><span>/</span><span className="text-on-surface">{existing ? "Edit product" : "New product"}</span></div>
      <PageHeading eyebrow={existing ? status : "New catalog record"} title={existing ? "Edit product" : "Create product"} description="Manage the title, story, product details, cupping notes, and publication status." actions={<><Button href="/admin/products" variant="ghost" size="md">Cancel</Button><Button form="admin-product-form" type="submit" variant="primary" size="md"><Icon name="check" className="w-4 h-4" />Save changes</Button></>} />
      <form id="admin-product-form" onSubmit={handleSave} className="grid grid-cols-1 items-start gap-space-lg xl:grid-cols-12">
        <div className="flex flex-col gap-space-lg xl:col-span-8">
          <Card className="p-space-md sm:p-space-lg"><div className="mb-space-lg"><Text as="h2" scale="title-lg" className="text-on-surface">General information</Text><Text as="p" scale="body-sm" className="mt-1 text-on-surface-variant">Product title and editorial description.</Text></div>
            <div className="flex flex-col gap-space-md"><div><label htmlFor="product-title" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Product title *</label><Input id="product-title" value={name} onChange={(event) => { setName(event.target.value); if (!existing && !slug) setSlug(event.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }} required /></div><div className="grid grid-cols-1 gap-space-md sm:grid-cols-2"><div><label htmlFor="product-sku" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">SKU / reference</label><Input id="product-sku" value={sku} onChange={(event) => setSku(event.target.value)} /></div><div><label htmlFor="product-slug" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">URL slug</label><Input id="product-slug" value={slug} onChange={(event) => setSlug(event.target.value)} /></div></div><div><label htmlFor="product-description" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Editorial story</label><Textarea id="product-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={1200} /><Text as="p" scale="label-sm" className="mt-1 text-right text-outline">{description.length}/1200</Text></div></div>
          </Card>
          <Card className="p-space-md sm:p-space-lg"><div className="mb-space-lg"><Text as="h2" scale="title-lg" className="text-on-surface">Specifications & pricing</Text><Text as="p" scale="body-sm" className="mt-1 text-on-surface-variant">Category, pack format, and retail price.</Text></div>
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2"><div><label htmlFor="product-category" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Product category</label><Select id="product-category" value={category} onChange={(event) => setCategory(event.target.value)}><option>Specialty Arabica</option><option>Heritage Robusta</option><option>Signature Blend</option><option>Micro-lot Reserve</option><option>Curated Gift Box</option></Select></div><div><label htmlFor="product-price" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Retail price (VND)</label><Input id="product-price" type="number" min="0" step="1000" value={price} onChange={(event) => setPrice(event.target.value)} required /></div><div><label htmlFor="product-weight" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Package net weight</label><Input id="product-weight" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="250g" /></div><div><label htmlFor="product-roast" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Roast level profile</label><Select id="product-roast" value={roast} onChange={(event) => setRoast(event.target.value)}><option value="">Select roast profile</option><option>Light roast</option><option>Medium light</option><option>Medium roast</option><option>Medium dark</option><option>Dark espresso roast</option></Select></div></div>
          </Card>
          <Card className="p-space-md sm:p-space-lg"><div className="mb-space-lg"><Text as="h2" scale="title-lg" className="text-on-surface">Terroir profile & cupping notes</Text><Text as="p" scale="body-sm" className="mt-1 text-on-surface-variant">Origin and harvest information displayed with the product.</Text></div>
            <div className="flex flex-col gap-space-md"><div><label htmlFor="product-notes" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Sensory notes</label><Input id="product-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Cacao, caramel, jasmine" /><Text as="p" scale="label-sm" className="mt-1 text-outline">Separate notes with commas.</Text></div><div className="grid grid-cols-1 gap-space-md sm:grid-cols-2"><div><label htmlFor="product-origin" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Region & provenance</label><Input id="product-origin" value={origin} onChange={(event) => setOrigin(event.target.value)} /></div><div><label htmlFor="product-harvest" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Harvest method</label><Input id="product-harvest" value={harvest} onChange={(event) => setHarvest(event.target.value)} /></div></div></div>
          </Card>
        </div>

        <div className="flex flex-col gap-space-lg xl:col-span-4">
          <Card className="p-space-md sm:p-space-lg"><Text as="h2" scale="title-lg" className="text-on-surface">Product imagery</Text><Text as="p" scale="body-sm" className="mt-1 text-on-surface-variant">Use an image URL for this demo workspace.</Text>{image && <div className="relative mt-space-md aspect-square overflow-hidden rounded-lg bg-surface-container"><AdminImage src={image} alt="Product preview" sizes="(max-width: 1280px) 100vw, 33vw" /></div>}<label htmlFor="product-image" className="mb-space-xs mt-space-md block font-sans text-label-md uppercase tracking-wider">Image URL</label><Input id="product-image" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." /></Card>
          <Card className="p-space-md sm:p-space-lg"><div className="flex items-center justify-between"><Text as="h2" scale="title-lg" className="text-on-surface">Publishing & visibility</Text><Icon name="globe" className="w-5 h-5 text-primary" /></div><div className="mt-space-md"><label htmlFor="product-status" className="mb-space-xs block font-sans text-label-md uppercase tracking-wider">Release status</label><Select id="product-status" value={status} onChange={(event) => setStatus(event.target.value as AdminStatus)}><option value="Published">Published</option><option value="Draft">Draft</option></Select></div><Text as="p" scale="body-sm" className="mt-space-md text-on-surface-variant">{status === "Published" ? "This record is marked as published in the admin catalog." : "This record is saved as a draft in the admin catalog."}</Text></Card>
          {message && <p role="status" className="rounded bg-secondary-container/60 px-space-md py-space-sm text-body-sm text-on-secondary-container">{message}</p>}
          <Button type="submit" form="admin-product-form" variant="primary" size="lg" className="w-full"><Icon name="check" className="w-4 h-4" />Save changes</Button>
        </div>
      </form>
    </>
  );
}
