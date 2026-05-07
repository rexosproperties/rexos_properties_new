import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  const items = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <TestimonialsClient
      testimonials={items.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        content: t.content,
        imageUrl: t.imageUrl,
      }))}
    />
  );
}
