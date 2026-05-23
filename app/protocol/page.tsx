import type { Metadata } from "next";
import { CONTRACTS, PROOF, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Protocol",
  description: "Architecture of Neurolix Protocol. TEE enclaves, cryptographic attestation, on-chain SLA on Base L2. Smart contract suite v1.16.",
};

export default function ProtocolPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          Architecture · v1.16 · Base L2
        </span>
        <h1 className="text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>The Protocol</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: 620 }}>
          Neurolix Protocol is a compliance-ready Confidential AI compute layer on Base L2.
          It combines hardware-isolated TEE enclaves with cryptographic attestation and
          trust-minimized on-chain SLA enforcement.
        </p>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Architecture</p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>How the stack works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Confidential VM",
                body: "AI workloads run inside AMD SEV-SNP or Intel TDX enclaves on Google Cloud Confidential Computing. The CPU enforces memory isolation — neither the cloud provider nor the node operator can access the plaintext data or model inputs.",
                tag: "AMD SEV-SNP · Intel TDX",
              },
              {
                step: "02",
                title: "Hardware Attestation",
                body: "After execution, the CPU generates a cryptographically signed attestation report. The report is verified against the hardware vendor's certificate chain (AMD EPYC root, GCP OIDC) and a commitment hash is derived from the model ID, prompt hash, output hash, and timestamp.",
                tag: "SHA-256 · OIDC",
              },
              {
                step: "03",
                title: "On-Chain Anchoring",
                body: "The commitment hash is submitted to NeurolixAttestation.sol on Base Mainnet. The transaction is immutable and publicly verifiable. The SLA contract enforces payment distribution and slashing conditions based on on-chain state.",
                tag: "Base Mainnet · NeurolixAttestation.sol",
              },
            ].map((card) => (
              <div key={card.step} className="p-6 rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-xs mb-3 font-chain" style={{ color: "var(--accent)" }}>STEP {card.step}</p>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{card.body}</p>
                <span className="text-xs font-chain" style={{ color: "var(--text-secondary)" }}>{card.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART CONTRACT SUITE */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Smart Contracts</p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Contract suite v1.16</h2>
        <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
          17-round cross-LLM adversarial audit cycle. Gemini declared the suite ready for testnet deployment at Round 17.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "NeurolixAttestation.sol", desc: "Commitment hash anchoring. Live on Base Mainnet.", status: "mainnet" },
            { name: "OLIXToken.sol", desc: "ERC-20 utility token. Hard cap 100M. No transfer tax.", status: "pre-testnet" },
            { name: "NodeRegistry.sol", desc: "Node operator registration, staking (min 10K OLIX), slashing.", status: "pre-testnet" },
            { name: "LiquidityVault.sol", desc: "BME buyback and burn mechanics. Counter-cyclical pricing.", status: "pre-testnet" },
            { name: "NeurolixGovernor.sol", desc: "On-chain governance. Technical scope only.", status: "pre-testnet" },
            { name: "PriceOracle.sol", desc: "Triple-feed median oracle with MEV-resistant execution.", status: "pre-testnet" },
          ].map((c) => (
            <div key={c.name} className="flex items-start gap-4 p-4 rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex-1">
                <p className="text-sm font-medium font-chain mb-1" style={{ color: "var(--text-primary)" }}>{c.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c.desc}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  backgroundColor: c.status === "mainnet" ? "var(--accent-dim)" : "rgba(255,255,255,0.05)",
                  color: c.status === "mainnet" ? "var(--accent)" : "var(--text-secondary)",
                  border: `1px solid ${c.status === "mainnet" ? "var(--accent)" : "var(--border)"}`,
                }}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* THREAT MODEL */}
      <section className="mx-auto max-w-[1100px] px-6 py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Transparency</p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Open mainnet blockers</h2>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)", maxWidth: 580 }}>
          We document known security gaps publicly. This is the difference between security theater and actual security.
          These are not deployment blockers for testnet — they are blockers for mainnet token launch.
        </p>
        <div className="flex flex-col gap-4" style={{ maxWidth: 680 }}>
          {[
            {
              id: "01",
              title: "Heartbeat farming",
              desc: "A node can submit heartbeats without a valid workload commitment, gaming uptime rewards. Requires oracle-signed workloadCommitment integration to resolve.",
            },
            {
              id: "02",
              title: "MEV exit during SLA breach",
              desc: "A node operator can front-run a slashing event by calling deregisterNode. Requires a deregisterNode revert check when an active SLA breach is pending.",
            },
            {
              id: "03",
              title: "SLA parameter trust",
              desc: "SLA parameters are currently client-specified without bilateral validation. Requires bilateral client+miner signature on session opening.",
            },
          ].map((issue) => (
            <div key={issue.id} className="flex gap-4 p-5 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span className="text-xs font-chain flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>#{issue.id}</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{issue.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{issue.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ON-CHAIN PROOF */}
      <section className="mx-auto max-w-[1100px] px-6 py-16">
        <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--text-secondary)" }}>On-chain references</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: 680 }}>
          {[
            { label: "Attestation contract", value: `${CONTRACTS.attestation.slice(0,10)}...${CONTRACTS.attestation.slice(-6)}`, href: LINKS.basescan, badge: "Base Mainnet" },
            { label: "Commitment hash", value: `${PROOF.commitmentHash.slice(0,10)}...${PROOF.commitmentHash.slice(-6)}`, href: LINKS.blockscout, badge: "SHA-256" },
          ].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
              className="proof-card flex flex-col gap-1.5 p-4 rounded-sm no-underline">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}>{item.badge}</span>
              </div>
              <span className="text-sm font-chain" style={{ color: "var(--text-primary)" }}>{item.value}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}