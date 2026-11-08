import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface CTABannerProps {
  heading: string;
  text?: string;
  children: ReactNode;
  variant?: 'dark' | 'dj' | 'blush';
}

/** Full-width call to action. Buttons are passed as children. */
export default function CTABanner({ heading, text, children, variant = 'dark' }: CTABannerProps) {
  const bg =
    variant === 'blush'
      ? 'bg-gradient-to-br from-ivory via-blush/60 to-warmpink/50 text-charcoal'
      : variant === 'dj'
        ? 'on-dark bg-gradient-to-br from-charcoal-900 via-burgundy-900 to-charcoal-900 text-white'
        : 'on-dark bg-gradient-to-br from-charcoal via-charcoal-800 to-burgundy-900 text-white';
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 animate-drift rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-drift rounded-full bg-rosegold/20 blur-3xl [animation-delay:-8s]" aria-hidden="true" />
      <div className="container-x section-y relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">{heading}</h2>
          <div className="gold-rule mt-6" />
          {text && <p className={`mx-auto mt-6 max-w-xl text-base sm:text-lg ${variant === 'blush' ? 'text-charcoal/70' : 'text-white/75'}`}>{text}</p>}
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
