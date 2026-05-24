import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SEO } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
 manifest: "/manifest.json",
 keywords: [
  // Brand
  "Neurolix", "Neurolix Protocol", "OLIX", "$OLIX", "OLIX token", "neurolixprotocol.eth",
  
  // Category — high-volume DePIN terms
  "DePIN", "DePIN AI", "DePIN compute", "DePIN infrastructure",
  "decentralized compute", "decentralized AI", "AI DePIN protocol",
  
  // Technical core — what we actually are
  "Confidential AI", "Confidential AI compute", "Confidential computing",
  "TEE", "Trusted Execution Environment", "AMD SEV", "AMD SEV-SNP", "Intel TDX",
  "GPU confidential compute", "NVIDIA H100 TEE-IO",
  "cryptographic attestation", "on-chain attestation", "hardware attestation",
  "verifiable compute", "trust-minimized compute",
  
  // Network
  "Base L2", "Base Mainnet", "Coinbase ecosystem", "Base ecosystem DePIN",
  
  // Use cases — regulated sectors (high-intent buyers)
  "HIPAA compliant AI", "GDPR AI", "regulated AI compute",
  "healthcare AI infrastructure", "financial AI compliance",
  "biotech AI compute", "legal AI confidentiality",
  
  // Tokenomics
  "Burn and Mint Equilibrium", "BME tokenomics", "MiCA compliant utility token",
  "AI compute token", "DePIN node staking",
  
  // Long-tail high-intent
  "confidential AI on Base", "AI inference on encrypted data",
  "compliance ready AI compute", "on-chain AI verification",

  // Privacy — core value proposition
"privacy-preserving AI", "AI privacy", "private AI compute",
"data privacy AI", "AI data sovereignty", "encrypted AI inference",
"hardware-enforced privacy", "AI workload privacy", "compute privacy","medical AI privacy", 
"financial data confidentiality", "BAA compliant AI","end-to-end private compute",

],
  title: {
    default: SEO.title,
    template: "%s — Neurolix Protocol",
  },
  description: SEO.description,
  metadataBase: new URL("https://neurolixprotocol.com"),
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: "https://neurolixprotocol.com",
    siteName: "Neurolix Protocol",
    images: [{ url: "/og-neurolix-mainnet.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/og-neurolix-mainnet.jpg"],
    creator: "@NEUROLIX",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Neurolix Protocol",
      alternateName: ["Neurolix", "$OLIX"],
      url: "https://neurolixprotocol.com",
      logo: "https://neurolixprotocol.com/favicon.png",
      image: "https://neurolixprotocol.com/og-neurolix-mainnet.jpg",
      description: "DePIN infrastructure for confidential AI compute on regulated data. Hardware-enforced privacy in TEE enclaves, cryptographic attestation anchored on Base L2.",
      email: "info@neurolixprotocol.com",
      foundingDate: "2025",
      sameAs: [
        "https://x.com/NEUROLIX",
        "https://medium.com/@neurolixprotocol",
        "https://paragraph.xyz/@0xba2b7775c09914bf8eb05a53ace30204f0061c27",
        "https://github.com/neurolixprotocol",
      ],
      knowsAbout: [
        "Confidential AI",
        "DePIN",
        "Trusted Execution Environment",
        "AMD SEV-SNP",
        "Base L2",
        "Cryptographic Attestation",
      ],
    }),
  }}
/>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
