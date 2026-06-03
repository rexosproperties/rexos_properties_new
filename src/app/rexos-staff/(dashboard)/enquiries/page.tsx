import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = enquiries.filter((e) => !e.read).length;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Enquiries</h1>
          <p className="text-gray-dark text-sm">
            {enquiries.length} total · {unreadCount} unread
          </p>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-dark">No enquiries yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-dark">
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Subject</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map((e) => (
                <tr
                  key={e.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    !e.read ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    {!e.read ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-navy" />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/rexos-staff/enquiries/${e.id}`}
                      className={`text-sm hover:text-navy ${
                        !e.read ? "font-semibold text-navy" : "text-gray-dark"
                      }`}
                    >
                      {e.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark">
                    {e.subject || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark">
                    {e.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark whitespace-nowrap">
                    {e.createdAt.toLocaleDateString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
