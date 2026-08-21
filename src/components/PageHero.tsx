import Link from 'next/link';
import Icon from './Icon';
import { SpecLabel } from './Section';

/**
 * Compact masthead for document pages (legal, policy). Type only — no image
 * plate, since these pages are text records.
 */
export default function PageHero({
  eyebrow,
  index = '01',
  title,
  description,
  imageAlt,
  breadcrumbs = [],
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="border-b border-line pb-14 pt-28 md:pb-16 md:pt-32">
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal border-b border-line pb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-accent">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <Icon name="arrow" className="h-3 w-3 text-line" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-700">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="pt-10">
          {eyebrow && (
            <SpecLabel index={index} className="reveal">
              {eyebrow}
            </SpecLabel>
          )}
          <h1 className="reveal reveal-d1 mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.025em] text-ink-900 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="reveal reveal-d2 mt-5 max-w-2xl border-l-2 border-accent pl-5 text-base leading-relaxed text-ink-700">
              {description}
            </p>
          )}
        </div>
      </div>
      {imageAlt && <span className="sr-only">{imageAlt}</span>}
    </section>
  );
}
