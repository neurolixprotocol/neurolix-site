export const PROTOCOL = {
  name:      "Neurolix Protocol",
  nameShort: "Neurolix",
  ticker:    "$OLIX",
  network:   "Base L2",
  ens:       "neurolixprotocol.eth",
} as const;

export const CONTRACTS = {
  attestation: "0xDcCCda8662996b479bE5C5d44115a03a43a92F1B",
  network:     "base-mainnet",
} as const;

export const PROOF = {
  commitmentHash: "ec52836f23170a1b601dd7e475107f314ca004186707f69836f7615901a665bd",
  sepoliaTx:      "0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046",
} as const;

export const LINKS = {
  website:   "https://neurolixprotocol.com",
  email:     "info@neurolixprotocol.com",
  x:         "https://x.com/NEUROLIX",
  medium:    "https://medium.com/@neurolixprotocol",
  paragraph: "https://paragraph.xyz/@0xba2b7775c09914bf8eb05a53ace30204f0061c27",
  github:    "https://github.com/neurolixprotocol",
  loomEmbed: "https://www.loom.com/embed/bc8aa2bbdc6745d1a1568d29b1b124e8",
  loomShare: "https://www.loom.com/share/bc8aa2bbdc6745d1a1568d29b1b124e8",
  blockscout:"https://base-sepolia.blockscout.com/tx/0x6c9a8e68ddc3b96b70b09785e1efbc519b371132aaf7b7ac5e428954de010046",
  basescan:  "https://basescan.org/address/0xDcCCda8662996b479bE5C5d44115a03a43a92F1B",
} as const;

export const SEO = {
  title:       "Neurolix Protocol — Confidential AI Compute on Base L2",
  description: "Hardware-enforced privacy for AI workloads on regulated data. TEE enclaves with cryptographic attestation anchored to Base L2.",
  ogImage:     "https://neurolixprotocol.com/og-neurolix-mainnet.jpg",
} as const;