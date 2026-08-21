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
    <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
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
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/[0.03] sm:px-6"
              >
                <span className="font-display text-[15px] font-medium text-white sm:text-base">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-electric-400 transition duration-300 ${
                    expanded ? 'rotate-45 bg-electric-500/15' : ''
                  }`}
                >
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!expanded}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-ink-400">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
