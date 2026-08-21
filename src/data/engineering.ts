/**
 * ENGINEERING ARTEFACTS — DEMONSTRATION CONTENT
 * ---------------------------------------------------------------------------
 * The code samples, pipeline run, service metrics and stack matrix below are
 * illustrative content written for this website build. The API shapes are
 * representative of how we structure services; the figures are NOT measured
 * production numbers and are labelled as sample data everywhere they appear.
 */

/* ─────────────────────────────────────────── Terminal session */

import type { TermLine } from '@/components/Terminal';
import type { Lang } from '@/lib/highlight';

export const deployTerminal: TermLine[] = [
  { kind: 'cmd', text: 'nexora deploy --env production --service orders-svc', cwd: '~/orders-svc' },
  { kind: 'dim', text: '' },
  { kind: 'out', text: 'resolving release  release-2026.08.4  (a41f9c2)' },
  { kind: 'ok', text: 'unit + contract tests        1284 passed   0 failed   38.2s' },
  { kind: 'ok', text: 'container image built        ghcr.io/nexora/orders-svc:a41f9c2' },
  { kind: 'ok', text: 'database migration           3 applied, reversible' },
  { kind: 'ok', text: 'canary 10%                   error rate 0.02%  p95 118ms' },
  { kind: 'ok', text: 'promoted to 100%             12 pods healthy' },
  { kind: 'dim', text: '' },
  { kind: 'out', text: 'deploy complete in 4m 12s — rollback available for 24h' },
  { kind: 'cmd', text: '', cwd: '~/orders-svc' },
];

export const auditTerminal: TermLine[] = [
  { kind: 'cmd', text: 'nexora audit --scope dependencies,secrets,iam', cwd: '~/platform' },
  { kind: 'dim', text: '' },
  { kind: 'ok', text: 'dependencies    412 packages   0 critical   0 high' },
  { kind: 'ok', text: 'secrets scan    0 findings in 18,402 tracked files' },
  { kind: 'warn', text: 'iam review      2 roles wider than required — ticket PLT-418 raised' },
  { kind: 'ok', text: 'tls posture     TLS 1.3 enforced, HSTS preload active' },
  { kind: 'dim', text: '' },
  { kind: 'out', text: 'report written to audit/2026-08-21.md' },
];

/* ─────────────────────────────────────────── Code samples */

export const apiRequestSample = `POST /v1/bookings HTTP/1.1
Host: api.example-tenant.internal
Authorization: Bearer <redacted>
Idempotency-Key: 8f14e45f-ea3f-4d2b-9c71-8b2f0c0a91d4
Content-Type: application/json

{
  "patientRef": "pat_7Kd92",
  "clinicId": "clinic_bengaluru_01",
  "slot": { "start": "2026-09-04T09:30:00+05:30", "durationMinutes": 30 },
  "channel": "web",
  "notifyBy": ["sms", "email"]
}`;

export const apiResponseSample = `HTTP/1.1 201 Created
Location: /v1/bookings/bkg_3Nq84
X-Request-Id: 01J8Z5S6RH4P0
Server-Timing: db;dur=11, cache;dur=2, total;dur=118

{
  "id": "bkg_3Nq84",
  "status": "confirmed",
  "slot": { "start": "2026-09-04T09:30:00+05:30", "end": "2026-09-04T10:00:00+05:30" },
  "clinic": { "id": "clinic_bengaluru_01", "room": "C-2" },
  "audit": { "createdBy": "svc:booking", "traceId": "4bf92f3577b34da6" },
  "links": { "self": "/v1/bookings/bkg_3Nq84", "cancel": "/v1/bookings/bkg_3Nq84/cancel" }
}`;

export const handlerSample = `// orders-svc — every write is idempotent and traced.
import { withTrace } from '@nexora/telemetry';
import { idempotent } from '@nexora/http';
import { bookingSchema } from './schema';

export const POST = withTrace('booking.create', idempotent(async (req) => {
  const input = bookingSchema.parse(await req.json());

  const booking = await db.transaction(async (tx) => {
    const slot = await tx.slots.lockAvailable(input.clinicId, input.slot);
    if (!slot) throw new Conflict('slot_unavailable');
    return tx.bookings.insert({ ...input, slotId: slot.id, status: 'confirmed' });
  });

  await events.publish('booking.confirmed', { id: booking.id }, { atLeastOnce: true });
  return Response.json(booking, { status: 201 });
}));`;

