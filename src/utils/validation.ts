export type Errors<T extends string = string> = Partial<Record<T, string>>;

export const isBlank = (v: string | undefined | null) => !v || v.trim().length === 0;

export function validateName(v: string): string | undefined {
  if (isBlank(v)) return 'Please enter your name.';
  if (v.trim().length < 2) return 'Name looks too short.';
  return undefined;
}

export function validatePhone(v: string): string | undefined {
  if (isBlank(v)) return 'Please enter a phone number.';
  if (!/^[+\d\s().-]+$/.test(v.trim())) return 'Use digits only (you may include + and spaces).';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return 'Enter a valid phone number (7–15 digits).';
  return undefined;
}

export function validateEmail(v: string, required = false): string | undefined {
  if (isBlank(v)) return required ? 'Please enter your email address.' : undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address.';
  return undefined;
}

/** Today in local time as yyyy-mm-dd (used for date input `min` and comparisons) */
export function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function validateFutureDate(v: string, label = 'event date', required = true): string | undefined {
  if (isBlank(v)) return required ? `Please choose your ${label}.` : undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'Enter a valid date.';
  if (v < todayISO()) return `The ${label} cannot be in the past.`;
  return undefined;
}

export function validateRequired(v: string, message: string): string | undefined {
  return isBlank(v) ? message : undefined;
}

export function validateQuantity(v: string): string | undefined {
  if (isBlank(v)) return 'Please enter a quantity.';
  if (!/^\d+$/.test(v.trim()) || Number(v) < 1) return 'Quantity must be a whole number of 1 or more.';
  if (Number(v) > 9999) return 'Please enter a smaller quantity.';
  return undefined;
}

/** Removes undefined entries so `Object.keys(errors).length` is a reliable error count */
export function compact<T extends Record<string, string | undefined>>(errors: T): Errors {
  const out: Errors = {};
  for (const [k, v] of Object.entries(errors)) if (v) out[k] = v;
  return out;
}
