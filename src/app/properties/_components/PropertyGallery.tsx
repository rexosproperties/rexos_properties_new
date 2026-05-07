"use client";

import Image from "next/image";
import { useState } from "react";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden mb-4 bg-gray-100" />
    );
  }

  return (
    <>
      <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden mb-4">
        <Image
          src={images[active]}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(index)}
              className={`relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                active === index ? "border-navy" : "border-transparent"
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
      )}
    </>
  );
}
