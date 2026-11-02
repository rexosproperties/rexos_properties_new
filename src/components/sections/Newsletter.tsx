"use client";

import { useState } from "react";

/**
 * Newsletter Section
 *
 * Subscribe button opens a modal containing MailerLite's embedded form
 * (form K9bemY, "Client interest" group). The form div stays mounted in the
 * DOM at all times (just visually hidden) so MailerLite's universal script
 * (loaded in layout.tsx) can find and render it on initial page load —
 * mounting it only after the click would be too late for the script's scan.
 */

export default function Newsletter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-blue-steel py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-sans">
          Join the Rex&apos;o&apos;s Property Community
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-8">
          Subscribe for exclusive property listings, market insights from
          leading real estate developers in Lagos, and expert guidance on
          property investment in Nigeria. Join 5,000+ subscribers getting first
          access to luxury homes in Lekki, off-plan opportunities, and real
          estate trends.
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-white/20 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors"
        >
          Subscribe
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 items-start sm:items-center justify-center overflow-y-auto bg-black/60 p-4 ${
          isOpen ? "flex" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative bg-white rounded-2xl w-full max-w-lg max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden mt-4 sm:mt-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow hover:text-gray-700 hover:bg-gray-100 text-2xl leading-none"
          >
            &times;
          </button>
          <div className="overflow-y-auto p-4 sm:p-6">
            <div className="ml-embedded" data-form="K9bemY" />
          </div>
        </div>
      </div>
    </section>
  );
}
