"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks page views for public-facing pages only.
 * Fires a POST to /api/analytics/pageview on each route change.
 * Skips admin pages (/rexos-staff/*).
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/rexos-staff")) return;

    // Avoid double-firing on strict mode remount
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {
      // Silently fail — analytics shouldn't disrupt UX
    });
  }, [pathname]);

  return null; // renders nothing
}
