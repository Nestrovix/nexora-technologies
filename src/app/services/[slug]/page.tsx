import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Accordion from '@/components/Accordion';
import CTASection from '@/components/CTASection';
import ProcessRail from '@/components/ProcessRail';
import { GridBackdrop } from '@/components/Section';
import { getService, services } from '@/data/services';
import { site } from '@/data/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service not found' };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
      images: [{ url: service.heroImage, width: 1600, height: 900, alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'IN',
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      {/* ── HERO — number-led masthead with a bleeding image panel */}
      <section className="relative overflow-hidden pt-32 md:pt-36">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={service.heroImage} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/85" />
        </div>
        <GridBackdrop />

        <div className="container relative pb-14">
          <nav aria-label="Breadcrumb" className="reveal mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-electric-400">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 opacity-50" />
                <Link href="/services" className="transition hover:text-electric-400">Services</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 opacity-50" />
                <span className="text-ink-300">{service.title}</span>
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14">
            <div>
              <div className="reveal flex items-center gap-4">
                <span className="font-display text-4xl font-semibold text-outline sm:text-5xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-500/25 to-violet-500/25 text-electric-400">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">Service</span>
              </div>

              <h1 className="reveal reveal-d1 mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.7rem]">
                {service.title}
              </h1>
              <p className="reveal reveal-d2 mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
                {service.short}
              </p>
              <div className="reveal reveal-d3 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Talk to an Expert
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/case-studies" className="btn-ghost">
                  See related work
                </Link>
              </div>
            </div>

            <div className="reveal reveal-d3 relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-card lg:aspect-[4/5]">
              <Image
                src={service.image}
                alt={`${service.title} at Nexora Technologies`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 to-transparent" />
            </div>
          </div>
        </div>

        {/* meta rail */}
        <div className="relative border-t border-white/10 bg-navy-950/55 backdrop-blur-sm">
          <div className="container">
            <dl className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
              {[
                { k: 'Practice', v: service.title },
                { k: 'Deliverables', v: `${service.features.length} defined outputs` },
                { k: 'Core tools', v: service.technologies.slice(0, 3).join(' · ') },
                { k: 'Support', v: 'Retainer available post-launch' },
              ].map((m, i) => (
                <div key={m.k} className={`reveal reveal-d${i} py-5 lg:px-7 lg:first:pl-0 lg:last:pr-0`}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-400">{m.k}</dt>
                  <dd className="mt-1.5 text-sm text-ink-300">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW — lead statement, no card */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
            <span className="eyebrow reveal lg:sticky lg:top-28 lg:self-start">Overview</span>
            <div className="reveal reveal-d1">
              <p className="max-w-4xl font-display text-xl font-medium leading-[1.5] text-white sm:text-[1.65rem]">
                {service.overview[0]}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-400">{service.overview[1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES — numbered hairline rows */}
      <section className="section border-y border-white/10 bg-navy-900/30 py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow reveal">Business Challenges</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">
              What usually brings clients to us
            </h2>
          </div>
          <ol className="reveal reveal-d2">
            {service.challenges.map((c, i) => (
              <li key={c.title} className="rule-row flex gap-6 py-6">
                <span className="idx pt-1">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-display text-lg font-semibold text-white">{c.title}</span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-400">{c.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SOLUTION — stepped blocks on a vertical rule */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow reveal">Our Solution</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">How we address it</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {service.solution.map((s, i) => (
              <div key={s.title} className={`reveal reveal-d${i} bg-navy-950 p-7`}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES + BENEFITS — two rhythms side by side */}
      <section className="section border-y border-white/10 bg-navy-900/30 py-16 md:py-20">
        <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <span className="eyebrow reveal">Features</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">What is included</h2>
            <ul className="reveal reveal-d2 mt-8">
              {service.features.map((f, i) => (
                <li key={f} className="rule-row flex items-center gap-4 py-3.5">
                  <span className="idx w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-ink-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow reveal">Benefits</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">What changes for you</h2>
            <div className="reveal reveal-d2 mt-8 space-y-8">
              {service.benefits.map((b) => (
                <div key={b.title} className="border-l-2 border-electric-400/50 pl-5">
                  <h3 className="font-display text-base font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d3 mt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Technology</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span key={t} className="glass rounded-full px-4 py-2 text-sm text-ink-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow reveal">Process</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">How the engagement runs</h2>
          </div>
          <div className="reveal reveal-d2">
            <ProcessRail />
          </div>
        </div>
      </section>

      {/* ── FAQ */}
      <section className="section border-t border-white/10 bg-navy-900/30 py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow reveal">FAQ</span>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">
              {service.title} — common questions
            </h2>
          </div>
          <div className="reveal reveal-d2">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* ── RELATED — hairline link list */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal text-2xl font-semibold sm:text-3xl">Other practices</h2>
            <Link href="/services" className="link-arrow reveal">
              All services
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="reveal reveal-d1 grid gap-x-14 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="rule-row">
                <Link href={`/services/${o.slug}`} className="group flex items-center gap-4 py-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-electric-500/10 text-electric-400">
                    <Icon name={o.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-ink-200 transition group-hover:text-white">
                    {o.title}
                  </span>
                  <Icon name="arrow" className="h-4 w-4 text-ink-500 transition group-hover:text-electric-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection title={`Ready to talk about ${service.title.toLowerCase()}?`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqSchema]) }} />
    </>
  );
}
