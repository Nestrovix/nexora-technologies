import type { Metadata } from 'next';
import Image from 'next/image';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import ApplicationForm from '@/components/ApplicationForm';
import Accordion from '@/components/Accordion';
import { Note, SpecLabel } from '@/components/Section';
import { careerBenefits, cultureDisclaimer, jobCategories, jobs } from '@/data/careers';
import { values } from '@/data/company';

export const metadata: Metadata = {
  title: 'Careers — Work at Nexora Technologies',
  description:
    'Explore engineering, cloud, data, design and consulting roles at Nexora Technologies. See how we work, what we offer and apply online.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Careers"
        title={
          <>
            Build systems that
            <br />
            businesses <span className="text-accent">actually run on</span>
          </>
        }
        lead="We hire people who care about the craft and are comfortable talking directly to the clients they build for."
        image="/assets/images/careers/life-at-nexora.webp"
        imageAlt="Team working together at Nexora Technologies"
        breadcrumbs={[{ label: 'Careers' }]}
        meta={[
          { k: 'Open roles', v: `${jobs.length} sample vacancies` },
          { k: 'Teams', v: jobCategories.join(' · ') },
          { k: 'Working style', v: 'Hybrid and remote-first' },
          { k: 'Process', v: '4 conversations, no take-home marathon' },
        ]}
      />

      {/* ── WHY WORK WITH US — sticky heading, list, staggered images */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <SpecLabel index="02" className="reveal">Why Work With Us</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 max-w-lg text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Real ownership, senior support
            </h2>
            <p className="reveal reveal-d2 mt-5 max-w-lg text-base leading-relaxed text-ink-600">
              Engineers here own modules end to end — architecture, delivery and the client conversation — with senior
              people available when a decision is hard.
            </p>

            <ol className="reveal reveal-d3 mt-10">
              {values.slice(0, 4).map((v, i) => (
                <li key={v.title} className="rule-row flex gap-6 py-5">
                  <span className="idx pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-900">{v.title}.</span> {v.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal reveal-d2 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/assets/images/careers/team-working-session.webp"
                alt="Nexora team in a working session"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 240px"
                className="object-cover"
              />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/assets/images/careers/engineering-pair-review.webp"
                alt="Two engineers reviewing code together"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 240px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS — numbered hairline grid, no cards */}
      <section className="section border-y border-line bg-band">
        <div className="container grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="03" className="reveal">Benefits</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">What we offer</h2>
          </div>
          <ol className="reveal reveal-d2 grid gap-x-14 sm:grid-cols-2">
            {careerBenefits.map((b, i) => (
              <li key={b.title} className="rule-row py-6">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{b.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── OPEN POSITIONS — expandable table rows */}
      <section id="openings" className="section scroll-mt-28">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SpecLabel index="04" className="reveal">Open Positions</SpecLabel>
              <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
                Current openings
              </h2>
            </div>
            <p className="reveal reveal-d2 max-w-xs text-sm leading-relaxed text-ink-600">
              Sample vacancies for demonstration. Replace with the company&apos;s live roles before publishing.
            </p>
          </div>

          <div className="reveal reveal-d2 border border-line bg-paper">
            {/* header row (desktop only) */}
            <div className="hidden grid-cols-[3rem_1fr_10rem_9rem_7rem_3rem] items-center gap-4 border-b border-line bg-band px-5 py-3 spec-key text-ink-500 lg:grid">
              <span>#</span>
              <span>Role</span>
              <span>Team</span>
              <span>Location</span>
              <span>Experience</span>
              <span />
            </div>

            {jobs.map((job, i) => (
              <details key={job.id} className="group border-b border-line last:border-b-0">
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_2rem] items-center gap-4 px-5 py-5 transition hover:bg-band lg:grid-cols-[3rem_1fr_10rem_9rem_7rem_3rem]">
                  <span className="idx hidden lg:block">{String(i + 1).padStart(2, '0')}</span>

                  <span className="min-w-0">
                    <h3 className="block font-display text-lg font-semibold text-ink-900">{job.title}</h3>
                    <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-600 lg:hidden">
                      <span className="text-accent">{job.category}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                      <span>·</span>
                      <span>{job.experience}</span>
                    </span>
                  </span>

                  <span className="hidden text-sm text-accent lg:block">{job.category}</span>
                  <span className="hidden text-sm text-ink-600 lg:block">{job.location}</span>
                  <span className="hidden text-sm text-ink-600 lg:block">{job.experience}</span>

                  <span className="grid h-8 w-8 place-items-center justify-self-end rounded-sm border border-line text-accent transition duration-300 group-open:rotate-45">
                    <Icon name="plus" className="h-4 w-4" />
                  </span>
                </summary>

                <div className="border-t border-line bg-band px-5 py-6">
                  <p className="max-w-3xl text-sm leading-relaxed text-ink-700">{job.summary}</p>

                  <div className="mt-6 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="spec-key text-ink-500">
                        Responsibilities
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {job.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-[13px] text-ink-700">
                            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="spec-key text-ink-500">
                        Requirements
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {job.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-[13px] text-ink-700">
                            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a href="#apply" className="btn-primary mt-7 !py-2.5 text-xs">
                    Apply for this role
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </details>
            ))}
          </div>

          <Note>{cultureDisclaimer}</Note>
        </div>
      </section>

      {/* ── APPLY */}
      <section id="apply" className="section scroll-mt-28 border-t border-line bg-band">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="05" className="reveal">Apply</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Send us your application
            </h2>
            <p className="reveal reveal-d2 mt-4 max-w-md text-base leading-relaxed text-ink-600">
              No opening that fits? Submit a general application — we keep strong profiles on file.
            </p>
            <div className="reveal reveal-d3 mt-8">
              <Accordion
                items={[
                  {
                    q: 'What does the hiring process look like?',
                    a: 'An introductory call, a practical technical conversation based on real work, a session with the practice lead, and a final discussion covering expectations and offer details.',
                  },
                  {
                    q: 'Do you hire remotely?',
                    a: 'Several roles are remote-first within India. Role-specific location expectations are listed on each opening.',
                  },
                  {
                    q: 'Do you take interns or freshers?',
                    a: 'We run a small structured intake each year. When it is open it will be listed among the positions above.',
                  },
                ]}
                defaultOpen={null}
              />
            </div>
          </div>
          <div className="reveal reveal-d2">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
