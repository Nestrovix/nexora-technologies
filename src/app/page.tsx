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
import { Note, SampleBadge, SpecLabel } from '@/components/Section';
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

          <figure className="reveal reveal-d2 mt-12 pb-16">
            <div className="ticked relative aspect-[21/7] w-full overflow-hidden border border-line bg-band">
              <Image
                src="/assets/images/hero/hero-global-technology-network.webp"
                alt="Global technology network linking data centres and offices"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="spec-key mt-3 text-ink-500">
              Fig. 01 — Global technology network linking data centres and offices
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ═══════════════════════════════ 2. STATS — figures table */}
      <section className="border-b border-line bg-band py-10">
        <div className="container">
          <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-d${i} border-b border-line py-5 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0`}
              >
                <dt className="tabnum font-display text-3xl font-bold text-ink-900 sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1.5 text-sm text-ink-600">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-ink-500">{statsDisclaimer}</p>
        </div>
      </section>

      {/* ═══════════════════════════════ 3. SERVICES — editorial index */}
      <section id="services" className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <SpecLabel index="01" className="reveal">What We Do</SpecLabel>
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
      <section className="section border-y border-line bg-band">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="02" className="reveal">Why Nexora</SpecLabel>
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

      {/* ═══════════════════════════════ 5. TECH STACK — marquee rails */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="03" className="reveal">Technology Stack</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Proven tools, chosen for the problem
              </h2>
            </div>
            <p className="reveal reveal-d2 max-w-sm text-sm leading-relaxed text-ink-600">
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
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="04" className="reveal">Industries</SpecLabel>
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
            <SpecLabel index="05" className="reveal">How We Work</SpecLabel>
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
              <SpecLabel index="06" className="reveal">Case Studies</SpecLabel>
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
              <SpecLabel index="07">Client Feedback</SpecLabel>
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
              <SpecLabel index="08" className="reveal">Technology Insights</SpecLabel>
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
            <SpecLabel index="09" className="reveal">FAQ</SpecLabel>
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
              <SpecLabel index="10" className="reveal">Contact</SpecLabel>
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
