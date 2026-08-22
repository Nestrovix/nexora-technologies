'use client';

import { useId, useState } from 'react';
import { MonoEyebrow, SampleBadge } from '@/components/Section';
import {
  architectureDisclaimer,
  controlLayers,
  defaultLayer,
  flowLayers,
  systemLayers,
  type LayerId,
} from '@/data/architecture';

/**
 * THE SYSTEM, LIVE — home masthead visual.
 *
 * The reference platform drawn as the first thing on the page: clients → edge →
 * gateway → services → data, with the observability plane cutting across all of
 * it. Five controls highlight a layer in the drawing and swap the spec panel
 * beside it.
 *
 * Three things are deliberate and must not be undone:
 *
 * 1. FIRST PAINT. Every node, rule and label is plain markup with the default
 *    layer already selected, so the server-rendered HTML is the finished
 *    picture. There is no `mounted` flag, no effect that draws the diagram and
 *    no measurement pass — with JavaScript off or still downloading the reader
 *    sees the complete drawing, only without the controls doing anything.
 * 2. THE PULSE IS A SEPARATE LAYER. The travelling request is one extra `path`
 *    (`.nx-flow` in globals.css, CSS only) laid under the opaque node plates,
 *    so it shows only in the gaps between layers. It can never leave the
 *    diagram half-drawn because it draws none of it, and it stops under
 *    `prefers-reduced-motion`, where it settles into a static dotted route.
 * 3. TWO ORIENTATIONS, NOT ONE SCALED DRAWING. A wide flow (lg and up) and a
 *    stacked flow (below lg) are both rendered; CSS picks one. Scaling a single
 *    1000px-wide drawing down to a 350px phone would put the labels at 4px.
 *
 * Both drawings are `aria-hidden`: the spec panel beside them carries the
 * selected layer as text, and the `sr-only` list under them carries all of it.
 */

/* ── wide flow geometry ─────────────────────────────────────────────── */
const COL_W = 134;
const COL_GAP = 44;
const COL_X0 = 6;
const NODE_H = 38;
const NODE_GAP = 11;
const AXIS_Y = 120;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);
/**
 * Which node in each column the request actually passes through. Every column
 * is hung off that node so it straddles the request axis, which matters for one
 * reason: the ambient pulse is a single unbroken line drawn *under* the node
 * plates, and it must be covered inside a column and exposed only in the gaps
 * between them. A column centred as a block would leave a slot open at the
 * axis on any even node count, and the pulse would streak across it.
 */
const HOT = [0, 1, 1, 1, 1];
const rowY = (col: number, i: number) => AXIS_Y - NODE_H / 2 + (i - HOT[col]) * (NODE_H + NODE_GAP);
const RISER_TOP = 246;
const PLANE_Y = 292;

const PROTOCOLS = ['HTTPS', 'mTLS', 'gRPC', 'SQL'];

/* ── stacked flow geometry ──────────────────────────────────────────── */
const BAND_X = 4;
const BAND_W = 304;
const BAND_H = 52;
const BAND_STEP = 78;
const bandY = (i: number) => i * BAND_STEP;

