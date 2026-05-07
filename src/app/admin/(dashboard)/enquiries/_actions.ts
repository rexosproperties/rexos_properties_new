"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function markRead(id: string, read: boolean) {
  await requireAdmin();
  await prisma.enquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  redirect("/admin/enquiries");
}
