import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Disc3, Package, Sparkles } from 'lucide-react';
import {
  eventTypes,
  guestRanges,
  musicPreferences,
  serviceLabels,
  serviceOptions,
  type ServiceKey,
} from '../data/options';
import { rentalItems } from '../data/rentals';
import { buildEnquiryMessage, formatDate, greetingBrand, whatsappUrl, type EnquiryData } from '../utils/whatsapp';
import {
  compact,
  todayISO,
  validateEmail,
  validateFutureDate,
  validateName,
  validatePhone,
  validateRequired,
  type Errors,
} from '../utils/validation';
import { SelectField, TextAreaField, TextField } from './Field';
import WhatsAppSendPanel from './WhatsAppSendPanel';

interface WizardState {
  services: ServiceKey[];
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guests: string;
  decorRequirements: string;
  musicPreferences: string[];
  djRequirements: string;
  rentalItems: string[];
  rentalRequirements: string;
  budget: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
}

interface BookingWizardProps {
  initialServices?: ServiceKey[];
  initialEventType?: string;
  initialRentalItem?: string;
}

const STEPS = ['Services', 'Event', 'Details', 'Contact', 'Review'] as const;
const icons: Record<ServiceKey, typeof Sparkles> = { decor: Sparkles, dj: Disc3, rentals: Package };

