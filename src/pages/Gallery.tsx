import { useState } from 'react';
import { Link } from 'react-router-dom';
import CTABanner from '../components/CTABanner';
import FilteredGallery from '../components/FilteredGallery';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import SocialLinks from '../components/SocialLinks';
import { businessConfig } from '../config/business';
import { decorGalleryPageFilters, djGalleryFilters, galleryItems } from '../data/gallery';
import { breadcrumbData } from '../utils/structuredData';

const decorItems = galleryItems.filter((i) => i.brand === 'decor');
const djItems = galleryItems.filter((i) => i.brand === 'dj');

export default function Gallery() {
  const [tab, setTab] = useState<'decor' | 'dj'>('decor');
  const { decor, dj } = businessConfig.brands;

  const tabClass = (on: boolean) =>
    `min-h-[52px] flex-1 rounded-full px-6 text-sm font-semibold uppercase tracking-[0.16em] transition ${on ? 'bg-charcoal text-gold shadow-lux' : 'text-charcoal/70 hover:text-gold-700'}`;

  return (
    <>
      <Seo
        title="Gallery"
        path="/gallery"
        description="Browse the Sparklingdecor decoration gallery and DJ MAJHAESTIC event atmosphere: weddings, Punjabi weddings, Jaago nights, birthdays, engagements, dance floors and DJ setups."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }])}
      />
      <PageHero
        title="Gallery"
        motto="Moments worth remembering."
        intro="A look at the celebrations we style and soundtrack. Tap any image to enlarge it."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
      />

      <section className="section-y bg-softwhite">
        <div className="container-x">
          <div role="tablist" aria-label="Choose a gallery" className="mx-auto flex max-w-xl gap-1 rounded-full border border-gold/30 bg-ivory p-1.5">
            <button role="tab" id="tab-decor" aria-selected={tab === 'decor'} aria-controls="panel-gallery" onClick={() => setTab('decor')} className={tabClass(tab === 'decor')}>
              {decor.name}
            </button>
            <button role="tab" id="tab-dj" aria-selected={tab === 'dj'} aria-controls="panel-gallery" onClick={() => setTab('dj')} className={tabClass(tab === 'dj')}>
              {dj.name}
            </button>
          </div>

          <div id="panel-gallery" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-12">
            {tab === 'decor' ? (
              <>
                <SectionHeading eyebrow={decor.name} title="Decoration Gallery" />
                <div className="mt-10">
                  <FilteredGallery key="decor" items={decorItems} filters={decorGalleryPageFilters} label="Filter decoration gallery" />
                </div>
              </>
            ) : (
              <>
                <SectionHeading eyebrow={dj.name} title="DJ Gallery" />
                <div className="mt-10">
                  <FilteredGallery key="dj" items={djItems} filters={djGalleryFilters} label="Filter DJ gallery" />
                </div>
              </>
            )}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="font-serif text-xl">Follow along for more of our latest work</p>
            <SocialLinks labeled />
          </div>
        </div>
      </section>

      <CTABanner heading="Love What You See?" text="Let's create something just as memorable for your celebration.">
        <Link to="/quote" className="btn btn-gold">Get a Quote</Link>
        <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
      </CTABanner>
    </>
  );
}
