'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition hover:bg-band sm:px-2"
              >
                <span className="font-display text-[15px] font-semibold text-ink-900 sm:text-base">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center border transition-colors duration-200 ${
                    expanded ? 'border-accent bg-accent text-white' : 'border-line text-accent'
                  }`}
                >
                  <Icon name="plus" className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-45' : ''}`} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!expanded}
              className="px-1 pb-6 sm:px-2"
            >
              <p className="max-w-3xl border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-700">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
