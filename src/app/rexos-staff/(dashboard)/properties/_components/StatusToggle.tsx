"use client";

import { useTransition } from "react";
import { togglePropertyStatus } from "../_actions";

export default function StatusToggle({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const isSold = status === "sold";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={!isSold}
        aria-label={isSold ? "Mark as For Sale" : "Mark as Sold"}
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await togglePropertyStatus(id);
          })
        }
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
          isSold ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            isSold ? "translate-x-1" : "translate-x-6"
          }`}
        />
      </button>
      <span
        className={`text-xs font-semibold ${
          isSold ? "text-red-700" : "text-green-700"
        }`}
      >
        {isSold ? "Sold" : "For Sale"}
      </span>
    </div>
  );
}
