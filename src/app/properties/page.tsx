import { prisma } from "@/lib/prisma";
import PropertiesClient from "./_components/PropertiesClient";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    where: { status: { not: "off-market" } },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  const items = properties.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    location: p.location,
    price: p.price,
    type: p.type,
    status: p.status,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    livingRoom: p.livingRoom,
    diningArea: p.diningArea,
    kitchen: p.kitchen,
    coverImage: p.images[0]?.url ?? "/assets/images/estate-1.png",
    createdAt: p.createdAt.toISOString(),
  }));

  return <PropertiesClient properties={items} />;
}
