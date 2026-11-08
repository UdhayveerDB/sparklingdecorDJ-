import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';
import SectionHeading from './SectionHeading';

interface FaqSectionProps {
  dark?: boolean;
  limit?: number;
}

export default function FaqSection({ dark, limit }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const list = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className={`section-y ${dark ? 'on-dark bg-charcoal-900' : 'bg-ivory'}`} aria-labelledby={`${baseId}-h`}>
      <div className="container-x max-w-3xl">
        <div id={`${baseId}-h`}>
          <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" dark={dark} />
        </div>
        <div className="mt-12 space-y-3">
          {list.map((f, i) => {
            const open = openIndex === i;
            const panel = `${baseId}-p${i}`;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border ${dark ? 'border-gold/20 bg-charcoal-800' : 'border-gold/25 bg-white'}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panel}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className={`flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-serif text-lg font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}
                  >
                    {f.q}
                    <ChevronDown className={`shrink-0 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className={`px-5 pb-5 leading-relaxed ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
