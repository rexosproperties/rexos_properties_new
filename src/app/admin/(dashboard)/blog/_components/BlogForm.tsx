"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createBlogPost,
  updateBlogPost,
  type BlogPostInput,
} from "../_actions";
import RichTextEditor from "./RichTextEditor";

interface ExistingPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  published: boolean;
}

async function uploadCover(file: File): Promise<string> {
  const sigRes = await fetch("/api/admin/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "blog" }),
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

export default function BlogForm({ post }: { post?: ExistingPost }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? "");
  const [published, setPublished] = useState(post?.published ?? false);

  const onCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadCover(file);
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
    const input: BlogPostInput = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim(),
      content: content.trim(),
      imageUrl: imageUrl || null,
      published,
    };
    if (!input.title || !input.content) {
      setError("Title and content are required.");
      return;
    }
    startTransition(async () => {
      try {
        if (post) {
          await updateBlogPost(post.id, input);
          router.refresh();
        } else {
          await createBlogPost(input);
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
              (auto from title if empty)
            </span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-post-slug"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Short summary shown on the listing page"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-navy font-semibold">Published</span>
          <span className="text-xs text-gray-dark">
            (unpublished posts are hidden from the public site)
          </span>
        </label>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Cover Image
        </h2>
        {imageUrl ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Cover"
              className="rounded-lg max-h-48 border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full font-bold text-sm"
            >
              ×
            </button>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-dark cursor-pointer hover:border-navy hover:text-navy transition-colors">
            {uploading ? "Uploading..." : "+ Upload cover image"}
            <input
              type="file"
              accept="image/*"
              onChange={onCoverChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Content *
        </h2>
        <RichTextEditor value={content} onChange={setContent} />
        <p className="text-xs text-gray-dark">
          Use the toolbar to format. Inline images upload directly to Cloudinary.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {pending ? "Saving..." : post ? "Save Changes" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="border border-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
