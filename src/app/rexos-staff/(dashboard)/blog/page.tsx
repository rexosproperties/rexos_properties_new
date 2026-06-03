import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "./_actions";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-1">Blog Posts</h1>
          <p className="text-gray-dark text-sm">{posts.length} total</p>
        </div>
        <Link
          href="/rexos-staff/blog/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-dark mb-4">No blog posts yet.</p>
          <Link
            href="/rexos-staff/blog/new"
            className="inline-block bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-dark">
                <th className="px-6 py-3 font-semibold">Post</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Created</th>
                <th className="px-6 py-3 font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100" />
                      )}
                      <Link
                        href={`/rexos-staff/blog/${post.id}/edit`}
                        className="text-sm font-semibold text-navy hover:underline"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {post.published ? (
                      <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-dark text-xs px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-dark whitespace-nowrap">
                    {post.createdAt.toLocaleDateString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/rexos-staff/blog/${post.id}/edit`}
                        className="text-sm text-navy hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteBlogPost.bind(null, post.id)}>
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
