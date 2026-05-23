import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Neurolix Protocol development roadmap. From PoC to mainnet launch, multi-cloud attestation, and general availability.",
};

const phases = [
  {
    id: "01",
    title: "Proof of Concept",
    status: "completed",
    items: [
      "GPT-2 inference inside AMD SEV enclave on Google Cloud",
      "Commitment hash anchored on Base Sepolia",
      "NeurolixAttestation.sol live on Base Mainnet",
      "Six core smart contracts at v1.16 after 17-round adversarial audit",
    ],
  },
  {
    id: "02",
    title: "Protocol Hardening",
    status: "current",
    items: [
      "ComputeSession.sol — bilateral session lifecycle",
      "VotingEscrow.sol — governance vote-escrow",
      "Composability debt audit across all contracts",
      "Foundry test suite at 95%+ line coverage",
    ],
  },
  {
    id: "03",
    title: "Testnet Deployment",
    status: "next",
    items: [
      "Full v1.16 suite live on Base Sepolia",
      "Bug bounty program — Immunefi + GitHub ($2–5K budget)",
      "Community contest — Code4rena / Sherlock",
      "Public testnet for node operators",
    ],
  },
  {
    id: "04",
    title: "External Audit & Capped Mainnet",
    status: "future",
    items: [
      "Paid external smart contract audit (Trail of Bits / Spearbit class)",
      "Capped mainnet deployment — $100K USDC initial cap",
      "Progressive cap expansion based on operational data",
    ],
  },
  {
    id: "05",
    title: "Token Launch & Multi-Cloud",
    status: "future",
    items: [
      "$OLIX mainnet deployment",
      "Public tokenomics whitepaper",
      "Azure Confidential Computing integration",
      "AWS Nitro Enclaves integration",
    ],
  },
  {
    id: "06",
    title: "GPU Confidential Compute",
    status: "future",
    items: [
      "NVIDIA H100 with TEE-IO support",
      "Production-grade LLM inference inside enclaves",
      "Enterprise pilot program — regulated-sector partners",
    ],
  },
  {
    id: "07",
    title: "General Availability",
    status: "future",
    items: [
      "Permissionless node onboarding",
      "Public SDK and developer documentation",
      "Open network — no whitelist required",
    ],
  },
];

const statusConfig = {
  completed: { label: "Completed", color: "var(--success)", bg: "rgba(16,185,129,0.08)" },
  current:   { label: "In Progress", color: "var(--accent)", bg: "var(--accent-dim)" },
  next:      { label: "Next", color: "var(--warning)", bg: "rgba(245,158,11,0.08)" },
  future:    { label: "Planned", color: "var(--text-secondary)", bg: "rgba(255,255,255,0.04)" },
} as const;

export default function RoadmapPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          No dates — sequential milestones
        </span>
        <h1 className="text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Roadmap</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: 560 }}>
          Sequential phases from PoC to general availability. No artificial deadlines —
          each phase unlocks the next based on technical readiness and security gates.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: "var(--border)" }} />

          <div className="flex flex-col gap-10">
            {phases.map((phase) => {
              const cfg = statusConfig[phase.status as keyof typeof statusConfig];
              return (
                <div key={phase.id} className="flex gap-8 md:gap-10">
                  {/* Node */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-chain font-bold z-10"
                      style={{
                        backgroundColor: cfg.bg,
                        border: `1px solid ${cfg.color}`,
                        color: cfg.color,
                      }}>
                      {phase.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {phase.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}` }}>
                        {cfg.label}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--text-secondary)" }}>
                          <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: cfg.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}