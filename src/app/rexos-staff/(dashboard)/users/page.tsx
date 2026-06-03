import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { adminSections } from "@/lib/permissions";
import { deleteUser } from "./_actions";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
  if (session.user.role !== "owner") redirect("/rexos-staff");

  const users = await prisma.admin.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });

  const labelFor = (key: string) =>
    adminSections.find((s) => s.key === key)?.label ?? key;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Users</h1>
          <p className="text-gray-dark text-sm">{users.length} total</p>
        </div>
        <Link
          href="/rexos-staff/users/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New User
        </Link>
      </div>

      <div className="space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border border-gray-100 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-sm font-bold text-navy">{u.name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  u.role === "owner"
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-dark"
                }`}
              >
                {u.role === "owner" ? "Owner" : "Staff"}
              </span>
              {u.id === session.user.id && (
                <span className="text-xs text-gray-dark">(you)</span>
              )}
            </div>
            <p className="text-xs text-gray-dark mb-3">{u.email}</p>

            {u.role === "staff" && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {u.permissions.length === 0 ? (
                  <span className="text-xs text-gray-dark italic">
                    No sections assigned
                  </span>
                ) : (
                  u.permissions.map((p) => (
                    <span
                      key={p}
                      className="text-xs bg-navy/10 text-navy px-2 py-0.5 rounded"
                    >
                      {labelFor(p)}
                    </span>
                  ))
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <Link
                href={`/rexos-staff/users/${u.id}/edit`}
                className="text-sm text-navy hover:underline"
              >
                Edit
              </Link>
              {u.id !== session.user.id && (
                <form action={deleteUser.bind(null, u.id)}>
                  <button
                    type="submit"
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
