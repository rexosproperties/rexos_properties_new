import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const properties = [
  {
    title: "Rex'o's Signature Residences (Oral Estate)",
    slug: "signature-residences-oral-estate",
    location: "Oral Estate, Lekki",
    image: "/assets/images/estate-1.png",
    featured: true,
  },
  {
    title: "Rex'o's Signature Residences (White Sand Beach Estate)",
    slug: "signature-residences-white-sand",
    location: "White Sand Beach Estate, Ologolo Lekki",
    image: "/assets/images/estate-2.png",
    featured: true,
  },
  {
    title: "Rex'o's Signature Residences (Royal Pine Estate)",
    slug: "signature-residences-royal-pine",
    location: "Orchid Road, Lekki",
    image: "/assets/images/estate-3.png",
    featured: true,
  },
  {
    title: "Rex'o's Signature Residence — Lekki Phase 1",
    slug: "signature-residences-4",
    location: "Lekki Phase 1, Lagos",
    image: "/assets/images/estate-4.png",
    featured: false,
  },
  {
    title: "Rex'o's Signature Residence — Chevron Drive",
    slug: "signature-residences-5",
    location: "Chevron Drive, Lekki",
    image: "/assets/images/estate-5.png",
    featured: false,
  },
  {
    title: "Rex'o's Signature Residence — Ikate",
    slug: "signature-residences-6",
    location: "Ikate, Lekki",
    image: "/assets/images/estate-6.png",
    featured: false,
  },
];

const defaults = {
  description:
    "A premium residential property by Rex'o's Properties, designed for refined living with thoughtful architecture and meticulous execution. Edit this description from the admin panel.",
  price: 200000000,
  type: "sale",
  status: "available",
  bedrooms: 4,
  bathrooms: 4,
};

for (const p of properties) {
  await prisma.property.upsert({
    where: { slug: p.slug },
    update: {
      title: p.title,
      location: p.location,
      featured: p.featured,
    },
    create: {
      title: p.title,
      slug: p.slug,
      description: defaults.description,
      price: defaults.price,
      location: p.location,
      type: defaults.type,
      status: defaults.status,
      bedrooms: defaults.bedrooms,
      bathrooms: defaults.bathrooms,
      featured: p.featured,
      images: { create: [{ url: p.image, alt: p.title, order: 0 }] },
    },
  });
  console.log(`✓ ${p.slug}`);
}

console.log(`\nSeeded ${properties.length} properties.`);
await prisma.$disconnect();
