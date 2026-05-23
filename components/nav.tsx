"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/protocol",   label: "Protocol" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/roadmap",    label: "Roadmap" },
  { href: "/community",  label: "Community" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(10, 14, 26, 0.88)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-col no-underline leading-none" style={{ color: "var(--text-primary)" }}>
           <span className="text-[18px] font-bold tracking-tight">
           NEUR<span style={{ color: "var(--accent)" }}>OLIX</span>
          </span>
          <span className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: "var(--text-secondary)" }}>
          PROTOCOL
         </span>
         </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm hover-primary">
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 cursor-pointer"
            style={{ background: "none", border: "none", color: "var(--text-secondary)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden flex flex-col py-4 gap-1"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm hover-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}