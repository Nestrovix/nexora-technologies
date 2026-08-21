import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { SampleBadge } from './Section';
import type { CaseStudy } from '@/data/case-studies';

/**
 * Case studies as alternating feature rows — a tall image on one side, results
 * set as a data row on the other — instead of a three-card grid.
 */
export default function FeatureRows({ items }: { items: CaseStudy[] }) {
  return (
    <div className="space-y-4">
      {items.map((project, i) => {
        const flip = i % 2 === 1;
        return (
          <article
            key={project.slug}
            className={`reveal grid items-stretch overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-[1.15fr_1fr] ${
              flip ? 'lg:[&>div:first-child]:order-2' : ''
            }`}
          >
            <div className="relative min-h-[240px] lg:min-h-[380px]">
              <Image
                src={project.image}
                alt={`${project.title} — sample project by Nexora Technologies`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
              <SampleBadge className="absolute left-5 top-5" />
              <span className="absolute bottom-4 left-5 font-display text-5xl font-semibold text-outline lg:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold uppercase tracking-wider">
                <span className="text-electric-400">{project.industry}</span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span className="text-ink-400">{project.service}</span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span className="text-ink-400">{project.duration}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{project.summary}</p>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                {project.results.map((r) => (
                  <div key={r.label}>
                    <dt className="font-display text-lg font-semibold text-white">{r.value}</dt>
                    <dd className="mt-1 text-[11px] leading-snug text-ink-500">{r.label}</dd>
                  </div>
                ))}
              </dl>

              <Link href={`/case-studies/${project.slug}`} className="link-arrow mt-6">
                View Case Study
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