export const infraSample = `# infrastructure/production/service.tf — reviewed like application code.
module "orders_svc" {
  source  = "../modules/service"
  name    = "orders-svc"
  image   = "ghcr.io/nexora/orders-svc:\${var.release}"

  replicas          = 12
  cpu               = "500m"
  memory            = "1Gi"
  autoscale_on_p95  = "200ms"

  health_check = {
    path                 = "/healthz"
    interval_seconds     = 10
    unhealthy_threshold  = 3
  }

  secrets   = ["DATABASE_URL", "EVENT_BUS_TOKEN"]
  observability = {
    metrics = true
    traces  = true
    logs    = "structured"
  }
}`;

export const ciSample = `# .github/workflows/delivery.yml
name: delivery
on:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test -- --coverage
      - run: npm run test:a11y
      - run: npm audit --audit-level=high

  release:
    needs: verify
    environment: production
    steps:
      - run: nexora build --sbom
      - run: nexora deploy --canary 10 --watch 15m
      - run: nexora deploy --promote`;

export const querySample = `-- Slow-query budget: every dashboard read must plan under 50ms.
select
  date_trunc('day', o.placed_at) as day,
  count(*) filter (where o.status = 'fulfilled') as fulfilled,
  percentile_cont(0.95) within group (order by o.fulfilment_ms) as p95_ms
from orders o
join stores s on s.id = o.store_id
where o.placed_at >= now() - interval '30 days'
group by 1
order by 1 desc;`;

/* ─────────────────────────────────────────── Pipeline */

export const pipeline = {
  workflow: 'delivery.yml',
  branch: 'main',
  commit: 'a41f9c2',
  message: 'orders: idempotent booking writes',
  result: 'passed',
  total: '9m 41s',
  stages: [
    { name: 'commit', status: 'passed', duration: '0m 06s', detail: 'Signed commit, conventional message, linked ticket.' },
    { name: 'build', status: 'passed', duration: '2m 18s', detail: 'Reproducible container image with an SBOM attached.' },
    { name: 'test', status: 'passed', duration: '3m 44s', detail: '1,284 unit, contract, accessibility and security checks.' },
    { name: 'stage', status: 'passed', duration: '1m 21s', detail: 'Deployed to staging, smoke suite and migration dry-run.' },
    { name: 'prod', status: 'passed', duration: '2m 12s', detail: 'Canary at 10%, promoted on clean metrics, 24h rollback.' },
  ],
} as const;

export const pipelineDisclaimer =
  'Sample pipeline run shown for demonstration. Stage names reflect how we structure delivery; the run, commit reference and durations are illustrative.';

/* ─────────────────────────────────────────── Service metrics */

export const serviceMetrics = [
  {
    key: 'uptime',
    value: '99.95%',
    target: 'SLO 99.9%',
    note: 'measured on the public API surface',
    tone: 'ok',
  },
  {
    key: 'p95 latency',
    value: '118 ms',
    target: 'budget 200 ms',
    note: 'read path, cache warm, single region',
    tone: 'ok',
  },
  {
    key: 'deploy freq',
    value: '14 / week',
    target: 'trunk-based, canaried',
    note: 'median lead time 3.5 h commit → prod',
    tone: 'info',
  },
  {
    key: 'error budget',
    value: '62% left',
    target: '30-day window',
    note: 'burn rate 0.4x — feature work continues',
    tone: 'warn',
  },
] as const;

export const serviceMetricsDisclaimer =
  'Sample service-level figures shown for demonstration only. They describe how we report on a managed platform, not measured results for a specific client, and they are not a service commitment.';

/* ─────────────────────────────────────────── Stack matrix */

/**
 * Plain text names only — no third-party logos, marks or brand colours are
 * drawn anywhere on this site.
 */
export const stackMatrix = [
  {
    layer: 'Language',
    ref: 'L0',
    items: ['TypeScript', 'Python', 'Go', 'Java', 'Kotlin', 'Swift', 'SQL'],
  },
  {
    layer: 'Framework',
    ref: 'L1',
    items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Spring Boot', 'React Native', 'Flutter'],
  },
  {
    layer: 'Data',
    ref: 'L2',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kafka', 'dbt'],
  },
  {
    layer: 'Cloud',
    ref: 'L3',
    items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Cloudflare'],
  },
  {
    layer: 'Observability',
    ref: 'L4',
    items: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Loki', 'Sentry', 'PagerDuty'],
  },
  {
    layer: 'Delivery',
    ref: 'L5',
    items: ['GitHub Actions', 'GitLab CI', 'Argo CD', 'Playwright', 'Vitest', 'Trivy'],
  },
] as const;

