import type { Metadata } from "next";
import AdminDashboardShell from "./AdminDashboardShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Travello",
  description: "Platform Control Center untuk mengelola paket wisata, pengguna, serta riwayat pembayaran pelanggan.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
