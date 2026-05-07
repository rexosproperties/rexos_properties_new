import Image from "next/image";

const services = [
  {
    title: "Property Investment",
    description: "Master-planned property development with modern amenities.",
    icon: "/assets/images/Icon/ser-1.svg",
  },
  {
    title: "Property Sale",
    description:
      "Discover luxury homes for sale in Lekki and prime investment opportunities.",
    icon: "/assets/images/Icon/ser-2.svg",
  },
  {
    title: "Property Development",
    description:
      "End-to-end property development in Nigeria, from concept to handover.",
    icon: "/assets/images/Icon/ser-3.svg",
  },
];

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "33+", label: "Homes Successfully Delivered" },
  { value: "95%", label: "Client Satisfaction Rate" },
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-navy">
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-navy/50 mb-4">
            Our Services
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight">
            Designed to Deliver Better Property Outcomes
          </h1>
          <p className="mt-4 text-base text-gray-dark max-w-2xl mx-auto leading-relaxed">
            We deliver real estate services designed to remove uncertainty and
            create confident decisions.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[28px] bg-white border border-slate-200 shadow-[0_20px_60px_rgba(79,93,130,0.08)] p-10 text-center"
            >
              <div className="mx-auto mb-6 w-40 h-40">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={160}
                  height={160}
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
              <p className="text-sm text-gray-dark leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-navy/50 mb-4">
                Building Trust
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy leading-tight">
                Building Trust Through Smarter Property Decisions
              </h2>
              <p className="mt-5 text-base text-gray-dark leading-relaxed max-w-2xl">
                We deliver real estate services designed to remove uncertainty
                and create confident decisions. From investment advisory to
                development delivery, every interaction is founded on
                transparency, quality, and long-term value.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl bg-slate-100 p-6 text-center"
                >
                  <p className="text-3xl font-bold text-navy mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-dark">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(79,93,130,0.12)] w-full order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/images/ser-1.png"
                alt="Property Investment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-navy/50">
              Property Excellence
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy leading-tight">
              A smarter approach to investment, sales and development
            </h2>
            <p className="text-base text-gray-dark leading-relaxed max-w-2xl">
              Our expert team blends local knowledge with international
              standards to deliver projects that perform. Every stage is managed
              to minimize risk and maximize returns for investors, homeowners
              and communities.
            </p>
          </div>

          <div className="rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(79,93,130,0.12)] w-full order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/images/ser-2.png"
                alt="Property Sale"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
