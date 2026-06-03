import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UserForm from "../_components/UserForm";

export default async function NewUserPage() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
  if (session.user.role !== "owner") redirect("/rexos-staff");

  return (
    <div>
      <Link
        href="/rexos-staff/users"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All users
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">New User</h1>
      <UserForm />
    </div>
  );
}
