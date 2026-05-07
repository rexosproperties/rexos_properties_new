import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    name: "Erekosima Perebuowei",
    imageUrl: "/assets/images/Avatar/32.png",
    content:
      "Investing with Rex'o's Properties has been an absolute pleasure. Their professionalism, attention to detail, and commitment to delivering exceptional results set them apart in the real estate development industry.",
    order: 0,
  },
  {
    name: "Chukwuemeka Obi",
    imageUrl: "/assets/images/Avatar/32-1.png",
    content:
      "Rex'o's Properties made finding our dream home in Lekki effortless. From the first consultation to handing over the keys, every step was smooth, transparent, and professional. I couldn't be more satisfied.",
    order: 1,
  },
  {
    name: "Amara Nwachukwu",
    imageUrl: "/assets/images/Avatar/32-2.png",
    content:
      "The team at Rex'o's truly understands luxury living. The quality of their construction and the attention to finishing details is unmatched. Our family feels safe, comfortable, and proud to call this home.",
    order: 2,
  },
  {
    name: "Tunde Fashola",
    imageUrl: "/assets/images/Avatar/32-3.png",
    content:
      "As a property investor, I've worked with many developers across Lagos. Rex'o's Properties stands out for their integrity, timely delivery, and the exceptional value they offer. A partner you can trust.",
    order: 3,
  },
  {
    name: "Ngozi Adeyemi",
    imageUrl: "/assets/images/Avatar/32-4.png",
    content:
      "I purchased a unit at their Oral Estate development and it exceeded every expectation. The location is prime, the design is stunning, and the community they've built is exactly what Lagos needed.",
    order: 4,
  },
];

const existing = await prisma.testimonial.findMany();
if (existing.length > 0) {
  console.log(
    `Skipped — ${existing.length} testimonials already exist. Manage them in /admin/testimonials.`,
  );
} else {
  for (const t of items) {
    await prisma.testimonial.create({ data: { ...t, rating: 5 } });
    console.log(`✓ ${t.name}`);
  }
  console.log(`\nSeeded ${items.length} testimonials.`);
}

await prisma.$disconnect();
