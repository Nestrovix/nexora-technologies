import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import { insights } from '@/data/insights';

export const metadata: Metadata = {
  title: 'Technology Insights — AI, Cloud, Security & Engineering',
  description:
    'Practical technology writing from the Nexora Technologies team on AI automation, cloud trends, cybersecurity practice, digital transformation and scalable web applications.',
  alternates: { canonical: '/insights' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function InsightsPage() {
  const [lead, ...rest] = insights;
  const categories = Array.from(new Set(insights.map((i) => i.category)));

  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title={
          <>
            Notes from our
            <br />
            <span className="text-accent">engineering practice</span>
          </>
        }
        lead="Written for the people who have to make the decision — not for search engines."
        image="/assets/images/insights/digital-transformation.webp"
        imageAlt="Team discussing a technology roadmap"
        breadcrumbs={[{ label: 'Insights' }]}
        meta={[
          { k: 'Articles', v: `${insights.length} published` },
          { k: 'Topics', v: categories.join(' · ') },
          { k: 'Written by', v: 'The delivery teams' },
          { k: 'Format', v: 'Practical, no vendor pitches' },
        ]}
      />

      {/* ── LEAD ARTICLE — wide split */}
      <section className="pt-16 md:pt-20">
        <div className="container">
          <Link
            href={`/insights/${lead.slug}`}
            className="group reveal grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-700 ease-premium group-hover:scale-105"
              />
            </div>

            <div>
              <span className="idx">Latest</span>
              <div className="mt-4 flex flex-wrap items-center gap-3 spec-key">
                <span className="rounded-sm bg-accent-50 px-2.5 py-1 text-accent">{lead.category}</span>
                <span className="text-ink-500">{formatDate(lead.date)}</span>
                <span className="text-ink-500">·</span>
                <span className="text-ink-500">{lead.readTime}</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold leading-[1.2] sm:text-4xl">{lead.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">{lead.excerpt}</p>
              <span className="link-arrow mt-7">
                Read More
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── INDEX — numbered rows, thumbnail slides in on hover */}
      <section className="section pt-12">
        <div className="container">
          <p className="reveal spec-key text-ink-500">All articles</p>

          <ol className="reveal reveal-d1 mt-6">
            {rest.map((post, i) => (
              <li key={post.slug} className="rule-row">
                <Link href={`/insights/${post.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7">
                  <span className="idx self-start pt-1.5 sm:self-center sm:pt-0">
                    {String(i + 2).padStart(2, '0')}
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-3 spec-key">
                      <span className="text-accent">{post.category}</span>
                      <span className="text-ink-500">{formatDate(post.date)}</span>
                      <span className="text-ink-500">·</span>
                      <span className="text-ink-500">{post.readTime}</span>
                    </span>
                    <span className="mt-2 block font-display text-xl font-semibold leading-snug text-ink-800 transition group-hover:text-ink-900 sm:text-2xl">
                      {post.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-500">{post.excerpt}</span>
                  </span>

                  <span className="flex items-center gap-5">
                    <span className="relative h-16 w-20 shrink-0 overflow-hidden border border-line bg-band sm:h-20 sm:w-32">
                      <Image src={post.image} alt="" fill loading="lazy" sizes="(max-width: 640px) 80px, 128px" className="object-cover" />
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-line text-ink-500 transition group-hover:border-accent group-hover:text-accent">
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Want this applied to your systems?"
        text="We are happy to talk through any of these topics in your context."
      />
    </>
  );
}
