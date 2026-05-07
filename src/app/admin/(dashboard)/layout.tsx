import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./_components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar userEmail={session.user.email ?? ""} />
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">{children}</main>
    </div>
  );
}
