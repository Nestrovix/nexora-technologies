import Link from 'next/link';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Nexora Technologies — home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-600 shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 19V5l14 14V5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight text-white">Nexora</span>
        {!compact && (
          <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink-400">Technologies</span>
        )}
      </span>
    </Link>
  );
}