export default function SystemHero({ className = '' }: { className?: string }) {
  const [active, setActive] = useState<LayerId>(defaultLayer);
  const uid = useId().replace(/:/g, '');
  const arrowDim = `${uid}-a`;
  const arrowOn = `${uid}-a-on`;
  const panelId = `${uid}-spec`;

  const layer = systemLayers.find((l) => l.id === active) ?? systemLayers[3];
  const obsActive = active === 'observability';
  /** Index of the highlighted column in the wide flow, or -1 for the plane. */
  const activeCol = flowLayers.findIndex((l) => l.id === active);

  const nodeCls = (on: boolean) =>
    on ? 'fill-accent-50 stroke-accent' : 'fill-paper stroke-line';
  const nodeTextCls = (on: boolean) =>
    on ? 'fill-ink-900 font-mono font-medium' : 'fill-ink-800 font-mono';

  return (
    <div className={`border border-line bg-band ${className}`}>
      {/* plate header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
        <MonoEyebrow>system/reference</MonoEyebrow>
        <span className="commit-ref">rev. 7 · request path</span>
        <SampleBadge label="Sample topology" className="ml-auto" />
      </div>

      {/* ── layer controls ─────────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Highlight a layer of the reference architecture"
        className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-5"
      >
        {controlLayers.map((l) => {
          const on = l.id === active;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              aria-controls={panelId}
              onClick={() => setActive(l.id)}
              className={`flex items-baseline gap-2 px-4 py-3 text-left transition-colors duration-200 last:col-span-2 lg:last:col-span-1 ${
                on ? 'bg-accent text-white' : 'bg-paper text-ink-800 hover:bg-band hover:text-ink-900'
              }`}
            >
              {/* full white, not a tint: at 80% this drops to 4.1:1 on the accent */}
              <span className={`font-mono text-[10.5px] leading-none ${on ? 'text-white' : 'text-accent'}`}>
                {l.ref}
              </span>
              <span className="text-[12.5px] font-semibold uppercase leading-none tracking-control">{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* ── drawing + spec panel ───────────────────────────────────── */}
      {/*
        Where the spec panel sits depends on which drawing is showing. The
        stacked drawing is narrow, so from md it can share the row with the
        panel; the wide drawing needs the whole plate at lg and only gets a
        neighbour again at xl, where there is room for both.
      */}
      <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1fr)_20.5rem] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20.5rem]">
        <div className="min-w-0 bg-paper p-4 sm:p-6">
          {/* WIDE FLOW — lg and up */}
          <svg
            viewBox="0 0 858 454"
            className="hidden h-auto w-full lg:block"
            aria-hidden="true"
            focusable="false"
            role="presentation"
          >
            <defs>
              <marker id={arrowDim} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 z" className="fill-ink-500" />
              </marker>
              <marker id={arrowOn} markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" className="fill-accent" />
              </marker>
            </defs>

            {/* connectors — drawn first so the node plates sit over them */}
            {[0, 1, 2, 3].map((i) => {
              const on = i === activeCol || i + 1 === activeCol;
              const x1 = colX(i) + COL_W;
              const x2 = colX(i + 1);
              return (
                <g key={`c${i}`}>
                  <line
                    x1={x1}
                    y1={AXIS_Y}
                    x2={x2 - 8}
                    y2={AXIS_Y}
                    className={on ? 'stroke-accent' : 'stroke-ink-500'}
                    strokeWidth={on ? 2 : 1.2}
                    markerEnd={`url(#${on ? arrowOn : arrowDim})`}
                  />
                  <text
                    x={(x1 + x2) / 2}
                    y={AXIS_Y - 12}
                    textAnchor="middle"
                    className={`font-mono text-[10px] ${on ? 'fill-accent' : 'fill-ink-500'}`}
                  >
                    {PROTOCOLS[i]}
                  </text>
                </g>
              );
            })}

            {/* the ambient request — one overlay path, CSS only */}
            {/*
              One unbroken line from the clients column to the data column. The
              node plates are opaque and painted after it, so the travelling
              dash is only ever seen in the gaps — it reads as a request hopping
              from layer to layer. A dash pattern restarts at every subpath in
              SVG, so this must stay a single subpath.
            */}
            <path
              d={`M140 ${AXIS_Y}H718`}
              pathLength={100}
              className="nx-flow stroke-accent"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* columns */}
            {flowLayers.map((l, i) => {
              const on = l.id === active;
              return (
                <g key={l.id}>
                  <text
                    x={colX(i)}
                    y={13}
                    className={`font-mono text-[10.5px] uppercase tracking-[0.13em] ${
                      on ? 'fill-accent' : 'fill-ink-500'
                    }`}
                  >
                    {l.ref}
                  </text>
                  <text x={colX(i)} y={32} className="fill-ink-900 font-display text-[14px] font-semibold">
                    {l.name}
                  </text>
                  <line
                    x1={colX(i)}
                    y1={41}
                    x2={colX(i) + COL_W}
                    y2={41}
                    className={on ? 'stroke-accent' : 'stroke-line'}
                    strokeWidth={on ? 2 : 1}
                  />
                  {l.nodes.map((label, n) => {
                    const y = rowY(i, n);
                    return (
                      <g key={label}>
                        <rect
                          x={colX(i)}
                          y={y}
                          width={COL_W}
                          height={NODE_H}
                          className={nodeCls(on)}
                          strokeWidth={on ? 1.5 : 1}
                        />
                        <text
                          x={colX(i) + COL_W / 2}
                          y={y + NODE_H / 2 + 4}
                          textAnchor="middle"
                          className={`${nodeTextCls(on)} text-[11.5px]`}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                  {/* telemetry riser into the observability plane */}
                  <line
                    x1={colX(i) + COL_W / 2}
                    y1={RISER_TOP}
                    x2={colX(i) + COL_W / 2}
                    y2={PLANE_Y}
                    className={obsActive ? 'stroke-accent' : 'stroke-line'}
                    strokeWidth={obsActive ? 1.6 : 1}
                    strokeDasharray="4 4"
                  />
                </g>
              );
            })}

            {/* observability plane */}
            <rect
              x={6}
              y={PLANE_Y}
              width={846}
              height={150}
              className={obsActive ? 'fill-accent-50 stroke-accent' : 'fill-paper stroke-line'}
              strokeWidth={obsActive ? 1.5 : 1}
              strokeDasharray="6 4"
            />
            <text x={26} y={PLANE_Y + 30} className="fill-ink-900 font-display text-[13.5px] font-semibold">
              OBS · Observability plane
            </text>
            <text x={26} y={PLANE_Y + 50} className="fill-ink-600 font-mono text-[10px]">
              one trace id follows a request from the edge to the database and back
            </text>
            {systemLayers[5].nodes.map((label, i) => (
              <g key={label}>
                <rect
                  x={26 + i * 206}
                  y={PLANE_Y + 78}
                  width={196}
                  height={42}
                  className={obsActive ? 'fill-paper stroke-accent' : 'fill-band stroke-line'}
                  strokeWidth={1}
                />
                <text
                  x={26 + i * 206 + 98}
                  y={PLANE_Y + 104}
                  textAnchor="middle"
                  className={`font-mono text-[11.5px] ${obsActive ? 'fill-ink-900' : 'fill-ink-800'}`}
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>

          {/* STACKED FLOW — below lg */}
          <svg
            viewBox="0 0 312 452"
            className="mx-auto block h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-none lg:hidden"
            aria-hidden="true"
            focusable="false"
            role="presentation"
          >
            <defs>
              <marker id={`${arrowDim}-v`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 z" className="fill-ink-500" />
              </marker>
            </defs>

            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`v${i}`}
                x1={156}
                y1={bandY(i) + BAND_H}
                x2={156}
                y2={bandY(i + 1) - 8}
                className="stroke-ink-500"
                strokeWidth="1.2"
                strokeDasharray={i === 4 ? '4 4' : undefined}
                markerEnd={`url(#${arrowDim}-v)`}
              />
            ))}

            {/* Same rule as the wide flow: one subpath, hidden behind the bands. */}
            <path
              d="M156 40V330"
              pathLength={100}
              className="nx-flow stroke-accent"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {[...flowLayers, systemLayers[5]].map((l, i) => {
              const on = l.id === active;
              const y = bandY(i);
              return (
                <g key={l.id}>
                  <rect
                    x={BAND_X}
                    y={y}
                    width={BAND_W}
                    height={BAND_H}
                    className={nodeCls(on)}
                    strokeWidth={on ? 1.5 : 1}
                    strokeDasharray={l.id === 'observability' ? '6 4' : undefined}
                  />
                  <text
                    x={16}
                    y={y + 21}
                    className={`font-mono text-[9.5px] ${on ? 'fill-accent' : 'fill-ink-500'}`}
                  >
                    {l.ref}
                  </text>
                  <text x={48} y={y + 21} className="fill-ink-900 font-display text-[12px] font-semibold">
                    {l.name}
                  </text>
                  <text x={16} y={y + 39} className="fill-ink-600 font-mono text-[9.5px]">
                    {l.compact}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-ink-600">
            {architectureDisclaimer}
          </p>
        </div>

        {/* ── spec panel — the text equivalent of the highlight ────── */}
        <div id={panelId} aria-live="polite" className="min-w-0 bg-band p-4 sm:p-6">
          <p className="flex items-baseline gap-2">
            <span className="font-mono text-[10.5px] text-accent">{layer.ref}</span>
            <span className="font-display text-[1.35rem] font-semibold leading-none text-ink-900">{layer.name}</span>
          </p>

          <p className="mt-4 text-[13.5px] leading-relaxed text-ink-700">{layer.runs}</p>

          <dl className="mt-6 border-t border-line">
            <div className="border-b border-line py-3.5">
              <dt className="spec-key">In this layer</dt>
              <dd className="mt-2 font-mono text-[12px] leading-relaxed text-ink-800">{layer.nodes.join(' · ')}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="spec-key">Latency budget</dt>
              <dd className="mt-2 flex items-baseline gap-2">
                <span className="tabnum font-mono text-[19px] font-medium text-ink-900">{layer.budget}</span>
                <span className="spec-key text-ink-500">sample</span>
              </dd>
              <dd className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">{layer.budgetNote}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="spec-key">Runs on</dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {layer.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-line bg-paper px-2 py-1.5 font-mono text-[11px] leading-none text-ink-700"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Full text equivalent of both drawings, for assistive technology. */}
      <div className="sr-only">
        <p>
          Reference architecture, in request order: clients, edge, API gateway, services, data layer, with an
          observability plane across all of them.
        </p>
        <ul>
          {systemLayers.map((l) => (
            <li key={l.id}>
              {l.ref} {l.name}: {l.runs} Components: {l.nodes.join(', ')}. Sample latency budget {l.budget} —{' '}
              {l.budgetNote}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
