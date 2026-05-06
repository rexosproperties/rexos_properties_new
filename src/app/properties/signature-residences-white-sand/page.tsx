"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/assets/images/estate-2.png",
  "/assets/images/whitesand1.png",
  "/assets/images/whitesand2.png",
  "/assets/images/whitesand3.png",
  "/assets/images/whitesand4.png",
];

const features = [
  {
    text: "Contemporary homes with indoor lighting",
    icon: "/assets/images/Icon/cbi_rooms-bedroom.png",
  },
  {
    text: "Balcony access from all living areas",
    icon: "/assets/images/Icon/cbi_rooms-balcony.png",
  },
  {
    text: "Open concept kitchen with modern fixtures",
    icon: "/assets/images/Icon/mdi_kitchen-counter.png",
  },
  {
    text: "All rooms en-suite with contemporary bathrooms",
    icon: "/assets/images/Icon/cbi_rooms-bathroom.png",
  },
  {
    text: "Fully terraced roofs",
    icon: "/assets/images/Icon/ph_solar-roof-fill.png",
  },
  {
    text: "24/7 power infrastructure provision",
    icon: "/assets/images/Icon/healthicons_electricity.png",
  },
  {
    text: "Clean running water",
    icon: "/assets/images/Icon/temaki_water-tap-drinkable.png",
  },
  {
    text: "Solar-powered street lighting",
    icon: "/assets/images/Icon/ic_baseline-solar-power.png",
  },
  {
    text: "Professional 24/7 security surveillance",
    icon: "/assets/images/Icon/boxicons_cctv-filled.png",
  },
  {
    text: "Facility Management",
    icon: "/assets/images/Icon/fluent-emoji-high-contrast_office-building.png",
  },
  {
    text: "Ample parking space",
    icon: "/assets/images/Icon/material-symbols_parking-sign-sharp.png",
  },
  {
    text: "Fully-equipped resident gym",
    icon: "/assets/images/Icon/mdi_gym.png",
  },
  {
    text: "Strategically located in the heart of Lekki",
    icon: "/assets/images/Icon/mdi_map-marker-distance.png",
  },
  {
    text: "Close to top schools, hospitals, and shopping",
    icon: "/assets/images/Icon/game-icons_path-distance.png",
  },
  {
    text: "Excellent road network to Lekki-Epe Expressway",
    icon: "/assets/images/Icon/healthicons_paved-road.png",
  },
  {
    text: "Peaceful, serene environment for families",
    icon: "/assets/images/Icon/material-symbols_nature-people-rounded.png",
  },
  {
    text: "Growing investment potential in developing area",
    icon: "/assets/images/Icon/garden_growth-chart-fill-12.png",
  },
];

export default function WhiteSandPage() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-dark">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/properties"
            className="hover:text-navy transition-colors"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="text-navy font-medium">White Sand Beach Estate</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden mb-4">
              <Image
                src={images[activeImage]}
                alt="White Sand Beach Estate"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mb-8 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === index ? "border-navy" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Title & Location */}
            <h1 className="text-2xl lg:text-3xl font-bold text-navy mb-2">
              Rex&apos;o&apos;s Signature Residences (White Sand Beach Estate)
            </h1>
            <div className="flex items-center gap-1 text-sm text-gray-dark mb-4">
              <Image
                src="/assets/images/Icon/Location Icon.svg"
                alt="Location"
                width={14}
                height={14}
              />
              <span>White Sand Beach Estate, Ologolo Lekki, Lagos.</span>
            </div>

            {/* Amenity Icons */}
            <div className="flex items-center gap-4 text-sm text-gray-dark mb-8 pb-8 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/Bedrooms.svg"
                  alt="Bedrooms"
                  width={18}
                  height={18}
                />
                1
              </span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/living room.svg"
                  alt="Living Room"
                  width={18}
                  height={18}
                />
                1
              </span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/Dining area.svg"
                  alt="Dining Area"
                  width={18}
                  height={18}
                />
                1
              </span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/bathroom.svg"
                  alt="Bathrooms"
                  width={18}
                  height={18}
                />
                2
              </span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/assets/images/Icon/kitchen.svg"
                  alt="Kitchen"
                  width={18}
                  height={18}
                />
                2
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-dark leading-relaxed">
                Rex&apos;o&apos;s Signature Residences, White Sand Beach Estate,
                Ologolo Lekki, Lagos. A Private Estate Contemporary 3-bedroom
                masterpieces. Rex&apos;o&apos;s Signature Residences at White
                Sand Beach Estate are defined by refined details, sophisticated
                maximalism. Rex&apos;o&apos;s Signature Residences is defined by
                a discerning few who seek more than an address. Each home is
                carefully balanced within the many &amp; rich artistic interiors
                of White Sand Beach Estate, Ologolo Lagos. Clean lines &amp;
                fluid surfaces combined with a remarkable combination of
                gracious modern design, impeccable finishes, and premium
                finishes come together to create spaces that resonate with
                sensory architectural design finesse, seamless functionality,
                and the energy of Lekki&apos;s emerging affluent.
                Rex&apos;o&apos;s Properties offers not just a place to live,
                but a foundation for legacy in one of Lekki&apos;s most coveted
                residence services.
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4">
                Key Features and Amenities:
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-dark"
                  >
                    <Image
                      src={feature.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Map */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-4">Location map</h2>
              <div className="w-full h-64 rounded-2xl overflow-hidden">
                <iframe
                  title="White Sand Beach Estate Location"
                  src="https://maps.google.com/maps?q=Ologolo+Lekki+Lagos&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Sticky Price Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-navy mb-6">₦200,000,000</p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full bg-navy text-white py-3 rounded-full text-sm font-semibold text-center hover:bg-navy-dark transition-colors"
                >
                  Contact Us
                </Link>
                <button
                  type="button"
                  className="w-full border-2 border-navy text-navy py-3 rounded-full text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Schedule Visit
                </button>
                <button
                  type="button"
                  className="w-full border-2 border-navy text-navy py-3 rounded-full text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
