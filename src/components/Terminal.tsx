/**
 * A terminal plate — traffic-light bar, a shell prompt, the command that was
 * typed and the output it produced.
 *
 * Everything is static markup rendered inside a single `<pre><code>`, so screen
 * readers read the session as one continuous transcript rather than as a table
 * of disconnected spans.
 */

export type TermLine =
  /** A typed command: `$ npm run deploy` */
  | { kind: 'cmd'; text: string; cwd?: string }
  /** Plain program output. */
  | { kind: 'out'; text: string }
  /** Output with a leading ✓ / ✗ / • status glyph. */
  | { kind: 'ok'; text: string }
  | { kind: 'warn'; text: string }
  | { kind: 'dim'; text: string };

export default function Terminal({
  title = 'bash — nexora@delivery',
  lines,
  caption,
  className = '',
}: {
  title?: string;
  lines: TermLine[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="panel-dark min-w-0">
        <div className="panel-dark__bar">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="dot bg-[#E05A52]" />
            <span className="dot bg-[#E0B152]" />
            <span className="dot bg-[#5FB87A]" />
          </span>
          <span className="panel-dark__name mx-auto pr-8 sm:pr-14">{title}</span>
        </div>

        <div className="code-scroll">
          <pre className="p-4 sm:p-5">
            <code className="code-body">
              {lines.map((line, i) => {
                if (line.kind === 'cmd') {
                  return (
                    <span key={i} className="block">
                      <span className="text-term-key">{line.cwd ?? '~/nexora'}</span>
                      <span className="text-term-dim"> $ </span>
                      <span className="text-term-text">{line.text}</span>
                    </span>
                  );
                }
                if (line.kind === 'ok') {
                  return (
                    <span key={i} className="block text-term-ok">
                      {'  ✓ '}
                      <span className="text-term-text">{line.text}</span>
                    </span>
                  );
                }
                if (line.kind === 'warn') {
                  return (
                    <span key={i} className="block text-term-warn">
                      {'  ! '}
                      <span className="text-term-text">{line.text}</span>
                    </span>
                  );
                }
                if (line.kind === 'dim') {
                  return (
                    <span key={i} className="block text-term-dim">
                      {line.text || ' '}
                    </span>
                  );
                }
                return (
                  <span key={i} className="block text-term-text">
                    {line.text || ' '}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-xs leading-relaxed text-ink-600">{caption}</figcaption>}
    </figure>
  );
}
