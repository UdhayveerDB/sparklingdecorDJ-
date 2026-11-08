import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Img } from '../data/images';
import ImageSlot from './ImageSlot';

interface ServiceCardProps {
  title: string;
  description: string;
  image: Img;
  to: string;
  cta?: string;
  /** 'dark' for DJ section cards */
  tone?: 'light' | 'dark';
  alt?: string;
  id?: string;
}

/** Image card with hover zoom, lift and an "Explore More" link. The whole card is clickable. */
export default function ServiceCard({
  title,
  description,
  image,
  to,
  cta = 'Explore More',
  tone = 'light',
  alt,
  id,
}: ServiceCardProps) {
  const dark = tone === 'dark';
  return (
    <article
      id={id}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-1.5 ${
        dark
          ? 'dj-card hover:border-gold/60 hover:shadow-[0_20px_50px_-20px_rgba(201,169,110,0.4)]'
          : 'border border-gold/20 bg-white shadow-lux hover:shadow-gold'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageSlot
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt ?? `${title} — sample styling artwork`}
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`font-serif text-xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>{title}</h3>
        <p className={`mt-2 flex-1 text-[0.95rem] leading-relaxed ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>{description}</p>
        <Link
          to={to}
          className={`mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] after:absolute after:inset-0 after:content-[''] ${dark ? 'text-gold' : 'text-gold-700'}`}
        >
          {cta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </article>
  );
}
