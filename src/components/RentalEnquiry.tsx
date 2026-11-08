import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { rentalItems } from '../data/rentals';
import { deliveryPreferences } from '../data/options';
import { buildRentalMessage, whatsappUrl } from '../utils/whatsapp';
import {
  compact,
  todayISO,
  validateEmail,
  validateFutureDate,
  validateName,
  validatePhone,
  validateQuantity,
  validateRequired,
  type Errors,
} from '../utils/validation';
import { SelectField, TextAreaField, TextField } from './Field';
import WhatsAppSendPanel from './WhatsAppSendPanel';
import { WhatsAppIcon } from './icons';

interface RentalEnquiryContextValue {
  /** Opens the rental enquiry form; optionally pre-select an item by name */
  openRentalEnquiry: (itemName?: string) => void;
}

const Ctx = createContext<RentalEnquiryContextValue>({ openRentalEnquiry: () => undefined });
export const useRentalEnquiry = () => useContext(Ctx);

const OTHER = 'Other item (describe below)';

const blank = {
  name: '',
  phone: '',
  email: '',
  item: '',
  quantity: '1',
  startDate: '',
  returnDate: '',
  eventDate: '',
  delivery: '',
  requirements: '',
};

function RentalEnquiryModal({ initialItem, onClose }: { initialItem: string; onClose: () => void }) {
  const [values, setValues] = useState({ ...blank, item: initialItem });
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ message: string; url: string } | null>(null);
  const [opened, setOpened] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // focus handling, scroll lock, Escape and focus trap
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  const set = (key: keyof typeof blank, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setResult(null);
    setOpened(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = compact({
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      item: validateRequired(values.item, 'Please choose a rental item.'),
      quantity: validateQuantity(values.quantity),
      startDate: validateFutureDate(values.startDate, 'rental start date'),
      returnDate: validateFutureDate(values.returnDate, 'rental return date'),
      eventDate: validateFutureDate(values.eventDate, 'event date', false),
    });
    if (!errs.returnDate && !errs.startDate && values.returnDate < values.startDate) {
      errs.returnDate = 'The return date must be on or after the start date.';
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      dialogRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select`)?.focus();
      return;
    }
    const message = buildRentalMessage({
      name: values.name,
      phone: values.phone,
      email: values.email,
      item: values.item,
      quantity: values.quantity,
      startDate: values.startDate,
      returnDate: values.returnDate,
      eventDate: values.eventDate,
      delivery: values.delivery,
      requirements: values.requirements,
    });
    const url = whatsappUrl(message);
    setResult({ message, url });
    setOpened(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rental-title"
        className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-softwhite p-6 shadow-2xl sm:rounded-3xl sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Rental enquiry</p>
            <h2 id="rental-title" className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Request a Rental</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close rental enquiry" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-charcoal/15 hover:bg-ivory">
            <X />
          </button>
        </div>

        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-field="name"><TextField label="Customer name" required autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} error={errors.name} /></div>
            <div data-field="phone"><TextField label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} /></div>
            <div data-field="email" className="sm:col-span-2"><TextField label="Email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} error={errors.email} /></div>
            <div data-field="item">
              <SelectField label="Rental item" required value={values.item} onChange={(e) => set('item', e.target.value)} error={errors.item}>
                <option value="">Select an item</option>
                {rentalItems.map((r) => (
                  <option key={r.slug} value={r.name}>{r.name}</option>
                ))}
                <option value={OTHER}>{OTHER}</option>
              </SelectField>
            </div>
            <div data-field="quantity"><TextField label="Quantity" required type="number" min={1} inputMode="numeric" value={values.quantity} onChange={(e) => set('quantity', e.target.value)} error={errors.quantity} /></div>
            <div data-field="startDate"><TextField label="Rental start date" required type="date" min={todayISO()} value={values.startDate} onChange={(e) => set('startDate', e.target.value)} error={errors.startDate} /></div>
            <div data-field="returnDate"><TextField label="Rental return date" required type="date" min={values.startDate || todayISO()} value={values.returnDate} onChange={(e) => set('returnDate', e.target.value)} error={errors.returnDate} /></div>
            <div data-field="eventDate"><TextField label="Event date" type="date" min={todayISO()} value={values.eventDate} onChange={(e) => set('eventDate', e.target.value)} error={errors.eventDate} /></div>
            <SelectField label="Delivery or pickup" value={values.delivery} onChange={(e) => set('delivery', e.target.value)}>
              <option value="">Select a preference</option>
              {deliveryPreferences.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </SelectField>
          </div>
          <TextAreaField label="Additional requirements" value={values.requirements} onChange={(e) => set('requirements', e.target.value)} />

          <button type="submit" className="btn btn-wa w-full sm:w-auto">
            <WhatsAppIcon size={20} /> Send Enquiry on WhatsApp
          </button>
          <p className="text-sm text-charcoal/60">Opens WhatsApp with your message ready — nothing is sent until you press Send in WhatsApp.</p>
        </form>

        {result && (
          <div className="mt-6 border-t border-gold/25 pt-6" aria-live="polite">
            <WhatsAppSendPanel message={result.message} url={result.url} opened={opened} onOpened={() => setOpened(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export function RentalEnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; item: string; key: number }>({ open: false, item: '', key: 0 });
  const openRentalEnquiry = useCallback(
    (itemName?: string) => setState((s) => ({ open: true, item: itemName ?? '', key: s.key + 1 })),
    [],
  );
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ openRentalEnquiry }), [openRentalEnquiry]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {state.open && <RentalEnquiryModal key={state.key} initialItem={state.item} onClose={close} />}
    </Ctx.Provider>
  );
}
