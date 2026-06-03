import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./_actions";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Testimonials</h1>
          <p className="text-gray-dark text-sm">{items.length} total</p>
        </div>
        <Link
          href="/rexos-staff/testimonials/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Testimonial
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-dark mb-4">No testimonials yet.</p>
          <Link
            href="/rexos-staff/testimonials/new"
            className="inline-block bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Add the first
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4"
            >
              <div className="shrink-0">
                {t.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-navy/40">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-navy">{t.name}</h3>
                  {t.role && (
                    <span className="text-xs text-gray-dark">· {t.role}</span>
                  )}
                  <span className="ml-auto text-xs text-yellow-600">
                    {"★".repeat(t.rating)}
                    <span className="text-gray-300">
                      {"★".repeat(5 - t.rating)}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-gray-dark line-clamp-2">
                  {t.content}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Link
                    href={`/rexos-staff/testimonials/${t.id}/edit`}
                    className="text-sm text-navy hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteTestimonial.bind(null, t.id)}>
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
