import { Link } from 'react-router-dom';
import { availabilityLabels, categoryLabel, type RentalItem } from '../data/rentals';
import { buildQuickMessage } from '../utils/whatsapp';
import ImageSlot from './ImageSlot';
import { useRentalEnquiry } from './RentalEnquiry';
import WhatsAppButton from './WhatsAppButton';

/** Rental product card: photo, name, description, price (or "Request Price"), availability, actions. */
export default function RentalCard({ item }: { item: RentalItem }) {
  const { openRentalEnquiry } = useRentalEnquiry();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-lux transition duration-500 hover:-translate-y-1 hover:shadow-gold">
      <Link to={`/rentals/${item.slug}`} className="relative block aspect-square overflow-hidden bg-ivory" aria-label={`View details: ${item.name}`}>
        <ImageSlot
          src={item.image.src}
          width={item.image.width}
          height={item.image.height}
          alt={`${item.name} — sample rental item artwork`}
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-700">{categoryLabel(item.category)}</p>
        <h3 className="mt-1.5 font-serif text-xl font-semibold">
          <Link to={`/rentals/${item.slug}`} className="hover:text-gold-700">{item.name}</Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-charcoal/70">{item.description}</p>
        <dl className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-4 text-sm">
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="font-semibold text-charcoal">{item.price || 'Request Price'}</dd>
          </div>
          <div>
            <dt className="sr-only">Availability</dt>
            <dd className="rounded-full bg-ivory px-3 py-1 text-xs font-medium text-charcoal/70">{availabilityLabels[item.availability]}</dd>
          </div>
        </dl>
        <div className="mt-4 grid gap-2.5">
          <button type="button" onClick={() => openRentalEnquiry(item.name)} className="btn btn-gold btn-sm w-full">
            Request Rental
          </button>
          <WhatsAppButton small className="w-full" message={buildQuickMessage('rentals', `renting the "${item.name}"`)} label="Ask on WhatsApp" />
        </div>
      </div>
    </article>
  );
}
