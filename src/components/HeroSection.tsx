import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { businessConfig } from '../config/business';
import { asset } from '../data/images';
import { ArchOutline, EqualizerBars, GoldSpecks } from './Decor';

/**
 * Cinematic home hero. Uses a background video or photo if one is set in business.ts (media.heroVideo / heroImage);
 * otherwise it shows animated artwork (arch, light glows, gold specks and equaliser bars).
 */
export default function HeroSection() {
  const { heroVideo, heroImage } = businessConfig.media;
  return (
    <section className="on-dark relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-charcoal-900" aria-labelledby="hero-title">
      {/* background layers */}
      {heroVideo ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={asset(heroVideo)}
          poster={heroImage ? asset(heroImage) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : heroImage ? (
        <img src={asset(heroImage)} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      ) : (
        <>
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_20%_20%,rgba(183,110,121,0.35),transparent_55%),radial-gradient(ellipse_at_85%_75%,rgba(110,31,47,0.65),transparent_55%),linear-gradient(160deg,#121110,#1a1816_55%,#2e0b14)]" />
          <div className="absolute -left-32 top-10 -z-10 h-[28rem] w-[28rem] animate-drift rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-24 bottom-0 -z-10 h-[30rem] w-[30rem] animate-drift rounded-full bg-burgundy-500/30 blur-3xl [animation-delay:-11s]" aria-hidden="true" />
          <ArchOutline className="absolute bottom-0 left-[-6%] -z-10 hidden h-[88%] opacity-60 lg:block" />
          <ArchOutline className="absolute bottom-0 right-[-6%] -z-10 hidden h-[72%] opacity-40 lg:block" />
          <EqualizerBars className="absolute inset-x-0 bottom-0 -z-10 h-24 justify-center opacity-25" count={64} />
        </>
      )}
      <div className="absolute inset-0 -z-10 bg-charcoal/50" aria-hidden="true" />
      <div className="vignette absolute inset-0 -z-10" aria-hidden="true" />
      <GoldSpecks className="-z-10" />

      <div className="container-x py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow !text-gold"
        >
          Sparklingdecor &nbsp;×&nbsp; DJ MAJHAESTIC
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-5xl font-serif text-[2.6rem] font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
        >
          Every Celebration Deserves To Be{' '}
          <span className="bg-gradient-to-r from-gold-200 via-gold to-rosegold bg-clip-text italic text-transparent">Extraordinary.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl"
        >
          From breathtaking wedding decorations to unforgettable Punjabi celebrations, we bring your vision to life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-5"
        >
          <Link to="/decorations" className="btn btn-gold">Explore Decorations</Link>
          <Link to="/dj/book" className="btn btn-outline-light">Book DJ MAJHAESTIC</Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-10 font-serif text-sm italic tracking-wide text-gold sm:text-base"
        >
          Decorating Moments. Creating Memories. Making It Sound Majhaestic.
        </motion.p>
      </div>

      <a href="#brands" aria-label="Scroll to explore" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-gold/80 transition hover:text-gold sm:block">
        <ChevronDown className="animate-bounce" size={30} />
      </a>
    </section>
  );
}
