import AdminPortal from "@/components/admin/AdminPortal";
import { Suspense } from "react";

export const metadata = {
  title: "Admin | ORBIS COFFEE",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center bg-surface-container-low">Loading administration…</main>}>
      <AdminPortal />
    </Suspense>
  );
}
