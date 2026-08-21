import Link from 'next/link';
import Icon from './Icon';
import { SpecLabel } from './Section';

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
    <section className="border-t border-line bg-band">
      <div className="container">
        <div className="grid items-center gap-8 border-x border-line bg-paper px-6 py-14 sm:px-10 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SpecLabel index="99" className="reveal">
              Let&apos;s build something
            </SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
              {title}
            </h2>
            <p className="reveal reveal-d2 mt-4 max-w-xl text-base leading-relaxed text-ink-600">{text}</p>
          </div>
          <div className="reveal reveal-d3 flex flex-col gap-3 sm:flex-row lg:justify-end">
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
    </section>
  );
}
