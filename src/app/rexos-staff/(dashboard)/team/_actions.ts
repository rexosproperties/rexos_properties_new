"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/rexos-staff/login");
}

export interface TeamMemberInput {
  name: string;
  role: string;
  imageUrl?: string | null;
  bio?: string | null;
  order: number;
}

export async function createTeamMember(input: TeamMemberInput) {
  await requireAdmin();
  await prisma.teamMember.create({
    data: {
      name: input.name,
      role: input.role,
      imageUrl: input.imageUrl ?? null,
      bio: input.bio ?? null,
      order: input.order,
    },
  });
  revalidatePath("/rexos-staff/team");
  revalidatePath("/about");
  redirect("/rexos-staff/team");
}

export async function updateTeamMember(id: string, input: TeamMemberInput) {
  await requireAdmin();
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: input.name,
      role: input.role,
      imageUrl: input.imageUrl ?? null,
      bio: input.bio ?? null,
      order: input.order,
    },
  });
  revalidatePath("/rexos-staff/team");
  revalidatePath(`/rexos-staff/team/${id}/edit`);
  revalidatePath("/about");
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/rexos-staff/team");
  revalidatePath("/about");
  redirect("/rexos-staff/team");
}
