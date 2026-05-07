import { getSiteSettings } from "@/lib/site-settings";
import ContactClient from "./_components/ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient settings={settings} />;
}
