import Link from 'next/link';
import Icon from '@/components/Icon';
import { GridBackdrop } from '@/components/Section';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-28">
      <GridBackdrop />
      <div className="container relative text-center">
        <p className="font-display text-7xl font-semibold">
          <span className="gradient-text">404</span>
        </p>
        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-ink-400">
          The link may be outdated or the page may have moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/services" className="btn-ghost">
            Browse services
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
