import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} · Rex'o's Properties`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, others] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug } }),
    prisma.blogPost.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  if (!post || !post.published) notFound();

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-dark">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-navy transition-colors">
            Blog & News
          </Link>
          <span>/</span>
          <span className="text-navy font-medium truncate max-w-xs">
            {post.title}
          </span>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <h1 className="text-2xl lg:text-4xl font-bold text-navy mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xs text-gray-dark mb-6">
              {post.createdAt.toLocaleDateString("en-NG", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            {post.imageUrl && (
              <div className="relative h-64 lg:h-[400px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-sm max-w-none text-gray-dark leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-navy [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-navy [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_img]:rounded-lg [&_img]:my-4 [&_strong]:text-navy"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <p className="text-sm font-semibold text-navy mb-4">Share</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rexosproperties.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy hover:text-white text-navy transition-colors"
                >
                  <Image
                    src="/assets/images/Icon/Social Media Icon.svg"
                    alt="Facebook"
                    width={18}
                    height={18}
                  />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://rexosproperties.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy hover:text-white text-navy transition-colors"
                >
                  <span className="font-bold">𝕏</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-navy">Other Blogs</h2>
              <Link
                href="/blog"
                className="border-2 border-navy text-navy px-6 py-2 rounded-full text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
              >
                View More
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group block"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    {p.imageUrl && (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-dark mb-2">
                    {p.createdAt.toLocaleDateString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-base font-bold text-navy leading-snug group-hover:text-navy-light transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
