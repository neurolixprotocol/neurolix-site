<div align="center">

  <img src="https://github.com/neurolixprotocol.png" alt="Neurolix Protocol" width="100" />

  # Neurolix Protocol

  **Confidential AI Compute Infrastructure for Regulated Data**

  [![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase&logoColor=white)](https://base.org)
  [![TEE: AMD SEV](https://img.shields.io/badge/TEE-AMD%20SEV--SNP-ED1C24?style=for-the-badge&logo=amd&logoColor=white)](https://www.amd.com/en/developer/sev.html)
  [![Smart Contracts: Solidity](https://img.shields.io/badge/Contracts-Solidity%200.8.20-363636?style=for-the-badge&logo=solidity&logoColor=white)](#)
  [![Testnet: Base Sepolia](https://img.shields.io/badge/Testnet-Base%20Sepolia-6F4CFF?style=for-the-badge&logo=ethereum&logoColor=white)](https://base-sepolia.blockscout.com/tx/0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046)

</div>

---

## What is Neurolix Protocol

Neurolix is a vertical DePIN protocol for AI workloads on sensitive data.

AI inference runs inside **hardware-secured TEE enclaves** (AMD SEV). Every compute session produces a **cryptographic attestation token**, independently verified by Google Cloud and anchored on **Base L2**. The result: mathematical proof that regulated data was processed privately — without trusting any single party.

Built for sectors where data privacy is a legal requirement: **healthcare, finance, biotech, legal**.

---

## Architecture

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Hardware Isolation** | AMD SEV / SEV-SNP | Memory-level encryption at silicon |
| **Session Attestation** | Google Cloud OIDC | Cryptographic proof enclave was active |
| **Commitment Hash** | SHA-256 | Fingerprint of the computation output |
| **On-Chain Anchoring** | Base L2 (Sepolia → Mainnet) | Immutable, publicly verifiable audit trail |
| **Smart Contracts** | Solidity 0.8.20 + OpenZeppelin | Token, staking, governance, registry |

---

## Proof of Concept — Verified On-Chain

A real AI model (GPT-2, 124M parameters) executed inside an AMD SEV confidential VM on Google Cloud.

```
AMD SEV enclave (neurolix-tee-node-1)
    ↓  instance_confidentiality: 1 — verified by Google Cloud
GPT-2 inference on sensitive data
    ↓  commitment hash: ec52836f23170a1b601dd7e475107f314ca004186707f69836f7615901a665bd
Anchored on Base Sepolia
    ↓
0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046
```

**→ [Verify on Blockscout](https://base-sepolia.blockscout.com/tx/0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046)**

---

## Smart Contract Suite — v4

Six contracts on Base L2. Audited internally with Devil's Advocate methodology.

| Contract | Status | Function |
| :--- | :--- | :--- |
| `NeurolixAttestation.sol` | ✅ Live on testnet | TEE attestation registry — minimal, immutable |
| `OLIXToken.sol` | ✅ Specified v4 | ERC-20 utility token, burn mechanics, tax exemptions |
| `NodeRegistry.sol` | ✅ Specified v4 | Node staking, slashing, SLA enforcement |
| `NeurolixGovernor.sol` | ✅ Specified v4 | On-chain governance (quorum on veOLIX locked supply) |
| `VotingEscrow.sol` | ✅ Specified v4 | Vote-escrow with IVotes checkpoints |
| `ProtocolVault.sol` | ✅ Specified v4 | Treasury, reward distribution, burn forwarding |

**Known open issues (documented publicly — mainnet blockers):**
- Heartbeat farming risk → requires oracle-signed `workloadCommitment`
- MEV exit during SLA breach → `deregisterNode` revert check pending
- SLA parameter trust → bilateral client+miner signature pending

---

## Roadmap

```
Phase 1 — Hardening      Fix v5 issues · External audit · Azure + AWS Nitro attestation
Phase 2 — Base Mainnet   OLIX token · NodeRegistry live · First node operators
Phase 3 — GPU TEE        NVIDIA H100 TEE-IO · Production LLM inference in enclaves
Phase 4 — Enterprise     First regulated-sector pilots · Commercial agreements
Phase 5 — GA             Open network · Permissionless node onboarding · Public SDK
```

---

## Building in Public

We document every milestone, bug, and architectural decision openly.

| Channel | Link |
| :--- | :--- |
| 🌐 Website | [neurolixprotocol.com](https://neurolixprotocol.com) |
| 📝 Build Log (Medium) | [medium.com/@neurolixprotocol](https://medium.com/@neurolixprotocol) |
| 📄 Build Log (Paragraph) | [paragraph.xyz/@neurolixprotocol](https://paragraph.xyz/@0xba2b7775c09914bf8eb05a53ace30204f0061c27) |
| 🐦 X / Twitter | [@NEUROLIX](https://x.com/NEUROLIX) |
| 📬 Email | [info@neurolixprotocol.com](mailto:info@neurolixprotocol.com) |
| ⛓️ On-Chain Proof | [Base Sepolia — Blockscout](https://base-sepolia.blockscout.com/tx/0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046) |

---

<sub>$OLIX is a utility token for accessing Neurolix Protocol compute resources. It does not constitute a financial product or investment advice. Neurolix Protocol is in active development on testnet. Conduct your own research.</sub>
