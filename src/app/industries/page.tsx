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
            the <span className="text-accent">right answer</span>
          </>
        }
        lead="The same technology behaves differently under retail peak load, clinical privacy rules or manufacturing uptime targets. We build for the constraints you actually operate under."
        image="/assets/images/pages/industries-hero.webp"
        imageAlt="Interior of a data centre, rows of server cabinets and overhead cabling"
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
            <p className="spec-key text-ink-500">Sectors</p>
            <ol className="mt-4">
              {industries.map((ind, i) => (
                <li key={ind.slug} className="rule-row">
                  <a
                    href={`#${ind.slug}`}
                    className="group flex items-center gap-3 py-3 text-sm text-ink-600 transition hover:text-ink-900"
                  >
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{ind.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {industries.map((industry, i) => {
              const related = caseStudies.filter((c) => c.industry === industry.name);
              return (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  className="reveal scroll-mt-28 border border-line bg-paper"
                >
                  <div className="flex items-center gap-4 border-b border-line px-6 py-4">
                    <span className="idx tabnum">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="flex-1 font-display text-xl font-bold text-ink-900 sm:text-2xl">{industry.name}</h2>
                  </div>

                  <div className="relative aspect-[21/8] w-full overflow-hidden border-b border-line bg-band">
                    <Image
                      src={industry.image}
                      alt={`${industry.name} technology solutions by Nexora Technologies`}
                      fill
                      loading={i < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                  <p className="max-w-2xl text-base leading-relaxed text-ink-700">{industry.short}</p>

                  {/* challenge / response comparison table */}
                  <div className="mt-7 border border-line">
                    <div className="grid grid-cols-2 border-b border-line bg-band">
                      <p className="px-5 py-3 spec-key text-ink-500">
                        Common challenge
                      </p>
                      <p className="border-l border-line px-5 py-3 spec-key text-accent">
                        How we respond
                      </p>
                    </div>
                    {industry.challenges.map((c, row) => (
                      <div key={c} className="grid grid-cols-2 border-b border-line last:border-b-0">
                        <p className="px-5 py-4 text-sm leading-relaxed text-ink-600">{c}</p>
                        <p className="border-l border-line px-5 py-4 text-sm leading-relaxed text-ink-800">
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
