'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import type { Service } from '@/data/services';

/**
 * Editorial service index — numbered hairline rows, no cards.
 * Hovering (or focusing) a row swaps the sticky preview panel on the right.
 */
export default function ServiceIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <ol className="reveal">
        {services.map((service, i) => (
          <li
            key={service.slug}
            className={`rule-row group ${active === i ? 'border-ink-900' : ''}`}
            onMouseEnter={() => setActive(i)}
          >
            <Link
              href={`/services/${service.slug}`}
              onFocus={() => setActive(i)}
              className="grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 py-6 sm:items-center sm:py-7"
            >
              <span className="idx pt-2 sm:pt-0">{String(i + 1).padStart(2, '0')}</span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span
                    className={`font-display text-xl font-semibold transition-colors duration-300 sm:text-2xl ${
                      active === i ? 'text-accent' : 'text-ink-900 group-hover:text-accent'
                    }`}
                  >
                    {service.title}
                  </span>
                </span>
                <span
                  className={`mt-1.5 block max-w-xl text-sm leading-relaxed transition-colors duration-300 ${
                    active === i ? 'text-ink-700' : 'text-ink-600'
                  }`}
                >
                  {service.short}
                </span>

                {/* Inline preview for small screens, where the sticky panel is hidden */}
                <span className="relative mt-4 block aspect-[16/9] w-full overflow-hidden rounded-xl border border-line lg:hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} at Nexora Technologies`}
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover"
                  />
                                  </span>
              </span>

              <span
                className={`mt-1 grid h-10 w-10 shrink-0 place-items-center border transition duration-300 sm:mt-0 ${
                  active === i
                    ? 'border-accent bg-accent text-white'
                    : 'border-line text-ink-500 group-hover:border-accent group-hover:text-accent'
                }`}
              >
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Sticky preview — desktop only */}
      <div className="reveal reveal-d2 hidden lg:block">
        <div className="sticky top-28">
          <div className="ticked relative aspect-[4/5] overflow-hidden border border-line bg-band">
            {services.map((service, i) => (
              <Image
                key={service.slug}
                src={service.image}
                alt=""
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="420px"
                className={`object-cover transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          <div className="border-x border-b border-line bg-paper p-6">
            <p className="spec-key">Selected practice</p>
            <p className="mt-2.5 font-display text-xl font-bold text-ink-900">{current.title}</p>
            <dl className="spec-table">
              <div>
                <dt>Stack</dt>
                <dd>{current.technologies.slice(0, 4).join(' · ')}</dd>
              </div>
              <div>
                <dt>Outputs</dt>
                <dd>{current.features.length} defined deliverables</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
