import type { ReactNode } from 'react';

/**
 * Section label — `01 / SERVICES`.
 * Tracked uppercase Public Sans with a leading index; no monospace, no pill.
 */
export function SpecLabel({
  index,
  children,
  className = '',
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`spec-label ${className}`}>
      <span className="spec-label__index">{index}</span>
      <span className="spec-label__slash" aria-hidden="true">
        /
      </span>
      <span>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  index = '01',
  title,
  description,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <SpecLabel index={index} className="reveal">
          {eyebrow}
        </SpecLabel>
      )}
      <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {description && <p className="reveal reveal-d2 mt-4 text-base leading-relaxed text-ink-600">{description}</p>}
    </div>
  );
}

/** Marks demo/sample content. A bordered tag, not a rounded pill. */
export function SampleBadge({ label = 'Sample project', className = '' }: { label?: string; className?: string }) {
  return (
    <span
      className={`spec-key inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper px-2 py-1.5 text-ink-700 ${className}`}
    >
      <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Build note — an accent-ruled aside, kept visually distinct from body copy. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 border-y border-line border-l-2 border-l-accent bg-band px-4 py-3 text-xs leading-relaxed text-ink-700">
      {children}
    </p>
  );
}

/**
 * Drafting rules — four faint vertical hairlines behind a masthead, aligned to
 * the container. Replaces the old blurred colour blobs.
 */
export function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="container relative h-full">
        <div className="grid h-full grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-line/70" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── Engineering furniture */

/**
 * A monospace eyebrow — used where the label should read as something typed
 * (a path, a ref, a spec id) rather than typeset.
 */
export function MonoEyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`mono-eyebrow ${className}`}>{children}</span>;
}

/** `v2.4.1` — a bordered monospace chip used beside engineering headings. */
export function VersionTag({ version, className = '' }: { version: string; className?: string }) {
  return (
    <span className={`tag-version ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {version}
    </span>
  );
}

/**
 * A section heading with a `#` deep link, the way a docs site anchors its
 * sections. The hash is hidden from assistive tech; the link itself is
 * labelled, keyboard reachable and shows a visible focus ring.
 */
export function AnchorHeading({
  id,
  children,
  className = '',
  level = 2,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  level?: 2 | 3;
}) {
  const Tag = level === 3 ? 'h3' : 'h2';
  return (
    <Tag id={id} className={`scroll-mt-28 ${className}`}>
      {children}
      <a href={`#${id}`} className="anchor-hash focus-visible:opacity-100" aria-label="Link to this section">
        <span aria-hidden="true">#</span>
      </a>
    </Tag>
  );
}

/**
 * A commit-hash style reference, e.g. `spec/architecture · a41f9c2`.
 */
export function CommitRef({ path, hash }: { path: string; hash: string }) {
  return (
    <span className="commit-ref">
      {path} · {hash}
    </span>
  );
}
