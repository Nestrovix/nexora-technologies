import { techStack } from '@/data/company';

/**
 * Technology stack as continuous marquee rails instead of a card grid.
 * Each category becomes a row; alternating rows scroll in opposite directions.
 * The track is duplicated so the loop is seamless; the copy is aria-hidden.
 */
export default function TechRails() {
  return (
    <div className="marquee-mask space-y-3 overflow-hidden">
      {techStack.map((group, i) => (
        <div key={group.category} className="relative overflow-hidden">
          <div className="relative">
            <div className={`flex w-max gap-3 ${i % 2 === 0 ? 'marquee-track' : 'marquee-track-rev'}`}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
                  <span className="flex items-center whitespace-nowrap rounded-full border border-electric-400/30 bg-electric-500/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-electric-400">
                    {group.category}
                  </span>
                  {group.items.map((item) => (
                    <span
                      key={item + copy}
                      className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-ink-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
