import Link from "next/link";
import BlogForm from "../_components/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link
        href="/rexos-staff/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-dark hover:text-navy mb-6"
      >
        ← All posts
      </Link>
      <h1 className="text-3xl font-bold text-navy mb-6">New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
