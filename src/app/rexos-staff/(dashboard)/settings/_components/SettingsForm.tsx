"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "../_actions";
import type { SiteSettings } from "@/lib/site-settings";

async function uploadLogo(file: File): Promise<string> {
  const sigRes = await fetch("/api/rexos-staff/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "site" }),
  });
  if (!sigRes.ok) {
    const errBody = await sigRes.json().catch(() => ({ error: sigRes.statusText }));
    throw new Error(`Could not get upload signature: ${errBody.error ?? sigRes.statusText} (${sigRes.status})`);
  }
  const { timestamp, signature, folder, apiKey, cloudName } =
    await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`Upload failed: ${text}`);
  }
  const result = await uploadRes.json();
  return result.secure_url as string;
}

export default function SettingsForm({
  initial,
}: {
  initial: SiteSettings;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const [s, setS] = useState<SiteSettings>(initial);

  const update = <K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) => setS((prev) => ({ ...prev, [key]: value }));

  const onLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadLogo(file);
      update("logoUrl", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        await updateSettings(s);
        setSuccess("Settings saved.");
        router.refresh();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Brand
        </h2>

        <div>
          <label className="block text-xs font-semibold text-navy mb-2">
            Logo
          </label>
          {s.logoUrl ? (
            <div className="flex items-center gap-4">
              <div className="bg-navy p-3 rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.logoUrl}
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => update("logoUrl", null)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-dark cursor-pointer hover:border-navy hover:text-navy transition-colors">
              {uploading ? "Uploading..." : "+ Upload logo (PNG/SVG)"}
              <input
                type="file"
                accept="image/*"
                onChange={onLogoChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
          <p className="text-xs text-gray-dark mt-2">
            Used in the site header and footer. PNG with transparency or SVG
            recommended.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Brand color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={s.brandColor}
              onChange={(e) => update("brandColor", e.target.value)}
              className="h-10 w-20 rounded cursor-pointer border border-gray-200"
            />
            <input
              type="text"
              value={s.brandColor}
              onChange={(e) => update("brandColor", e.target.value)}
              placeholder="#1A3763"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <p className="text-xs text-gray-dark mt-2">
            Primary navy used across the site (buttons, headings, accents).
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Contact
        </h2>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={s.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234 916 474 2000"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Email
          </label>
          <input
            type="email"
            value={s.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="info@rexosproperties.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            WhatsApp number{" "}
            <span className="text-gray-dark font-normal">
              (digits only, with country code)
            </span>
          </label>
          <input
            type="text"
            value={s.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="+2349164742000"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Office address
          </label>
          <textarea
            value={s.address}
            onChange={(e) => update("address", e.target.value)}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
          <p className="text-xs text-gray-dark mt-1">
            Used on the contact page. The Google Map below it will auto-update
            when you save.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Social Media
        </h2>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Facebook URL
          </label>
          <input
            type="url"
            value={s.facebookUrl}
            onChange={(e) => update("facebookUrl", e.target.value)}
            placeholder="https://facebook.com/..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Instagram URL
          </label>
          <input
            type="url"
            value={s.instagramUrl}
            onChange={(e) => update("instagramUrl", e.target.value)}
            placeholder="https://instagram.com/..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            TikTok URL
          </label>
          <input
            type="url"
            value={s.tiktokUrl}
            onChange={(e) => update("tiktokUrl", e.target.value)}
            placeholder="https://tiktok.com/@..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {pending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
