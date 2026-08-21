import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Industries We Serve — Retail, Healthcare, Finance, Logistics & More',
  description:
    'Nexora Technologies delivers technology solutions across retail, healthcare, finance, education, real estate, manufacturing, logistics and e-commerce.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Industries"
        title={
          <>
            Sector context changes
            <br />
            the <span className="gradient-text">right answer</span>
          </>
        }
        lead="The same technology behaves differently under retail peak load, clinical privacy rules or manufacturing uptime targets. We build for the constraints you actually operate under."
        image="/assets/images/pages/industries-hero.webp"
        imageAlt="Corporate skyline representing the industries Nexora serves"
        breadcrumbs={[{ label: 'Industries' }]}
        meta={[
          { k: 'Sectors', v: '8 with active delivery' },
          { k: 'Constraints', v: 'Peak load · privacy · uptime' },
          { k: 'Integrations', v: 'ERP · CRM · POS · logistics' },
          { k: 'Not listed?', v: 'The engineering questions are similar' },
        ]}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          {/* index rail */}
          <nav aria-label="Industries index" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Sectors</p>
            <ol className="mt-4">
              {industries.map((ind, i) => (
                <li key={ind.slug} className="rule-row">
                  <a
                    href={`#${ind.slug}`}
                    className="group flex items-center gap-3 py-3 text-sm text-ink-400 transition hover:text-white"
                  >
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{ind.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-16">
            {industries.map((industry, i) => {
              const related = caseStudies.filter((c) => c.industry === industry.name);
              return (
                <article key={industry.slug} id={industry.slug} className="reveal scroll-mt-28">
                  {/* full-width image band with the name overlaid */}
                  <div className="relative aspect-[21/8] overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={industry.image}
                      alt={`${industry.name} technology solutions by Nexora Technologies`}
                      fill
                      loading={i < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/55 to-transparent" />
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 sm:p-9">
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                      <h2 className="mt-2 font-display text-2xl font-semibold sm:text-4xl">{industry.name}</h2>
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300">{industry.short}</p>

                  {/* challenge / response comparison table */}
                  <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                    <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
                      <p className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Common challenge
                      </p>
                      <p className="border-l border-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-electric-400">
                        How we respond
                      </p>
                    </div>
                    {industry.challenges.map((c, row) => (
                      <div key={c} className="grid grid-cols-2 border-b border-white/10 last:border-b-0">
                        <p className="px-5 py-4 text-sm leading-relaxed text-ink-400">{c}</p>
                        <p className="border-l border-white/10 px-5 py-4 text-sm leading-relaxed text-ink-200">
                          {industry.solutions[row]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-primary !py-2.5">
                      Explore Solution
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                    {related[0] && (
                      <Link href={`/case-studies/${related[0].slug}`} className="btn-ghost !py-2.5">
                        Related case study
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Your sector not listed?"
        text="Tell us the workflow and we will say honestly whether we are a good fit."
      />
    </>
  );
}
