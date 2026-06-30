import { Fragment } from "react";

export function ProtocolFlowDiagram() {
  const steps = [
    { label: "STEP 01", title: "Confidential VM",         sub: "AMD SEV-SNP" },
    { label: "STEP 02", title: "AI Execution in Enclave", sub: "Open-source LM · Inference" },
    { label: "STEP 03", title: "Attestation Token",       sub: "OIDC · GCP" },
    { label: "STEP 04", title: "Commitment Hash",         sub: "SHA-256" },
    { label: "STEP 05", title: "On-Chain Anchoring",      sub: "Base Mainnet L2" },
  ];

  return (
    <div
      className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2 w-full"
      role="list"
      aria-label="TEE to Attestation to Base L2 protocol flow"
    >
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          {/* Step card */}
          <div
            role="listitem"
            className="w-full md:flex-1 md:w-auto p-5 rounded-sm text-center flex flex-col justify-center"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <p className="text-[10px] font-chain tracking-[1.5px] mb-2" style={{ color: "var(--text-secondary)" }}>
              {s.label}
            </p>
            <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
              {s.title}
            </p>
            <p className="text-[10px] font-chain mt-2" style={{ color: "var(--accent)" }}>
              {s.sub}
            </p>
          </div>

          {/* Connector — vertical on mobile (rotated), horizontal from md: up */}
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center py-2 md:py-0 md:shrink-0" aria-hidden="true">
              <div className="relative h-[7px] w-[40px] rotate-90 md:rotate-0">
                <span
                  className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
                  style={{ backgroundColor: "var(--border)" }}
                />
                <span
                  className={`pulse-dot pulse-dot-${i + 1} absolute left-0 top-0 h-[7px] w-[7px] rounded-full`}
                  style={{ backgroundColor: "var(--accent)", filter: "drop-shadow(0 0 4px var(--accent))" }}
                />
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}