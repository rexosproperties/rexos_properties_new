import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  { name: "Albert Okala", role: "CEO" },
  { name: "Damilola Dyedayo", role: "Project Manager" },
  { name: "Emmanuel Effong", role: "Marketing Manager" },
  { name: "Amarachi Anyaoku", role: "Sales Manager" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Banner */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/assets/images/blog-3.png"
          alt="Building Distinction Since 2019"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">
            Building Distinction Since 2019
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 text-gray-dark leading-relaxed">
          <p>
            Established in 2019, Rex&apos;o&apos;s Properties is defined by a
            commitment to refined living and enduring quality. Since inception,
            the company has delivered a portfolio of premium residential
            properties distinguished by thoughtful design and meticulous
            execution.
          </p>
          <p>
            Our approach is deliberate and disciplined. From site selection to
            architectural detailing, every element is carefully considered to
            ensure cohesion, elegance, and functionality. We believe that true
            quality lies in precision: in balanced proportions, enduring
            materials, and spaces designed for contemporary living.
          </p>
          <p>
            At Rex&apos;o&apos;s Properties, excellence is not overstated, it is
            embedded. Each development reflects our dedication to creating
            residences of integrity, comfort, and quiet distinction.
          </p>
          <p>
            At Rex&apos;o&apos;s Properties, our greatest achievement is the
            satisfaction of every client we serve. From first-time homebuyers
            taking their most important financial step, to seasoned investors
            expanding their portfolio — we are committed to delivering
            excellence at every stage of the journey.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              Our Vision
            </h2>
            <p className="text-gray-dark leading-relaxed">
              To become Nigeria&apos;s most trusted real estate partner,
              transforming the property landscape and home at a time.
            </p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              Our Mission
            </h2>
            <p className="text-gray-dark leading-relaxed">
              To provide accessible, quality real estate solutions while
              maintaining the highest standards of trust and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-3">
              Meet Our Team
            </h2>
            <p className="text-gray-dark">
              Real people. Real expertise. Real results—and a commitment to your
              success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                {/* Photo placeholder */}
                <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4" />
                <h3 className="text-base font-bold text-navy">{member.name}</h3>
                <p className="text-sm text-gray-dark">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
