"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function LoomPlayer() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={`${LINKS.loomEmbed}?autoplay=1`}
          className="w-full h-full rounded-sm"
          style={{ border: "1px solid var(--border)" }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setLoaded(true)}
        className="group relative aspect-video w-full cursor-pointer rounded-sm proof-card"
        style={{ display: "block" }}
        aria-label="Play Neurolix Protocol demo"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
            style={{
              backgroundColor: "var(--accent-dim)",
              border: "1px solid var(--accent)",
            }}
          >
            <Play size={20} style={{ fill: "var(--accent)", color: "var(--accent)" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            GPT-2 inside AMD SEV enclave · live demo
          </p>
        </div>
        <div className="absolute bottom-3 right-4">
          <span className="text-xs font-chain" style={{ color: "var(--text-secondary)" }}>
            Loom · ~1 min
          </span>
        </div>
      </button>
      
        href={LINKS.loomShare}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs hover-primary text-center"
      >
        Watch on Loom →
      </a>
    </div>
  );
}