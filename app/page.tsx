import Link from "next/link";
import NeurolixVisualizer from "@/components/neurolix-visualizer";

export default function HomePage() {
  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
      
      {/* 1. HERO & SCROLL TELLING (Il canvas anima lo sfondo e guida la narrativa) */}
      <NeurolixVisualizer />

      {/* 2. STATS INFO (Arrivano successivamente, come richiesto) */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 md:py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Attestation contract", value: "Base Mainnet" },
            { label: "TEE hardware", value: "AMD SEV (PoC)" },
            { label: "Contract suite", value: "v1.16 · 16 contracts" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xs mb-1 font-mono uppercase tracking-[2px]" style={{ color: "var(--accent)" }}>{s.label}</p>
              <p className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 md:py-24" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div key={card.title} className="p-8 rounded-xl"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span className="inline-block mb-5 text-[10px] px-3 py-1.5 rounded-[4px] font-mono tracking-widest uppercase"
                style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}>
                {card.badge}
              </span>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE PROBLEM & SOLUTION */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              The Problem
            </p>
            <h2 className="text-3xl md:text-[40px] leading-[1.15] font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Regulated sectors cannot run AI on sensitive data today.
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              No compliant pipeline exists for training AI on highly protected datasets—from clinical trials and patient genomes to non-public financial records and legal archives. 
              Organizations face a binary choice: deploy on public clouds and accept legal exposure, 
              or build internal HIPAA/GDPR/MiFID-compliant infrastructure at enterprise capex scale.
            </p>
          </div>

          <div className="pl-6 md:pl-8 border-l-[3px]" style={{ borderColor: "var(--accent)" }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              The Solution
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-primary)" }}>
              <strong>Neurolix Protocol delivers the missing third option:</strong> confidential compute as a network primitive. By anchoring verifiable cryptographic proofs of isolation to a public blockchain, Neurolix enables secure, decentralized AI without data exposure.
            </p>
          </div>

        </div>
      </section>
      
    </main>
  );
}