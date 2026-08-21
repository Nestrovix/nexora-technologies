import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import CTASection from '@/components/CTASection';
import { GridBackdrop } from '@/components/Section';
import { getInsight, insights } from '@/data/insights';
import { site } from '@/data/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: 'Article not found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/insights/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.title }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const more = insights.filter((i) => i.slug !== post.slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
  };

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-32 md:pt-40">
        <GridBackdrop />
        <div className="container relative">
          <nav aria-label="Breadcrumb" className="reveal mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-electric-400">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="arrow" className="h-3 w-3 opacity-50" />
                <Link href="/insights" className="transition hover:text-electric-400">Insights</Link>
              </li>
            </ol>
          </nav>
          <div className="reveal flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-wider">
            <span className="rounded-full bg-electric-500/10 px-2.5 py-1 text-electric-400">{post.category}</span>
            <span className="text-ink-500">{formatDate(post.date)}</span>
            <span className="text-ink-500">·</span>
            <span className="text-ink-500">{post.readTime}</span>
          </div>
          <h1 className="reveal reveal-d1 mt-5 max-w-4xl text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[3rem]">
            {post.title}
          </h1>
          <p className="reveal reveal-d2 mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">{post.excerpt}</p>
        </div>
      </section>

      <section className="pb-6">
        <div className="container">
          <div className="reveal relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 1240px) 100vw, 1200px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          {/* sticky contents rail */}
          <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Contents</p>
            <ol className="mt-4">
              {post.body.map((block, i) => (
                <li key={block.heading} className="rule-row">
                  <a
                    href={`#${block.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="group flex gap-3 py-3 text-sm text-ink-400 transition hover:text-white"
                  >
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 leading-snug">{block.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">Written by</p>
              <p className="mt-2 text-sm text-ink-200">{post.author}</p>
              <p className="mt-1 text-xs text-ink-500">{post.readTime}</p>
            </div>
          </nav>

          <article className="max-w-3xl">
            {post.body.map((block) => (
              <div
                key={block.heading}
                id={block.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="reveal mt-12 scroll-mt-28 first:mt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="idx">{String(post.body.indexOf(block) + 1).padStart(2, '0')}</span>
                  <h2 className="text-2xl font-semibold sm:text-3xl">{block.heading}</h2>
                </div>
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4 text-base leading-[1.75] text-ink-300">
                    {p}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-ink-300">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-electric-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="glass mt-12 rounded-2xl p-6">
              <p className="text-sm text-ink-400">
                Written by <span className="font-semibold text-white">{post.author}</span>. If you would like to discuss
                how this applies to your environment, we are happy to talk it through.
              </p>
              <Link href="/contact" className="link-arrow mt-4">
                Talk to an Expert
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-navy-900/30 py-16">
        <div className="container">
          <h2 className="reveal text-2xl font-semibold">More insights</h2>
          <ul className="reveal reveal-d1 mt-8">
            {more.map((item, i) => (
              <li key={item.slug} className="rule-row">
                <Link href={`/insights/${item.slug}`} className="group flex items-center gap-5 py-5">
                  <span className="idx hidden sm:block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="96px"
                      className="object-cover transition duration-700 ease-premium group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-electric-400">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-base font-semibold leading-snug text-ink-200 transition group-hover:text-white">
                      {item.title}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
