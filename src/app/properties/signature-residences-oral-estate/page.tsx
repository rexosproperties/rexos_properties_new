"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featureIcons } from "@/components/sections/featureIcons";

const images = [
  "/assets/images/estate-1.png",
  "/assets/images/oral-1.png",
  "/assets/images/oral-2.png",
  "/assets/images/oral-3.png",
  "/assets/images/oral-4.png",
];

// Features are now imported from featureIcons for icon mapping

export default function OralEstatePage() {
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
          <span className="text-navy font-medium">Oral Estate</span>
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
                alt="Oral Estate"
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
              Rex&apos;o&apos;s Signature Residences (Oral Estate)
            </h1>
            <div className="flex items-center gap-1 text-sm text-gray-dark mb-4">
              <Image
                src="/assets/images/Icon/Location Icon.svg"
                alt="Location"
                width={14}
                height={14}
              />
              <span>Oral Estate, Chevron-Toll Gate, Lekki, Lagos.</span>
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
              <p className="text-gray-dark leading-relaxed mb-4">
                A Priority Collection by Rex&apos;o&apos;s Properties. An
                exclusive offering of just twelve contemporary 3-bedroom
                masterpieces. Rex&apos;o&apos;s Signature Residences at Oral
                Estate are set to stand out by intention. Each home is a
                thoughtfully composed in the discerning few who seek more than
                an address. If you were a carefully detailed finished with the
                many &amp; rich artistic interiors of Oral Estate, Lekki, the
                limited collection on borders, attainments elegance. Clean and
                fluid outlines, intuitive layouts, and premium finishes work
                together to create spaces that resonate with architectural
                design finesse, seamless functionality, and a genuine emotion to
                modern contemporary design. Rex&apos;o&apos;s Properties offers
                not just a place to live, but a foundation for legacy in one of
                Lekki&apos;s most coveted residence services.
              </p>
            </div>

            {/* Project Features */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4">
                Key Features and Amenities:
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                {featureIcons.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-dark"
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Map */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-4">Location map</h2>
              <div className="w-full h-64 rounded-2xl overflow-hidden">
                <iframe
                  title="Oral Estate Location"
                  src="https://maps.google.com/maps?q=Oral+Estate+Lekki+Lagos&output=embed"
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
