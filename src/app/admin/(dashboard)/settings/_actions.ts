"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { settingKeys, type SiteSettings } from "@/lib/site-settings";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await requireAdmin();
  const email = session.user.email;
  if (!email) {
    return { ok: false, error: "Session has no email" };
  }
  if (!input.currentPassword || !input.newPassword) {
    return { ok: false, error: "Both fields are required" };
  }
  if (input.newPassword.length < 8) {
    return { ok: false, error: "New password must be at least 8 characters" };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return { ok: false, error: "Admin record not found" };

  const valid = await bcrypt.compare(input.currentPassword, admin.password);
  if (!valid) return { ok: false, error: "Current password is incorrect" };

  const hash = await bcrypt.hash(input.newPassword, 12);
  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: hash },
  });

  return { ok: true };
}

export async function updateSettings(input: SiteSettings) {
  await requireAdmin();

  await prisma.$transaction(
    settingKeys.map((key) => {
      const value = (input[key] ?? "") as string;
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }),
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
