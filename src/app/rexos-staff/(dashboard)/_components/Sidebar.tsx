"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { adminSections } from "@/lib/permissions";

export default function AdminSidebar({
  userEmail,
  role,
  permissions,
}: {
  userEmail: string;
  role: string;
  permissions: string[];
}) {
  const pathname = usePathname();
  const isOwner = role === "owner";

  const sectionItems = adminSections.filter(
    (s) => isOwner || permissions.includes(s.key),
  );

  const navItems = [
    { href: "/rexos-staff", label: "Dashboard" },
    ...sectionItems.map((s) => ({ href: s.href, label: s.label })),
    ...(isOwner
      ? [{ href: "/rexos-staff/users", label: "Users" }]
      : []),
  ];

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-navy text-white flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-xs uppercase tracking-wider text-white/60">Admin</p>
        <h1 className="text-lg font-bold">Rex&apos;o&apos;s Properties</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            item.href === "/rexos-staff"
              ? pathname === "/rexos-staff"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-white/60 truncate">{userEmail}</p>
        <p className="text-xs text-white/40 mb-2 capitalize">{role}</p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/rexos-staff/login" })}
          className="text-xs text-white/80 hover:text-white underline"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
