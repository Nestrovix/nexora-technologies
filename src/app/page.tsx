import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import CTASection from '@/components/CTASection';
import Accordion from '@/components/Accordion';
import EnquiryForm from '@/components/EnquiryForm';
import ServiceIndex from '@/components/ServiceIndex';
import StackMatrix from '@/components/StackMatrix';
import Terminal from '@/components/Terminal';
import CodeBlock from '@/components/CodeBlock';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import PipelineStrip from '@/components/PipelineStrip';
import StatusPanel from '@/components/StatusPanel';
import BentoIndustries from '@/components/BentoIndustries';
import ProcessRail from '@/components/ProcessRail';
import FeatureRows from '@/components/FeatureRows';
import { AnchorHeading, CommitRef, MonoEyebrow, Note, SampleBadge, SpecLabel, VersionTag } from '@/components/Section';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { insights } from '@/data/insights';
import {
  faqs,
  stats,
  statsDisclaimer,
  testimonials,
  testimonialsDisclaimer,
  whyChooseUs,
} from '@/data/company';
import { site } from '@/data/site';
import {
  apiRequestSample,
  apiResponseSample,
  ciSample,
  deployTerminal,
  engineeringStandards,
  handlerSample,
  infraSample,
  specVersion,
} from '@/data/engineering';

export const metadata: Metadata = {
  title: 'IT Services & Software Development Company in India',
  description:
    'Nexora Technologies builds scalable software, cloud, cybersecurity, AI and data solutions for businesses across India and beyond. Talk to an expert about your project.',
  alternates: { canonical: '/' },
};

const heroBar = [
  { k: 'Practices', v: '8 delivery teams' },
  { k: 'Engagements', v: 'Fixed scope or dedicated team' },
  { k: 'Coverage', v: 'India & international clients' },
  { k: 'Support', v: 'Retainers with response targets' },
];

