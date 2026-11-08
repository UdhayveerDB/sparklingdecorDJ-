import { useSearchParams } from 'react-router-dom';
import BookingWizard from '../components/BookingWizard';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { eventTypes, type ServiceKey } from '../data/options';
import { getRentalItem } from '../data/rentals';

const validServices: ServiceKey[] = ['decor', 'dj', 'rentals'];

/** Unified quote/booking page. Supports ?service=decor,dj  &event=Birthday Party  &rental=item-slug */
export default function Quote() {
  const [params] = useSearchParams();
  const services = (params.get('service') ?? '')
    .split(',')
    .filter((s): s is ServiceKey => validServices.includes(s as ServiceKey));
  const event = params.get('event') ?? '';
  const eventType = (eventTypes as readonly string[]).includes(event) ? event : '';
  const rental = getRentalItem(params.get('rental') ?? undefined);
  const initialServices: ServiceKey[] = rental && !services.includes('rentals') ? [...services, 'rentals'] : services;

  return (
    <>
      <Seo
        title="Get a Quote"
        path="/quote"
        description="Request a quote for event decorations, DJ MAJHAESTIC and rentals. Share your event details in a few quick steps and send your enquiry on WhatsApp."
      />
      <PageHero
        title="Get a Quote"
        intro="A few quick steps — then your enquiry opens in WhatsApp, ready for you to review and send."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Get a Quote' }]}
      />
      <section className="section-y bg-softwhite">
        <div className="container-x">
          <BookingWizard
            key={`${initialServices.join(',')}|${eventType}|${rental?.slug ?? ''}`}
            initialServices={initialServices}
            initialEventType={eventType}
            initialRentalItem={rental?.name}
          />
        </div>
      </section>
    </>
  );
}
