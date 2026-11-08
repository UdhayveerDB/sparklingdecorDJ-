interface FilterChipsProps {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  dark?: boolean;
  className?: string;
}

/** Pill filter buttons (horizontally scrollable on small screens). */
export default function FilterChips({ options, value, onChange, label, dark, className = '' }: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className={`-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 ${className}`}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={`min-h-[44px] shrink-0 rounded-full border px-5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition ${
              on
                ? 'border-gold bg-gold text-charcoal shadow-gold'
                : dark
                  ? 'border-gold/30 text-white/80 hover:border-gold hover:text-gold'
                  : 'border-charcoal/20 text-charcoal/75 hover:border-gold hover:text-gold-700'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
