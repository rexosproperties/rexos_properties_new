import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PropertyForm from "../../_components/PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!property) notFound();

  return (
    <div>
      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All properties
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-2">{property.title}</h1>
      <p className="text-sm text-gray-dark mb-6">
        Slug: <code className="bg-gray-100 px-2 py-0.5 rounded">{property.slug}</code>
      </p>
      <PropertyForm
        property={{
          id: property.id,
          title: property.title,
          slug: property.slug,
          description: property.description,
          price: property.price,
          location: property.location,
          type: property.type,
          status: property.status,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          livingRoom: property.livingRoom,
          diningArea: property.diningArea,
          kitchen: property.kitchen,
          area: property.area,
          brochureUrl: property.brochureUrl,
          featured: property.featured,
          features: property.features,
          images: property.images.map((img) => ({
            url: img.url,
            alt: img.alt,
            order: img.order,
          })),
        }}
      />
    </div>
  );
}
