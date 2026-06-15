import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAboutContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [teamMembers, content] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
    getAboutContent(),
  ]);
  return (
    <>
      {/* Page Banner */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/assets/images/blog-3.png"
          alt={content.bannerHeading}
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
            {content.bannerHeading}
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 text-gray-dark leading-relaxed">
          {content.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              Our Vision
            </h2>
            <p className="text-gray-dark leading-relaxed">{content.vision}</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              Our Mission
            </h2>
            <p className="text-gray-dark leading-relaxed">{content.mission}</p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-3">
              {content.teamHeading}
            </h2>
            <p className="text-gray-dark">{content.teamSubtext}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                  {member.imageUrl && (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-base font-bold text-navy">{member.name}</h3>
                <p className="text-sm text-gray-dark">{member.role}</p>
                {member.bio && (
                  <p className="text-xs text-gray-dark mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
