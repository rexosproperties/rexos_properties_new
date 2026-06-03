"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { permissionKeys } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

async function requireOwner() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
  if (session.user.role !== "owner") redirect("/rexos-staff");
  return session;
}

export interface UserInput {
  name: string;
  email: string;
  password?: string; // required on create, optional on edit
  role: "owner" | "staff";
  permissions: string[];
}

function cleanPermissions(perms: string[]) {
  return perms.filter((p) => permissionKeys.includes(p));
}

export async function createUser(input: UserInput) {
  await requireOwner();

  const email = input.email.trim().toLowerCase();
  if (!input.name.trim() || !email) {
    return { ok: false, error: "Name and email are required" };
  }
  if (!input.password || input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "A user with that email already exists" };
  }

  const hash = await bcrypt.hash(input.password, 12);
  await prisma.admin.create({
    data: {
      name: input.name.trim(),
      email,
      password: hash,
      role: input.role,
      permissions:
        input.role === "owner" ? [] : cleanPermissions(input.permissions),
    },
  });

  revalidatePath("/rexos-staff/users");
  return { ok: true };
}

export async function updateUser(id: string, input: UserInput) {
  await requireOwner();

  const email = input.email.trim().toLowerCase();
  if (!input.name.trim() || !email) {
    return { ok: false, error: "Name and email are required" };
  }

  const clash = await prisma.admin.findFirst({
    where: { email, NOT: { id } },
  });
  if (clash) {
    return { ok: false, error: "Another user already uses that email" };
  }

  const data: {
    name: string;
    email: string;
    role: string;
    permissions: string[];
    password?: string;
  } = {
    name: input.name.trim(),
    email,
    role: input.role,
    permissions:
      input.role === "owner" ? [] : cleanPermissions(input.permissions),
  };

  if (input.password && input.password.length > 0) {
    if (input.password.length < 8) {
      return { ok: false, error: "Password must be at least 8 characters" };
    }
    data.password = await bcrypt.hash(input.password, 12);
  }

  await prisma.admin.update({ where: { id }, data });

  revalidatePath("/rexos-staff/users");
  revalidatePath(`/rexos-staff/users/${id}/edit`);
  return { ok: true };
}

export async function deleteUser(id: string) {
  const session = await requireOwner();
  if (session.user.id === id) {
    // prevent locking yourself out
    redirect("/rexos-staff/users");
  }
  const owners = await prisma.admin.count({ where: { role: "owner" } });
  const target = await prisma.admin.findUnique({ where: { id } });
  if (target?.role === "owner" && owners <= 1) {
    // never delete the last owner
    redirect("/rexos-staff/users");
  }
  await prisma.admin.delete({ where: { id } });
  revalidatePath("/rexos-staff/users");
  redirect("/rexos-staff/users");
}
