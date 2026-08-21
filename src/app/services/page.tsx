import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import ProcessRail from '@/components/ProcessRail';
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
            across the <span className="gradient-text">full stack</span>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Index</p>
            <ol className="mt-4">
              {services.map((s, i) => (
                <li key={s.slug} className="rule-row">
                  <a
                    href={`#${s.slug}`}
                    className="group flex items-center gap-3 py-3 text-sm text-ink-400 transition hover:text-white"
                  >
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{s.title}</span>
                    <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 opacity-0 transition group-hover:opacity-60" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Blocks */}
          <div>
            {services.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                className="reveal scroll-mt-28 border-t border-white/15 pb-16 pt-10 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-display text-5xl font-semibold text-outline sm:text-6xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-500/20 to-violet-500/20 text-electric-400">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">{service.title}</h2>
                </div>

                <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                  <div>
                    <p className="text-base leading-relaxed text-ink-300">{service.overview[0]}</p>

                    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                      {service.features.slice(0, 6).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink-400">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {service.technologies.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/services/${service.slug}`} className="btn-primary !py-2.5">
                        Explore {service.title}
                        <Icon name="arrow" className="h-4 w-4" />
                      </Link>
                      <Link href="/contact" className="btn-ghost !py-2.5">
                        Talk to an Expert
                      </Link>
                    </div>
                  </div>

                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 lg:aspect-auto">
                    <Image
                      src={service.image}
                      alt={`${service.title} services`}
                      fill
                      loading={i < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process rail */}
      <section className="section border-t border-white/10 bg-navy-900/30">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <span className="eyebrow reveal">Delivery Process</span>
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