export default function BookingWizard({ initialServices, initialEventType, initialRentalItem }: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const [state, setState] = useState<WizardState>({
    services: initialServices?.length ? initialServices : [],
    eventType: initialEventType ?? '',
    eventDate: '',
    eventLocation: '',
    guests: '',
    decorRequirements: '',
    musicPreferences: [],
    djRequirements: '',
    rentalItems: initialRentalItem ? [initialRentalItem] : [],
    rentalRequirements: '',
    budget: '',
    notes: '',
    name: '',
    phone: '',
    email: '',
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const set = <K extends keyof WizardState>(key: K, value: WizardState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key]: undefined }));
    setOpened(false);
  };

  const toggleIn = (key: 'services' | 'musicPreferences' | 'rentalItems', value: string) => {
    setState((s) => {
      const list = s[key] as string[];
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...s, [key]: next } as WizardState;
    });
    if (key === 'services') setErrors((e) => ({ ...e, services: undefined }));
    setOpened(false);
  };

  const validate = (s: number): Errors => {
    switch (s) {
      case 0:
        return compact({ services: state.services.length ? undefined : 'Please choose at least one service.' });
      case 1:
        return compact({
          eventType: validateRequired(state.eventType, 'Please choose your event type.'),
          eventDate: validateFutureDate(state.eventDate),
          eventLocation: validateRequired(state.eventLocation, 'Please tell us where the event is taking place.'),
        });
      case 3:
        return compact({
          name: validateName(state.name),
          phone: validatePhone(state.phone),
          email: validateEmail(state.email),
        });
      default:
        return {};
    }
  };

  const next = () => {
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const data: EnquiryData = useMemo(
    () => ({
      services: state.services,
      name: state.name,
      phone: state.phone,
      email: state.email,
      eventType: state.eventType,
      eventDate: state.eventDate,
      eventLocation: state.eventLocation,
      guests: state.guests,
      decorRequirements: state.decorRequirements,
      djRequirements: state.djRequirements,
      musicPreferences: state.musicPreferences,
      rentalRequirements: state.rentalRequirements,
      rentalItems: state.rentalItems,
      budget: state.budget,
      notes: state.notes,
    }),
    [state],
  );

  const has = (k: ServiceKey) => state.services.includes(k);
  const selectionLabel = state.services.length
    ? state.services.map((k) => serviceLabels[k]).join(' + ')
    : 'Nothing selected yet';

  const message = step === 4 ? buildEnquiryMessage(data) : '';

  return (
    <div ref={topRef} className="mx-auto max-w-3xl">
      {/* Progress */}
      <nav aria-label="Booking progress" className="mb-8">
        <ol className="flex items-center justify-between gap-1">
          {STEPS.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className="flex flex-1 flex-col items-center gap-2" aria-current={current ? 'step' : undefined}>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    current
                      ? 'border-gold bg-gold text-charcoal shadow-gold'
                      : done
                        ? 'border-gold bg-gold/15 text-gold-700'
                        : 'border-charcoal/20 text-charcoal/45'
                  }`}
                >
                  {done ? <Check size={18} /> : i + 1}
                </span>
                <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:text-xs ${current ? 'text-gold-700' : 'text-charcoal/50'}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="card-lux p-6 sm:p-10">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 4) next();
          }}
        >
          {/* STEP 0 — services */}
          {step === 0 && (
            <section aria-labelledby="step-title">
              <h2 id="step-title" ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold outline-none sm:text-3xl">
                What can we help you with?
              </h2>
              <p className="mt-2 text-charcoal/65">Choose one or more — mix and match as you like.</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3" role="group" aria-label="Services">
                {serviceOptions.map((o) => {
                  const on = has(o.key);
                  const Icon = icons[o.key];
                  return (
                    <button
                      key={o.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleIn('services', o.key)}
                      className={`relative flex min-h-[132px] flex-col items-start gap-2 rounded-2xl border p-5 text-left transition ${
                        on ? 'border-gold bg-gold/10 shadow-gold' : 'border-charcoal/15 hover:border-gold/70'
                      }`}
                    >
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${on ? 'bg-gold text-charcoal' : 'bg-ivory text-gold-700'}`}>
                        <Icon size={20} />
                      </span>
                      <span className="font-serif text-lg font-semibold">{o.title}</span>
                      <span className="text-sm text-charcoal/65">{o.blurb}</span>
                      {on && <Check size={18} className="absolute right-4 top-4 text-gold-700" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="self-center text-sm text-charcoal/55">Quick picks:</span>
                <button type="button" className="min-h-[44px] rounded-full border border-gold/50 px-4 text-sm font-medium text-gold-700 hover:bg-gold/10" onClick={() => { setState((s) => ({ ...s, services: ['decor', 'dj'] })); setErrors({}); }}>
                  Decorations + DJ
                </button>
                <button type="button" className="min-h-[44px] rounded-full border border-gold/50 px-4 text-sm font-medium text-gold-700 hover:bg-gold/10" onClick={() => { setState((s) => ({ ...s, services: ['decor', 'dj', 'rentals'] })); setErrors({}); }}>
                  Decorations + DJ + Rentals
                </button>
              </div>

              <p className="mt-5 text-sm font-medium text-charcoal/80" aria-live="polite">
                You&rsquo;re enquiring about: <span className="text-gold-700">{selectionLabel}</span>
              </p>
              {errors.services && <p role="alert" className="field-error">{errors.services}</p>}
            </section>
          )}

          {/* STEP 1 — event */}
          {step === 1 && (
            <section aria-labelledby="step-title">
              <h2 id="step-title" ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold outline-none sm:text-3xl">
                Tell us about your event
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <SelectField label="Event type" required value={state.eventType} onChange={(e) => set('eventType', e.target.value)} error={errors.eventType}>
                  <option value="">Select event type</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </SelectField>
                <TextField label="Event date" required type="date" min={todayISO()} value={state.eventDate} onChange={(e) => set('eventDate', e.target.value)} error={errors.eventDate} />
                <div className="sm:col-span-2">
                  <TextField label="Event location" required placeholder="Venue name or city" value={state.eventLocation} onChange={(e) => set('eventLocation', e.target.value)} error={errors.eventLocation} autoComplete="off" />
                </div>
                <SelectField label="Expected guests" value={state.guests} onChange={(e) => set('guests', e.target.value)}>
                  <option value="">Select a range</option>
                  {guestRanges.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </SelectField>
              </div>
            </section>
          )}

          {/* STEP 2 — details per service */}
          {step === 2 && (
            <section aria-labelledby="step-title">
              <h2 id="step-title" ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold outline-none sm:text-3xl">
                Your ideas &amp; preferences
              </h2>
              <p className="mt-2 text-charcoal/65">Everything here is optional — share as much or as little as you like.</p>
              <div className="mt-6 space-y-8">
                {has('decor') && (
                  <fieldset className="space-y-3">
                    <legend className="font-serif text-lg font-semibold text-gold-700">Decorations</legend>
                    <TextAreaField label="Decoration requirements" placeholder="Theme, colours, stage or backdrop ideas, inspiration..." value={state.decorRequirements} onChange={(e) => set('decorRequirements', e.target.value)} />
                  </fieldset>
                )}
                {has('dj') && (
                  <fieldset className="space-y-3">
                    <legend className="font-serif text-lg font-semibold text-gold-700">DJ MAJHAESTIC</legend>
                    <p className="text-sm text-charcoal/65">Music you&rsquo;d like to hear (choose any):</p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Music preferences">
                      {musicPreferences.map((m) => {
                        const on = state.musicPreferences.includes(m);
                        return (
                          <button key={m} type="button" aria-pressed={on} onClick={() => toggleIn('musicPreferences', m)} className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition ${on ? 'border-gold bg-gold text-charcoal' : 'border-charcoal/20 hover:border-gold'}`}>
                            {m}
                          </button>
                        );
                      })}
                    </div>
                    <TextAreaField label="DJ requirements" placeholder="Must-play songs, songs to avoid, set times, special announcements..." value={state.djRequirements} onChange={(e) => set('djRequirements', e.target.value)} />
                  </fieldset>
                )}
                {has('rentals') && (
                  <fieldset className="space-y-3">
                    <legend className="font-serif text-lg font-semibold text-gold-700">Rentals</legend>
                    <p className="text-sm text-charcoal/65">Items you&rsquo;re interested in (choose any):</p>
                    <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto" role="group" aria-label="Rental items">
                      {rentalItems.map((r) => {
                        const on = state.rentalItems.includes(r.name);
                        return (
                          <button key={r.slug} type="button" aria-pressed={on} onClick={() => toggleIn('rentalItems', r.name)} className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition ${on ? 'border-gold bg-gold text-charcoal' : 'border-charcoal/20 hover:border-gold'}`}>
                            {r.name}
                          </button>
                        );
                      })}
                    </div>
                    <TextAreaField label="Rental requirements" placeholder="Quantities, dates needed, delivery or pickup..." value={state.rentalRequirements} onChange={(e) => set('rentalRequirements', e.target.value)} />
                  </fieldset>
                )}
                <div className="grid gap-5">
                  <TextField label="Estimated budget" placeholder="e.g. a figure, a range, or 'flexible'" value={state.budget} onChange={(e) => set('budget', e.target.value)} />
                  <TextAreaField label="Anything else we should know?" value={state.notes} onChange={(e) => set('notes', e.target.value)} />
                </div>
              </div>
            </section>
          )}

          {/* STEP 3 — contact */}
          {step === 3 && (
            <section aria-labelledby="step-title">
              <h2 id="step-title" ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold outline-none sm:text-3xl">
                How can we reach you?
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <TextField label="Full name" required autoComplete="name" value={state.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
                <TextField label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 416 555 0100" value={state.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
                <div className="sm:col-span-2">
                  <TextField label="Email address" type="email" inputMode="email" autoComplete="email" value={state.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
                </div>
              </div>
            </section>
          )}

          {/* STEP 4 — review & confirm */}
          {step === 4 && (
            <section aria-labelledby="step-title">
              <h2 id="step-title" ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold outline-none sm:text-3xl">
                Review &amp; confirm
              </h2>
              <p className="mt-2 text-charcoal/65">
                Your enquiry will go to <strong className="text-charcoal">{greetingBrand(state.services)}</strong>. Check the details, then continue to WhatsApp.
              </p>

              <dl className="mt-6 grid gap-x-8 gap-y-4 rounded-2xl bg-ivory p-5 text-sm sm:grid-cols-2">
                {[
                  ['Services', selectionLabel, 0],
                  ['Event', `${state.eventType} · ${formatDate(state.eventDate)}`, 1],
                  ['Location', state.eventLocation, 1],
                  ['Guests', state.guests || 'Not specified', 1],
                  ['Name', state.name, 3],
                  ['Phone', state.phone, 3],
                ].map(([k, v, s]) => (
                  <div key={String(k)} className="flex items-start justify-between gap-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">{k}</dt>
                      <dd className="mt-0.5 font-medium text-charcoal">{v}</dd>
                    </div>
                    <button type="button" onClick={() => { setErrors({}); setStep(Number(s)); }} className="min-h-[44px] px-2 text-xs font-semibold uppercase tracking-wider text-gold-700 underline-offset-4 hover:underline">
                      Edit
                    </button>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <WhatsAppSendPanel message={message} url={whatsappUrl(message)} opened={opened} onOpened={() => setOpened(true)} />
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={back} className="btn btn-outline btn-sm">
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 && (
              <button type="submit" className="btn btn-gold">
                {step === 3 ? 'Review Enquiry' : 'Continue'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
