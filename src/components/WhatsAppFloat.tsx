import { useLocation } from 'react-router-dom';
import { buildQuickMessage, whatsappUrl, type QuickContext } from '../utils/whatsapp';
import { WhatsAppIcon } from './icons';

function contextFor(pathname: string): QuickContext {
  if (pathname.startsWith('/dj')) return 'dj';
  if (pathname.startsWith('/decorations')) return 'decor';
  if (pathname.startsWith('/rentals')) return 'rentals';
  return 'general';
}

/** Floating WhatsApp button visible on every page. The greeting adapts to the section being viewed. */
export default function WhatsAppFloat() {
  const { pathname } = useLocation();
  const href = whatsappUrl(buildQuickMessage(contextFor(pathname)));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens WhatsApp in a new tab)"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_30px_-6px_rgba(15,138,79,0.7)] transition hover:scale-110 hover:bg-wa-dark sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-wa/40 [animation-duration:2.8s]" aria-hidden="true" />
      <WhatsAppIcon size={30} />
    </a>
  );
}
