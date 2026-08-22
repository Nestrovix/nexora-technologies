/**
 * Reference architecture, drawn by hand in SVG.
 *
 * The drawing itself is `aria-hidden` — it is a picture of the layer table that
 * follows it, and that table is the accessible version of the same content.
 * The SVG sits in its own `overflow-x-auto` box so the page never scrolls
 * sideways because of it.
 */

const layers = [
  {
    id: 'clients',
    name: 'Clients',
    ref: 'L1',
    detail: 'Browser and mobile clients built from one design system and one typed API contract.',
    nodes: ['Web · Next.js', 'Mobile · React Native'],
  },
  {
    id: 'edge',
    name: 'Edge',
    ref: 'L2',
    detail: 'CDN, WAF and TLS termination. Static assets and cacheable reads never reach the origin.',
    nodes: ['CDN + WAF', 'TLS termination', 'Static cache'],
  },
  {
    id: 'gateway',
    name: 'API gateway',
    ref: 'L3',
    detail: 'One entry point: OIDC authentication, per-tenant rate limits, request routing and audit logging.',
    nodes: ['Auth · OIDC', 'Rate limiting', 'Routing + audit'],
  },
  {
    id: 'services',
    name: 'Services',
    ref: 'L4',
    detail: 'Independently deployable services communicating over HTTP and an event bus, each owning its data.',
    nodes: ['identity-svc', 'orders-svc', 'billing-svc', 'events-worker'],
  },
  {
    id: 'data',
    name: 'Data layer',
    ref: 'L5',
    detail: 'Primary relational store with read replicas, a cache tier, object storage and an analytics warehouse.',
    nodes: ['PostgreSQL', 'Redis cache', 'Object store', 'Warehouse'],
  },
];

/** A hairline node box with a monospace label. */
function Node({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-paper stroke-line" strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        className="fill-ink-800 font-mono text-[11.5px]"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, dashed = false }: { x1: number; y1: number; x2: number; dashed?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2 - 7}
      y2={y1}
      className="stroke-accent"
      strokeWidth="1.5"
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd="url(#nx-arrow)"
    />
  );
}

