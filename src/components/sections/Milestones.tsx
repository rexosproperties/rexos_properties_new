"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/lib/page-content";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Milestones({
  content,
}: {
  content: HomeContent["milestones"];
}) {
  return (
    <section className="bg-blue-steel py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Title + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            {content.heading}
          </h2>
          <p className="text-white/80 leading-relaxed">{content.description}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
