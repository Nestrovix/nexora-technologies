import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import ProcessRail from '@/components/ProcessRail';
import { SpecLabel } from '@/components/Section';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'IT Services — Software, Web, Mobile, Cloud, Security, AI & Data',
  description:
    'Explore Nexora Technologies services: custom software development, web and mobile apps, cloud solutions, cybersecurity, AI automation, data analytics and IT consulting.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title={
          <>
            Engineering capability
            <br />
            across the <span className="text-accent">full stack</span>
          </>
        }
        lead="Eight practices, one delivery standard. Each engagement is staffed with senior people who stay with it from discovery through to support."
        image="/assets/images/pages/services-hero.webp"
        imageAlt="Developer workstation with application code on screen"
        breadcrumbs={[{ label: 'Services' }]}
        meta={[
          { k: 'Practices', v: '8 specialist teams' },
          { k: 'Iterations', v: 'Two weeks, demo at the end' },
          { k: 'Testing', v: 'Automated in every pipeline' },
          { k: 'Handover', v: 'Source, docs and knowledge transfer' },
        ]}
      />

      {/* ── Sticky index + editorial service blocks */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Index rail */}
          <nav aria-label="Services index" className="lg:sticky lg:top-28 lg:self-start">
            <p className="spec-key text-ink-500">Index</p>
            <ol className="mt-4">
              {services.map((s, i) => (
                <li key={s.slug} className="rule-row">
                  <a
                    href={`#${s.slug}`}
                    className="group flex items-center gap-3 py-3 text-sm text-ink-600 transition hover:text-ink-900"
                  >
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{s.title}</span>
                    <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 opacity-0 transition group-hover:opacity-60" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Spec blocks — one bordered record per practice */}
          <div className="space-y-8">
            {services.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                className="reveal scroll-mt-28 border border-line bg-paper"
              >
                <div className="flex flex-wrap items-center gap-4 border-b border-line px-6 py-4 sm:px-7">
                  <span className="idx tabnum">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="flex-1 font-display text-xl font-bold text-ink-900 sm:text-2xl">{service.title}</h2>
                  <Icon name={service.icon} className="h-5 w-5 text-ink-500" aria-hidden="true" />
                </div>

                <div className="grid gap-8 p-6 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                  <div>
                    <p className="text-base leading-relaxed text-ink-700">{service.overview[0]}</p>

                    <dl className="mt-7 border-t border-line">
                      <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                        <dt className="spec-key pt-1">Deliverables</dt>
                        <dd className="text-[13px] leading-relaxed text-ink-700">
                          {service.features.slice(0, 6).join(' · ')}
                        </dd>
                      </div>
                      <div className="grid gap-x-6 border-b border-line py-3 sm:grid-cols-[7rem_1fr]">
                        <dt className="spec-key pt-1">Stack</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {service.technologies.slice(0, 6).map((t) => (
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
                        <dt className="spec-key pt-1">Outputs</dt>
                        <dd className="tabnum text-[13px] text-ink-700">
                          {service.features.length} defined deliverables · {service.faqs.length} scoping answers
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link href={`/services/${service.slug}`} className="btn-primary !py-2.5">
                        Explore {service.title}
                        <Icon name="arrow" className="h-4 w-4" />
                      </Link>
                      <Link href="/contact" className="btn-ghost !py-2.5">
                        Talk to an Expert
                      </Link>
                    </div>
                  </div>

                  <div className="relative aspect-[16/11] overflow-hidden border border-line bg-band lg:aspect-auto lg:min-h-[280px]">
                    <Image
                      src={service.image}
                      alt={`${service.title} services`}
                      fill
                      loading={i < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process rail */}
      <section className="section border-t border-line bg-band">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <SpecLabel index="02" className="reveal">Delivery Process</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              The same seven stages behind every service
            </h2>
          </div>
          <div className="reveal reveal-d2">
            <ProcessRail />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
