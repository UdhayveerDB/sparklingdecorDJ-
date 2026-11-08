import { businessConfig } from '../config/business';
import { asset, isPlaceholder } from '../data/images';

interface ImageSlotProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Load immediately (hero images). Everything else is lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  /** Hide the small "Sample image" tag */
  hideTag?: boolean;
}

/**
 * Image with lazy loading, intrinsic size (no layout shift) and an automatic
 * "Sample image" tag while a placeholder is in use. The PARENT must be `relative`.
 */
export default function ImageSlot({
  src,
  alt,
  width,
  height,
  className = '',
  priority,
  sizes,
  hideTag,
}: ImageSlotProps) {
  const placeholder = isPlaceholder(src);
  return (
    <>
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML but not yet in all React typings
        fetchpriority={priority ? 'high' : undefined}
        className={className}
      />
      {placeholder && businessConfig.ui.showPlaceholderLabels && !hideTag && (
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
          Sample image
        </span>
      )}
    </>
  );
}
