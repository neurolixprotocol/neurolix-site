import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import { SocialIcons } from "@/components/social-icons";

export const metadata: Metadata = {
  title: "Community",
  description: "Follow the Neurolix Protocol build. X, Medium, Paragraph, GitHub, and contact.",
};

export default function CommunityPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          Building in public
        </span>
        <h1 className="text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Community</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: 560 }}>
          Neurolix Protocol is built in public. Every architectural decision,
          audit finding, and protocol update is published openly.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Documentation */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--text-secondary)" }}>Documentation</p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Build log — Day 7 field report", href: LINKS.medium, platform: "Medium" },
                { label: "Protocol articles and technical posts", href: LINKS.paragraph, platform: "Paragraph" },
                { label: "Source code and contracts", href: LINKS.github, platform: "GitHub" },
              ].map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="proof-card flex items-center justify-between p-4 rounded-sm no-underline group">
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>{link.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{link.platform}</p>
                  </div>
                  <span className="text-sm" style={{ color: "var(--accent)" }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--text-secondary)" }}>Follow</p>
            <SocialIcons className="flex flex-col gap-4" />

            <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-secondary)" }}>Contact</p>
              <a href={`mailto:${LINKS.email}`}
                className="text-sm hover-primary" style={{ color: "var(--text-secondary)" }}>
                {LINKS.email}
              </a>
              <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
                For regulated-sector inquiries, enterprise pilot program, and node operator applications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}