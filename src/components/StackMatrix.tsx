import { stackMatrix, stackMatrixDisclaimer } from '@/data/engineering';

/**
 * Technology stack as a layer matrix — monospace layer keys down the left,
 * plain-text chips across. No logos, marks or brand colours: the names are
 * text references to third-party technologies, nothing more.
 */
export default function StackMatrix({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <dl className="border-t border-line">
        {stackMatrix.map((group, i) => (
          <div
            key={group.layer}
            className={`reveal reveal-d${i % 4} grid gap-x-8 gap-y-3 border-b border-line py-5 lg:grid-cols-[12rem_1fr]`}
          >
            <dt className="flex items-baseline gap-3">
              <span className="font-mono text-[10.5px] text-accent">{group.ref}</span>
              <span className="spec-key text-ink-900">{group.layer}</span>
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-line bg-paper px-2.5 py-1.5 font-mono text-[11.5px] leading-none text-ink-700"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">{stackMatrixDisclaimer}</p>
    </div>
  );
}
