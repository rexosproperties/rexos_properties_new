import Link from "next/link";
import TeamForm from "../_components/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All members
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">New Team Member</h1>
      <TeamForm />
    </div>
  );
}
