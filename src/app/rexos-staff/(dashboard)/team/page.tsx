import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTeamMember } from "./_actions";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Team</h1>
          <p className="text-gray-dark text-sm">{members.length} members</p>
        </div>
        <Link
          href="/rexos-staff/team/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-dark mb-4">No team members yet.</p>
          <Link
            href="/rexos-staff/team/new"
            className="inline-block bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Add the first member
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <div className="aspect-square bg-gray-100">
                {m.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-navy">{m.name}</h3>
                <p className="text-xs text-gray-dark mb-3">{m.role}</p>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/rexos-staff/team/${m.id}/edit`}
                    className="text-sm text-navy hover:underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={deleteTeamMember.bind(null, m.id)}
                    className="ml-auto"
                  >
                    <button
                      type="submit"
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
