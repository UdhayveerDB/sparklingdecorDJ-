import { useState } from 'react';
import { eventTypes, guestRanges, contactServiceChoices } from '../data/options';
import { buildEnquiryMessage, whatsappUrl } from '../utils/whatsapp';
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
import { WhatsAppIcon } from './icons';

const initial = {
  name: '',
  phone: '',
  email: '',
  service: '',
  eventDate: '',
  eventLocation: '',
  eventType: '',
  guests: '',
  budget: '',
  message: '',
};

/** Contact enquiry form. On submit it validates, builds the WhatsApp message and opens WhatsApp. */
export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ message: string; url: string } | null>(null);
  const [opened, setOpened] = useState(false);

  const set = (key: keyof typeof initial, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setResult(null);
    setOpened(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = compact({
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      service: validateRequired(values.service, 'Please choose a service.'),
      eventDate: validateFutureDate(values.eventDate, 'event date', false),
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select`)?.focus();
      return;
    }
    const choice = contactServiceChoices.find((c) => c.label === values.service);
    const message = buildEnquiryMessage({
      services: choice?.services ?? ['decor'],
      name: values.name,
      phone: values.phone,
      email: values.email,
      eventType: values.eventType,
      eventDate: values.eventDate,
      eventLocation: values.eventLocation,
      guests: values.guests,
      budget: values.budget,
      notes: values.message,
    });
    const url = whatsappUrl(message);
    setResult({ message, url });
    setOpened(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card-lux space-y-5 p-6 sm:p-10" aria-label="Contact enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div data-field="name">
          <TextField label="Full name" required autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        </div>
        <div data-field="phone">
          <TextField label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 416 555 0100" value={values.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
        </div>
        <div data-field="email" className="sm:col-span-2">
          <TextField label="Email address" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
        </div>
        <div data-field="service">
          <SelectField label="Service interested in" required value={values.service} onChange={(e) => set('service', e.target.value)} error={errors.service}>
            <option value="">Select a service</option>
            {contactServiceChoices.map((c) => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </SelectField>
        </div>
        <SelectField label="Event type" value={values.eventType} onChange={(e) => set('eventType', e.target.value)}>
          <option value="">Select event type</option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectField>
        <div data-field="eventDate">
          <TextField label="Event date" type="date" min={todayISO()} value={values.eventDate} onChange={(e) => set('eventDate', e.target.value)} error={errors.eventDate} />
        </div>
        <TextField label="Event location" placeholder="Venue name or city" value={values.eventLocation} onChange={(e) => set('eventLocation', e.target.value)} />
        <SelectField label="Estimated guest count" value={values.guests} onChange={(e) => set('guests', e.target.value)}>
          <option value="">Select a range</option>
          {guestRanges.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </SelectField>
        <TextField label="Budget range" placeholder="e.g. a figure, a range, or 'flexible'" value={values.budget} onChange={(e) => set('budget', e.target.value)} />
      </div>
      <TextAreaField label="Additional message" value={values.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us about your ideas, colours, music or anything else." />

      <button type="submit" className="btn btn-wa w-full sm:w-auto">
        <WhatsAppIcon size={20} /> Send Enquiry on WhatsApp
      </button>
      <p className="text-sm text-charcoal/60">
        This opens WhatsApp with your message ready. Nothing is sent until you press Send inside WhatsApp.
      </p>

      {result && (
        <div className="border-t border-gold/25 pt-6" aria-live="polite">
          <WhatsAppSendPanel message={result.message} url={result.url} opened={opened} onOpened={() => setOpened(true)} />
        </div>
      )}
    </form>
  );
}
