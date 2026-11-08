/** Small decorative building blocks (pure CSS/SVG — no images to load). */

/** Floating gold specks for hero backgrounds. Positions are fixed so the layout never jumps. */
const specks = [
  { l: '6%', t: '22%', s: 6, d: 0 }, { l: '14%', t: '68%', s: 4, d: -3 }, { l: '22%', t: '40%', s: 8, d: -6 },
  { l: '31%', t: '82%', s: 5, d: -2 }, { l: '43%', t: '14%', s: 4, d: -7 }, { l: '52%', t: '58%', s: 7, d: -4 },
  { l: '61%', t: '30%', s: 5, d: -1 }, { l: '70%', t: '76%', s: 8, d: -5 }, { l: '78%', t: '18%', s: 4, d: -8 },
  { l: '86%', t: '52%', s: 6, d: -3 }, { l: '93%', t: '34%', s: 5, d: -6 }, { l: '38%', t: '48%', s: 3, d: -9 },
];

export function GoldSpecks({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {specks.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float rounded-full bg-gold"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: `${p.d}s`, boxShadow: '0 0 12px 2px rgba(201,169,110,0.6)' }}
        />
      ))}
    </div>
  );
}

/** Animated equaliser bars (music motif). */
export function EqualizerBars({ count = 28, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="w-1 origin-bottom animate-eq rounded-full bg-gradient-to-t from-gold-700 to-gold-200"
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animationDelay: `${-((i * 0.173) % 1.1)}s`,
            animationDuration: `${0.9 + ((i * 7) % 6) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Sweeping stage-light beams (DJ). */
export function LightBeams({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden ${className}`} aria-hidden="true">
      {[
        { l: '12%', c: 'from-gold/50', d: '0s' },
        { l: '38%', c: 'from-rosegold/45', d: '-2.5s' },
        { l: '64%', c: 'from-gold/45', d: '-4.5s' },
        { l: '88%', c: 'from-warmpink/40', d: '-1.5s' },
      ].map((b, i) => (
        <span
          key={i}
          className={`absolute top-[-10%] h-[130%] w-40 origin-top animate-beam bg-gradient-to-b ${b.c} to-transparent blur-2xl`}
          style={{ left: b.l, animationDelay: b.d }}
        />
      ))}
    </div>
  );
}

/** Large outline arch used as an elegant hero motif. */
export function ArchOutline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 560" fill="none" className={className} aria-hidden="true">
      <path d="M40 540V200a160 160 0 0 1 320 0v340" stroke="#c9a96e" strokeWidth="2" opacity="0.7" />
      <path d="M62 540V204a138 138 0 0 1 276 0v336" stroke="#c9a96e" strokeWidth="1" opacity="0.4" />
      <path d="M20 540h360" stroke="#c9a96e" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
