"use client";

import { useState, useTransition } from "react";
import { changePassword } from "../_actions";

export default function ChangePasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      const res = await changePassword({ currentPassword, newPassword });
      if (!res.ok) {
        setError(res.error || "Could not change password.");
        return;
      }
      setSuccess("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(""), 4000);
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 max-w-3xl"
    >
      <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
        Change Password
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-navy mb-1">
          Current password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
          <p className="text-xs text-gray-dark mt-1">At least 8 characters.</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {pending ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
