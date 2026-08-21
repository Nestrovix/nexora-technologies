import Link from 'next/link';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Nexora Technologies — home">
      <span className="grid h-9 w-9 place-items-center border border-ink-900 bg-ink-900 text-paper transition-colors group-hover:border-accent group-hover:bg-accent">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <path d="M5 19V5l14 14V5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold tracking-tight text-ink-900">Nexora</span>
        {!compact && <span className="spec-key mt-1 text-ink-500">Technologies</span>}
      </span>
    </Link>
  );
}
