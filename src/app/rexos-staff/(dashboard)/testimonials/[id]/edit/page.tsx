import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "../../_components/TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <Link
        href="/rexos-staff/testimonials"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All testimonials
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">{testimonial.name}</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
