import { processSteps } from '@/data/company';

/**
 * Delivery process as a horizontal rail on a continuous track line, rather than
 * a grid of equal cards. Scrolls sideways with snap points on small screens.
 */
export default function ProcessRail() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-0 right-0 top-[26px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <ol
        tabIndex={0}
        aria-label="Delivery process stages, scrollable horizontally"
        className="snap-x-rail no-scrollbar focus-visible:outline-2 -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:px-0">
        {processSteps.map((step, i) => (
          <li key={step.number} className="w-[76vw] shrink-0 sm:w-[320px] lg:w-auto lg:flex-1">
            <span className="relative z-10 grid h-[52px] w-[52px] place-items-center rounded-full border border-white/20 bg-navy-900 font-display text-sm font-semibold text-electric-400">
              {step.number}
            </span>
            <h3 className="mt-6 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-ink-400">{step.text}</p>
            {i === processSteps.length - 1 && (
              <span className="mt-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                Ongoing
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-2 text-xs text-ink-500 lg:hidden">Scroll sideways for all seven stages →</p>
    </div>
  );
}
