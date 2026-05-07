import type { Metadata } from "next";
import AdminProviders from "./providers";

export const metadata: Metadata = {
  title: "Admin · Rex'o's Properties",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProviders>{children}</AdminProviders>;
}
