import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-dark mb-4">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy font-medium">Blog & News</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy mb-3">
            Insights & Perspectives on Property
          </h1>
          <p className="text-gray-dark text-sm max-w-lg mx-auto leading-relaxed">
            Expert insights, market trends, and practical guidance to help you
            make smarter property decisions.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-dark py-12">
              No published posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative h-52 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-dark mb-2">
                    {post.createdAt.toLocaleDateString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-base font-bold text-navy leading-snug group-hover:text-navy-light transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-dark mt-2 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
