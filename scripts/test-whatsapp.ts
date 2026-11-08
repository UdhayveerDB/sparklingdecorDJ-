/**
 * Quick sanity test for the WhatsApp message builders. Run: npm run test:whatsapp
 */
import {
  buildEnquiryMessage,
  buildQuickMessage,
  buildRentalMessage,
  formatDate,
  greetingBrand,
  whatsappUrl,
} from '../src/utils/whatsapp';
import { validatePhone, validateQuantity } from '../src/utils/validation';

let failed = 0;
function check(name: string, cond: boolean) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failed++;
}

const full = buildEnquiryMessage({
  services: ['decor', 'dj', 'rentals'],
  name: 'Asha & "Raj" Singh',
  phone: '+1 416 555 0100',
  email: 'asha@example.com',
  eventType: 'Punjabi Wedding',
  eventDate: '2027-03-14',
  eventLocation: 'Toronto, ON',
  guests: '200 – 350',
  decorRequirements: 'Gold & burgundy stage – marigolds!',
  djRequirements: 'No explicit songs',
  musicPreferences: ['Punjabi', 'Bhangra'],
  rentalItems: ['Floral Wedding Arch'],
  rentalRequirements: '2 arches',
  budget: 'Flexible',
  notes: 'Line one\nLine two & more #1',
});
console.log('\n--- FULL MESSAGE ---\n' + full + '\n--------------------\n');

check('greets both brands', full.startsWith('Hello Sparklingdecor and DJ MAJHAESTIC!'));
check('includes all sections', ['CUSTOMER DETAILS', 'EVENT DETAILS', 'SERVICE DETAILS'].every((s) => full.includes(s)));
check('date formatted', full.includes('Sunday, 14 March 2027'));
check('includes music prefs', full.includes('Music: Punjabi, Bhangra'));

const url = whatsappUrl(full);
check('url uses wa.me with encoded text', url.startsWith('https://wa.me/') && url.includes('?text='));
const decoded = decodeURIComponent(url.split('?text=')[1]);
check('round-trips special characters (& # " newline)', decoded === full);
check('no raw newline/space/& in query', !/[ \n&#"]/.test(url.split('?text=')[1]));

const decorOnly = buildEnquiryMessage({ services: ['decor'], name: 'A', phone: '1234567' });
check('decor-only brand', decorOnly.startsWith('Hello Sparklingdecor!'));
check('empty optional fields handled', decorOnly.includes('Email: Not specified') && decorOnly.includes('Event Date: Not specified'));
check('DJ section omitted when not selected', !decorOnly.includes('DJ Requirements'));

const djOnly = buildEnquiryMessage({ services: ['dj'], name: 'A', phone: '1234567' });
check('dj-only brand', djOnly.startsWith('Hello DJ MAJHAESTIC!') && djOnly.includes('DJ Requirements: Not specified'));
check('rentals-only brand', greetingBrand(['rentals']) === 'Sparklingdecor');

const rental = buildRentalMessage({
  name: 'Sam', phone: '4165550100', item: 'Floral Wedding Arch', quantity: '2',
  startDate: '2027-03-13', returnDate: '2027-03-15', delivery: 'Delivery',
});
check('rental has own template', rental.includes('renting an item') && rental.includes('*RENTAL DETAILS*'));
check('rental end date formatted', rental.includes('Monday, 15 March 2027'));
check('quick message', buildQuickMessage('dj', 'Punjabi DJ').startsWith('Hello DJ MAJHAESTIC!'));
check('bad date falls back', formatDate('garbage') === 'garbage' && formatDate('') === 'Not specified');
check('phone validation', !!validatePhone('abc') && !validatePhone('+1 (416) 555-0100'));
check('quantity validation', !!validateQuantity('0') && !!validateQuantity('1.5') && !validateQuantity('3'));

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log('\nAll WhatsApp checks passed.');
