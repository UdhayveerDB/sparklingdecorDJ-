import { Link } from 'react-router-dom';
import { ArrowRight, Sparkle } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import FaqSection from '../components/FaqSection';
import FilteredGallery from '../components/FilteredGallery';
import ImageSlot from '../components/ImageSlot';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { decorCategories, mainDecorCategories } from '../data/decorations';
import { decorGalleryFilters, galleryItems } from '../data/gallery';
import { decorPlaceholder } from '../data/images';
import { breadcrumbData } from '../utils/structuredData';

const decorGallery = galleryItems.filter((i) => i.brand === 'decor');
const extras = decorCategories.filter((c) => !c.letter);

export default function Decorations() {
  const { decor } = businessConfig.brands;
  return (
    <>
      <Seo
        title="Event Decorations"
        path="/decorations"
        description="Sparklingdecor — Turning Moments Into Memories. Event decoration for English weddings, Punjabi weddings, Jaago nights, birthdays, engagements, Haldi & Mehndi and more. Request a quote."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Decorations', path: '/decorations' }])}
      />
      <PageHero
        title={decor.name}
        motto={decor.motto}
        image={decorPlaceholder('english', 1)}
        imageAlt="Sample artwork of an elegant floral wedding arch"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Decorations' }]}
        intro="At Sparklingdecor, we specialise in transforming ordinary spaces into extraordinary celebrations. Whether you envision an elegant English wedding, a vibrant Punjabi wedding, a traditional Jaago night, or an intimate birthday celebration, we bring creativity and attention to detail to every event. Our goal is to create an atmosphere that reflects your personality, your vision, and the memories you want to cherish forever."
      >
        <Link to="/quote?service=decor" className="btn btn-gold">Request a Decoration Quote</Link>
        <WhatsAppButton context="decor" topic="decoration services" label="Chat on WhatsApp" />
      </PageHero>

      {/* Category sections A–G */}
      <section className="section-y bg-softwhite">
        <div className="container-x space-y-20 sm:space-y-28">
          <SectionHeading eyebrow="Our decoration services" title="A Style For Every Celebration" />
          {mainDecorCategories.map((c, i) => (
            <Reveal key={c.slug}>
              <article id={c.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={`relative overflow-hidden rounded-3xl shadow-lux ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3]">
                    <ImageSlot src={c.image.src} width={c.image.width} height={c.image.height} alt={`${c.title} — sample decoration artwork`} sizes="(min-width:1024px) 50vw, 100vw" className="h-full w-full object-cover" />
                  </div>
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-xl font-semibold text-charcoal">{c.letter}</span>
                </div>
                <div>
                  <p className="eyebrow">Category {c.letter}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{c.title}</h3>
                  <p className="mt-4 leading-relaxed text-charcoal/70 sm:text-lg">{c.intro}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-charcoal/85">
                        <Sparkle size={14} className="mt-1.5 shrink-0 fill-gold text-gold" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to={`/decorations/${c.slug}`} className="btn btn-dark">Explore {c.title} <ArrowRight size={16} /></Link>
                    <WhatsAppButton context="decor" topic={c.title.toLowerCase() + ' decoration'} label="WhatsApp Us" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* More ways we style */}
      <section className="bg-ivory py-14">
        <div className="container-x flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow">Also available</p>
            <p className="mt-1 font-serif text-2xl font-semibold">Receptions &amp; fully custom decorations</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {extras.map((e) => (
              <Link key={e.slug} to={`/decorations/${e.slug}`} className="btn btn-outline btn-sm">{e.title}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-y bg-softwhite">
        <div className="container-x">
          <SectionHeading eyebrow="Decoration gallery" title="See The Styling" intro="Filter by celebration type and tap any image to enlarge it." />
          <div className="mt-12">
            <FilteredGallery items={decorGallery} filters={decorGalleryFilters} label="Filter decoration gallery" />
          </div>
        </div>
      </section>

      <FaqSection limit={4} />

      <CTABanner variant="blush" heading="Have A Vision? Let's Bring It To Life.">
        <Link to="/quote?service=decor" className="btn btn-dark">Request a Decoration Quote</Link>
        <WhatsAppButton context="decor" />
      </CTABanner>
    </>
  );
}
