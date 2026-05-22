export function ProtocolFlowDiagram() {
  const steps = [
    { label: "STEP 01", line1: "Confidential", line2: "VM", sub: "AMD SEV-SNP", x: 20 },
    { label: "STEP 02", line1: "AI Execution", line2: "in Enclave",  sub: "GPT-2 Inference", x: 220 },
    { label: "STEP 03", line1: "Attestation",  line2: "Token",       sub: "OIDC · GCP", x: 420 },
    { label: "STEP 04", line1: "Commitment",   line2: "Hash",        sub: "SHA-256", x: 620 },
    { label: "STEP 05", line1: "On-Chain",     line2: "Anchoring",   sub: "Base Mainnet L2", x: 820 },
  ];

  const arrows = [180, 380, 580, 780];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1000 160"
        className="w-full min-w-[640px]"
        aria-label="TEE to Attestation to Base L2 protocol flow"
      >
        {steps.map((s) => (
          <g key={s.label}>
            <rect x={s.x} y={28} width={160} height={104} rx={2}
              fill="var(--bg-card)" stroke="var(--border)" strokeWidth={1} />
            <text x={s.x + 80} y={54} textAnchor="middle" fontSize={9}
              fill="#9ca3af" letterSpacing="1.5">{s.label}</text>
            <text x={s.x + 80} y={76} textAnchor="middle" fontSize={12}
              fill="#f3f4f6" fontWeight={600}>{s.line1}</text>
            <text x={s.x + 80} y={92} textAnchor="middle" fontSize={12}
              fill="#f3f4f6" fontWeight={600}>{s.line2}</text>
            <text x={s.x + 80} y={116} textAnchor="middle" fontSize={9}
              fill="#00E5FF">{s.sub}</text>
          </g>
        ))}

        {arrows.map((x, i) => (
          <g key={`arrow-${i}`}>
            <line x1={x} y1={80} x2={x + 40} y2={80}
              stroke="var(--border)" strokeWidth={1} />
            <circle cx={x} cy={80} r={3.5} fill="#00E5FF"
              className={`pulse-dot pulse-dot-${i + 1}`}
              style={{ filter: "drop-shadow(0 0 4px #00E5FF)" }} />
          </g>
        ))}
      </svg>
    </div>
  );
}