export default function HomePage() {
  const featuredCases = caseStudies.slice(0, 3);
  const [leadPost, ...restPosts] = insights.slice(0, 3);
  const [leadQuote, ...restQuotes] = testimonials;

  return (
    <>
      {/* ═══════════════════════════════ 1. MASTHEAD — spec sheet header */}
      <section className="border-b border-line pt-28 md:pt-32">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <SpecLabel index="00" className="reveal">
              Enterprise IT Services · India
            </SpecLabel>
            <span className="spec-key reveal text-ink-500">Bengaluru, Karnataka · Est. {site.founded}</span>
          </div>

          <div className="pt-10">
            <h1 className="reveal reveal-d1 max-w-5xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-6xl lg:text-[4.4rem]">
              Technology That
              <br />
              <span className="text-accent">Moves Your Business</span>
              <br />
              Forward.
            </h1>

            <div className="reveal reveal-d2 mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <p className="max-w-xl border-l-2 border-accent pl-5 text-base leading-relaxed text-ink-700">
                We build scalable digital solutions that help businesses improve operations, accelerate growth and stay
                ahead in a rapidly changing world.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Talk to an Expert
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-ghost">
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Capability table */}
          <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {heroBar.map((item, i) => (
              <div
                key={item.k}
                className={`reveal reveal-d${i} border-b border-line py-5 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}
              >
                <dt className="spec-key">{item.k}</dt>
                <dd className="mt-2 text-sm leading-snug text-ink-800">{item.v}</dd>
              </div>
            ))}
          </dl>

          {/* Terminal transcript beside the delivery floor — the first thing a
              technical visitor sees is a real deployment, not a stock photo. */}
          <div className="reveal reveal-d2 mt-12 grid min-w-0 gap-6 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <Terminal
              title="bash — orders-svc @ production"
              lines={deployTerminal}
              caption="Sample deployment transcript showing how we ship: tests gate the build, the release is canaried, and a rollback stays available for 24 hours. Illustrative output, not a live console."
            />

            <figure className="flex min-w-0 flex-col">
              <div className="ticked relative min-h-[220px] flex-1 overflow-hidden border border-line bg-band">
                <Image
                  src="/assets/images/hero/hero-engineering-floor.webp"
                  alt="Software engineers working at multi-monitor workstations with source code on screen"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="spec-key mt-3 text-ink-500">
                Fig. 01 — Engineering workstations during a release window
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 2. STATS — figures table */}
      <section className="border-b border-line bg-band py-10">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3 pb-4">
            <MonoEyebrow>company/figures</MonoEyebrow>
            <SampleBadge label="Sample data" className="ml-auto" />
          </div>
          <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-d${i} border-b border-line py-5 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0`}
              >
                <dt className="tabnum font-mono text-3xl font-medium text-ink-900 sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1.5 text-sm text-ink-600">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-ink-500">{statsDisclaimer}</p>
        </div>
      </section>

      {/* ═══════════════════════════════ 2b. DELIVERY — pipeline + SLOs */}
      <section id="delivery" className="section">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <SpecLabel index="01" className="reveal">Delivery Pipeline</SpecLabel>
              <AnchorHeading
                id="delivery-pipeline"
                className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-semibold leading-[1.08] sm:text-5xl"
              >
                Every change goes through the same five gates
              </AnchorHeading>
              <p className="reveal reveal-d2 mt-4 max-w-xl text-base leading-relaxed text-ink-600">
                Commit, build, test, stage, production. Nothing reaches a live system without passing all five, and
                every release stays reversible.
              </p>
            </div>
            <div className="reveal reveal-d2 flex flex-col items-start gap-3 lg:items-end">
              <VersionTag version={specVersion} />
              <CommitRef path="spec/delivery" hash="a41f9c2" />
            </div>
          </div>

          <div className="reveal reveal-d2">
            <PipelineStrip />
          </div>

          <div className="reveal reveal-d3 mt-14">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <MonoEyebrow>platform/slo</MonoEyebrow>
              <span className="commit-ref">trailing 30 days</span>
            </div>
            <StatusPanel />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 3. SERVICES — editorial index */}
      <section id="services" className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <SpecLabel index="02" className="reveal">What We Do</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-semibold leading-[1.08] sm:text-5xl">
                Eight practices. One delivery standard.
              </h2>
            </div>
            <Link href="/services" className="btn-ghost reveal reveal-d2">
              All services
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <ServiceIndex services={services} />
        </div>
      </section>

      {/* ═══════════════════════════════ 3b. ARCHITECTURE — reference diagram */}
      <section id="architecture" className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="03" className="reveal">Reference Architecture</SpecLabel>
              <AnchorHeading
                id="reference-architecture"
                className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-semibold leading-[1.1] sm:text-4xl"
              >
                The shape most of our platforms take
              </AnchorHeading>
              <p className="reveal reveal-d2 mt-4 max-w-xl text-base leading-relaxed text-ink-600">
                Clients hit an edge, not an origin. One gateway owns authentication and rate limits. Services own their
                own data and talk over an event bus. Nothing here is exotic — it is the boring, well-understood shape
                that keeps running at 3am.
              </p>
            </div>
            <div className="reveal reveal-d2 flex flex-col items-start gap-3 lg:items-end">
              <VersionTag version="rev. 7" />
              <CommitRef path="spec/architecture" hash="c9b0e13" />
            </div>
          </div>

          <div className="reveal reveal-d2">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 3c. CODE — request, response, infra, CI */}
      <section id="engineering" className="section">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <SpecLabel index="04" className="reveal">Inside The Work</SpecLabel>
              <AnchorHeading
                id="inside-the-work"
                className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-semibold leading-[1.1] sm:text-4xl"
              >
                What you actually receive
              </AnchorHeading>
              <p className="reveal reveal-d2 mt-4 max-w-xl text-base leading-relaxed text-ink-600">
                Typed API contracts, idempotent writes, infrastructure described in code and a pipeline that gates
                itself. The samples below are written in the style we hand over.
              </p>
            </div>
            <MonoEyebrow className="reveal reveal-d2">~/examples</MonoEyebrow>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-2">
            <CodeBlock
              className="reveal"
              lang="http"
              filename="POST /v1/bookings — request"
              meta="HTTP"
              code={apiRequestSample}
              caption="An idempotency key means a retried request can never double-book a slot."
            />
            <CodeBlock
              className="reveal reveal-d1"
              lang="http"
              filename="201 Created — response"
              meta="118 ms"
              code={apiResponseSample}
              caption="Timing and trace identifiers ship with the response, so a slow call can be explained rather than guessed at."
            />
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
            <CodeBlock
              className="reveal"
              lang="ts"
              filename="services/orders/bookings/route.ts"
              meta="TypeScript"
              code={handlerSample}
              caption="The write path: validate, lock, transact, publish. Every step is traced."
            />
            <div className="grid min-w-0 gap-6">
              <CodeBlock
                className="reveal reveal-d1"
                lang="hcl"
                filename="infrastructure/production/service.tf"
                meta="Terraform"
                code={infraSample}
                caption="Environments are reviewed like application code — no manual console changes."
              />
            </div>
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <CodeBlock
              className="reveal"
              lang="yaml"
              filename=".github/workflows/delivery.yml"
              meta="CI"
              code={ciSample}
              caption="Lint, types, tests, accessibility and dependency audit all block the pipeline."
            />

            <div className="reveal reveal-d1 min-w-0">
              <p className="spec-key text-ink-500">Engineering standards</p>
              <dl className="mt-4 border-t border-line">
                {engineeringStandards.map((standard) => (
                  <div key={standard.ref} className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[6.5rem_1fr]">
                    <dt className="font-mono text-[11px] leading-5 text-accent">{standard.ref}</dt>
                    <dd>
                      <span className="block text-sm font-semibold text-ink-900">{standard.title}</span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-ink-600">{standard.text}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 4. WHY US — sticky heading + list */}
      <section className="section border-y border-line bg-band">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="05" className="reveal">Why Nexora</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Most engagements continue because the working relationship is predictable.
            </h2>
            <p className="reveal reveal-d2 mt-5 max-w-md text-base leading-relaxed text-ink-600">
              Technical depth is the baseline. What keeps clients is knowing what is happening, what it costs and what
              comes next.
            </p>
            <Link href="/about" className="link-arrow reveal reveal-d3 mt-7">
              How we work
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <ol className="reveal reveal-d2">
            {whyChooseUs.map((item, i) => (
              <li key={item.title} className="rule-row group flex gap-5 py-6 sm:gap-8 sm:py-7">
                <span className="idx pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-band text-accent transition duration-500 group-hover:border-accent group-hover:bg-accent-50">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-ink-900">{item.title}</span>
                  <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink-600">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════ 5. TECH STACK — layer matrix */}
      <section id="stack" className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="06" className="reveal">Technology Stack</SpecLabel>
              <AnchorHeading
                id="stack-matrix"
                className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl"
              >
                Proven tools, chosen for the problem
              </AnchorHeading>
            </div>
            <p className="reveal reveal-d2 max-w-sm text-sm leading-relaxed text-ink-600">
              Grouped by the layer it sits in, so you can see where a choice applies. Text names only — we do not
              display third-party logos or claim partnerships we do not have.
            </p>
          </div>

          <StackMatrix className="mt-10" />
        </div>
      </section>

      {/* ═══════════════════════════════ 6. INDUSTRIES — bento grid */}
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="07" className="reveal">Industries</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Domain context, not generic delivery
              </h2>
            </div>
            <Link href="/industries" className="btn-ghost reveal reveal-d2">
              All industries
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <BentoIndustries />
        </div>
      </section>

      {/* ═══════════════════════════════ 7. PROCESS — horizontal rail */}
      <section className="section">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <SpecLabel index="08" className="reveal">How We Work</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Seven stages, each with a decision point
            </h2>
          </div>
          <div className="reveal reveal-d2">
            <ProcessRail />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 8. CASE STUDIES — feature rows */}
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="09" className="reveal">Case Studies</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Selected project examples
              </h2>
              <p className="reveal reveal-d2 mt-4 max-w-lg text-sm leading-relaxed text-ink-600">
                Illustrative engagements showing how we approach delivery. These are sample projects, not real client
                work.
              </p>
            </div>
            <Link href="/case-studies" className="btn-ghost reveal reveal-d2">
              All case studies
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <FeatureRows items={featuredCases} />
        </div>
      </section>

      {/* ═══════════════════════════════ 9. TESTIMONIALS — lead quote + list */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <figure className="reveal">
              <SpecLabel index="10">Client Feedback</SpecLabel>
              <Icon name="quote" className="mt-8 h-10 w-10 text-accent" />
              <blockquote className="mt-5 font-display text-2xl font-medium leading-[1.35] text-ink-900 sm:text-[2rem]">
                “{leadQuote.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image
                  src={leadQuote.image}
                  alt=""
                  width={52}
                  height={52}
                  loading="lazy"
                  className="h-13 w-13 rounded-sm object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{leadQuote.name}</p>
                  <p className="text-xs text-ink-600">
                    {leadQuote.role}, {leadQuote.company}
                  </p>
                </div>
                <SampleBadge label="Demo" className="ml-auto" />
              </figcaption>
            </figure>

            <ul className="reveal reveal-d2 lg:pt-24">
              {restQuotes.map((t) => (
                <li key={t.role} className="rule-row py-6">
                  <p className="text-[15px] leading-relaxed text-ink-700">“{t.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Image src={t.image} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 rounded-sm object-cover" />
                    <p className="text-xs text-ink-600">
                      <span className="font-semibold text-ink-800">{t.name}</span> · {t.role}, {t.company}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Note>{testimonialsDisclaimer}</Note>
        </div>
      </section>

      {/* ═══════════════════════════════ 10. INSIGHTS — lead + stacked rows */}
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="11" className="reveal">Technology Insights</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Notes from our engineering practice
              </h2>
            </div>
            <Link href="/insights" className="btn-ghost reveal reveal-d2">
              All insights
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <Link href={`/insights/${leadPost.slug}`} className="group reveal block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
                <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-sm bg-accent-50 px-3 py-1.5 spec-key text-accent">
                  {leadPost.category}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold leading-snug">{leadPost.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-600">{leadPost.excerpt}</p>
              <span className="link-arrow mt-5">
                Read More
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>

            <ul className="reveal reveal-d2">
              {restPosts.map((post) => (
                <li key={post.slug} className="rule-row">
                  <Link href={`/insights/${post.slug}`} className="group flex gap-5 py-6">
                    <span className="relative h-20 w-24 shrink-0 overflow-hidden border border-line bg-band sm:h-24 sm:w-32">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-3 spec-key">
                        <span className="text-accent">{post.category}</span>
                        <span className="text-ink-500">{post.readTime}</span>
                      </span>
                      <span className="mt-2 block font-display text-base font-semibold leading-snug text-ink-900">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-600">{post.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 11. FAQ */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="12" className="reveal">FAQ</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Questions we are asked before every engagement
            </h2>
            <Link href="/faq" className="link-arrow reveal reveal-d2 mt-6">
              See all FAQs
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal reveal-d2">
            <Accordion items={faqs.slice(0, 7)} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 12. CTA */}
      <CTASection />

      {/* ═══════════════════════════════ 13. CONTACT — offset panel */}
      <section id="contact" className="relative border-t border-line bg-band pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SpecLabel index="13" className="reveal">Contact</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Start a conversation
              </h2>
              <p className="reveal reveal-d2 mt-4 max-w-md text-base leading-relaxed text-ink-600">
                Share a brief and we will come back with questions, an approach and an indicative range.
              </p>

              <dl className="reveal reveal-d3 mt-9">
                {[
                  { icon: 'pin', label: 'Office', value: site.contact.addressLines.join(', ') },
                  { icon: 'phone', label: 'Phone', value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}` },
                  { icon: 'mail', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
                ].map((item) => (
                  <div key={item.label} className="rule-row grid grid-cols-[1.75rem_1fr] gap-x-4 py-5">
                    <dt className="col-span-2 grid grid-cols-[1.75rem_1fr] items-center gap-x-4 spec-key text-ink-500">
                      <Icon name={item.icon} className="h-5 w-5 text-accent" />
                      <span>{item.label}</span>
                    </dt>
                    <dd className="col-start-2 mt-1 break-words text-sm text-ink-800">
                      {item.href ? (
                        <a href={item.href} className="transition hover:text-accent">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
                <div className="rule-row grid grid-cols-[1.75rem_1fr] gap-x-4 py-5">
                  <dt className="col-span-2 grid grid-cols-[1.75rem_1fr] items-center gap-x-4 spec-key text-ink-500">
                    <Icon name="clock" className="h-5 w-5 text-accent" />
                    <span>Business hours</span>
                  </dt>
                  {site.contact.hours.map((h) => (
                    <dd key={h.days} className="col-start-2 mt-1 text-sm text-ink-800">
                      <span className="text-ink-600">{h.days}:</span> {h.time}
                    </dd>
                  ))}
                </div>
              </dl>
            </div>

            <div id="enquiry" className="reveal reveal-d2 scroll-mt-28">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
