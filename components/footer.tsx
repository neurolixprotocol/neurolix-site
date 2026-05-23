import Link from "next/link";
import { LINKS, PROTOCOL } from "@/lib/constants";
import { SocialIcons } from "@/components/social-icons";

const navLinks = [
  { href: "/protocol",   label: "Protocol" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/roadmap",    label: "Roadmap" },
  { href: "/community",  label: "Community" },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex flex-col leading-none gap-0.5 mb-3">
           <span className="text-[18px] font-bold tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
           NEUR<span style={{ color: "var(--accent)" }}>OLIX</span>
            </span>
           <span className="text-[8px] font-semibold tracking-[0.25em] uppercase leading-none" style={{ color: "var(--text-secondary)" }}>
            PROTOCOL
           </span>
           </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              Compliance-ready Confidential AI compute on Base L2. Hardware-enforced privacy for regulated sectors.
            </p>
            <p className="text-xs font-chain" style={{ color: "var(--text-secondary)" }}>
              {PROTOCOL.ens}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-secondary)" }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-secondary)" }}>
              Community
            </p>
            <SocialIcons className="flex flex-col gap-3" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>© 2026 Neurolix Protocol</span>
            <Link href="/terms.html" className="text-xs hover-primary">Terms of Use</Link>
            <Link href="/privacy.html" className="text-xs hover-primary">Privacy Policy</Link>
          </div>

          <a href={LINKS.basescan} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs no-underline font-chain hover-accent" style={{ color: "var(--text-secondary)" }}>
            <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)", animation: "livePing 2.5s ease-in-out infinite" }} />
            <span>NeurolixAttestation</span>
            <span style={{ color: "var(--accent)" }}>· Base Mainnet</span>
          </a>
        </div>

      </div>
    </footer>
  );
}