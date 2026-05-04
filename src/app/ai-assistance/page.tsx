"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";

interface Agent {
  id: number;
  name: string;
  role: string;
  specialization: string;
  phone: string;
  email: string;
  avatar: string;
  bio: string;
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Segun Adeyemi",
    role: "Senior Real Estate Agent",
    specialization: "Lekki Phase 1 & Ikoyi",
    phone: "+234 801 234 5678",
    email: "segun@rexosproperties.com",
    avatar: "/assets/images/Avatar/agent-1.jpg",
    bio: "10+ years of experience in luxury property sales",
  },
  {
    id: 2,
    name: "Adekunle Oladele",
    role: "Property Consultant",
    specialization: "Mainland & Off-plan Projects",
    phone: "+234 802 345 6789",
    email: "adekunle@rexosproperties.com",
    avatar: "/assets/images/Avatar/agent-2.jpg",
    bio: "Expert in investment properties and off-plan developments",
  },
  {
    id: 3,
    name: "Chioma Nwankwo",
    role: "Investment Specialist",
    specialization: "Rental Properties & ROI Optimization",
    phone: "+234 803 456 7890",
    email: "chioma@rexosproperties.com",
    avatar: "/assets/images/Avatar/agent-3.jpg",
    bio: "Specializes in high-yield rental properties",
  },
  {
    id: 4,
    name: "Bayo Oluwaseun",
    role: "Luxury Properties Manager",
    specialization: "High-end & Premium Estates",
    phone: "+234 804 567 8901",
    email: "bayo@rexosproperties.com",
    avatar: "/assets/images/Avatar/agent-4.jpg",
    bio: "Manages multi-million naira luxury portfolios",
  },
];

function AIAssistanceContent() {
  const searchParams = useSearchParams();
  const propertyType = searchParams.get("type");
  const priceRange = searchParams.get("price");
  const location = searchParams.get("location");
  const rooms = searchParams.get("rooms");
  const tab = searchParams.get("tab") || "For Sale";
  const sort = searchParams.get("sort") || "Newest";

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      {/* Page Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100 bg-linear-to-br from-navy/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-4">
            Connect With Our Agents
          </h1>
          <p className="text-gray-dark text-base max-w-2xl mx-auto">
            Our expert agents will help you find the perfect property based on
            your preferences. Let us connect you with the right specialist.
          </p>
        </div>
      </section>

      {/* Search Summary */}
      {(propertyType || priceRange || location || rooms) && (
        <section className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-navy mb-4">
                Your Search Criteria
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {propertyType && (
                  <div>
                    <span className="text-xs text-gray font-medium">Type</span>
                    <p className="text-sm font-semibold text-navy-dark">
                      {propertyType}
                    </p>
                  </div>
                )}
                {location && (
                  <div>
                    <span className="text-xs text-gray font-medium">
                      Location
                    </span>
                    <p className="text-sm font-semibold text-navy-dark">
                      {location}
                    </p>
                  </div>
                )}
                {priceRange && (
                  <div>
                    <span className="text-xs text-gray font-medium">
                      Price Range
                    </span>
                    <p className="text-sm font-semibold text-navy-dark">
                      {priceRange}
                    </p>
                  </div>
                )}
                {rooms && (
                  <div>
                    <span className="text-xs text-gray font-medium">Rooms</span>
                    <p className="text-sm font-semibold text-navy-dark">
                      {rooms}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray mt-4">
                Category: <span className="font-semibold text-navy">{tab}</span>{" "}
                • Sort: <span className="font-semibold text-navy">{sort}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Agents Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-navy mb-8">
            Recommended Agents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow hover:border-navy/20"
              >
                {/* Agent Avatar */}
                <div className="bg-linear-to-br from-navy/10 to-navy/5 h-48 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder avatar with initials */}
                  <div className="w-full h-full bg-linear-to-br from-navy/40 to-navy/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/80">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-semibold text-navy/70 mb-3 italic">
                    {agent.role}
                  </p>
                  <p className="text-xs text-gray-dark mb-4 leading-relaxed">
                    {agent.bio}
                  </p>

                  {/* Specialization Badge */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <span className="inline-block bg-navy/10 text-navy text-xs font-medium px-3 py-1.5 rounded-full">
                      {agent.specialization}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-2 text-xs text-gray-dark hover:text-navy transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-2 text-xs text-gray-dark hover:text-navy transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      {agent.email}
                    </a>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsContactFormOpen(true);
                    }}
                    className="w-full bg-navy text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-navy-dark transition-colors"
                  >
                    Connect With {agent.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Properties */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-navy hover:text-navy-dark transition-colors font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Properties
          </Link>
        </div>
      </section>
    </>
  );
}

export default function AIAssistancePage() {
  return (
    <Suspense fallback={null}>
      <AIAssistanceContent />
    </Suspense>
  );
}
