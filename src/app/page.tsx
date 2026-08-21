import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import CTASection from '@/components/CTASection';
import Accordion from '@/components/Accordion';
import EnquiryForm from '@/components/EnquiryForm';
import ServiceIndex from '@/components/ServiceIndex';
import TechRails from '@/components/TechRails';
import BentoIndustries from '@/components/BentoIndustries';
import ProcessRail from '@/components/ProcessRail';
import FeatureRows from '@/components/FeatureRows';
import { GridBackdrop, Note, SampleBadge } from '@/components/Section';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { insights } from '@/data/insights';
import {
  faqs,
  stats,
  statsDisclaimer,
  techStackDisclaimer,
  testimonials,
  testimonialsDisclaimer,
  whyChooseUs,
} from '@/data/company';
import { site } from '@/data/site';

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
      {/* ═══════════════════════════════ 1. HERO — full-bleed, offset column */}
      <section className="relative overflow-hidden pb-0 pt-32 md:pt-36">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/assets/images/hero/hero-global-technology-network.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/85" />
        </div>
        <GridBackdrop />

        <div className="container relative pb-14">
          <div>
            <span className="eyebrow reveal">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-400" />
              Enterprise IT Services · India
            </span>

            <h1 className="reveal reveal-d1 mt-6 max-w-5xl text-[2.5rem] font-semibold leading-[1] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem]">
              Technology That
              <br />
              <span className="gradient-text">Moves Your Business</span>
              <br />
              Forward.
            </h1>

            {/* Supporting copy sits in an offset column, not centred under the headline */}
            <div className="reveal reveal-d2 mt-9 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Link href="/contact" className="btn-primary">
                  Talk to an Expert
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-ghost">
                  Explore Our Services
                </Link>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink-300 lg:justify-self-end lg:text-right">
                We build scalable digital solutions that help businesses improve operations, accelerate growth and stay
                ahead in a rapidly changing world.
              </p>
            </div>
          </div>
        </div>

        {/* Capability bar pinned to the bottom of the hero */}
        <div className="relative border-t border-white/10 bg-navy-950/55 backdrop-blur-sm">
          <div className="container">
            <dl className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
              {heroBar.map((item, i) => (
                <div key={item.k} className={`reveal reveal-d${i} px-0 py-5 lg:px-7 lg:first:pl-0 lg:last:pr-0`}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-400">{item.k}</dt>
                  <dd className="mt-1.5 text-sm text-ink-300">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ 2. STATS — single ticker strip */}
      <section className="border-b border-white/10 bg-navy-900/50 py-7">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-10 sm:gap-16">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-10 sm:gap-16" aria-hidden={copy === 1}>
                {stats.map((stat) => (
                  <span key={stat.label + copy} className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
                    <span className="font-display text-3xl font-semibold text-white sm:text-4xl">{stat.value}</span>
                    <span className="text-sm text-ink-400">{stat.label}</span>
                    <span className="ml-6 h-4 w-px bg-white/20 sm:ml-10" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <p className="mt-5 text-xs text-ink-500">{statsDisclaimer}</p>
        </div>
      </section>

      {/* ═══════════════════════════════ 3. SERVICES — editorial index */}
      <section id="services" className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="eyebrow reveal">What We Do</span>
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

      {/* ═══════════════════════════════ 4. WHY US — sticky heading + list */}
      <section className="section border-y border-white/10 bg-navy-900/30">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow reveal">Why Nexora</span>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Most engagements continue because the working relationship is predictable.
            </h2>
            <p className="reveal reveal-d2 mt-5 max-w-md text-base leading-relaxed text-ink-400">
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
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-electric-400 transition duration-500 group-hover:border-electric-400/40 group-hover:bg-electric-500/10">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-white">{item.title}</span>
                  <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink-400">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════ 5. TECH STACK — marquee rails */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">Technology Stack</span>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Proven tools, chosen for the problem
              </h2>
            </div>
            <p className="reveal reveal-d2 max-w-sm text-sm leading-relaxed text-ink-400">
              We standardise where it helps and stay pragmatic where it matters.
            </p>
          </div>
        </div>

        <div className="reveal reveal-d2 mt-12">
          <TechRails />
        </div>

        <div className="container">
          <Note>{techStackDisclaimer}</Note>
        </div>
      </section>

      {/* ═══════════════════════════════ 6. INDUSTRIES — bento grid */}
      <section className="section border-y border-white/10 bg-navy-900/30">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">Industries</span>
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
            <span className="eyebrow reveal">How We Work</span>
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
      <section className="section border-y border-white/10 bg-navy-900/30">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">Case Studies</span>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Selected project examples
              </h2>
              <p className="reveal reveal-d2 mt-4 max-w-lg text-sm leading-relaxed text-ink-400">
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
              <span className="eyebrow">Client Feedback</span>
              <Icon name="quote" className="mt-8 h-10 w-10 text-electric-400/50" />
              <blockquote className="mt-5 font-display text-2xl font-medium leading-[1.35] text-white sm:text-[2rem]">
                “{leadQuote.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image
                  src={leadQuote.image}
                  alt=""
                  width={52}
                  height={52}
                  loading="lazy"
                  className="h-13 w-13 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{leadQuote.name}</p>
                  <p className="text-xs text-ink-400">
                    {leadQuote.role}, {leadQuote.company}
                  </p>
                </div>
                <SampleBadge label="Demo" className="ml-auto" />
              </figcaption>
            </figure>

            <ul className="reveal reveal-d2 lg:pt-24">
              {restQuotes.map((t) => (
                <li key={t.role} className="rule-row py-6">
                  <p className="text-[15px] leading-relaxed text-ink-300">“{t.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Image src={t.image} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 rounded-full object-cover" />
                    <p className="text-xs text-ink-400">
                      <span className="font-semibold text-ink-200">{t.name}</span> · {t.role}, {t.company}
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
      <section className="section border-y border-white/10 bg-navy-900/30">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">Technology Insights</span>
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-electric-500/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-electric-400 backdrop-blur-md">
                  {leadPost.category}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold leading-snug">{leadPost.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-400">{leadPost.excerpt}</p>
              <span className="link-arrow mt-5">
                Read More
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>

            <ul className="reveal reveal-d2">
              {restPosts.map((post) => (
                <li key={post.slug} className="rule-row">
                  <Link href={`/insights/${post.slug}`} className="group flex gap-5 py-6">
                    <span className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="128px"
                        className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider">
                        <span className="text-electric-400">{post.category}</span>
                        <span className="text-ink-500">{post.readTime}</span>
                      </span>
                      <span className="mt-2 block font-display text-base font-semibold leading-snug text-white">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-400">{post.excerpt}</span>
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
            <span className="eyebrow reveal">FAQ</span>
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
      <section id="contact" className="relative border-t border-white/10 bg-navy-900/30 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <span className="eyebrow reveal">Contact</span>
              <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Start a conversation
              </h2>
              <p className="reveal reveal-d2 mt-4 max-w-md text-base leading-relaxed text-ink-400">
                Share a brief and we will come back with questions, an approach and an indicative range.
              </p>

              <dl className="reveal reveal-d3 mt-9">
                {[
                  { icon: 'pin', label: 'Office', value: site.contact.addressLines.join(', ') },
                  { icon: 'phone', label: 'Phone', value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}` },
                  { icon: 'mail', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
                ].map((item) => (
                  <div key={item.label} className="rule-row grid grid-cols-[1.75rem_1fr] gap-x-4 py-5">
                    <dt className="col-span-2 grid grid-cols-[1.75rem_1fr] items-center gap-x-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                      <Icon name={item.icon} className="h-5 w-5 text-electric-400" />
                      <span>{item.label}</span>
                    </dt>
                    <dd className="col-start-2 mt-1 break-words text-sm text-ink-200">
                      {item.href ? (
                        <a href={item.href} className="transition hover:text-electric-400">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
                <div className="rule-row grid grid-cols-[1.75rem_1fr] gap-x-4 py-5">
                  <dt className="col-span-2 grid grid-cols-[1.75rem_1fr] items-center gap-x-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                    <Icon name="clock" className="h-5 w-5 text-electric-400" />
                    <span>Business hours</span>
                  </dt>
                  {site.contact.hours.map((h) => (
                    <dd key={h.days} className="col-start-2 mt-1 text-sm text-ink-200">
                      <span className="text-ink-400">{h.days}:</span> {h.time}
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
