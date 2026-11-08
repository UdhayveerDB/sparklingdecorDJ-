import type { ReactElement } from 'react';
import { businessConfig } from '../config/business';
import { FacebookIcon, InstagramIcon } from './icons';

interface SocialLinksProps {
  /** which Instagram accounts to show */
  show?: ('decor' | 'dj')[];
  showFacebook?: boolean;
  className?: string;
  /** render with text labels (buttons) or icon-only */
  labeled?: boolean;
}

/**
 * Renders social buttons ONLY for URLs filled in businessConfig.social — empty values are hidden
 * so the site never shows dead or placeholder links.
 */
export default function SocialLinks({
  show = ['decor', 'dj'],
  showFacebook = true,
  className = '',
  labeled = false,
}: SocialLinksProps) {
  const { decorInstagram, djInstagram, facebook } = businessConfig.social;
  const links: { href: string; label: string; icon: ReactElement }[] = [];
  if (show.includes('decor') && decorInstagram)
    links.push({ href: decorInstagram, label: 'Sparklingdecor on Instagram', icon: <InstagramIcon /> });
  if (show.includes('dj') && djInstagram)
    links.push({ href: djInstagram, label: 'DJ MAJHAESTIC on Instagram', icon: <InstagramIcon /> });
  if (showFacebook && facebook) links.push({ href: facebook, label: 'Facebook page', icon: <FacebookIcon /> });

  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((l) => (
        <li key={l.href + l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className={
              labeled
                ? 'btn btn-outline btn-sm gap-2 normal-case tracking-wider'
                : 'flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-charcoal'
            }
          >
            {l.icon}
            {labeled && l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
