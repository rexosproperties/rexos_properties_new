import Image from "next/image";
import type { HomeContent } from "@/lib/page-content";

// Icons stay paired to each card slot by position.
const serviceIcons = [
  "/assets/images/Icon/ser-1.svg",
  "/assets/images/Icon/ser-2.svg",
  "/assets/images/Icon/ser-3.svg",
];

export default function Services({
  services,
}: {
  services: HomeContent["services"];
}) {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-navy text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-40 h-40 mb-6">
                <Image
                  src={serviceIcons[i % serviceIcons.length]}
                  alt={service.title}
                  width={192}
                  height={192}
                  className="w-full h-full"
                />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-navy mb-3">
                {service.title}
              </h3>
              <p className="text-gray-dark text-[15px] leading-relaxed max-w-70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
