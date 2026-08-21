'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Icon from './Icon';
import { SampleBadge } from './Section';
import type { CaseStudy } from '@/data/case-studies';

type Props = {
  items: CaseStudy[];
  industriesList: string[];
  servicesList: string[];
  technologiesList: string[];
};

const ALL = 'All';

function FilterGroup({
  label,
  options,
  value,
  onChange,
  id,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field">
        {[ALL, ...options].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function CaseStudyExplorer({ items, industriesList, servicesList, technologiesList }: Props) {
  const [industry, setIndustry] = useState(ALL);
  const [service, setService] = useState(ALL);
  const [technology, setTechnology] = useState(ALL);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (industry !== ALL && item.industry !== industry) return false;
      if (service !== ALL && item.service !== service) return false;
      if (technology !== ALL && !item.technologies.includes(technology)) return false;
      if (q) {
        const haystack = `${item.title} ${item.summary} ${item.industry} ${item.service} ${item.technologies.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [items, industry, service, technology, query]);

  const reset = () => {
    setIndustry(ALL);
    setService(ALL);
    setTechnology(ALL);
    setQuery('');
  };

  const active = industry !== ALL || service !== ALL || technology !== ALL || query.trim() !== '';

  return (
    <div>
      <div className="border-y border-line py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="cs-search" className="label">
              Search
            </label>
            <div className="relative">
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                id="cs-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="field !pl-10"
              />
            </div>
          </div>
          <FilterGroup id="cs-industry" label="Industry" options={industriesList} value={industry} onChange={setIndustry} />
          <FilterGroup id="cs-service" label="Service" options={servicesList} value={service} onChange={setService} />
          <FilterGroup id="cs-technology" label="Technology" options={technologiesList} value={technology} onChange={setTechnology} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-600" role="status" aria-live="polite">
            Showing <span className="font-semibold text-ink-900">{filtered.length}</span> of {items.length} sample projects
          </p>
          {active && (
            <button type="button" onClick={reset} className="btn-ghost !px-4 !py-2 text-xs">
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="plate mt-8 p-12 text-center">
          <p className="text-base font-semibold text-ink-900">No projects match those filters</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-600">
            Try clearing a filter, or tell us what you are looking for and we will share relevant work directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn-ghost">
              Clear filters
            </button>
            <Link href="/contact" className="btn-primary">
              Talk to an Expert
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 border-t border-line">
          {/* Column headings for the record list — desktop only */}
          <div className="hidden grid-cols-[4rem_1fr_9rem_11rem_9rem] items-center gap-6 border-b border-line py-3 lg:grid">
            <span className="spec-key">Rec</span>
            <span className="spec-key">Project</span>
            <span className="spec-key">Sector</span>
            <span className="spec-key">Service</span>
            <span className="spec-key">Duration</span>
          </div>

          {filtered.map((project, i) => (
            <article key={project.slug} className="group border-b border-line transition-colors hover:bg-band">
              <div className="grid gap-5 py-6 lg:grid-cols-[4rem_1fr_9rem_11rem_9rem] lg:items-start lg:gap-6">
                <div className="flex items-center gap-3">
                  <span className="idx tabnum">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lg:hidden">
                    <SampleBadge />
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:items-start">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-band">
                    <Image
                      src={project.image}
                      alt={`${project.title} — sample project`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 144px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold leading-snug text-ink-900">{project.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-sm border border-line bg-paper px-2 py-1 text-[12px] leading-none text-ink-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link href={`/case-studies/${project.slug}`} className="link-arrow mt-4">
                      View Case Study
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-4 lg:contents">
                  <div>
                    <dt className="spec-key lg:sr-only">Sector</dt>
                    <dd className="mt-1.5 text-sm text-ink-800 lg:mt-0">{project.industry}</dd>
                  </div>
                  <div>
                    <dt className="spec-key lg:sr-only">Service</dt>
                    <dd className="mt-1.5 text-sm text-ink-800 lg:mt-0">{project.service}</dd>
                  </div>
                  <div>
                    <dt className="spec-key lg:sr-only">Duration</dt>
                    <dd className="tabnum mt-1.5 text-sm text-ink-800 lg:mt-0">{project.duration}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
