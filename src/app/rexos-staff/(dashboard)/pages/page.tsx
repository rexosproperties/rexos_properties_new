import { getHomeContent, getAboutContent } from "@/lib/page-content";
import PageContentEditor from "./_components/PageContentEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Page Content</h1>
      <p className="text-gray-dark text-sm mb-8">
        Edit the static text on the public Home and About Us pages. Changes save
        immediately.
      </p>
      <PageContentEditor home={home} about={about} />
    </div>
  );
}
