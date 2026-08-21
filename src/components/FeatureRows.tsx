import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { SampleBadge } from './Section';
import type { CaseStudy } from '@/data/case-studies';

/**
 * Case studies as data records: a bordered record per project with client,
 * sector, stack and outcome set in aligned label → value rows.
 */
export default function FeatureRows({ items }: { items: CaseStudy[] }) {
  return (
    <div className="border-t border-line">
      {items.map((project, i) => (
        <article key={project.slug} className="reveal border-b border-line py-8">
          <div className="grid gap-7 lg:grid-cols-[15rem_1fr] lg:gap-12">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="idx">REC {String(i + 1).padStart(2, '0')}</span>
                <SampleBadge />
              </div>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden border border-line bg-band">
                <Image
                  src={project.image}
                  alt={`${project.title} — sample project by Nexora Technologies`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 240px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold leading-tight text-ink-900 sm:text-[1.7rem]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">{project.summary}</p>

              <dl className="mt-6 border-t border-line">
                <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="spec-key pt-1">Sector</dt>
                  <dd className="text-sm text-ink-800">{project.industry}</dd>
                </div>
                <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="spec-key pt-1">Service</dt>
                  <dd className="text-sm text-ink-800">{project.service}</dd>
                </div>
                <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="spec-key pt-1">Duration</dt>
                  <dd className="tabnum text-sm text-ink-800">{project.duration}</dd>
                </div>
                <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="spec-key pt-1">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-line px-2 py-1 text-[12px] leading-none text-ink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="spec-key pt-1">Outcome</dt>
                  <dd className="grid gap-x-6 gap-y-2 sm:grid-cols-3">
                    {project.results.map((r) => (
                      <span key={r.label} className="block">
                        <span className="tabnum block font-display text-lg font-bold text-ink-900">{r.value}</span>
                        <span className="mt-0.5 block text-[12px] leading-snug text-ink-600">{r.label}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <Link href={`/case-studies/${project.slug}`} className="link-arrow mt-6">
                View Case Study
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
