import Link from "next/link";
import PropertyForm from "../_components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <Link
        href="/rexos-staff/properties"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All properties
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">New Property</h1>
      <PropertyForm />
    </div>
  );
}
