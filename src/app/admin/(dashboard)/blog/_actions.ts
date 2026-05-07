"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  imageUrl?: string | null;
  published: boolean;
}

async function uniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let i = 1;
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function createBlogPost(input: BlogPostInput) {
  await requireAdmin();
  const slug = input.slug?.trim()
    ? input.slug.trim()
    : await uniqueSlug(input.title);

  const created = await prisma.blogPost.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt || null,
      content: input.content,
      imageUrl: input.imageUrl ?? null,
      published: input.published,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect(`/admin/blog/${created.id}/edit`);
}

export async function updateBlogPost(id: string, input: BlogPostInput) {
  await requireAdmin();
  const slug = input.slug?.trim()
    ? input.slug.trim()
    : await uniqueSlug(input.title, id);

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt || null,
      content: input.content,
      imageUrl: input.imageUrl ?? null,
      published: input.published,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}/edit`);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
