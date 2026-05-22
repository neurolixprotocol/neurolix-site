export function HeroLattice() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute right-0 top-0 h-full w-[60%]"
        viewBox="0 0 500 450"
        preserveAspectRatio="xMaxYMid slice"
        style={{ animation: "glowBreath 10s ease-in-out infinite" }}
      >
        <defs>
          <pattern id="nlx-dot-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1.2" fill="#00E5FF" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="500" height="450" fill="url(#nlx-dot-grid)" />
        <circle cx="100" cy="100" r="4.5" fill="#00E5FF" opacity="0.9" />
        <circle cx="250" cy="150" r="4.5" fill="#00E5FF" opacity="0.9" />
        <circle cx="350" cy="60"  r="3.5" fill="#00E5FF" opacity="0.7" />
        <circle cx="400" cy="260" r="4.5" fill="#00E5FF" opacity="0.9" />
        <circle cx="150" cy="300" r="3.5" fill="#00E5FF" opacity="0.7" />
        <circle cx="300" cy="360" r="3"   fill="#00E5FF" opacity="0.6" />
        <circle cx="450" cy="150" r="3"   fill="#00E5FF" opacity="0.6" />
        <line x1="100" y1="100" x2="250" y2="150" stroke="#00E5FF" strokeWidth="0.6" opacity="0.35" />
        <line x1="250" y1="150" x2="350" y2="60"  stroke="#00E5FF" strokeWidth="0.6" opacity="0.35" />
        <line x1="350" y1="60"  x2="450" y2="150" stroke="#00E5FF" strokeWidth="0.6" opacity="0.25" />
        <line x1="450" y1="150" x2="400" y2="260" stroke="#00E5FF" strokeWidth="0.6" opacity="0.25" />
        <line x1="250" y1="150" x2="400" y2="260" stroke="#00E5FF" strokeWidth="0.6" opacity="0.35" />
        <line x1="250" y1="150" x2="150" y2="300" stroke="#00E5FF" strokeWidth="0.6" opacity="0.35" />
        <line x1="400" y1="260" x2="300" y2="360" stroke="#00E5FF" strokeWidth="0.6" opacity="0.25" />
        <line x1="150" y1="300" x2="300" y2="360" stroke="#00E5FF" strokeWidth="0.6" opacity="0.25" />
      </svg>
    </div>
  );
}