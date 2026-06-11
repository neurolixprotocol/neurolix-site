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
      "GPT-2 inference inside AMD SEV enclave on Google Cloud Confidential Computing",
      "Commitment hash anchored on Base Sepolia testnet",
      "NeurolixAttestation.sol live on Base Mainnet",
      "Core smart contract suite at v1.16 — 9 contracts, 52 cumulative patches across 6 cross-LLM adversarial review rounds, 128/128 Foundry tests passing",
    ],
  },
  {
    id: "02",
  title: "Protocol Hardening",
  status: "current",
  items: [
    "ComputeSession.sol — session lifecycle FSM (spec v0.2.2 complete, code generation in progress)",
    "- NeurolixGateway.sol v1.0 — USDC to CCC conversion and take rate routing (8/4/88) — code generated, compile-clean under solc 0.8.20 + optimizer-runs=200, 221 SLOC, awaiting cross-LLM adversarial review on 7 candidate areas",
    "CCCToken.sol — non-transferable Confidential Compute Credit ERC-20",
    "VotingEscrow.sol — IVotes source for Governor (required for governance deployment)",
    "Composability debt audit + deploy dependency refactor (initializeOnce() pattern)"
  ]
},
  {
    id: "03",
    title: "Testnet Deployment",
    status: "next",
   items: [
  "Full v1.16 suite live on Base Sepolia",
  "Bug bounty program — Immunefi (payouts in $OLIX at TGE) + Code4rena or Sherlock community-tier contest",
  "Off-chain monitoring infrastructure — L2 sequencer and TEE vendor health watchers",
  "Public testnet open for node operator onboarding",
   ],
  },
  {
    id: "04",
    title: "External Audit & Capped Mainnet",
    status: "future",
    items: [
      "Paid external smart contract audit (Trail of Bits / Spearbit class)",
      "Legal compliance review — MiCA + GDPR with external counsel",
      "Capped mainnet deployment — $100K USDC initial cap",
      "Progressive cap expansion based on operational telemetry",
    ],
  },
  {
    id: "05",
    title: "Token Launch & Multi-Cloud",
    status: "future",
    items: [
      "Public tokenomics whitepaper (published prior to launch)",
      "$OLIX mainnet deployment per published distribution schedule",
      "Azure Confidential Computing integration",
      "AWS Nitro Enclaves integration",
    ],
  },
  {
    id: "06",
    title: "GPU Confidential Compute",
    status: "future",
    items: [
      "NVIDIA H100 CC mode — confidential compute for GPU workloads with attestation chain to NVIDIA root of trust",
      "Production-grade LLM inference inside hardware enclaves",
      "Enterprise pilot program for healthcare and finance partners",
    ],
  },
  {
    id: "07",
    title: "General Availability",
    status: "future",
    items: [
      "Permissionless node onboarding (no whitelist)",
      "Public SDK and developer documentation",
      "Open network operations",
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
      {/* 1. AGGIUNGI QUESTO BLOCCO HERO CENTRATO */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 text-center flex flex-col items-center" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          No dates — sequential milestones
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: "var(--text-primary)" }}>
          Roadmap
        </h1>
        <p className="text-lg leading-relaxed max-w-[620px]" style={{ color: "var(--text-secondary)" }}>
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