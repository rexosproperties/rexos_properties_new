import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamForm from "../../_components/TeamForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <Link
        href="/rexos-staff/team"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All members
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">{member.name}</h1>
      <TeamForm member={member} />
    </div>
  );
}
