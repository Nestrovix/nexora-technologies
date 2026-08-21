import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <span className="eyebrow reveal">{eyebrow}</span>}
      <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      {description && <p className="reveal reveal-d2 mt-4 text-base leading-relaxed text-ink-400">{description}</p>}
    </div>
  );
}

export function SampleBadge({ label = 'Sample project', className = '' }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
      {label}
    </span>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-200/80">
      {children}
    </p>
  );
}

export function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40 mask-fade-b" />
      <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-electric-500/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-violet-600/10 blur-[120px]" />
    </div>
  );
}
