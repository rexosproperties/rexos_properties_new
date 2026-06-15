/**
 * Homepage
 *
 * This is the main entry point — the "/" route.
 * It assembles all the homepage sections in order.
 *
 * Each section is its own component in /components/sections/.
 * This makes the code modular: easy to reorder, edit, or replace sections
 * without touching other parts of the page.
 */

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import LatestProjects from "@/components/sections/LatestProjects";
import Milestones from "@/components/sections/Milestones";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import BlogPreview from "@/components/sections/BlogPreview";
import { getHomeContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <Services services={content.services} />
      <LatestProjects />
      <Milestones content={content.milestones} />
      <Testimonials />
      <FAQ content={content.faq} />
      <Newsletter />
      <BlogPreview />
    </>
  );
}