export default function ArchitectureDiagram({ className = '' }: { className?: string }) {
  const cols = [
    { x: 16, w: 168 },
    { x: 232, w: 168 },
    { x: 448, w: 176 },
    { x: 672, w: 176 },
    { x: 896, w: 176 },
  ];

  return (
    <div className={className}>
      <div className="overflow-x-auto border border-line bg-band">
        <div className="min-w-[1120px] p-6">
          <svg viewBox="0 0 1088 404" width="1088" height="404" aria-hidden="true" focusable="false" role="presentation">
            <defs>
              <marker id="nx-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 z" className="fill-accent" />
              </marker>
            </defs>

            {/* column headers */}
            {layers.map((layer, i) => (
              <g key={layer.id}>
                <text x={cols[i].x} y={14} className="fill-ink-500 font-mono text-[10.5px] uppercase tracking-[0.13em]">
                  {layer.ref}
                </text>
                <text x={cols[i].x} y={34} className="fill-ink-900 font-display text-[14px] font-semibold">
                  {layer.name}
                </text>
                <line
                  x1={cols[i].x}
                  y1={44}
                  x2={cols[i].x + cols[i].w}
                  y2={44}
                  className="stroke-line"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* L1 clients */}
            <Node x={cols[0].x} y={64} w={cols[0].w} h={54} label="Web · Next.js" />
            <Node x={cols[0].x} y={132} w={cols[0].w} h={54} label="Mobile · RN" />

            {/* L2 edge */}
            <Node x={cols[1].x} y={64} w={cols[1].w} h={38} label="CDN + WAF" />
            <Node x={cols[1].x} y={110} w={cols[1].w} h={38} label="TLS termination" />
            <Node x={cols[1].x} y={156} w={cols[1].w} h={30} label="Static cache" />

            {/* L3 gateway */}
            <Node x={cols[2].x} y={64} w={cols[2].w} h={38} label="Auth · OIDC" />
            <Node x={cols[2].x} y={110} w={cols[2].w} h={38} label="Rate limiting" />
            <Node x={cols[2].x} y={156} w={cols[2].w} h={30} label="Routing + audit" />

            {/* L4 services */}
            <Node x={cols[3].x} y={56} w={cols[3].w} h={34} label="identity-svc" />
            <Node x={cols[3].x} y={98} w={cols[3].w} h={34} label="orders-svc" />
            <Node x={cols[3].x} y={140} w={cols[3].w} h={34} label="billing-svc" />
            <Node x={cols[3].x} y={182} w={cols[3].w} h={34} label="events-worker" />

            {/* L5 data */}
            <Node x={cols[4].x} y={56} w={cols[4].w} h={34} label="PostgreSQL" />
            <Node x={cols[4].x} y={98} w={cols[4].w} h={34} label="Redis cache" />
            <Node x={cols[4].x} y={140} w={cols[4].w} h={34} label="Object store" />
            <Node x={cols[4].x} y={182} w={cols[4].w} h={34} label="Warehouse" />

            {/* connectors */}
            <Arrow x1={cols[0].x + cols[0].w} y1={125} x2={cols[1].x} />
            <Arrow x1={cols[1].x + cols[1].w} y1={125} x2={cols[2].x} />
            <Arrow x1={cols[2].x + cols[2].w} y1={125} x2={cols[3].x} />
            <Arrow x1={cols[3].x + cols[3].w} y1={73} x2={cols[4].x} />
            <Arrow x1={cols[3].x + cols[3].w} y1={115} x2={cols[4].x} />
            <Arrow x1={cols[3].x + cols[3].w} y1={157} x2={cols[4].x} />
            <Arrow x1={cols[3].x + cols[3].w} y1={199} x2={cols[4].x} dashed />

            {/* protocol labels — centred in the 48px gap between columns */}
            {[
              { i: 0, y: 116, label: 'HTTPS' },
              { i: 1, y: 116, label: 'mTLS' },
              { i: 2, y: 116, label: 'gRPC' },
            ].map((l) => (
              <text
                key={l.label}
                x={cols[l.i].x + cols[l.i].w + 24}
                y={l.y}
                textAnchor="middle"
                className="fill-ink-500 font-mono text-[10px]"
              >
                {l.label}
              </text>
            ))}
            <text
              x={cols[3].x + cols[3].w + 24}
              y={190}
              textAnchor="middle"
              className="fill-ink-500 font-mono text-[10px]"
            >
              async
            </text>

            {/* event bus spine under the services column */}
            <line
              x1={cols[3].x}
              y1={240}
              x2={cols[4].x + cols[4].w}
              y2={240}
              className="stroke-ink-500"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <text x={cols[3].x} y={260} className="fill-ink-600 font-mono text-[10.5px]">
              event bus · at-least-once delivery, idempotent consumers
            </text>

            {/* cross-cutting band */}
            <rect
              x={16}
              y={292}
              width={1056}
              height={96}
              className="fill-paper stroke-line"
              strokeWidth="1"
              strokeDasharray="6 4"
            />
            <text x={36} y={318} className="fill-ink-900 font-display text-[13px] font-semibold">
              Cross-cutting
            </text>
            {[
              ['Observability', 'metrics · traces · structured logs'],
              ['CI/CD', 'build → test → stage → prod'],
              ['Secrets', 'managed vault, no secrets in code'],
              ['Backups', 'PITR + restore drills'],
            ].map((item, i) => (
              <g key={item[0]}>
                <text x={36 + i * 262} y={348} className="fill-ink-800 font-mono text-[11.5px]">
                  {item[0]}
                </text>
                <text x={36 + i * 262} y={368} className="fill-ink-500 font-mono text-[10px]">
                  {item[1]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Accessible equivalent of the drawing above. */}
      <dl className="mt-6 border-t border-line">
        {layers.map((layer) => (
          <div key={layer.id} className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr]">
            <dt className="flex items-baseline gap-2">
              <span className="font-mono text-[10.5px] text-accent">{layer.ref}</span>
              <span className="spec-key text-ink-900">{layer.name}</span>
            </dt>
            <dd className="text-[13px] leading-relaxed text-ink-700">
              {layer.detail}{' '}
              <span className="text-ink-500">({layer.nodes.join(', ')})</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
