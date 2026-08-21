import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import StatusPanel from '@/components/StatusPanel';
import { AnchorHeading, CommitRef, SpecLabel } from '@/components/Section';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Technology Solutions — Platforms, Integration, Cloud, Automation & Data',
  description:
    'Packaged technology solutions from Nexora Technologies: enterprise application platforms, integration fabric, managed cloud, intelligent automation, data platforms and digital commerce.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Solutions"
        title={
          <>
            Packaged answers to
            <br />
            <span className="text-accent">recurring problems</span>
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
          <div className="spec-grid lg:grid-cols-2">
            {solutions.map((solution, i) => (
              <article
                key={solution.slug}
                id={solution.slug}
                className={`reveal reveal-d${i % 4} flex flex-col scroll-mt-28 bg-paper`}
              >
                <div className="flex items-center gap-4 border-b border-line px-6 py-4 sm:px-7">
                  <span className="idx tabnum">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="flex-1 font-display text-xl font-bold text-ink-900">{solution.title}</h2>
                </div>

                <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-line bg-band">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    loading={i < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-ink-600">{solution.summary}</p>

                  <dl className="mt-6 border-t border-line">
                    <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[6.5rem_1fr]">
                      <dt className="spec-key pt-1">Outcomes</dt>
                      <dd>
                        <ul className="space-y-1.5">
                          {solution.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-[13px] leading-snug text-ink-700">
                              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[6.5rem_1fr]">
                      <dt className="spec-key pt-1">Included</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {solution.includes.map((inc) => (
                          <span
                            key={inc}
                            className="rounded-sm border border-line px-2 py-1 text-[12px] leading-none text-ink-700"
                          >
                            {inc}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <Link href="/contact" className="link-arrow mt-6">
                    Discuss this solution
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Operations — what a managed solution reports back */}
      <section id="operations" className="section border-t border-line">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <SpecLabel index="02" className="reveal">Operations</SpecLabel>
              <AnchorHeading
                id="operations-reporting"
                className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-semibold leading-[1.12] sm:text-4xl"
              >
                What a managed solution reports back
              </AnchorHeading>
              <p className="reveal reveal-d2 mt-4 max-w-xl text-base leading-relaxed text-ink-600">
                Every solution we run comes with the same operational surface: availability against a stated objective,
                a latency budget, release cadence and a remaining error budget.
              </p>
            </div>
            <CommitRef path="spec/operations" hash="1f7c40e" />
          </div>
          <div className="grid min-w-0 gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <StatusPanel className="reveal reveal-d2" />
            <figure className="reveal reveal-d3 min-w-0">
              <div className="ticked relative aspect-[16/10] w-full overflow-hidden border border-line bg-band">
                <Image
                  src="/assets/images/hero/hero-observability-wall.webp"
                  alt="An operations dashboard showing service metrics and trend charts"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="spec-key mt-3 text-ink-500">
                Fig. 02 — Operations dashboard during a managed-service review
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Industry applicability — a compact chip band, not a card grid */}
      <section className="border-y border-line bg-band py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SpecLabel index="03" className="reveal">Applied by Industry</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">
              The same solutions, shaped to your sector
            </h2>
          </div>
          <div className="reveal reveal-d2 flex flex-wrap gap-2.5">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries#${industry.slug}`}
                className="rounded-sm border border-line bg-paper px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:border-accent hover:text-accent"
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
