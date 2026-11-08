import { useMemo, useState } from 'react';
import { filterGallery, type GalleryItem } from '../data/gallery';
import FilterChips from './FilterChips';
import GalleryGrid from './GalleryGrid';

interface FilteredGalleryProps {
  items: GalleryItem[];
  filters: { id: string; label: string; match: string[] }[];
  label: string;
  dark?: boolean;
}

/** Category filter chips + gallery grid + lightbox in one reusable block. */
export default function FilteredGallery({ items, filters, label, dark }: FilteredGalleryProps) {
  const [filter, setFilter] = useState(filters[0].id);
  const visible = useMemo(() => {
    const f = filters.find((x) => x.id === filter) ?? filters[0];
    return filterGallery(items, f.match);
  }, [items, filters, filter]);

  return (
    <div>
      <FilterChips options={filters} value={filter} onChange={setFilter} label={label} dark={dark} />
      <div className="mt-8" aria-live="polite">
        <GalleryGrid items={visible} />
      </div>
    </div>
  );
}
