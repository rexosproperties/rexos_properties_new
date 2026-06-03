import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConditionalChrome from "@/components/layout/ConditionalChrome";
import PageViewTracker from "@/components/ui/PageViewTracker";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const meta: Metadata = {
    title: "Rex'o's Properties | Luxury Homes & Real Estate in Lagos",
    description:
      "Building premium luxury homes in Lagos. Property investment, sales, and development by Rex'o's Properties.",
  };

  // Only override the static app/icon.svg if a custom logo is set in settings
  try {
    const settings = await getSiteSettings();
    if (settings.logoUrl) {
      meta.icons = { icon: settings.logoUrl, apple: settings.logoUrl };
    }
  } catch {
    // Fall back to static icon.svg
  }

  return meta;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const brandVars = {
    "--color-navy": settings.brandColor,
    "--color-navy-light": settings.brandColor,
    "--color-navy-dark": settings.brandColor,
    "--color-blue-steel": settings.brandColor,
    "--color-foreground": settings.brandColor,
  } as React.CSSProperties;

  return (
    <html lang="en" suppressHydrationWarning style={brandVars}>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <ConditionalChrome
          header={<Header settings={settings} />}
          footer={<Footer settings={settings} />}
        >
          {children}
        </ConditionalChrome>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  );
}
