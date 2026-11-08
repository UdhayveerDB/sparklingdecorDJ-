import { useSearchParams } from 'react-router-dom';
import BookingWizard from '../components/BookingWizard';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { businessConfig } from '../config/business';
import { eventTypes } from '../data/options';
import { breadcrumbData } from '../utils/structuredData';

export default function DjBooking() {
  const [params] = useSearchParams();
  const event = params.get('event') ?? '';
  const eventType = (eventTypes as readonly string[]).includes(event) ? event : '';

  return (
    <>
      <Seo
        title="Book a Punjabi DJ"
        path="/dj/book"
        description="Book DJ MAJHAESTIC for your wedding, Jaago night, birthday or private event. Share your date and music preferences and send your enquiry on WhatsApp."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'DJ MAJHAESTIC', path: '/dj' }, { name: 'Book a DJ', path: '/dj/book' }])}
      />
      <PageHero
        variant="dj"
        title="Book The DJ"
        motto={businessConfig.brands.dj.motto}
        intro="Tell us about your celebration, your music preferences, and your event date. Let's make it sound Majhaestic."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'DJ MAJHAESTIC', to: '/dj' }, { label: 'Book a DJ' }]}
      />
      <section className="section-y bg-softwhite">
        <div className="container-x">
          <BookingWizard key={eventType} initialServices={['dj']} initialEventType={eventType} />
        </div>
      </section>
    </>
  );
}
