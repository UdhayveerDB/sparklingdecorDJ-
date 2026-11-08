import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';
import RentalCard from '../components/RentalCard';
import { useRentalEnquiry } from '../components/RentalEnquiry';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import WhatsAppButton from '../components/WhatsAppButton';
import { availabilityLabels, categoryLabel, getRentalItem, rentalItems } from '../data/rentals';
import { buildQuickMessage } from '../utils/whatsapp';
import { breadcrumbData } from '../utils/structuredData';
import NotFound from './NotFound';

export default function RentalDetail() {
  const { slug } = useParams();
  const item = getRentalItem(slug);
  const { openRentalEnquiry } = useRentalEnquiry();
  if (!item) return <NotFound />;

  const related = rentalItems.filter((r) => r.category === item.category && r.slug !== item.slug);
  const more = (related.length >= 3 ? related : [...related, ...rentalItems.filter((r) => r.category !== item.category && r.slug !== item.slug)]).slice(0, 4);

  return (
    <>
      <Seo
        title={`${item.name} — Rental`}
        path={`/rentals/${item.slug}`}
        description={`${item.name} available to rent. ${item.description} Request price and availability for your event.`}
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Rentals', path: '/rentals' }, { name: item.name, path: `/rentals/${item.slug}` }])}
      />
      <section className="bg-softwhite pb-16 pt-8 sm:pb-24">
        <div className="container-x">
          <Link to="/rentals" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-700 hover:underline">
            <ArrowLeft size={16} /> All rentals
          </Link>

          <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-ivory shadow-lux">
              <ImageSlot src={item.image.src} width={item.image.width} height={item.image.height} alt={`${item.name} — sample rental item artwork`} priority sizes="(min-width:1024px) 50vw, 100vw" className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="eyebrow">{categoryLabel(item.category)}</p>
              <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{item.name}</h1>
              <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{item.longDescription}</p>

              <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-ivory p-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Price</dt>
                  <dd className="mt-1 font-serif text-xl font-semibold">{item.price || 'Request Price'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Availability</dt>
                  <dd className="mt-1 font-medium">{availabilityLabels[item.availability]}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openRentalEnquiry(item.name)} className="btn btn-gold">Request Rental</button>
                <WhatsAppButton message={buildQuickMessage('rentals', `renting the "${item.name}"`)} label="Ask on WhatsApp" />
              </div>
              {item.sample && <p className="mt-5 text-sm text-charcoal/55">Sample listing — details are confirmed when you enquire.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="You may also like" title="More To Rent" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((r) => (
              <li key={r.slug}><RentalCard item={r} /></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
