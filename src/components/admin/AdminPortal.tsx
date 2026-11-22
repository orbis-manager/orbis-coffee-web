"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminShell from "@/components/admin/AdminShell";
import { AdminContent, AdminDashboard, AdminProductEditor, AdminProducts } from "@/components/admin/AdminScreens";
import Text from "@/components/ui/Text";
import { adminProductSeed, type AdminProduct } from "@/content/admin";

const AUTH_KEY = "orbis-admin-auth";
const PRODUCTS_KEY = "orbis-admin-products";
const AUTH_EVENT = "orbis-admin-auth-change";

function subscribeToAuth(onChange: () => void) {
  window.addEventListener(AUTH_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function hasAdminSession() {
  try {
    if (sessionStorage.getItem(AUTH_KEY) === "active") return true;
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return false;
    const session = JSON.parse(stored) as { expiresAt?: number };
    if (typeof session.expiresAt === "number" && session.expiresAt > Date.now()) return true;
    localStorage.removeItem(AUTH_KEY);
  } catch {
    return false;
  }
  return false;
}

export default function AdminPortal() {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const authenticated = useSyncExternalStore(subscribeToAuth, hasAdminSession, () => false);
  const [products, setProducts] = useState<AdminProduct[]>(() => {
    if (typeof window === "undefined") return adminProductSeed;
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts) as AdminProduct[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      localStorage.removeItem(PRODUCTS_KEY);
    }
    return adminProductSeed;
  });

  useEffect(() => {
    if (!authenticated && pathname !== "/admin") {
      router.replace("/admin");
      return;
    }
    if (authenticated && pathname === "/admin") router.replace("/admin/dashboard");
  }, [authenticated, pathname, router]);

  const signIn = useCallback((remember: boolean) => {
    if (remember) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ expiresAt: Date.now() + 12 * 60 * 60 * 1000 }));
      sessionStorage.removeItem(AUTH_KEY);
    } else {
      sessionStorage.setItem(AUTH_KEY, "active");
      localStorage.removeItem(AUTH_KEY);
    }
    window.dispatchEvent(new Event(AUTH_EVENT));
    router.push("/admin/dashboard");
  }, [router]);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
    router.replace("/admin");
  }, [router]);

  const saveProduct = useCallback((nextProduct: AdminProduct, originalSlug?: string) => {
    const updated = originalSlug
      ? products.map((product) => product.slug === originalSlug ? nextProduct : product)
      : [...products, nextProduct];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    setProducts(updated);
  }, [products]);

  const segment = pathname.split("/")[2] ?? "";
  const editorSlug = pathname.split("/")[4];
  const editorProduct = useMemo(() => editorSlug && editorSlug !== "new" ? products.find((product) => product.slug === editorSlug) : undefined, [editorSlug, products]);
  const isEditor = pathname.startsWith("/admin/content/editor");

  if (!authenticated) return <AdminLogin onLogin={signIn} />;

  return (
    <AdminShell onSignOut={signOut}>
      {segment === "dashboard" || segment === "" ? <AdminDashboard products={products} />
        : segment === "products" ? <AdminProducts products={products} />
          : isEditor ? <AdminProductEditor key={editorProduct?.slug ?? "new-product"} product={editorProduct} onSave={(product) => saveProduct(product, editorProduct?.slug)} />
            : segment === "content" ? <AdminContent products={products} />
              : <div className="rounded-xl bg-surface-container-lowest p-space-xl"><Text as="h1" scale="headline-md">Admin screen not found</Text><Text as="p" scale="body-md" className="mt-space-xs text-on-surface-variant">Choose a section from the admin navigation.</Text></div>}
    </AdminShell>
  );
}
