import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$OLIX Tokenomics — CCCLedger, Hard Cap 100M, Base L2",
  description: "$OLIX utility token economics. 100,000,000 hard cap. CCCLedger internal prepaid credit model — USDC-settled, non-transferable. 10,000 OLIX minimum node stake. MiCA-compliant utility token on Base L2.",
};

export default function TokenomicsPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 py-20 text-center flex flex-col items-center" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
          style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
          $OLIX · Base L2 · Utility Token
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: "var(--text-primary)" }}>
          Tokenomics
        </h1>
        <p className="text-lg leading-relaxed max-w-[620px]" style={{ color: "var(--text-secondary)" }}>
          $OLIX is the utility token of Neurolix Protocol. It secures node operators through
          slashable collateral and funds the on-chain LiquidityVault. Confidential Compute
          Credits (CCC) are governed by the CCCLedger — an internal credit ledger that issues
          non-transferable prepaid credits against USDC settlement, eliminating
          crypto-accounting overhead for enterprise clients.
        </p>
      </section>

      {/* PUBLIC PARAMS */}
      <section className="mx-auto max-w-[1100px] px-6 py-16" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "var(--text-secondary)" }}>
          Confirmed Parameters
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Hard Cap", value: "100,000,000", unit: "$OLIX", note: "Immutable at deployment" },
            { label: "Credit Model", value: "CCCLedger", unit: "Prepaid Internal Credits", note: "Non-transferable · USDC-settled" },
            { label: "Min Node Stake", value: "10,000", unit: "$OLIX", note: "Slashable · Anti-Sybil baseline" },
          ].map((p) => (
            <div key={p.label} className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{p.label}</p>
              <p className="text-3xl font-bold font-chain mb-1" style={{ color: "var(--accent)" }}>{p.value}</p>
              <p className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>{p.unit}</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CCC CREDIT MODEL — IN DEVELOPMENT */}
      <section className="mx-auto max-w-[1100px] px-6 py-16" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="p-6 rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--warning)", maxWidth: 680 }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded font-medium"
              style={{ backgroundColor: "rgba(251,191,36,0.1)", color: "var(--warning)" }}>
              IN DEVELOPMENT
            </span>
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              CCCLedger — Internal Credit Model
            </h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Confidential Compute Credits (CCC) are issued by the CCCLedger contract as
            prepaid, non-transferable internal credits. When a session is opened, the
            enterprise client settles in USDC — the protocol credits the equivalent CCC
            balance to their on-chain account. Credits are consumed proportionally to the
            agreed compute allocation at session completion; credits within an SLA breach
            window are forfeited per the SlashingManager state machine. Enterprise clients
            never hold protocol tokens — only USDC-denominated credit balances. A portion of
            USDC settlement is routed to the LiquidityVault for protocol buyback operations;
            exact routing parameters will be published in the public whitepaper.
          </p>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section className="mx-auto max-w-[1100px] px-6 py-16" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "var(--text-secondary)" }}>
          Full Specification
        </p>
        <div className="relative rounded-sm overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {/* Ghost content underneath */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 select-none"
            style={{ filter: "blur(4px)", opacity: 0.2, pointerEvents: "none" }}>
            <div>
              <p className="text-sm font-medium mb-4" style={{ color: "var(--text-secondary)" }}>Token Distribution</p>
              {["Foundation Reserve", "Team & Advisors", "Ecosystem & Grants", "Strategic Partners", "Community & Public"].map((l) => (
                <div key={l} className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{l}</span>
                  <span className="text-sm font-chain" style={{ color: "var(--text-primary)" }}>—%</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium mb-4" style={{ color: "var(--text-secondary)" }}>Vesting Schedules</p>
              {["Team cliff", "Team linear", "Strategic cliff", "Strategic linear", "Community unlock"].map((l) => (
                <div key={l} className="flex justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{l}</span>
                  <span className="text-sm font-chain" style={{ color: "var(--text-primary)" }}>—</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-sm"
            style={{ backdropFilter: "blur(2px)", backgroundColor: "rgba(10,14,26,0.85)", border: "1px solid var(--accent)" }}>
            <span className="text-2xl">🔒</span>
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Coming Soon</h3>
            <p className="text-sm text-center" style={{ color: "var(--text-secondary)", maxWidth: 320 }}>
              Full tokenomics specification will be published alongside the public whitepaper
              prior to mainnet token launch.
            </p>
            <span className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)" }}>
              Public Whitepaper · Coming Soon
            </span>
          </div>
        </div>
      </section>

    </>
  );
}
