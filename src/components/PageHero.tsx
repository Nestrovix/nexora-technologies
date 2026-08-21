import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { GridBackdrop } from './Section';

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950" />
      </div>
      <GridBackdrop />
      <div className="container relative">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <li>
                <Link href="/" className="transition hover:text-electric-400">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <Icon name="arrow" className="h-3 w-3 opacity-50" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-electric-400">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-300">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <span className="eyebrow reveal">{eyebrow}</span>}
        <h1 className="reveal reveal-d1 mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>
        {description && (
          <p className="reveal reveal-d2 mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>
        )}
      </div>
      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
