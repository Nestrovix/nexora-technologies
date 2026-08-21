import { pipeline, pipelineDisclaimer } from '@/data/engineering';

const STATUS: Record<string, { dot: string; text: string; glyph: string; label: string }> = {
  passed: { dot: 'bg-accent', text: 'text-accent', glyph: '✓', label: 'passed' },
  running: { dot: 'bg-amber-500', text: 'text-amber-700', glyph: '•', label: 'running' },
  queued: { dot: 'bg-ink-500', text: 'text-ink-500', glyph: '·', label: 'queued' },
};

/**
 * A build pipeline as a horizontal strip of stages — commit through to prod —
 * each with a status glyph and the wall-clock time it took.
 *
 * The connectors between stages are decorative; the status of each stage is
 * carried in text, so nothing depends on colour or on the arrows being seen.
 */
export default function PipelineStrip({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border border-line bg-paper">
        {/* run header — reads like the top of a CI run page */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-band px-4 py-3">
          <span className="font-mono text-[11px] font-medium text-ink-900">{pipeline.workflow}</span>
          <span className="commit-ref">
            {pipeline.branch}@{pipeline.commit}
          </span>
          <span className="commit-ref hidden sm:inline">&ldquo;{pipeline.message}&rdquo;</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-ink-700">
            <span className="dot bg-accent" aria-hidden="true" />
            {pipeline.result} · {pipeline.total}
          </span>
        </div>

        <ol className="grid divide-y divide-line md:grid-cols-5 md:divide-x md:divide-y-0">
          {pipeline.stages.map((stage, i) => {
            const s = STATUS[stage.status] ?? STATUS.queued;
            return (
              <li key={stage.name} className="relative px-4 py-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tabnum text-ink-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[12px] font-medium text-ink-900">{stage.name}</span>
                  <span className={`ml-auto ${s.text} font-mono text-[13px]`} aria-hidden="true">
                    {s.glyph}
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-ink-600">
                  <span className={`dot ${s.dot}`} aria-hidden="true" />
                  <span className="sr-only">Status: </span>
                  {s.label} · {stage.duration}
                </p>
                <p className="mt-2 text-[12px] leading-snug text-ink-600">{stage.detail}</p>

                {/* connector to the next stage — decorative */}
                {i < pipeline.stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-7px] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rotate-45 border-r border-t border-line bg-paper md:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">{pipelineDisclaimer}</p>
    </div>
  );
}
