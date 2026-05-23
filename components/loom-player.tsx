"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function LoomPlayer() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={LINKS.loomEmbed}
        className="aspect-video w-full rounded-sm"
        style={{ border: "1px solid var(--border)" }}
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="proof-card aspect-video w-full cursor-pointer rounded-sm flex flex-col items-center justify-center gap-4"
      aria-label="Play demo"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: "var(--accent-dim)",
          border: "1px solid var(--accent)",
        }}
      >
        <Play size={20} color="#00E5FF" />
      </div>
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        GPT-2 inside AMD SEV enclave
      </span>
    </button>
  );
}