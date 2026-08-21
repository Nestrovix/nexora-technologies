import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import CTASection from '@/components/CTASection';
import { GridBackdrop, Note, SampleBadge } from '@/components/Section';
import { caseStudies, getCaseStudy } from '@/data/case-studies';
import { site } from '@/data/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Case study not found' };

  return {
    title: `${study.title} — Sample Case Study`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} | ${site.name}`,
      description: study.summary,
      url: `${site.url}/case-studies/${study.slug}`,
      images: [{ url: study.image, width: 1400, height: 933, alt: study.title }],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 4);

  return (
    <>
      {/* ── MASTHEAD — split, with the image bleeding to the right edge */}
      <section className="relative overflow-hidden pt-32 md:pt-36">
        <GridBackdrop />
        <div className="container relative">
          <nav aria-label="Breadcrumb" className="reveal mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-electric-400">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 opacity-50" />
                <Link href="/case-studies" className="transition hover:text-electric-400">Case Studies</Link>
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-10 pb-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <div className="reveal flex flex-wrap items-center gap-3">
                <SampleBadge />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-electric-400">
                  {study.industry}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{study.service}</span>
              </div>

              <h1 className="reveal reveal-d1 mt-6 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl">
                {study.title}
              </h1>
              <p className="reveal reveal-d2 mt-5 max-w-xl text-base leading-relaxed text-ink-300">{study.summary}</p>
            </div>

            <div className="reveal reveal-d2 relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-card">
              <Image
                src={study.image}
                alt={`${study.title} — sample project visual`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* results as a meta rail */}
        <div className="relative border-y border-white/10 bg-navy-900/40">
          <div className="container">
            <dl className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
              <div className="reveal py-6 lg:pr-7">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-400">Duration</dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-white">{study.duration}</dd>
              </div>
              {study.results.map((r, i) => (
                <div key={r.label} className={`reveal reveal-d${i + 1} py-6 lg:px-7 lg:last:pr-0`}>
                  <dt className="font-display text-lg font-semibold text-white">{r.value}</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-ink-400">{r.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION — paired columns on rules */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[
              { n: '01', label: 'The Challenge', text: study.challenge, tone: 'text-red-300/80' },
              { n: '02', label: 'Our Solution', text: study.solution, tone: 'text-emerald-300/80' },
            ].map((block, i) => (
              <div key={block.label} className={`reveal reveal-d${i} border-t border-white/15 pt-7`}>
                <div className="flex items-center gap-4">
                  <span className="idx">{block.n}</span>
                  <h2 className={`text-sm font-semibold uppercase tracking-[0.18em] ${block.tone}`}>{block.label}</h2>
                </div>
                <p className="mt-5 text-base leading-[1.75] text-ink-300">{block.text}</p>
              </div>
            ))}
          </div>

          {/* Approach as a numbered rail */}
          <div className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow reveal">Approach</span>
              <h2 className="reveal reveal-d1 mt-5 text-2xl font-semibold leading-[1.15] sm:text-3xl">
                How the work was sequenced
              </h2>
              <div className="reveal reveal-d2 mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Technologies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ol className="reveal reveal-d2">
              {study.approach.map((step, i) => (
                <li key={step} className="rule-row flex gap-6 py-6">
                  <span className="idx pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-ink-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <Note>
            <strong className="font-semibold">Sample project:</strong> this case study is illustrative content created
            for this website build. It does not represent a real client, engagement or verified outcome.
          </Note>
        </div>
      </section>

      {/* ── MORE WORK — hairline list with thumbnails */}
      <section className="section border-t border-white/10 bg-navy-900/30">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal text-2xl font-semibold sm:text-3xl">Other sample projects</h2>
            <Link href="/case-studies" className="link-arrow reveal">
              All case studies
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="reveal reveal-d1">
            {related.map((project, i) => (
              <li key={project.slug} className="rule-row">
                <Link href={`/case-studies/${project.slug}`} className="group flex items-center gap-5 py-5">
                  <span className="idx hidden sm:block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="96px"
                      className="object-cover transition duration-700 ease-premium group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-electric-400">
                      {project.industry}
                    </span>
                    <span className="mt-1 block font-display text-base font-semibold text-ink-200 transition group-hover:text-white">
                      {project.title}
                    </span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-ink-500 transition group-hover:text-electric-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
