import { serviceMetrics, serviceMetricsDisclaimer } from '@/data/engineering';

const TONE: Record<string, { dot: string; text: string }> = {
  ok: { dot: 'bg-term-ok', text: 'text-term-ok' },
  warn: { dot: 'bg-term-warn', text: 'text-term-warn' },
  info: { dot: 'bg-term-fn', text: 'text-term-fn' },
};

/**
 * Service level panel — a dark monospace console rather than a row of pastel
 * stat cards. Every figure here is demonstration data and the panel says so,
 * both in its header strip and in the note underneath.
 */
export default function StatusPanel({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="panel-dark min-w-0">
        <div className="panel-dark__bar">
          <span className="dot bg-term-ok" aria-hidden="true" />
          <span className="panel-dark__name">status — platform SLOs</span>
          <span className="ml-auto shrink-0 rounded-sm border border-term-line px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-term-warn">
            Sample data
          </span>
        </div>

        <dl className="grid grid-cols-1 gap-px bg-term-line sm:grid-cols-2 lg:grid-cols-4">
          {serviceMetrics.map((m) => {
            const tone = TONE[m.tone] ?? TONE.info;
            return (
              <div key={m.key} className="bg-term-bg px-4 py-5">
                <dt className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-term-dim">
                  <span className={`dot ${tone.dot}`} aria-hidden="true" />
                  {m.key}
                </dt>
                <dd className="mt-3">
                  <span className="block font-mono text-[22px] font-medium tabnum text-term-text">{m.value}</span>
                  <span className={`mt-2 block font-mono text-[10.5px] ${tone.text}`}>{m.target}</span>
                  <span className="mt-2 block font-mono text-[10.5px] leading-relaxed text-term-dim">{m.note}</span>
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="border-t border-term-line px-4 py-3 font-mono text-[10.5px] leading-relaxed text-term-dim">
          window: trailing 30 days · source: demonstration dataset · not a service commitment
        </p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">{serviceMetricsDisclaimer}</p>
    </div>
  );
}
