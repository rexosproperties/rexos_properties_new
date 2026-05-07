import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConditionalChrome from "@/components/layout/ConditionalChrome";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Rex'o's Properties | Luxury Homes & Real Estate in Lagos",
  description:
    "Building premium luxury homes in Lagos. Property investment, sales, and development by Rex'o's Properties.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --color-navy: ${settings.brandColor}; --color-navy-light: ${settings.brandColor}; --color-navy-dark: ${settings.brandColor}; --color-blue-steel: ${settings.brandColor}; --color-foreground: ${settings.brandColor}; }`,
          }}
        />
      </head>
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
      </body>
    </html>
  );
}
