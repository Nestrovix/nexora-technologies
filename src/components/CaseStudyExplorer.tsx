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
      <div className="border-y border-white/10 py-6">
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
          <p className="text-sm text-ink-400" role="status" aria-live="polite">
            Showing <span className="font-semibold text-white">{filtered.length}</span> of {items.length} sample projects
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
        <div className="glass mt-8 rounded-2xl p-12 text-center">
          <p className="text-base font-semibold text-white">No projects match those filters</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">
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
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <article
              key={project.slug}
              className={`group glass card-hover overflow-hidden rounded-2xl ${
                i === 0 ? 'md:col-span-2 md:grid md:grid-cols-2 md:items-stretch' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/10] md:aspect-auto md:min-h-[300px]' : 'aspect-[16/10]'}`}>
                <Image
                  src={project.image}
                  alt={`${project.title} — sample project`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <SampleBadge className="absolute left-4 top-4" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider">
                  <span className="text-electric-400">{project.industry}</span>
                  <span className="text-ink-500">·</span>
                  <span className="text-ink-400">{project.service}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-ink-400">
                      {t}
                    </span>
                  ))}
                </div>
                <Link href={`/case-studies/${project.slug}`} className="link-arrow mt-5">
                  View Case Study
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
