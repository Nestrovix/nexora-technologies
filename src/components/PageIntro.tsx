import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { SpecLabel } from './Section';

/**
 * Page masthead, built as the header block of a spec sheet: an indexed label,
 * a left-aligned title, a lead in the second column, then a hairline meta
 * table and a bordered image plate. No overlay, no tinted photograph.
 */
export default function PageIntro({
  eyebrow,
  index = '01',
  title,
  lead,
  image,
  imageAlt,
  meta = [],
  breadcrumbs = [],
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lead?: string;
  image: string;
  imageAlt: string;
  meta?: { k: string; v: string }[];
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="border-b border-line pt-28 md:pt-32">
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal border-b border-line pb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-accent">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <Icon name="arrow" className="h-3 w-3 text-line" />
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink-700">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="pt-10">
          <SpecLabel index={index} className="reveal">
            {eyebrow}
          </SpecLabel>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="reveal reveal-d1 text-[2.3rem] font-bold leading-[1.04] tracking-[-0.025em] text-ink-900 sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
            {lead && (
              <p className="reveal reveal-d2 max-w-xl border-l-2 border-accent pl-5 text-base leading-relaxed text-ink-700 lg:pb-2">
                {lead}
              </p>
            )}
          </div>
        </div>

        {meta.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {meta.map((m, i) => (
              <div
                key={m.k}
                className={`reveal reveal-d${i} border-b border-line py-5 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}
              >
                <dt className="spec-key">{m.k}</dt>
                <dd className="mt-2 text-sm leading-snug text-ink-800">{m.v}</dd>
              </div>
            ))}
          </dl>
        )}

        <figure className="reveal reveal-d2 mt-12 pb-16">
          <div className="ticked relative aspect-[21/7] w-full overflow-hidden border border-line bg-band">
            <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          </div>
          <figcaption className="spec-key mt-3 text-ink-500">{imageAlt}</figcaption>
        </figure>
      </div>
    </section>
  );
}
