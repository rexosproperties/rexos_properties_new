"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { HomeContent, AboutContent } from "@/lib/page-content";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
  return session;
}

async function savePage(page: string, value: unknown) {
  await requireAdmin();
  const json = JSON.stringify(value);
  await prisma.pageContent.upsert({
    where: { page_section_key: { page, section: "content", key: "data" } },
    update: { value: json },
    create: { page, section: "content", key: "data", value: json },
  });
}

export async function updateHomeContent(input: HomeContent) {
  await savePage("home", input);
  revalidatePath("/");
  revalidatePath("/rexos-staff/pages");
}

export async function updateAboutContent(input: AboutContent) {
  await savePage("about", input);
  revalidatePath("/about");
  revalidatePath("/rexos-staff/pages");
}
