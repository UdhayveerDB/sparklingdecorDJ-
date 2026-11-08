import type { ReactNode } from 'react';
import { buildQuickMessage, whatsappUrl, type QuickContext } from '../utils/whatsapp';
import { WhatsAppIcon } from './icons';

interface WhatsAppButtonProps {
  context?: QuickContext;
  /** Topic inserted in the message, e.g. "Punjabi weddings" */
  topic?: string;
  /** Provide a fully custom message instead of the quick template */
  message?: string;
  label?: string;
  className?: string;
  small?: boolean;
  children?: ReactNode;
}

/** Opens WhatsApp with a pre-filled message. The customer reviews it and presses Send in WhatsApp. */
export default function WhatsAppButton({
  context = 'general',
  topic,
  message,
  label = 'Chat on WhatsApp',
  className = '',
  small,
  children,
}: WhatsAppButtonProps) {
  const href = whatsappUrl(message ?? buildQuickMessage(context, topic));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-wa ${small ? 'btn-sm' : ''} ${className}`}
    >
      <WhatsAppIcon size={small ? 18 : 20} />
      {children ?? label}
    </a>
  );
}
