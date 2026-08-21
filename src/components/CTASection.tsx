import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';

export default function CTASection({
  title = 'Have a Technology Challenge?',
  text = "Let's discuss how technology can help your business grow.",
  primary = { label: 'Talk to an Expert', href: '/contact' },
  secondary = { label: 'Start a Project', href: '/contact#enquiry' },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center sm:px-12 md:py-20">
          <Image
            src="/assets/images/hero/cta-technology-backdrop.webp"
            alt=""
            fill
            sizes="(max-width: 1240px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-950/95" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid-fade bg-grid opacity-30" aria-hidden="true" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-electric-500/20 blur-[110px]" aria-hidden="true" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[110px]" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow reveal">Let&apos;s build something</span>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="reveal reveal-d2 mt-4 text-base text-ink-300 sm:text-lg">{text}</p>
            <div className="reveal reveal-d3 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={primary.href} className="btn-primary">
                {primary.label}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href={secondary.href} className="btn-ghost">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
