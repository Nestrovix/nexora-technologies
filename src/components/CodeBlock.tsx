import { TOKEN_CLASS, tokenizeLines, type Lang } from '@/lib/highlight';

/**
 * A dark code plate: filename bar, optional line-number gutter and a
 * horizontally scrollable `<pre><code>` body.
 *
 * The body scrolls *inside* the plate — `.code-scroll` carries `min-width:0`
 * and `overflow-x:auto` so a long line can never widen the page.
 */
export default function CodeBlock({
  code,
  lang = 'ts',
  filename,
  caption,
  meta,
  lineNumbers = true,
  className = '',
}: {
  code: string;
  lang?: Lang;
  /** Shown in the plate's title bar, e.g. `services/booking/route.ts`. */
  filename?: string;
  /** Plain-language description rendered under the plate. */
  caption?: string;
  /** Right-hand slot in the title bar — a version tag, a status, a ref. */
  meta?: string;
  lineNumbers?: boolean;
  className?: string;
}) {
  const source = code.replace(/\n+$/, '');
  const lines = tokenizeLines(source, lang);
  const gutter = String(lines.length).length;

  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="panel-dark min-w-0">
        {filename && (
          <div className="panel-dark__bar">
            <span className="dot bg-term-line" aria-hidden="true" />
            <span className="panel-dark__name">{filename}</span>
            {meta && (
              <span className="ml-auto shrink-0 font-mono text-[10.5px] uppercase leading-none text-term-key">
                {meta}
              </span>
            )}
          </div>
        )}
        <div className="code-scroll">
          <pre className="p-4 sm:p-5">
            <code className="code-body">
              {lines.map((tokens, i) => (
                <span key={i} className="block">
                  {lineNumbers && (
                    <span className="code-ln" aria-hidden="true">
                      {String(i + 1).padStart(gutter, ' ')}
                      {'  '}
                    </span>
                  )}
                  {tokens.length === 0 ? (
                    ' '
                  ) : (
                    tokens.map((t, j) =>
                      t.cls ? (
                        <span key={j} className={TOKEN_CLASS[t.cls]}>
                          {t.text}
                        </span>
                      ) : (
                        <span key={j}>{t.text}</span>
                      ),
                    )
                  )}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-xs leading-relaxed text-ink-600">{caption}</figcaption>}
    </figure>
  );
}
