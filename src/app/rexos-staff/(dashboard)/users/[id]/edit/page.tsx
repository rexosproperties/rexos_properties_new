import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import UserForm from "../../_components/UserForm";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
  if (session.user.role !== "owner") redirect("/rexos-staff");

  const { id } = await params;
  const user = await prisma.admin.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div>
      <Link
        href="/rexos-staff/users"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All users
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">{user.name}</h1>
      <UserForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
        }}
      />
    </div>
  );
}
