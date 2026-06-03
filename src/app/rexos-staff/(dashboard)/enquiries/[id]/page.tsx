import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markRead, deleteEnquiry } from "../_actions";

export const dynamic = "force-dynamic";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  // Auto-mark as read on view
  if (!enquiry.read) {
    await prisma.enquiry.update({ where: { id }, data: { read: true } });
  }

  const toggleRead = markRead.bind(null, enquiry.id, !enquiry.read);
  const remove = deleteEnquiry.bind(null, enquiry.id);

  return (
    <div className="max-w-3xl">
      <Link
        href="/rexos-staff/enquiries"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All enquiries
      </Link>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="bg-navy text-white px-6 py-5">
          <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
            {enquiry.subject || "General Enquiry"}
          </p>
          <h1 className="text-xl font-bold">{enquiry.name}</h1>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-dark mb-1">
                Email
              </p>
              <a
                href={`mailto:${enquiry.email}`}
                className="text-sm text-navy hover:underline"
              >
                {enquiry.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-dark mb-1">
                Phone
              </p>
              {enquiry.phone ? (
                <a
                  href={`tel:${enquiry.phone}`}
                  className="text-sm text-navy hover:underline"
                >
                  {enquiry.phone}
                </a>
              ) : (
                <p className="text-sm text-gray-dark">—</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-dark mb-1">
                Received
              </p>
              <p className="text-sm text-gray-dark">
                {enquiry.createdAt.toLocaleString("en-NG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Africa/Lagos",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-dark mb-1">
                Status
              </p>
              <p className="text-sm text-gray-dark">
                {enquiry.read ? "Read" : "Unread"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-gray-dark mb-2">
              Message
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-dark">
              {enquiry.message}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <a
              href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(
                enquiry.subject || "Your enquiry",
              )}`}
              className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Reply via Email
            </a>
            <form action={toggleRead}>
              <button
                type="submit"
                className="border border-gray-200 px-5 py-2 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
              >
                Mark as {enquiry.read ? "unread" : "read"}
              </button>
            </form>
            <form action={remove} className="ml-auto">
              <button
                type="submit"
                className="border border-red-200 text-red-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
