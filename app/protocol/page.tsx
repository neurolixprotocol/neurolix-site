import type { Metadata } from "next";
import { CONTRACTS, PROOF, LINKS } from "@/lib/constants";

// NOTE: Ensure the static diagram component is imported
import { ProtocolFlowDiagram } from "@/components/protocol-flow-diagram";

export const metadata: Metadata = {
  title: "Protocol Architecture — TEE, Attestation, Base L2",
  description: "Technical architecture of Neurolix Protocol: Confidential AI compute layer on Base L2. Smart contract suite v1.17 — 19 contracts with pseudonymized client ledger mapping and Forfeit Flat-Q abort tokenomics. 76/76 Foundry tests passing.",
};

export default function ProtocolPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 text-center flex flex-col items-center" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          Architecture · v1.17 · Base L2
        </span>
        <h1 className="title-gradient text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter">
          The Protocol
        </h1>
        <p className="text-lg leading-relaxed max-w-[620px]" style={{ color: "var(--text-secondary)" }}>
          Neurolix Protocol is a compliance-ready Confidential AI compute layer on Base L2.
          It combines hardware-isolated TEE enclaves with cryptographic attestation and
          trust-minimized on-chain SLA enforcement.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              The TEE → Attestation → Base L2 loop.
            </h2>
            <p className="text-sm mt-4 leading-relaxed text-slate-400">
              A step-by-step breakdown of how data remains encrypted in transit and in use, ensuring that only the cryptographic commitment leaves the secure boundary.
            </p>
          </div>

          <ProtocolFlowDiagram />

        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Architecture</p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>How the stack works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Confidential VM",
                body: "AI workloads run inside AMD SEV enclaves on Google Cloud Confidential Computing (PoC). Roadmap extends to AMD SEV-SNP, Intel TDX, and NVIDIA H100 CC. The CPU enforces memory isolation — neither the cloud provider nor the node operator can access the plaintext data or model inputs.",
                tag: "AMD SEV (live) · SEV-SNP · Intel TDX · H100 CC (roadmap)",
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
        <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Contract suite v1.17 — 19 contracts</h2>
        <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
          Frozen architecture enforcing Zero-ERC20 B2B credits and Flat-Q forfeit penalties. 76/76 Foundry tests passing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "NeurolixAttestation.sol", desc: "Commitment hash anchoring. Live on Base Mainnet.", status: "mainnet" },
            { name: "OLIXToken.sol", desc: "ERC-20 utility token. Hard cap 100M. No transfer tax.", status: "pre-testnet" },
            { name: "NodeRegistry.sol", desc: "Node operator registration, staking (min 10K OLIX), slashing.", status: "pre-testnet" },
            { name: "LiquidityVault.sol", desc: "On-chain reserve custody — 8M OLIX + USDC. Counter-cyclical price stabilization.", status: "pre-testnet" },
            { name: "NeurolixGovernor.sol", desc: "OpenZeppelin Governor pattern. Requires VotingEscrow.sol (under development) before deployment.", status: "pre-testnet" },
            { name: "PriceOracle.sol", desc: "Triple-feed median oracle with MEV-resistant execution.", status: "pre-testnet" },
            { name: "Interfaces.sol", desc: "Shared ABI boundary across all v1.17 contracts.", status: "pre-testnet" },
            { name: "AttestationOracle.sol", desc: "TEE attestation verifier with ECDSA. Replay protection via session-bound hardware salt.", status: "pre-testnet" },
            { name: "SlashingManager.sol", desc: "Multi-tier slashing state machine (T0–T4). Challenge window for behavioral breaches.", status: "pre-testnet" },
            { name: "CCCLedger.sol", desc: "Internal Credit Ledger — B2B non-transferable CCC. Pseudonymized mapping via bytes32 clientRef.", status: "pre-testnet" },
            { name: "ComputeSession.sol", desc: "TEE session lifecycle FSM — Model B, Pull/Claim, Forfeit Flat-Q penalty enforcement.", status: "pre-testnet" },
            { name: "HardwareRefreshAllowance.sol", desc: "Bootstrap hardware reserve allocation for node operators.", status: "pre-testnet" },
            { name: "ICCCLedger.sol", desc: "Shared interface for CCCLedger across the v1.17 contract suite.", status: "pre-testnet" },
            { name: "NeurolixAttestationVerifier.sol", desc: "EIP-712 signature verification with ECDSA and session-bound nonce anti-replay.", status: "pre-testnet" },
            { name: "NeurolixGateway.sol", desc: "Protocol entry-point v1.17 — USDC to CCC conversion with take-rate routing (8/4/88 split).", status: "pre-testnet" },
            { name: "ProtocolBuybackEngineV16.sol", desc: "Anti-MEV buyback engine (inherited). Routes USDC settlement proceeds to LiquidityVault.", status: "pre-testnet" },
            { name: "SubsidyPool.sol", desc: "Phase 2a / Fork 2 — Automates pull-based miner compensation and Flat-Q penalty allocation.", status: "pre-testnet" },
            { name: "AuditAnchor.sol", desc: "Cryptographic notary for local audit trails, securing compliance logs and verifiable hardware states.", status: "pre-testnet" },
            { name: "Mocks.sol", desc: "Foundry testing suite simulating complex TEE enclave behaviors to ensure 100% test coverage.", status: "pre-testnet" },
          ].map((c) => (
            <div key={c.name} className="flex flex-col p-4 rounded-sm h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex-1">
                <p className="text-sm font-medium font-chain mb-1 break-all" style={{ color: "var(--text-primary)" }}>{c.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c.desc}</p>
              </div>
              <div className="flex justify-end mt-4">
                <span className="text-xs px-2 py-0.5 rounded shrink-0"
                  style={{
                    backgroundColor: c.status === "mainnet" ? "var(--accent-dim)" : "rgba(255,255,255,0.05)",
                    color: c.status === "mainnet" ? "var(--accent)" : "var(--text-secondary)",
                    border: `1px solid ${c.status === "mainnet" ? "var(--accent)" : "var(--border)"}`,
                  }}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ON-CHAIN PROOF */}
  <section className="mx-auto max-w-[1100px] px-6 py-16">
    <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--text-secondary)" }}>On-chain references</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {[
        { label: "Attestation contract", value: `${CONTRACTS.attestation.slice(0,10)}...${CONTRACTS.attestation.slice(-6)}`, href: LINKS.basescan, badge: "Base Mainnet" },
        { label: "Commitment hash", value: `${PROOF.commitmentHash.slice(0,10)}...${PROOF.commitmentHash.slice(-6)}`, href: `https://sepolia.basescan.org/tx/${PROOF.sepoliaTx}`, badge: "Base Sepolia" },
      ].map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
          className="proof-card flex flex-col p-4 rounded-sm no-underline"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex-1">
            <span className="text-xs block mb-1" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
            <span className="text-sm font-chain break-all" style={{ color: "var(--text-primary)" }}>{item.value}</span>
          </div>
          <div className="flex justify-end mt-4">
            <span className="text-xs px-2 py-0.5 rounded shrink-0"
              style={{
                backgroundColor: "var(--accent-dim)",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
              }}>
              {item.badge}
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
    </>
  );
}
