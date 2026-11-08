import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Img } from '../data/images';
import { EqualizerBars, GoldSpecks, LightBeams } from './Decor';
import ImageSlot from './ImageSlot';

interface PageHeroProps {
  title: string;
  motto?: string;
  intro?: string;
  eyebrow?: string;
  image?: Img;
  imageAlt?: string;
  variant?: 'decor' | 'dj' | 'plain';
  breadcrumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}

/** Hero for inner pages. 'dj' adds stage lighting and display typography. */
export default function PageHero({
  title,
  motto,
  intro,
  eyebrow,
  image,
  imageAlt,
  variant = 'decor',
  breadcrumbs,
  children,
}: PageHeroProps) {
  const dj = variant === 'dj';
  return (
    <section className={`on-dark relative isolate overflow-hidden ${dj ? 'bg-charcoal-900' : 'bg-charcoal'}`}>
      {image && !dj && (
        <div className="absolute inset-0 -z-10">
          <ImageSlot src={image.src} width={image.width} height={image.height} alt={imageAlt ?? `${title} — sample decoration artwork`} priority sizes="100vw" className="h-full w-full object-cover opacity-70" hideTag />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal" />
        </div>
      )}
      {dj && (
        <>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(110,31,47,0.55),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(201,169,110,0.12),transparent_55%)]" />
          <LightBeams className="-z-10" />
        </>
      )}
      <GoldSpecks className="-z-10 opacity-60" />

      <div className="container-x py-20 text-center sm:py-28 lg:py-32">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-1 text-xs uppercase tracking-[0.18em] text-white/60">
              {breadcrumbs.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1">
                  {b.to ? <Link to={b.to} className="hover:text-gold">{b.label}</Link> : <span className="text-gold" aria-current="page">{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <ChevronRight size={12} aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
          <h1
            className={
              dj
                ? 'heading-display dj-glow-text mt-3 text-6xl text-white sm:text-8xl lg:text-9xl'
                : 'mt-3 font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl'
            }
          >
            {title}
          </h1>
          {motto && <p className={`mt-4 font-serif text-xl italic text-gold sm:text-2xl ${dj ? 'tracking-wide' : ''}`}>{motto}</p>}
          {dj && <EqualizerBars className="mx-auto mt-8 h-12 justify-center" count={32} />}
          {intro && <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>}
          {children && <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
