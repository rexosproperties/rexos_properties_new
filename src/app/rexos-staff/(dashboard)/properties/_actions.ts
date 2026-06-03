"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
}

export interface PropertyImageInput {
  url: string;
  alt?: string | null;
  order?: number;
}

export interface PropertyInput {
  title: string;
  slug?: string;
  description: string;
  price: number;
  location: string;
  type: "sale" | "rent";
  status: string;
  bedrooms: number;
  bathrooms: number;
  livingRoom: number;
  diningArea: number;
  kitchen: number;
  area?: number | null;
  brochureUrl?: string | null;
  featured: boolean;
  features: string[];
  images: PropertyImageInput[];
}

async function uniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let i = 1;
  while (true) {
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function createProperty(input: PropertyInput) {
  await requireAdmin();
  const slug = input.slug?.trim()
    ? input.slug.trim()
    : await uniqueSlug(input.title);

  const created = await prisma.property.create({
    data: {
      title: input.title,
      slug,
      description: input.description,
      price: input.price,
      location: input.location,
      type: input.type,
      status: input.status,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      livingRoom: input.livingRoom,
      diningArea: input.diningArea,
      kitchen: input.kitchen,
      area: input.area ?? null,
      brochureUrl: input.brochureUrl ?? null,
      featured: input.featured,
      features: input.features,
      images: {
        create: input.images.map((img, index) => ({
          url: img.url,
          alt: img.alt ?? null,
          order: img.order ?? index,
        })),
      },
    },
  });

  revalidatePath("/rexos-staff/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  redirect(`/rexos-staff/properties/${created.id}/edit`);
}

export async function updateProperty(id: string, input: PropertyInput) {
  await requireAdmin();
  const slug = input.slug?.trim()
    ? input.slug.trim()
    : await uniqueSlug(input.title, id);

  await prisma.$transaction([
    prisma.propertyImage.deleteMany({ where: { propertyId: id } }),
    prisma.property.update({
      where: { id },
      data: {
        title: input.title,
        slug,
        description: input.description,
        price: input.price,
        location: input.location,
        type: input.type,
        status: input.status,
        bedrooms: input.bedrooms,
        bathrooms: input.bathrooms,
        livingRoom: input.livingRoom,
        diningArea: input.diningArea,
        kitchen: input.kitchen,
        area: input.area ?? null,
        brochureUrl: input.brochureUrl ?? null,
        featured: input.featured,
        features: input.features,
        images: {
          create: input.images.map((img, index) => ({
            url: img.url,
            alt: img.alt ?? null,
            order: img.order ?? index,
          })),
        },
      },
    }),
  ]);

  revalidatePath("/rexos-staff/properties");
  revalidatePath(`/rexos-staff/properties/${id}/edit`);
  revalidatePath("/properties");
  revalidatePath(`/properties/${slug}`);
  revalidatePath("/");
}

export async function deleteProperty(id: string) {
  await requireAdmin();
  await prisma.property.delete({ where: { id } });
  revalidatePath("/rexos-staff/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  redirect("/rexos-staff/properties");
}
