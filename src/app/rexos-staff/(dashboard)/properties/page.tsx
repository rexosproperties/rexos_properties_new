import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProperty } from "./_actions";
import StatusToggle from "./_components/StatusToggle";

export const dynamic = "force-dynamic";

export default async function PropertiesAdminPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      _count: { select: { images: true } },
    },
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Properties</h1>
          <p className="text-gray-dark text-sm">
            {properties.length} total
          </p>
        </div>
        <Link
          href="/rexos-staff/properties/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-dark mb-4">No properties yet.</p>
          <Link
            href="/rexos-staff/properties/new"
            className="inline-block bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Create your first property
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-dark">
                <th className="px-6 py-3 font-semibold">Property</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Price</th>
                <th className="px-6 py-3 font-semibold">Images</th>
                <th className="px-6 py-3 font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images[0].url}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100" />
                      )}
                      <div>
                        <Link
                          href={`/rexos-staff/properties/${p.id}/edit`}
                          className="text-sm font-semibold text-navy hover:underline"
                        >
                          {p.title}
                        </Link>
                        <p className="text-xs text-gray-dark">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark capitalize">
                    {p.type}
                    {p.featured && (
                      <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusToggle id={p.id} status={p.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark whitespace-nowrap">
                    ₦{p.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark">
                    {p._count.images}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/rexos-staff/properties/${p.id}/edit`}
                        className="text-sm text-navy hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteProperty.bind(null, p.id)}>
                        <button
                          type="submit"
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
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
