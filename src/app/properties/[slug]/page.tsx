import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PropertyGallery from "../_components/PropertyGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} · Rex'o's Properties`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!property) notFound();

  const images = property.images.map((i) => i.url);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-dark">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-navy transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-navy font-medium">{property.title}</span>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <PropertyGallery images={images} title={property.title} />

            <h1 className="text-2xl lg:text-3xl font-bold text-navy mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-1 text-sm text-gray-dark mb-4">
              <Image
                src="/assets/images/Icon/Location Icon.svg"
                alt="Location"
                width={14}
                height={14}
              />
              <span>{property.location}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-dark mb-8 pb-8 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/Bedrooms.svg"
                  alt="Bedrooms"
                  width={18}
                  height={18}
                />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/bathroom.svg"
                  alt="Bathrooms"
                  width={18}
                  height={18}
                />
                {property.bathrooms}
              </span>
              {property.area && (
                <span className="text-xs text-gray-dark">
                  {property.area.toLocaleString()} sqm
                </span>
              )}
              <span className="ml-auto inline-block bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {property.type === "rent" ? "For Rent" : "For Sale"}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-gray-dark leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy mb-4">Location map</h2>
              <div className="w-full h-64 rounded-2xl overflow-hidden">
                <iframe
                  title={`${property.title} Location`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-navy mb-6">
                ₦{property.price.toLocaleString()}
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full bg-navy text-white py-3 rounded-full text-sm font-semibold text-center hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <Link
                  href="/contact"
                  className="w-full border-2 border-navy text-navy py-3 rounded-full text-sm font-semibold text-center hover:bg-navy hover:text-white transition-colors"
                >
                  Schedule Visit
                </Link>
                {property.brochureUrl && (
                  <a
                    href={property.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-navy text-navy py-3 rounded-full text-sm font-semibold text-center hover:bg-navy hover:text-white transition-colors"
                  >
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
