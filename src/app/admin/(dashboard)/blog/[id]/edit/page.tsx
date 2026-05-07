import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogForm from "../../_components/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All posts
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-2">{post.title}</h1>
      <p className="text-sm text-gray-dark mb-6">
        Slug: <code className="bg-gray-100 px-2 py-0.5 rounded">{post.slug}</code>
      </p>
      <BlogForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          imageUrl: post.imageUrl,
          published: post.published,
        }}
      />
    </div>
  );
}
