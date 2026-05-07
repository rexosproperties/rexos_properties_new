"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createTeamMember,
  updateTeamMember,
  type TeamMemberInput,
} from "../_actions";

interface ExistingMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  bio: string | null;
  order: number;
}

async function uploadAvatar(file: File): Promise<string> {
  const sigRes = await fetch("/api/admin/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "team" }),
  });
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
  if (!uploadRes.ok) throw new Error("Upload failed");
  const result = await uploadRes.json();
  return result.secure_url as string;
}

export default function TeamForm({ member }: { member?: ExistingMember }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(member?.name ?? "");
  const [role, setRole] = useState(member?.role ?? "");
  const [bio, setBio] = useState(member?.bio ?? "");
  const [imageUrl, setImageUrl] = useState(member?.imageUrl ?? "");
  const [order, setOrder] = useState(member?.order?.toString() ?? "0");

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
    const input: TeamMemberInput = {
      name: name.trim(),
      role: role.trim(),
      imageUrl: imageUrl || null,
      bio: bio.trim() || null,
      order: Number(order) || 0,
    };
    if (!input.name || !input.role) {
      setError("Name and role are required.");
      return;
    }
    startTransition(async () => {
      try {
        if (member) {
          await updateTeamMember(member.id, input);
          router.refresh();
        } else {
          await createTeamMember(input);
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
            Role *
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            placeholder="e.g. CEO, Project Manager"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Optional short bio"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Display order{" "}
            <span className="text-gray-dark font-normal">
              (lower numbers show first)
            </span>
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Photo
        </h2>
        {imageUrl ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={name || "Team member"}
              className="w-32 h-32 rounded-xl object-cover border border-gray-200"
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
            {uploading ? "Uploading..." : "+ Upload photo"}
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
          {pending ? "Saving..." : member ? "Save Changes" : "Add Member"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/team")}
          className="border border-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
