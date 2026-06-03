"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
}

export interface TestimonialInput {
  name: string;
  role?: string | null;
  content: string;
  imageUrl?: string | null;
  rating: number;
  order: number;
}

export async function createTestimonial(input: TestimonialInput) {
  await requireAdmin();
  await prisma.testimonial.create({
    data: {
      name: input.name,
      role: input.role ?? null,
      content: input.content,
      imageUrl: input.imageUrl ?? null,
      rating: input.rating,
      order: input.order,
    },
  });
  revalidatePath("/rexos-staff/testimonials");
  revalidatePath("/");
  redirect("/rexos-staff/testimonials");
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  await requireAdmin();
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: input.name,
      role: input.role ?? null,
      content: input.content,
      imageUrl: input.imageUrl ?? null,
      rating: input.rating,
      order: input.order,
    },
  });
  revalidatePath("/rexos-staff/testimonials");
  revalidatePath(`/rexos-staff/testimonials/${id}/edit`);
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/rexos-staff/testimonials");
  revalidatePath("/");
  redirect("/rexos-staff/testimonials");
}
