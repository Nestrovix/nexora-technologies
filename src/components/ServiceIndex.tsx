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
            className={`rule-row group ${active === i ? 'border-white/25' : ''}`}
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
                      active === i ? 'text-white' : 'text-ink-200 group-hover:text-white'
                    }`}
                  >
                    {service.title}
                  </span>
                </span>
                <span
                  className={`mt-1.5 block max-w-xl text-sm leading-relaxed transition-colors duration-300 ${
                    active === i ? 'text-ink-300' : 'text-ink-500'
                  }`}
                >
                  {service.short}
                </span>

                {/* Inline preview for small screens, where the sticky panel is hidden */}
                <span className="relative mt-4 block aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 lg:hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} at Nexora Technologies`}
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                </span>
              </span>

              <span
                className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 sm:mt-0 ${
                  active === i
                    ? 'border-electric-400/50 bg-electric-500/15 text-electric-400'
                    : 'border-white/10 text-ink-500 group-hover:text-electric-400'
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-card">
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
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-navy-950/70 text-electric-400 backdrop-blur-md">
                <Icon name={current.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-2xl font-semibold text-white">{current.title}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {current.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-[11px] text-ink-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
