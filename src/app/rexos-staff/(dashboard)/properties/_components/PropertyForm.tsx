"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createProperty,
  updateProperty,
  type PropertyInput,
  type PropertyImageInput,
} from "../_actions";

interface ExistingProperty {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  livingRoom: number;
  diningArea: number;
  kitchen: number;
  area: number | null;
  brochureUrl: string | null;
  featured: boolean;
  features: string[];
  images: { url: string; alt: string | null; order: number }[];
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
}

async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "raw" = "image",
): Promise<CloudinaryUploadResult> {
  const sigRes = await fetch("/api/rexos-staff/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });
  if (!sigRes.ok) {
    const errBody = await sigRes.json().catch(() => ({ error: sigRes.statusText }));
    throw new Error(`Could not get upload signature: ${errBody.error ?? sigRes.statusText} (${sigRes.status})`);
  }
  const { timestamp, signature, folder: signedFolder, apiKey, cloudName } =
    await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", signedFolder);
  fd.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: "POST", body: fd },
  );
  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`Upload failed: ${text}`);
  }
  return uploadRes.json();
}

export default function PropertyForm({
  property,
}: {
  property?: ExistingProperty;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [price, setPrice] = useState(property?.price?.toString() ?? "");
  const [location, setLocation] = useState(property?.location ?? "");
  const [type, setType] = useState<"sale" | "rent">(
    (property?.type as "sale" | "rent") ?? "sale",
  );
  const [status, setStatus] = useState(property?.status ?? "available");
  const [bedrooms, setBedrooms] = useState(
    property?.bedrooms?.toString() ?? "0",
  );
  const [bathrooms, setBathrooms] = useState(
    property?.bathrooms?.toString() ?? "0",
  );
  const [livingRoom, setLivingRoom] = useState(
    property?.livingRoom?.toString() ?? "0",
  );
  const [diningArea, setDiningArea] = useState(
    property?.diningArea?.toString() ?? "0",
  );
  const [kitchen, setKitchen] = useState(
    property?.kitchen?.toString() ?? "0",
  );
  const [area, setArea] = useState(property?.area?.toString() ?? "");
  const [brochureUrl, setBrochureUrl] = useState(property?.brochureUrl ?? "");
  const [featured, setFeatured] = useState(property?.featured ?? false);
  const [features, setFeatures] = useState<string[]>(property?.features ?? []);
  const [featureInput, setFeatureInput] = useState("");
  const [images, setImages] = useState<PropertyImageInput[]>(
    property?.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      order: img.order,
    })) ?? [],
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const uploads = await Promise.all(
        Array.from(files).map((file) =>
          uploadToCloudinary(file, "properties", "image"),
        ),
      );
      setImages((prev) => [
        ...prev,
        ...uploads.map((u, i) => ({
          url: u.secure_url,
          alt: null,
          order: prev.length + i,
        })),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleBrochureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const result = await uploadToCloudinary(file, "brochures", "raw");
      setBrochureUrl(result.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((img, i) => ({ ...img, order: i })),
    );
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((img, i) => ({ ...img, order: i }));
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const input: PropertyInput = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      type,
      status,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      livingRoom: Number(livingRoom) || 0,
      diningArea: Number(diningArea) || 0,
      kitchen: Number(kitchen) || 0,
      area: area ? Number(area) : null,
      brochureUrl: brochureUrl.trim() || null,
      featured,
      features,
      images,
    };

    if (!input.title || !input.description || !input.location) {
      setError("Title, description and location are required.");
      return;
    }
    if (Number.isNaN(input.price)) {
      setError("Price must be a valid number.");
      return;
    }

    startTransition(async () => {
      try {
        if (property) {
          await updateProperty(property.id, input);
          router.refresh();
        } else {
          await createProperty(input);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Basic Info
        </h2>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Slug{" "}
            <span className="text-gray-dark font-normal">
              (auto-generated from title if empty)
            </span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="signature-residences-..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Location *
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Pricing & Type
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Price (₦) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "sale" | "rent")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="off-market">Off Market</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-navy font-semibold">
                Feature on homepage
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Specs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              min="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Living Room
            </label>
            <input
              type="number"
              value={livingRoom}
              onChange={(e) => setLivingRoom(e.target.value)}
              min="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Dining Area
            </label>
            <input
              type="number"
              value={diningArea}
              onChange={(e) => setDiningArea(e.target.value)}
              min="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Kitchen
            </label>
            <input
              type="number"
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              min="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Area (sqm)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              min="0"
              step="0.01"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Key Features &amp; Amenities
        </h2>
        <div className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <span
              key={`${f}-${i}`}
              className="inline-flex items-center gap-2 bg-navy/10 text-navy text-sm px-3 py-1 rounded-full"
            >
              {f}
              <button
                type="button"
                onClick={() =>
                  setFeatures((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="text-navy/60 hover:text-navy font-bold"
                aria-label={`Remove ${f}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const v = featureInput.trim();
                if (v && !features.includes(v)) {
                  setFeatures((prev) => [...prev, v]);
                }
                setFeatureInput("");
              }
            }}
            placeholder="e.g. Swimming Pool, 24/7 Security"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
          <button
            type="button"
            onClick={() => {
              const v = featureInput.trim();
              if (v && !features.includes(v)) {
                setFeatures((prev) => [...prev, v]);
              }
              setFeatureInput("");
            }}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-dark">
          Press Enter or click Add. These appear as a list on the property
          detail page.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Images
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={img.url}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt ?? `Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="bg-white text-navy w-8 h-8 rounded-full font-bold disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  disabled={i === images.length - 1}
                  className="bg-white text-navy w-8 h-8 rounded-full font-bold disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="bg-red-600 text-white w-8 h-8 rounded-full font-bold"
                  title="Remove"
                >
                  ×
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-2 left-2 bg-navy text-white text-xs px-2 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-dark text-xs cursor-pointer hover:border-navy hover:text-navy transition-colors">
            {uploading ? "Uploading..." : "+ Add image(s)"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-dark">
          First image is the cover. Drag to reorder is not yet supported — use ↑
          ↓ buttons.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Brochure (optional)
        </h2>
        {brochureUrl ? (
          <div className="flex items-center gap-3">
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy underline truncate"
            >
              {brochureUrl}
            </a>
            <button
              type="button"
              onClick={() => setBrochureUrl("")}
              className="text-xs text-red-600 hover:underline ml-auto"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-dark cursor-pointer hover:border-navy hover:text-navy transition-colors">
            {uploading ? "Uploading..." : "+ Upload brochure (PDF)"}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleBrochureUpload}
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
            : property
              ? "Save Changes"
              : "Create Property"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/rexos-staff/properties")}
          className="border border-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
