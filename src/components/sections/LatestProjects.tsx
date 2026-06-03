import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function LatestProjects() {
  let projects = await prisma.property.findMany({
    where: {
      featured: true,
      status: { not: "off-market" },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  // Fallback: if no featured properties, show the 3 most recent non-off-market
  if (projects.length === 0) {
    projects = await prisma.property.findMany({
      where: { status: { not: "off-market" } },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    });
  }

  if (projects.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-[50px] font-semibold text-navy text-center mb-12 leading-tight">
          Discover Our Latest Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="relative h-72 lg:h-80 rounded-xl overflow-hidden mb-4">
                <Image
                  src={
                    project.images[0]?.url ?? "/assets/images/estate-1.png"
                  }
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-navy text-xs font-semibold px-4 py-1.5 rounded-full font-sans">
                  {project.type === "rent" ? "For Rent" : "For Sale"}
                </span>
              </div>

              <h3 className="text-base font-bold text-navy mb-1 font-sans">
                {project.title}
              </h3>

              <div className="flex items-center gap-1 text-xs text-gray-dark mb-3 font-sans">
                <Image
                  src="/assets/images/Icon/location-icon.svg"
                  alt="Location"
                  width={12}
                  height={12}
                />
                {project.location}
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-dark mb-4 font-sans flex-wrap">
                <span className="flex items-center gap-1">
                  <Image
                    src="/assets/images/Icon/bedroom.svg"
                    alt="Bedrooms"
                    width={20}
                    height={20}
                  />
                  {project.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/assets/images/Icon/bathroom.svg"
                    alt="Bathrooms"
                    width={20}
                    height={20}
                  />
                  {project.bathrooms}
                </span>
                {project.livingRoom > 0 && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/assets/images/Icon/living room.svg"
                      alt="Living Room"
                      width={20}
                      height={20}
                    />
                    {project.livingRoom}
                  </span>
                )}
                {project.diningArea > 0 && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/assets/images/Icon/Dining area.svg"
                      alt="Dining Area"
                      width={20}
                      height={20}
                    />
                    {project.diningArea}
                  </span>
                )}
                {project.kitchen > 0 && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/assets/images/Icon/kitchen.svg"
                      alt="Kitchen"
                      width={20}
                      height={20}
                    />
                    {project.kitchen}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-navy font-sans">
                  ₦{project.price.toLocaleString()}
                </span>
                <Link
                  href={`/properties/${project.slug}`}
                  className="border-2 border-navy text-navy px-6 py-2 rounded-full text-xs font-semibold hover:bg-navy hover:text-white transition-colors font-sans"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
