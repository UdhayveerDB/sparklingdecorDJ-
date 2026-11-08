import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
  display?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  dark,
  display,
}: SectionHeadingProps) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow ${dark ? '!text-gold' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-3 ${display ? 'heading-display text-5xl sm:text-6xl' : 'heading-serif'} ${dark ? 'text-white' : 'text-charcoal'}`}
      >
        {title}
      </h2>
      {align === 'center' && <div className="gold-rule mt-6" />}
      {intro && (
        <p className={`mt-6 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