export const stackMatrixDisclaimer =
  'Representative stack matrix shown for demonstration. Tool names are plain text references to third-party technologies; no affiliation or endorsement is implied.';

/* ─────────────────────────────────────────── Engineering standards */

export const engineeringStandards = [
  {
    ref: 'ENG-001',
    title: 'Trunk-based delivery',
    text: 'Short-lived branches, reviewed pull requests and a pipeline that can put a change in production in hours, not weeks.',
  },
  {
    ref: 'ENG-002',
    title: 'Tests as a gate, not a report',
    text: 'Unit, contract, accessibility and dependency checks all block the pipeline. A red build is never merged around.',
  },
  {
    ref: 'ENG-003',
    title: 'Reversible releases',
    text: 'Every deployment is canaried and every migration is written so it can be rolled back without data loss.',
  },
  {
    ref: 'ENG-004',
    title: 'Infrastructure as code',
    text: 'Environments are described in version control and reviewed like application code. No manual console changes.',
  },
  {
    ref: 'ENG-005',
    title: 'Observability first',
    text: 'Metrics, traces and structured logs are part of the definition of done, so incidents are diagnosed rather than guessed at.',
  },
  {
    ref: 'ENG-006',
    title: 'Handover by default',
    text: 'Source, infrastructure, runbooks and architecture decision records transfer to the client at the end of the engagement.',
  },
] as const;

/** Version tag rendered in engineering section furniture. */
export const specVersion = 'v2.4.1';

/* ─────────────────────────────────────────── Per-service artefacts */

export type ServiceArtefact =
  | { kind: 'code'; lang: Lang; filename: string; meta: string; code: string; caption: string }
  | { kind: 'terminal'; title: string; lines: TermLine[]; caption: string };


/**
 * One engineering artefact per practice, so a service page shows the kind of
 * output that practice produces rather than only describing it. All samples.
 */
