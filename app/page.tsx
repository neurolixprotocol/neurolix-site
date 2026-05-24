import Link from "next/link";
import { HeroLattice } from "@/components/hero-lattice";
import { ProtocolFlowDiagram } from "@/components/protocol-flow-diagram";
import { LoomPlayer } from "@/components/loom-player";
import { LINKS, CONTRACTS, PROOF } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
       <section
       className="relative overflow-hidden min-h-[70vh] md:min-h-[88vh]"
        style={{ borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center" }}
       >
        <HeroLattice />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-24">
          <div style={{ maxWidth: 580 }}>
            <span
              className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
              style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}
            >
              Building in public · Base L2 · Confidential AI
            </span>
            <h1
              className="font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              Confidential AI Compute.<br />
              <span style={{ color: "var(--accent)" }}>Verified On-Chain.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)", maxWidth: 520 }}>
              DePIN infrastructure for AI training and inference on regulated data.
              Hardware-enforced privacy in TEE enclaves, cryptographic attestation anchored to Base L2.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href={LINKS.medium} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm btn-primary">
                Read the documentation
              </a>
              <a href={LINKS.blockscout} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm btn-secondary">
                View on-chain proof →
              </a>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { label: "Attestation contract", value: "Base Mainnet" },
                { label: "TEE hardware", value: "AMD SEV (PoC)" },
                { label: "Contract suite", value: "v1.16 · 52 patches integrated" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              badge: "Privacy",
              title: "Hardware-Enforced",
              body: "AMD SEV-SNP and Intel TDX enclaves isolate AI workloads at silicon level. Node operators cannot read your data. Privacy is a CPU guarantee, not a policy.",
            },
            {
              badge: "Attestation",
              title: "Cryptographically Verified",
              body: "Every compute session emits a hardware-signed attestation report. The commitment hash is anchored on Base L2 before execution. Verifiable forever.",
            },
            {
              badge: "Settlement",
              title: "Trust-Minimized SLA",
              body: "Smart contracts handle session opening, workload commitment, and payment. SLA breaches trigger automatic on-chain slashing. No centralized arbiter.",
            },
          ].map((card) => (
            <div key={card.title} className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span className="inline-block mb-4 text-xs px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}>
                {card.badge}
              </span>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 680 }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>The Problem</p>
          <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Regulated sectors cannot run AI on sensitive data today.
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            No compliant pipeline exists for training AI on protected data — patient records,
            financial transactions, biometric inputs, legal documents. Organizations face a
            binary choice: deploy on public clouds and accept legal exposure, or build
            internal HIPAA/GDPR/MiFID-compliant infrastructure at enterprise capex scale.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Neurolix Protocol provides the missing third option: confidential compute as a
            network primitive, with verifiable cryptographic proof of isolation anchored to
            a public blockchain.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
            The TEE → Attestation → Base L2 loop.
          </h2>
          <ProtocolFlowDiagram />
        </div>
      </section>

      {/* LIVE PROOF */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Live Proof</p>
        <h2 className="text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
          GPT-2 inference inside AMD SEV enclave.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <LoomPlayer />
          <div className="flex flex-col gap-4">
            {[
              { label: "Attestation contract", value: `${CONTRACTS.attestation.slice(0,6)}...${CONTRACTS.attestation.slice(-4)}`, href: LINKS.basescan, badge: "Base Mainnet" },
              { label: "Commitment hash",      value: `${PROOF.commitmentHash.slice(0,8)}...${PROOF.commitmentHash.slice(-6)}`, href: LINKS.blockscout, badge: "SHA-256" },
              { label: "PoC transaction",      value: `${PROOF.sepoliaTx.slice(0,10)}...${PROOF.sepoliaTx.slice(-6)}`,         href: LINKS.blockscout, badge: "Base Sepolia" },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col gap-1.5 p-4 rounded-sm no-underline proof-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}>
                    {item.badge}
                  </span>
                </div>
                <span className="text-sm font-chain" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </span>
              </a>
            ))}
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              PoC build log v4. Three known open mainnet blockers documented publicly.{" "}
              <Link href="/protocol" className="hover-accent" style={{ color: "var(--text-secondary)" }}>
                Read the full threat model →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* BUILD IN PUBLIC */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="mx-auto max-w-[1100px] px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Build on Neurolix</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Technical articles, protocol specifications, and build logs published openly.
            </p>
            <div className="flex flex-col gap-3">
              <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" className="text-sm hover-primary">Read on Medium →</a>
              <a href={LINKS.paragraph} target="_blank" rel="noopener noreferrer" className="text-sm hover-primary">Read on Paragraph →</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Follow the Build</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Updates on protocol development, testnet deployment, and node operator program.
            </p>
            <div className="flex flex-col gap-3">
              <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-sm hover-primary">Follow @NEUROLIX on X →</a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-sm hover-primary">View source on GitHub →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}