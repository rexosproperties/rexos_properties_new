import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConditionalChrome from "@/components/layout/ConditionalChrome";

/**
 * Root Layout
 *
 * Since we're using local fonts loaded via @font-face in globals.css,
 * we don't need next/font imports here. The fonts are loaded from
 * public/assets/fonts/ — no external requests to Google.
 */

export const metadata: Metadata = {
  title: "Rex'o's Properties | Luxury Homes & Real Estate in Lagos",
  description:
    "Building premium luxury homes in Lagos. Property investment, sales, and development by Rex'o's Properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <ConditionalChrome header={<Header />} footer={<Footer />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