export const serviceArtefacts: Record<string, ServiceArtefact> = {
  'software-development': {
    kind: 'code',
    lang: 'ts',
    filename: 'domain/orders/commands.ts',
    meta: 'TypeScript',
    caption:
      'Sample domain code. Business rules live in one typed place, so the same rule cannot drift between the API, the worker and the admin tool.',
    code: `// One rule, one place. The API, the worker and the back office all call this.
export type CancelOrder = { orderId: string; reason: CancelReason; actor: Actor };

export function cancelOrder(order: Order, cmd: CancelOrder): Result<OrderCancelled> {
  if (order.status === 'shipped') return err('already_shipped');
  if (!can(cmd.actor, 'order:cancel', order.tenantId)) return err('forbidden');

  const refund = order.paid ? refundFor(order, cmd.reason) : null;
  return ok({ type: 'order.cancelled', orderId: order.id, refund, at: clock.now() });
}`,
  },
  'web-development': {
    kind: 'code',
    lang: 'json',
    filename: 'performance-budget.json',
    meta: 'Budget',
    caption:
      'Sample performance budget. The build fails if a page exceeds it, so speed is a gate rather than a promise.',
    code: `{
  "budgets": [
    { "metric": "largest-contentful-paint", "budget": "2000ms" },
    { "metric": "interaction-to-next-paint", "budget": "200ms" },
    { "metric": "cumulative-layout-shift",   "budget": 0.05 },
    { "metric": "total-javascript",          "budget": "170kb" },
    { "metric": "total-page-weight",         "budget": "900kb" }
  ],
  "accessibility": { "standard": "WCAG 2.2 AA", "failBuildOn": ["serious", "critical"] },
  "checkedOn": ["home", "service", "article", "contact"]
}`,
  },
  'mobile-app-development': {
    kind: 'code',
    lang: 'ts',
    filename: 'app/sync/outbox.ts',
    meta: 'React Native',
    caption:
      'Sample offline queue. Field staff keep working without signal; writes replay in order once the device reconnects.',
    code: `// Writes go to a local outbox first, then replay in order when back online.
export async function enqueue(op: PendingOp) {
  await db.outbox.insert({ ...op, attempts: 0, queuedAt: Date.now() });
  void flush();
}

async function flush() {
  if (!(await net.isReachable())) return;
  for (const op of await db.outbox.oldestFirst()) {
    const res = await api.send(op, { idempotencyKey: op.id });
    if (res.ok) await db.outbox.remove(op.id);
    else if (res.retryable) return backoff(op);
    else await deadLetter(op, res.error);
  }
}`,
  },
  'cloud-solutions': {
    kind: 'terminal',
    title: 'bash — cloud plan',
    caption:
      'Sample migration plan output. Every change is previewed and costed before anything is applied to a live account.',
    lines: [
      { kind: 'cmd', text: 'nexora cloud plan --env production --diff', cwd: '~/platform' },
      { kind: 'dim', text: '' },
      { kind: 'out', text: 'plan: 6 to add, 2 to change, 1 to destroy' },
      { kind: 'ok', text: 'autoscaling group     min 4 → 6, max 12 → 24' },
      { kind: 'ok', text: 'rds instance          multi-AZ enabled, PITR 14 days' },
      { kind: 'ok', text: 'object lifecycle      cold tier after 30 days' },
      { kind: 'warn', text: 'nat gateway           idle in ap-south-1b — flagged for removal' },
      { kind: 'dim', text: '' },
      { kind: 'out', text: 'estimated monthly delta: -18% · apply requires two approvals' },
    ],
  },
  cybersecurity: {
    kind: 'code',
    lang: 'yaml',
    filename: 'security/baseline.yml',
    meta: 'Baseline',
    caption:
      'Sample security baseline. It is applied by the pipeline, so drift is caught on the next deploy rather than at the next audit.',
    code: `transport:
  tls_minimum: "1.3"
  hsts: { max_age: 63072000, preload: true }

headers:
  content_security_policy: "default-src 'self'; object-src 'none'"
  x_content_type_options: nosniff
  referrer_policy: strict-origin-when-cross-origin

identity:
  mfa_required: true
  session_max_hours: 12
  privileged_access: just_in_time

pipeline_gates:
  dependency_audit: high
  secret_scanning: block
  container_scan: block
  iam_drift: report`,
  },
  'ai-automation': {
    kind: 'code',
    lang: 'json',
    filename: 'evals/invoice-extraction.report.json',
    meta: 'Eval run',
    caption:
      'Sample evaluation report. An automation only ships once it clears a measured accuracy bar on a held-out set, with a human review path for the rest.',
    code: `{
  "task": "invoice-field-extraction",
  "dataset": { "name": "holdout-2026-08", "documents": 1200, "labelled": true },
  "results": {
    "exactMatch": 0.947,
    "fieldF1": { "invoiceNumber": 0.991, "total": 0.982, "taxId": 0.934 },
    "escalatedToHuman": 0.058,
    "medianLatencyMs": 640
  },
  "gate": { "minExactMatch": 0.93, "status": "passed" },
  "notes": "Handwritten totals remain the weakest field; those route to review."
}`,
  },
  'data-analytics': {
    kind: 'code',
    lang: 'sql',
    filename: 'models/marts/fct_orders.sql',
    meta: 'Model',
    caption:
      'Sample warehouse model. Metrics are defined once, tested on every run, and every dashboard reads the same definition.',
    code: `-- Incremental fact table. Tested on every run: not_null, unique, relationships.
with source as (
  select * from staging.orders
  where updated_at > (select coalesce(max(updated_at), '1900-01-01') from fct_orders)
)
select
  o.order_id,
  o.store_id,
  o.placed_at,
  o.fulfilled_at,
  o.fulfilled_at - o.placed_at as fulfilment_interval,
  o.gross_amount - o.discount_amount as net_amount
from source o
where o.is_test = false;`,
  },
  'it-consulting': {
    kind: 'code',
    lang: 'yaml',
    filename: 'docs/adr/0014-managed-postgres.md',
    meta: 'ADR 0014',
    caption:
      'Sample architecture decision record. Recommendations are written down with their trade-offs, so a future team knows why a choice was made.',
    code: `title: Use managed PostgreSQL rather than self-hosted
status: accepted
date: 2026-06-18
deciders: [platform-architecture, client-cto]

context: >
  Two engineers currently carry the database on-call rota. Backups are scripted
  but restores have never been rehearsed end to end.

decision: >
  Move to a managed instance with point-in-time recovery and multi-AZ failover.

consequences:
  positive: [restore drills quarterly, patching handled, on-call load reduced]
  negative: [higher line-item cost, fewer extension options]
  revisit_when: sustained spend exceeds two engineer-days per month`,
  },
};
