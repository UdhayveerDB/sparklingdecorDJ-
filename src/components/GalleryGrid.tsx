import { useCallback, useState } from 'react';
import { ZoomIn } from 'lucide-react';
import type { GalleryItem } from '../data/gallery';
import GalleryLightbox from './GalleryLightbox';
import ImageSlot from './ImageSlot';

interface GalleryGridProps {
  items: GalleryItem[];
  /** 'masonry' keeps each photo's natural proportions; 'uniform' makes a tidy square-ish grid */
  layout?: 'masonry' | 'uniform';
  emptyMessage?: string;
}

/** Responsive gallery with hover effects and a lightbox. Pass any list of GalleryItems. */
export default function GalleryGrid({ items, layout = 'masonry', emptyMessage }: GalleryGridProps) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gold/40 p-10 text-center text-charcoal/60">
        {emptyMessage ?? 'No images in this category yet — check back soon.'}
      </p>
    );
  }

  return (
    <>
      <ul className={layout === 'masonry' ? 'masonry' : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Enlarge image: ${item.alt}`}
              className={`group relative block w-full overflow-hidden rounded-2xl bg-ivory shadow-lux ${layout === 'uniform' ? 'aspect-[4/3]' : ''}`}
            >
              <ImageSlot
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(min-width:1024px) 33vw, (min-width:560px) 50vw, 100vw"
                className={`w-full transition duration-700 group-hover:scale-105 ${layout === 'uniform' ? 'h-full object-cover' : 'h-auto'}`}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 opacity-0 transition duration-300 group-hover:bg-charcoal/40 group-hover:opacity-100 group-focus-visible:bg-charcoal/40 group-focus-visible:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-charcoal">
                  <ZoomIn />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <GalleryLightbox items={items} index={active} onClose={close} onNavigate={setActive} />
    </>
  );
}
