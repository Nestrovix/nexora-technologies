import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Technology Solutions — Platforms, Integration, Cloud, Automation & Data',
  description:
    'Packaged technology solutions from Nexora Technologies: enterprise application platforms, integration fabric, managed cloud, intelligent automation, data platforms and digital commerce.',
  alternates: { canonical: '/solutions' },
};

/** Asymmetric column spans so no two rows are the same width. */
const spans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-6',
  'lg:col-span-6',
];

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Solutions"
        title={
          <>
            Packaged answers to
            <br />
            <span className="gradient-text">recurring problems</span>
          </>
        }
        lead="Where we have solved the same class of problem repeatedly, we have turned it into a defined solution with a known shape, timeline and cost profile."
        image="/assets/images/solutions/enterprise-application-platform.webp"
        imageAlt="Circuit board representing enterprise technology platforms"
        breadcrumbs={[{ label: 'Solutions' }]}
        meta={[
          { k: 'Solutions', v: '6 packaged offerings' },
          { k: 'Shape', v: 'Defined scope and deliverables' },
          { k: 'Start', v: 'Assessment or workshop' },
          { k: 'Fit', v: 'Configured per industry' },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            {solutions.map((solution, i) => (
              <article
                key={solution.slug}
                id={solution.slug}
                className={`group reveal reveal-d${i % 4} scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:border-electric-400/30 ${spans[i]}`}
              >
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    loading={i < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover opacity-80 transition duration-700 ease-premium group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <span className="absolute bottom-4 left-6 font-display text-5xl font-semibold text-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">{solution.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">{solution.summary}</p>

                  <ul className="mt-6">
                    {solution.outcomes.map((o) => (
                      <li key={o} className="rule-row flex items-start gap-3 py-3 text-sm text-ink-300">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                    What&apos;s included
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {solution.includes.map((inc) => (
                      <span
                        key={inc}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-300"
                      >
                        {inc}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="link-arrow mt-7">
                    Discuss this solution
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry applicability — a compact chip band, not a card grid */}
      <section className="border-y border-white/10 bg-navy-900/30 py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow reveal">Applied by Industry</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">
              The same solutions, shaped to your sector
            </h2>
          </div>
          <div className="reveal reveal-d2 flex flex-wrap gap-2.5">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries#${industry.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-ink-200 transition hover:border-electric-400/40 hover:text-white"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which solution fits?"
        text="Describe the problem and we will tell you which approach applies — or if none of them do."
      />
    </>
  );
}
