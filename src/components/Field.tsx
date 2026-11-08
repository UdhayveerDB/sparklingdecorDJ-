import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

function Wrapper({
  id, label, error, hint, required, children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="ml-0.5 text-burgundy-500" aria-hidden="true"> *</span>}
        {!required && <span className="ml-2 text-xs font-normal text-charcoal/50">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-charcoal/55">{hint}</p>}
      {error && (
        <p id={`${id}-err`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

const describe = (id: string, error?: string, hint?: string) =>
  error ? `${id}-err` : hint ? `${id}-hint` : undefined;

export function TextField({
  label, error, hint, required, ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        className="field-input"
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describe(id, error, hint)}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label, error, hint, required, children, ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <select
        id={id}
        className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a8884d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-11"
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describe(id, error, hint)}
        {...props}
      >
        {children}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  label, error, hint, required, ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        rows={4}
        className="field-input"
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describe(id, error, hint)}
        {...props}
      />
    </Wrapper>
  );
}
