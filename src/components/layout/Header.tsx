"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site-settings";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/properties", hasDropdown: true },
  { label: "Blog & News", href: "/blog" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc = settings.logoUrl || "/assets/images/Icon/logo-header.svg";

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Rex'o's Properties"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-normal font-heading text-navy hover:text-navy-light transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 bg-navy text-white pl-6 pr-1.5 py-1.5 rounded-full text-sm font-medium hover:bg-navy-dark transition-colors"
          >
            Contact Us
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy font-medium py-2 px-4 rounded-lg hover:bg-gray-light transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 bg-navy text-white pl-6 pr-1.5 py-1.5 rounded-full text-sm font-medium hover:bg-navy-dark transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
