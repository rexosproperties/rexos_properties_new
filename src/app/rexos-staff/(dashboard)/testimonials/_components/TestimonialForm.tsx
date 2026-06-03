"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  updateTestimonial,
  type TestimonialInput,
} from "../_actions";

interface ExistingTestimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  imageUrl: string | null;
  rating: number;
  order: number;
}

async function uploadAvatar(file: File): Promise<string> {
  const sigRes = await fetch("/api/rexos-staff/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "testimonials" }),
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

export default function TestimonialForm({
  testimonial,
}: {
  testimonial?: ExistingTestimonial;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(testimonial?.name ?? "");
  const [role, setRole] = useState(testimonial?.role ?? "");
  const [content, setContent] = useState(testimonial?.content ?? "");
  const [imageUrl, setImageUrl] = useState(testimonial?.imageUrl ?? "");
  const [rating, setRating] = useState(testimonial?.rating?.toString() ?? "5");
  const [order, setOrder] = useState(testimonial?.order?.toString() ?? "0");

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadAvatar(file);
      setImageUrl(url);
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
    const input: TestimonialInput = {
      name: name.trim(),
      role: role.trim() || null,
      content: content.trim(),
      imageUrl: imageUrl || null,
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      order: Number(order) || 0,
    };
    if (!input.name || !input.content) {
      setError("Name and content are required.");
      return;
    }
    startTransition(async () => {
      try {
        if (testimonial) {
          await updateTestimonial(testimonial.id, input);
          router.refresh();
        } else {
          await createTestimonial(input);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Role / company{" "}
            <span className="text-gray-dark font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Investor, Architect, etc."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Testimonial *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            placeholder="What did the client say?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Rating (1–5)
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Display order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Avatar
        </h2>
        {imageUrl ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={name || "Avatar"}
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-dark cursor-pointer hover:border-navy hover:text-navy transition-colors">
            {uploading ? "Uploading..." : "+ Upload avatar"}
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {pending
            ? "Saving..."
            : testimonial
              ? "Save Changes"
              : "Add Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/rexos-staff/testimonials")}
          className="border border-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
