import Link from "next/link";
import TestimonialForm from "../_components/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All testimonials
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">New Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
