"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import Icon, { type IconName } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/products", label: "Products", icon: "inventory" },
  { href: "/admin/content", label: "Website Content", icon: "article" },
  { href: "/admin/content/editor", label: "Content Editor", icon: "edit" },
];

export default function AdminShell({
  children,
  onSignOut,
}: {
  children: React.ReactNode;
  onSignOut: () => void;
}) {
  const pathname = usePathname() ?? "/admin/dashboard";

  function active(href: string) {
    if (href === "/admin/content") return pathname === href;
    if (href === "/admin/content/editor") return pathname.startsWith(href);
    return pathname === href || (href === "/admin/products" && pathname.startsWith("/admin/products/"));
  }

  const navigation = (mobile = false) => navItems.map((item) => {
    const selected = active(item.href);
    return (
      <Link key={item.href} href={item.href} aria-current={selected ? "page" : undefined}
        className={`${mobile ? "shrink-0 px-space-sm" : "px-space-md"} flex items-center gap-space-sm py-space-sm rounded transition-colors ${selected ? "bg-primary-container text-on-primary-container font-semibold" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`}>
        <Icon name={item.icon} className="w-[18px] h-[18px] shrink-0" />
        <span className="font-sans text-label-md whitespace-nowrap">{item.label}</span>
      </Link>
    );
  });

  const currentTitle = navItems.find((item) => active(item.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-[260px] flex-col justify-between border-r border-primary-container/20 bg-surface-container-low md:flex">
        <div>
          <Link href="/admin/dashboard" className="flex items-center gap-space-sm px-space-lg py-space-lg">
            <Logo className="w-9 h-9 text-primary" />
            <span className="flex flex-col"><Text as="span" scale="title-lg" className="text-on-surface uppercase">ANH COFFEE</Text><Text as="span" scale="label-sm" className="text-primary">ADMINISTRATION</Text></span>
          </Link>
          <div className="px-space-md pb-space-sm"><Text as="span" scale="label-sm" className="text-outline uppercase tracking-[0.16em]">Workspace</Text></div>
          <nav aria-label="Admin navigation" className="flex flex-col gap-1 px-space-sm">{navigation()}</nav>
        </div>

        <div className="p-space-md">
          <div className="mb-space-md flex items-center gap-space-sm rounded-lg bg-surface-container px-space-sm py-space-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary"><Text as="span" scale="label-md">AD</Text></div>
            <div className="min-w-0"><Text as="span" scale="label-md" className="block truncate text-on-surface">Administrator</Text><Text as="span" scale="label-sm" className="text-outline">Local demo account</Text></div>
          </div>
          <button onClick={onSignOut} className="flex w-full items-center gap-space-sm rounded px-space-sm py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors"><Icon name="logout" className="w-[18px] h-[18px]" /><span className="font-sans text-label-md">Sign out</span></button>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-primary-container/20 bg-surface/95 backdrop-blur-md md:left-[260px]">
        <div className="flex h-16 items-center justify-between gap-space-md px-space-md md:px-space-xl">
          <div className="flex items-center gap-space-sm">
            <span className="md:hidden"><Logo className="w-8 h-8 text-primary" /></span>
            <div className="flex items-center gap-space-xs text-on-surface-variant"><Text as="span" scale="label-sm" className="uppercase tracking-wider">CMS Console</Text><span aria-hidden="true">/</span><Text as="span" scale="label-sm" className="text-primary">{currentTitle}</Text></div>
          </div>
          <div className="flex items-center gap-space-md">
            <Link href="/vi" className="hidden sm:inline-flex items-center gap-space-xs font-sans text-label-sm uppercase tracking-wider text-primary hover:text-on-primary-container"><Icon name="eye" className="w-4 h-4" />View Website</Link>
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container sm:flex"><Text as="span" scale="label-sm">AD</Text></div>
            <button onClick={onSignOut} aria-label="Sign out" className="flex items-center justify-center rounded p-space-xs text-on-surface-variant hover:bg-surface-container hover:text-error md:hidden"><Icon name="logout" className="w-5 h-5" /></button>
          </div>
        </div>
        <nav aria-label="Admin navigation" className="flex gap-space-xs overflow-x-auto border-t border-outline-variant/20 px-space-sm py-space-xs md:hidden">{navigation(true)}</nav>
      </header>

      <main className="min-h-screen bg-background px-space-md pb-space-2xl pt-[116px] md:ml-[260px] md:px-space-xl md:pt-[88px]">
        {children}
        <footer className="mt-space-2xl border-t border-outline-variant/30 pt-space-md text-outline"><Text as="span" scale="label-sm">© 2026 ANH COFFEE · Vietnamese Terroir Admin</Text></footer>
      </main>
    </div>
  );
}
