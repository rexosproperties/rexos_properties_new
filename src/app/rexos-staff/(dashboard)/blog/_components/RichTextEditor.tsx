"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
        active
          ? "bg-navy text-white"
          : "text-gray-dark hover:bg-gray-100 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

async function uploadInlineImage(file: File): Promise<string> {
  const sigRes = await fetch("/api/rexos-staff/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "blog" }),
  });
  if (!sigRes.ok) throw new Error("Could not get upload signature");
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

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg my-4 max-w-full h-auto",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&>*]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-navy [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-navy [&_blockquote]:pl-4 [&_blockquote]:italic",
      },
    },
  });

  useEffect(() => setMounted(true), []);

  if (!mounted || !editor) {
    return (
      <div className="border border-gray-200 rounded-lg min-h-[400px] bg-gray-50 animate-pulse" />
    );
  }

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadInlineImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Image upload failed");
      }
    };
    input.click();
  };

  const insertLink = () => {
    const url = window.prompt("URL");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
          title="Paragraph"
        >
          P
        </ToolbarButton>
        <span className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </ToolbarButton>
        <span className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          “”
        </ToolbarButton>
        <span className="w-px bg-gray-300 mx-1" />
        <ToolbarButton onClick={insertLink} title="Insert Link">
          🔗
        </ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insert Image">
          🖼️
        </ToolbarButton>
        <span className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          ↷
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
