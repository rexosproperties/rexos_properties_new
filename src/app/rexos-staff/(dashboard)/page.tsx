import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    propertyCount,
    blogCount,
    enquiryCount,
    unreadEnquiries,
    totalViews,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.blogPost.count(),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { read: false } }),
    prisma.pageView.count(),
  ]);

  const topPages = await prisma.pageView.groupBy({
    by: ["path"],
    _count: { path: true },
    orderBy: { _count: { path: "desc" } },
    take: 5,
  });

  const stats = [
    { label: "Properties", value: propertyCount },
    { label: "Blog Posts", value: blogCount },
    { label: "Total Enquiries", value: enquiryCount },
    { label: "Unread Enquiries", value: unreadEnquiries },
    { label: "Page Views", value: totalViews },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
      <p className="text-gray-dark mb-8">
        Welcome back. Here&apos;s a quick snapshot of your site.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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

      {/* Top Pages */}
      {topPages.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
            Top Pages
          </h2>
          <div className="space-y-2">
            {topPages.map((p) => (
              <div
                key={p.path}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-dark font-mono">
                  {p.path}
                </span>
                <span className="text-sm font-semibold text-navy">
                  {p._count.path} views
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
