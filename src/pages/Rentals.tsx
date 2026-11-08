import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Info } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import FilterChips from '../components/FilterChips';
import PageHero from '../components/PageHero';
import RentalCard from '../components/RentalCard';
import { useRentalEnquiry } from '../components/RentalEnquiry';
import Seo from '../components/Seo';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { rentalFilters, rentalItems } from '../data/rentals';
import { rentalPlaceholder } from '../data/images';
import { breadcrumbData } from '../utils/structuredData';

export default function Rentals() {
  const [params, setParams] = useSearchParams();
  const { openRentalEnquiry } = useRentalEnquiry();
  const requested = params.get('category') ?? 'all';
  const active = rentalFilters.find((f) => f.id === requested) ?? rentalFilters[0];

  const items = useMemo(
    () => (active.categories.length ? rentalItems.filter((i) => active.categories.includes(i.category)) : rentalItems),
    [active],
  );
  const hasSample = rentalItems.some((i) => i.sample);

  return (
    <>
      <Seo
        title="Decoration & Event Rentals"
        path="/rentals"
        description="Rent wedding decorations, backdrops, arches, floral arrangements, centrepieces, props, tables and chairs. Browse items and send a rental enquiry on WhatsApp."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Rentals', path: '/rentals' }])}
      />
      <PageHero
        title="Rentals"
        motto="Rent the look. Style your own celebration."
        image={rentalPlaceholder('arch')}
        imageAlt="Sample artwork of a decorative arch"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Rentals' }]}
        intro="Browse decoration pieces, backdrops, props, tables and chairs available for rent. Choose an item, send a rental enquiry, and we will confirm availability, pricing and delivery or pickup for your dates."
      >
        <button type="button" onClick={() => openRentalEnquiry()} className="btn btn-gold">Request a Rental</button>
        <WhatsAppButton context="rentals" topic="rentals" />
      </PageHero>

      <section className="section-y bg-softwhite">
        <div className="container-x">
          {businessConfig.ui.showSampleRentalNotice && hasSample && (
            <div className="mb-10 flex items-start gap-3 rounded-2xl border border-gold/40 bg-ivory p-5 text-sm text-charcoal/80" role="note">
              <Info className="mt-0.5 shrink-0 text-gold-700" size={20} />
              <p>
                These are sample listings and artwork while our full rental inventory is being added. Prices and availability are confirmed per enquiry — tap <strong>Request Rental</strong> and tell us your dates.
              </p>
            </div>
          )}

          <FilterChips
            label="Filter rental items"
            options={rentalFilters}
            value={active.id}
            onChange={(id) => setParams(id === 'all' ? {} : { category: id }, { replace: true })}
          />

          <p className="mt-6 text-center text-sm text-charcoal/60" aria-live="polite">
            Showing {items.length} item{items.length === 1 ? '' : 's'}
          </p>

          {items.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <li key={item.slug}>
                  <RentalCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-gold/40 p-10 text-center">
              <p className="font-serif text-xl">No items in this category yet.</p>
              <Link to="/rentals" className="btn btn-outline btn-sm mt-5">View all rentals</Link>
            </div>
          )}
        </div>
      </section>

      <CTABanner heading="Can't See What You Need?" text="Tell us what you're looking for — we'll let you know what we can offer for your event.">
        <button type="button" onClick={() => openRentalEnquiry()} className="btn btn-gold">Request a Rental</button>
        <WhatsAppButton context="rentals" />
      </CTABanner>
    </>
  );
}
