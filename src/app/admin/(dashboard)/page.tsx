import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [propertyCount, blogCount, enquiryCount, unreadEnquiries] =
    await Promise.all([
      prisma.property.count(),
      prisma.blogPost.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { read: false } }),
    ]);

  const stats = [
    { label: "Properties", value: propertyCount },
    { label: "Blog Posts", value: blogCount },
    { label: "Total Enquiries", value: enquiryCount },
    { label: "Unread Enquiries", value: unreadEnquiries },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
      <p className="text-gray-dark mb-8">
        Welcome back. Here&apos;s a quick snapshot of your site.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 p-6"
          >
            <p className="text-xs uppercase tracking-wider text-gray-dark mb-2">
              {s.label}
            </p>
            <p className="text-3xl font-bold text-navy">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
