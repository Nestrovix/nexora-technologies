import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import MilestoneRail from '@/components/MilestoneRail';
import TechRails from '@/components/TechRails';
import { Note, SpecLabel } from '@/components/Section';
import {
  leadership,
  leadershipDisclaimer,
  milestones,
  milestonesDisclaimer,
  stats,
  statsDisclaimer,
  values,
} from '@/data/company';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Nexora Technologies — IT Company in India',
  description:
    'Learn about Nexora Technologies: our mission, values, leadership, company journey and the technology expertise behind our software, cloud, security and data practices.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Us"
        title={
          <>
            An engineering partner,
            <br />
            <span className="text-accent">not a body shop</span>
          </>
        }
        lead={`Since ${site.founded}, Nexora has built the software, cloud platforms and data capability that businesses across India and international markets depend on every day.`}
        image="/assets/images/about/modern-technology-workspace.webp"
        imageAlt="Modern technology workspace at Nexora Technologies"
        breadcrumbs={[{ label: 'About' }]}
        meta={stats.map((s) => ({ k: s.label, v: s.value }))}
      />

      {/* ── WHO WE ARE — overlapping image composition, text offset right */}
      <section className="section">
        <div className="container">
          <p className="text-xs text-ink-500">{statsDisclaimer}</p>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="reveal relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
                <Image
                  src="/assets/images/about/engineering-team-collaboration.webp"
                  alt="Engineers collaborating on a system design at Nexora Technologies"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
              {/* offset overlapping panel */}
              <div className="absolute -bottom-8 -right-4 hidden w-56 rounded-2xl border border-line bg-band p-5 sm:block lg:-right-10">
                <p className="font-display text-3xl font-semibold text-ink-900">
                  <span className="text-accent">Mid-sized</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">
                  Large enough to staff multi-team programmes. Small enough that the people who scoped your project
                  deliver it.
                </p>
              </div>
            </div>

            <div className="lg:pt-10">
              <SpecLabel index="02" className="reveal">Who We Are</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Technology delivered with accountability
              </h2>
              <div className="reveal reveal-d2 mt-6 space-y-4 text-base leading-relaxed text-ink-600">
                <p>
                  We work with businesses that have outgrown their tools — where spreadsheets, disconnected systems and
                  off-the-shelf products no longer carry the operation.
                </p>
                <p>
                  Every engagement is staffed with architects, security specialists and data engineers, not only on the
                  large programmes. The people who write your proposal are the people who build it.
                </p>
              </div>

              <dl className="reveal reveal-d3 mt-10">
                {[
                  { k: 'Founded', v: site.founded },
                  { k: 'Head office', v: `${site.contact.city}, ${site.contact.region}` },
                  { k: 'Engagement models', v: 'Fixed scope · Dedicated team · Retainer' },
                  { k: 'Code ownership', v: 'Transferred to the client on completion' },
                ].map((row) => (
                  <div key={row.k} className="rule-row grid grid-cols-[9rem_1fr] gap-4 py-4">
                    <dt className="spec-key text-ink-500">{row.k}</dt>
                    <dd className="text-sm text-ink-800">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION — two oversized statements on rules, no cards */}
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            {[
              {
                n: '01',
                icon: 'target',
                label: 'Our Mission',
                text: 'To give growing and established businesses the same quality of engineering, security and operational discipline that large technology organisations build in-house — without the overhead of building it themselves.',
              },
              {
                n: '02',
                icon: 'compass',
                label: 'Our Vision',
                text: 'To be the technology partner Indian businesses turn to when a decision actually matters — trusted for honest advice first, and delivery capability second.',
              },
            ].map((item, i) => (
              <div key={item.label} className={`reveal reveal-d${i} border-t border-line pt-8`}>
                <div className="flex items-center gap-4">
                  <span className="idx">{item.n}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-700">{item.label}</h2>
                </div>
                <p className="mt-6 font-display text-xl font-medium leading-[1.45] text-ink-900 sm:text-[1.6rem]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES — two-column numbered hairline list */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="03" className="reveal">Our Values</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              What we hold ourselves to
            </h2>
          </div>
          <ol className="reveal reveal-d2 grid gap-x-14 sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="rule-row py-6">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── JOURNEY — horizontal timeline rail */}
      <section className="section border-y border-line bg-band">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <SpecLabel index="04" className="reveal">Our Journey</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              How the company has grown
            </h2>
          </div>
          <div className="reveal reveal-d2">
            <MilestoneRail items={milestones.map((m) => ({ year: m.year, title: m.title, text: m.text }))} />
          </div>
          <Note>{milestonesDisclaimer}</Note>
        </div>
      </section>

      {/* ── LEADERSHIP — staggered offsets rather than an even grid */}
      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="05" className="reveal">Leadership</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-lg text-3xl font-semibold leading-[1.1] sm:text-4xl">
                The people accountable for delivery
              </h2>
            </div>
            <p className="reveal reveal-d2 max-w-xs text-sm leading-relaxed text-ink-600">
              Placeholder profiles — replace with real leadership details before publishing.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, i) => (
              <article key={person.name} className={`reveal reveal-d${i % 4} ${i % 2 === 1 ? 'lg:mt-14' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={person.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition duration-700 ease-premium hover:grayscale-0"
                  />
                </div>
                <p className="mt-5 spec-key text-accent">
                  {person.role}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold">{person.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{person.bio}</p>
              </article>
            ))}
          </div>
          <Note>{leadershipDisclaimer}</Note>
        </div>
      </section>

      {/* ── EXPERTISE — marquee rails */}
      <section className="section overflow-hidden border-t border-line bg-band">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="06" className="reveal">Technology Expertise</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 max-w-xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Depth across the stack we deliver on
              </h2>
            </div>
            <Link href="/services" className="btn-ghost reveal reveal-d2">
              See our services
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="reveal reveal-d2 mt-12">
          <TechRails />
        </div>
      </section>

      <CTASection title="Want to know if we are the right fit?" text="A short discovery call is usually enough to tell." />
    </>
  );
}
