import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Sparkle } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import GalleryGrid from '../components/GalleryGrid';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import ServiceCard from '../components/ServiceCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { decorCategories, getDecorCategory } from '../data/decorations';
import { galleryForKey } from '../data/gallery';
import { buildQuickMessage } from '../utils/whatsapp';
import { breadcrumbData } from '../utils/structuredData';
import NotFound from './NotFound';

/** One template for every decoration category page (English Weddings, Punjabi Weddings, ...). */
export default function DecorCategoryPage() {
  const { slug } = useParams();
  const cat = getDecorCategory(slug);
  if (!cat) return <NotFound />;

  const gallery = galleryForKey(cat.galleryKey);
  const related = decorCategories.filter((c) => c.slug !== cat.slug).slice(0, 4);
  const quoteLink = `/quote?service=decor&event=${encodeURIComponent(cat.eventType)}`;

  return (
    <>
      <Seo
        title={`${cat.title} Decoration`}
        path={`/decorations/${cat.slug}`}
        description={cat.metaDescription}
        jsonLd={breadcrumbData([
          { name: 'Home', path: '/' },
          { name: 'Decorations', path: '/decorations' },
          { name: cat.title, path: `/decorations/${cat.slug}` },
        ])}
      />
      <PageHero
        eyebrow={businessConfig.brands.decor.name}
        title={cat.title}
        motto={businessConfig.brands.decor.motto}
        intro={cat.intro}
        image={cat.image}
        imageAlt={`${cat.title} — sample decoration artwork`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Decorations', to: '/decorations' }, { label: cat.title }]}
      >
        <Link to={quoteLink} className="btn btn-gold">Request a Quote</Link>
        <WhatsAppButton context="decor" topic={`${cat.title.toLowerCase()} decoration`} />
      </PageHero>

      <section className="section-y bg-softwhite">
        <div className="container-x">
          <SectionHeading eyebrow="What we can style" title={`${cat.title} Services`} intro="Every setup is personalised. Tell us your ideas and we will talk through what is possible." />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {cat.items.map((it, i) => (
              <Reveal key={it} delay={(i % 2) * 0.07}>
                <li className="flex items-center gap-4 rounded-2xl border border-gold/25 bg-white p-5 shadow-lux">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-700">
                    <Sparkle size={16} className="fill-current" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{it}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title={`${cat.title} Inspiration`} />
          <div className="mt-12">
            <GalleryGrid items={gallery} emptyMessage="Photos for this category will be added soon." />
          </div>
        </div>
      </section>

      <section className="section-y bg-softwhite">
        <div className="container-x">
          <SectionHeading eyebrow="Keep exploring" title="More Decoration Styles" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c) => (
              <ServiceCard key={c.slug} title={c.title} description={c.short} image={c.image} to={`/decorations/${c.slug}`} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/decorations" className="btn btn-outline">All Decoration Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <CTABanner variant="blush" heading="Have A Vision? Let's Bring It To Life.">
        <Link to={quoteLink} className="btn btn-dark">Request a Decoration Quote</Link>
        <WhatsAppButton message={buildQuickMessage('decor', `${cat.title.toLowerCase()} decoration`)} />
      </CTABanner>
    </>
  );
}
