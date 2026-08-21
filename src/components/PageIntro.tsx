import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { GridBackdrop } from './Section';

/**
 * Page opening block — a left-aligned editorial masthead with a meta rail
 * running along the bottom. Deliberately different from the centred
 * hero-image-behind-headline pattern used elsewhere.
 */
export default function PageIntro({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  meta = [],
  breadcrumbs = [],
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image: string;
  imageAlt: string;
  meta?: { k: string; v: string }[];
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-36">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/80" />
      </div>
      <GridBackdrop />

      <div className="container relative pb-12">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-electric-400">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <Icon name="arrow" className="h-3 w-3 opacity-50" />
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-electric-400">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink-300">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <span className="eyebrow reveal">{eyebrow}</span>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <h1 className="reveal reveal-d1 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          {lead && (
            <p className="reveal reveal-d2 max-w-xl text-base leading-relaxed text-ink-300 lg:pb-3">{lead}</p>
          )}
        </div>
      </div>

      {meta.length > 0 && (
        <div className="relative border-t border-white/10 bg-navy-950/55 backdrop-blur-sm">
          <div className="container">
            <dl className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
              {meta.map((m, i) => (
                <div key={m.k} className={`reveal reveal-d${i} py-5 lg:px-7 lg:first:pl-0 lg:last:pr-0`}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-400">{m.k}</dt>
                  <dd className="mt-1.5 text-sm text-ink-300">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
