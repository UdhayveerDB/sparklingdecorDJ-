import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { galleryItems } from '../data/gallery';
import GalleryGrid from './GalleryGrid';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SocialLinks from './SocialLinks';

/**
 * "Follow the celebration" block. A live Instagram feed needs credentials / a third-party service, so this
 * uses a clean gallery fallback plus follow buttons (shown only for accounts set in business.ts).
 */
export default function LatestWork() {
  const picks = [
    ...galleryItems.filter((i) => i.brand === 'decor').filter((_, i) => i % 5 === 0),
    ...galleryItems.filter((i) => i.brand === 'dj').slice(0, 2),
  ].slice(0, 6);

  return (
    <section className="section-y bg-softwhite">
      <div className="container-x">
        <SectionHeading eyebrow="Our work" title="Moments We&rsquo;ve Styled & Soundtracked" intro="A look at the celebrations we love creating. Follow us to see more." />
        <Reveal className="mt-12">
          <GalleryGrid items={picks} layout="uniform" />
        </Reveal>
        <div className="mt-10 flex flex-col items-center gap-5">
          <SocialLinks labeled />
          <Link to="/gallery" className="btn btn-dark">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
