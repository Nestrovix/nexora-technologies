/**
 * Company timeline as a horizontal rail with a continuous track — the same
 * structural family as the delivery-process rail, applied to years.
 */
export default function MilestoneRail({
  items,
}: {
  items: { year: string; title: string; text: string }[];
}) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-0 right-0 top-[9px] h-px bg-line"
        aria-hidden="true"
      />
      <ol
        tabIndex={0}
        aria-label="Company timeline, scrollable horizontally"
        className="snap-x-rail no-scrollbar focus-visible:outline-2 -mx-5 flex gap-6 overflow-x-auto px-5 pb-4 lg:mx-0 lg:px-0">
        {items.map((m, i) => (
          <li key={m.year} className="w-[74vw] shrink-0 sm:w-[300px] lg:w-auto lg:flex-1">
            <span
              className={`relative z-10 block h-[18px] w-[18px] border-2 ${
                i === items.length - 1 ? 'border-accent bg-accent' : 'border-ink-500 bg-paper'
              }`}
            />
            <p className="tabnum mt-5 font-display text-2xl font-bold text-ink-900">{m.year}</p>
            <h3 className="spec-key mt-2 text-accent">{m.title}</h3>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-ink-600">{m.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-ink-500 lg:hidden">Scroll sideways for the full timeline →</p>
    </div>
  );
}
