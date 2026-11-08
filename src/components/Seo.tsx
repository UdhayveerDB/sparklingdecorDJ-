import { useEffect } from 'react';
import { brandNames, businessConfig } from '../config/business';
import { asset } from '../data/images';

interface SeoProps {
  title: string;
  description: string;
  /** Path such as '/decorations' (used for canonical + og:url) */
  path?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SITE_TITLE = `${brandNames.decor} × ${brandNames.dj}`;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sets per-page title, description, Open Graph tags, canonical URL and JSON-LD. */
export default function Seo({ title, description, path, jsonLd, noindex }: SeoProps) {
  useEffect(() => {
    const fullTitle = title === 'Home' ? `${SITE_TITLE} | Event Decoration & Punjabi DJ` : `${title} | ${SITE_TITLE}`;
    document.title = fullTitle;

    const origin = businessConfig.siteUrl || window.location.origin;
    const url = `${origin}${path ?? window.location.pathname}`;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', SITE_TITLE);
    setMeta('name', 'twitter:card', businessConfig.seo.ogImage ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    if (businessConfig.seo.ogImage) {
      const img = `${origin}${asset(businessConfig.seo.ogImage)}`;
      setMeta('property', 'og:image', img);
      setMeta('name', 'twitter:image', img);
    }
    setCanonical(url);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-jsonld';
    if (jsonLd) {
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script.remove();
    };
  }, [title, description, path, jsonLd, noindex]);

  return null;
}
