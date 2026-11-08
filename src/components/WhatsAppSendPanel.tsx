import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { WhatsAppIcon } from './icons';

interface WhatsAppSendPanelProps {
  message: string;
  url: string;
  /** Called when the customer taps the WhatsApp link */
  onOpened?: () => void;
  opened?: boolean;
  buttonLabel?: string;
}

/**
 * Shows the generated message, the SEND ENQUIRY ON WHATSAPP link, and a copy fallback.
 * Makes clear that the enquiry is only sent once the customer presses Send in WhatsApp.
 */
export default function WhatsAppSendPanel({
  message,
  url,
  onOpened,
  opened,
  buttonLabel = 'Send Enquiry on WhatsApp',
}: WhatsAppSendPanelProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <p className="eyebrow">Your message</p>
      <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-gold/30 bg-ivory p-5 font-sans text-sm leading-relaxed text-charcoal/85">
        {message}
      </pre>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpened}
          className="btn btn-wa flex-1"
        >
          <WhatsAppIcon size={20} /> {buttonLabel}
        </a>
        <button type="button" onClick={copy} className="btn btn-outline flex-1 sm:flex-none">
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy message'}
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal/65" role="status">
        {opened
          ? 'WhatsApp should now be open with your message ready. Review it, edit anything you like, and press Send in WhatsApp to deliver your enquiry. If nothing opened, tap the green button again or copy the message.'
          : 'This opens WhatsApp with your message already written. Nothing is sent from this website — you review the message and press Send inside WhatsApp.'}
      </p>
    </div>
  );
}
