"use client";

import { useState } from "react";
import type { HomeContent } from "@/lib/page-content";

/**
 * FAQ Section
 *
 * Uses an accordion pattern: clicking a question expands/collapses its answer.
 * "use client" needed for the toggle state.
 *
 * Heading, description and items are editable from admin (Page Content → Home).
 */

export default function FAQ({ content }: { content: HomeContent["faq"] }) {
  const faqs = content.items;
  // Track which FAQ item is currently open. null means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    // If clicking the already-open item, close it. Otherwise, open the clicked item.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Title & Description */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-4 font-sans">
              {content.heading}
            </h2>
            <p className="text-gray-dark leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-lg font-semibold text-navy italic">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-navy shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                {/* Collapsible Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-dark text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
