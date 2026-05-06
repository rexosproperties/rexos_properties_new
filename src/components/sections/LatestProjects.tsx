import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Rex'o's Signature Residences (Oral Estate)",
    location: "Oral Estate, Lekki.",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-oral-estate",
    image: "/assets/images/property-oral-estate.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 2,
    title: "Rex'o's Signature Residences ( White Sand Beach Estate)",
    location: "White Sand Beach Estate, Ologolo Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-white-sand",
    image: "/assets/images/property-white-sand.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 3,
    title: "Rex'o's Signature Residences (Royal Pine Estate)",
    location: "Orchid Road, Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-royal-pine",
    image: "/assets/images/property-royal-pine.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
];

export default function LatestProjects() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-[50px] font-semibold text-navy text-center mb-12 leading-tight">
          Discover Our Latest Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Image */}
              <div className="relative h-72 lg:h-80 rounded-xl overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-navy text-xs font-semibold px-4 py-1.5 rounded-full font-sans">
                  {project.status}
                </span>
              </div>

              {/* Info */}
              <h3 className="text-base font-bold text-navy mb-1 font-sans">
                {project.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-dark mb-3 font-sans">
                <Image
                  src="/assets/images/Icon/location-icon.svg"
                  alt="Location"
                  width={12}
                  height={12}
                />
                {project.location}
              </div>

              {/* Amenities — order: bedroom, dining area, kitchen, bathroom, living room */}
              <div className="flex items-center gap-3 text-xs text-gray-dark mb-4 font-sans">
                <span className="flex items-center gap-1">
                  <Image src="/assets/images/Icon/bedroom.svg" alt="Bedrooms" width={20} height={20} />
                  {project.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/assets/images/Icon/Dining area.svg" alt="Dining Area" width={20} height={20} />
                  {project.diningArea}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/assets/images/Icon/kitchen.svg" alt="Kitchen" width={20} height={20} />
                  {project.kitchen}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/assets/images/Icon/bathroom.svg" alt="Bathrooms" width={20} height={20} />
                  {project.bathrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/assets/images/Icon/living room.svg" alt="Living Room" width={20} height={20} />
                  {project.livingRoom}
                </span>
              </div>

              {/* Price & CTA */}
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
