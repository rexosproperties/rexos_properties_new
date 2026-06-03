import { getSiteSettings } from "@/lib/site-settings";
import SettingsForm from "./_components/SettingsForm";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Site Settings</h1>
        <p className="text-gray-dark text-sm mb-8">
          These values appear across the public site. Changes save immediately.
        </p>
        <SettingsForm initial={settings} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Account</h2>
        <p className="text-gray-dark text-sm mb-6">
          Update the credentials you use to sign into this admin.
        </p>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
