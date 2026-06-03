"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser, updateUser, type UserInput } from "../_actions";
import { adminSections } from "@/lib/permissions";

interface ExistingUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export default function UserForm({ user }: { user?: ExistingUser }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "staff">(
    (user?.role as "owner" | "staff") ?? "staff",
  );
  const [permissions, setPermissions] = useState<string[]>(
    user?.permissions ?? [],
  );

  const togglePermission = (key: string) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const input: UserInput = {
      name: name.trim(),
      email: email.trim(),
      password: password || undefined,
      role,
      permissions,
    };

    if (!user && (!password || password.length < 8)) {
      setError("Password must be at least 8 characters for a new user.");
      return;
    }

    startTransition(async () => {
      const res = user
        ? await updateUser(user.id, input)
        : await createUser(input);
      if (!res.ok) {
        setError(res.error || "Save failed");
        return;
      }
      router.push("/rexos-staff/users");
      router.refresh();
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
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Password {user ? "(leave blank to keep current)" : "*"}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            placeholder={user ? "••••••••" : "At least 8 characters"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
          Access
        </h2>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "owner" | "staff")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            <option value="staff">Staff (limited access)</option>
            <option value="owner">Owner (full access + user management)</option>
          </select>
        </div>

        {role === "staff" ? (
          <div>
            <p className="text-xs font-semibold text-navy mb-2">
              Sections this user can access
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {adminSections.map((section) => (
                <label
                  key={section.key}
                  className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-navy transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={permissions.includes(section.key)}
                    onChange={() => togglePermission(section.key)}
                    className="w-4 h-4"
                  />
                  {section.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-dark mt-2">
              The Dashboard is always visible. Unchecked sections are hidden and
              blocked.
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-dark">
            Owners can access every section, including this user management
            page.
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {pending ? "Saving..." : user ? "Save Changes" : "Create User"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/rexos-staff/users")}
          className="border border-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-dark hover:border-navy hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
