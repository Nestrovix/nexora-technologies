import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Accordion from '@/components/Accordion';
import CTASection from '@/components/CTASection';
import ProcessRail from '@/components/ProcessRail';
import CodeBlock from '@/components/CodeBlock';
import Terminal from '@/components/Terminal';
import { AnchorHeading, CommitRef, MonoEyebrow, SpecLabel } from '@/components/Section';
import { serviceArtefacts } from '@/data/engineering';
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

  const artefact = serviceArtefacts[service.slug];

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
      {/* ── HERO — indexed masthead with a bordered image plate */}
      <section className="border-b border-line pt-28 md:pt-32">
        <div className="container">
          <nav aria-label="Breadcrumb" className="reveal border-b border-line pb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-accent">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 text-line" />
                <Link href="/services" className="transition hover:text-accent">Services</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 text-line" />
                <span className="text-ink-700">{service.title}</span>
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 pt-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14">
            <div>
              <SpecLabel index={String(index + 1).padStart(2, '0')} className="reveal">
                Service
              </SpecLabel>

              <h1 className="reveal reveal-d1 mt-6 max-w-3xl text-[2.4rem] font-bold leading-[1.03] tracking-[-0.025em] text-ink-900 sm:text-5xl lg:text-[3.5rem]">
                {service.title}
              </h1>
              <p className="reveal reveal-d2 mt-5 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
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

            <div className="ticked reveal reveal-d3 relative aspect-[4/3] overflow-hidden border border-line bg-band lg:aspect-[4/5]">
              <Image
                src={service.image}
                alt={`${service.title} at Nexora Technologies`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
            </div>
          </div>

          {/* meta rail */}
          <dl className="mt-12 grid grid-cols-2 border-t border-line pb-14 lg:grid-cols-4">
              {[
                { k: 'Practice', v: service.title },
                { k: 'Deliverables', v: `${service.features.length} defined outputs` },
                { k: 'Core tools', v: service.technologies.slice(0, 3).join(' · ') },
                { k: 'Support', v: 'Retainer available post-launch' },
              ].map((m, i) => (
              <div
                key={m.k}
                className={`reveal reveal-d${i} border-b border-line py-5 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}
              >
                <dt className="spec-key">{m.k}</dt>
                <dd className="mt-2 text-sm leading-snug text-ink-800">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── OVERVIEW — lead statement, no card */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
            <SpecLabel index="01" className="reveal lg:sticky lg:top-28 lg:self-start">Overview</SpecLabel>
            <div className="reveal reveal-d1">
              <p className="max-w-4xl font-display text-xl font-medium leading-[1.5] text-ink-900 sm:text-[1.65rem]">
                {service.overview[0]}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-600">{service.overview[1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES — numbered hairline rows */}
      <section className="section border-y border-line bg-band py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="02" className="reveal">Business Challenges</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">
              What usually brings clients to us
            </h2>
          </div>
          <ol className="reveal reveal-d2">
            {service.challenges.map((c, i) => (
              <li key={c.title} className="rule-row flex gap-6 py-6">
                <span className="idx pt-1">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-display text-lg font-semibold text-ink-900">{c.title}</span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-600">{c.text}</span>
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
            <SpecLabel index="03" className="reveal">Our Solution</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">How we address it</h2>
          </div>
          <div className="spec-grid md:grid-cols-3">
            {service.solution.map((s, i) => (
              <div key={s.title} className={`reveal reveal-d${i} bg-paper p-7`}>
                <span className="grid h-10 w-10 place-items-center rounded-sm border border-accent bg-accent-50 text-accent">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES + BENEFITS — two rhythms side by side */}
      <section className="section border-y border-line bg-band py-16 md:py-20">
        <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SpecLabel index="04" className="reveal">Features</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">What is included</h2>
            <ul className="reveal reveal-d2 mt-8">
              {service.features.map((f, i) => (
                <li key={f} className="rule-row flex items-center gap-4 py-3.5">
                  <span className="idx w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-ink-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SpecLabel index="05" className="reveal">Benefits</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">What changes for you</h2>
            <div className="reveal reveal-d2 mt-8 space-y-8">
              {service.benefits.map((b) => (
                <div key={b.title} className="border-l-2 border-accent pl-5">
                  <h3 className="font-display text-base font-semibold text-ink-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d3 mt-10">
              <p className="spec-key text-ink-500">Technology</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span key={t} className="plate rounded-sm px-4 py-2 text-sm text-ink-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTEFACT — one piece of real output from this practice */}
      {artefact && (
        <section id="artefact" className="section py-16 md:py-20">
          <div className="container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
              <div>
                <SpecLabel index="06" className="reveal">Sample Output</SpecLabel>
                <AnchorHeading
                  id="sample-output"
                  className="reveal reveal-d1 mt-5 max-w-2xl text-2xl font-semibold sm:text-3xl"
                >
                  What this practice actually produces
                </AnchorHeading>
              </div>
              <div className="reveal reveal-d2 flex flex-col items-start gap-2 lg:items-end">
                <MonoEyebrow>{`~/${service.slug}`}</MonoEyebrow>
                <CommitRef path="spec/practice" hash="6d21ba0" />
              </div>
            </div>

            <div className="grid min-w-0 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              {artefact.kind === 'code' ? (
                <CodeBlock
                  className="reveal"
                  lang={artefact.lang}
                  filename={artefact.filename}
                  meta={artefact.meta}
                  code={artefact.code}
                  caption={artefact.caption}
                />
              ) : (
                <Terminal
                  className="reveal"
                  title={artefact.title}
                  lines={artefact.lines}
                  caption={artefact.caption}
                />
              )}

              <dl className="reveal reveal-d1 min-w-0 border-t border-line">
                {[
                  { k: 'Handover', v: 'Source, infrastructure, runbooks and decision records' },
                  { k: 'Reviews', v: 'Every change goes through a peer-reviewed pull request' },
                  { k: 'Gates', v: 'lint · types · unit · contract · a11y · dependency audit' },
                  { k: 'Ownership', v: 'Code and infrastructure transfer to you on completion' },
                ].map((row) => (
                  <div key={row.k} className="grid gap-x-6 border-b border-line py-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="spec-key pt-1 text-ink-500">{row.k}</dt>
                    <dd className="font-mono text-[12px] leading-relaxed text-ink-700">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <SpecLabel index="07" className="reveal">Process</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold sm:text-3xl">How the engagement runs</h2>
          </div>
          <div className="reveal reveal-d2">
            <ProcessRail />
          </div>
        </div>
      </section>

      {/* ── FAQ */}
      <section className="section border-t border-line bg-band py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="08" className="reveal">FAQ</SpecLabel>
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
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent">
                    <Icon name={o.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-ink-800 transition group-hover:text-ink-900">
                    {o.title}
                  </span>
                  <Icon name="arrow" className="h-4 w-4 text-ink-500 transition group-hover:text-accent" />
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
