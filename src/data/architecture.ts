/**
 * The reference platform, described once and drawn twice.
 *
 * `SystemHero` renders this as the home masthead visual — a wide flow on large
 * screens, a stacked flow on small ones — and the same records back the spec
 * panel beside the drawing and the screen-reader text equivalent under it.
 *
 * Every figure here is an illustrative budget for the shape of system we build,
 * not a measurement of a live service. Surfaces that show one must say so.
 */

export type LayerId = 'clients' | 'edge' | 'gateway' | 'services' | 'data' | 'observability';

export type SystemLayer = {
  id: LayerId;
  /** Layer reference used on the drawing — L1…L5, OBS for the plane. */
  ref: string;
  name: string;
  /** Short node labels, as drawn in the wide flow. */
  nodes: string[];
  /**
   * One-line summary, as drawn in the stacked flow. Keep it under ~44
   * characters: it is set in 9.5px Azeret Mono inside a 304-unit band, and
   * anything longer runs into the band's right rule.
   */
  compact: string;
  /** What actually runs in this layer. */
  runs: string;
  /** Typical latency budget — sample figure. */
  budget: string;
  budgetNote: string;
  /** Plain-text technology names. No marks, no logos. */
  tech: string[];
};

export const systemLayers: SystemLayer[] = [
  {
    id: 'clients',
    ref: 'L1',
    name: 'Clients',
    nodes: ['Web · Next.js', 'Mobile · RN'],
    compact: 'Web · Next.js · Mobile · React Native',
    runs: 'Browser and mobile clients built from one design system against one typed API contract, so a change to the contract breaks the build rather than the customer.',
    budget: '≤ 1.8 s',
    budgetNote: 'Largest contentful paint on a mid-range handset over 4G.',
    tech: ['Next.js', 'React Native', 'TypeScript', 'Design tokens'],
  },
  {
    id: 'edge',
    ref: 'L2',
    name: 'Edge',
    nodes: ['CDN + WAF', 'TLS termination', 'Static cache'],
    compact: 'CDN + WAF · TLS 1.3 · static cache',
    runs: 'The public front door. TLS terminates here, the firewall drops hostile traffic here, and every static asset or cacheable read is answered from the nearest point of presence — the origin never sees it.',
    budget: '≤ 25 ms',
    budgetNote: 'Time to first byte on a cache hit. A miss adds one origin round trip.',
    tech: ['CDN', 'WAF', 'TLS 1.3', 'HTTP/3', 'Signed URLs'],
  },
  {
    id: 'gateway',
    ref: 'L3',
    name: 'API gateway',
    nodes: ['Auth · OIDC', 'Rate limiting', 'Routing + audit'],
    compact: 'OIDC auth · rate limits · routing · audit',
    runs: 'One entry point for everything dynamic. Tokens are verified once, per-tenant quotas are enforced once, and every request is given a trace id and an audit record before it is routed on.',
    budget: '≤ 8 ms',
    budgetNote: 'Overhead added by authentication, quota checks and routing.',
    tech: ['OIDC / OAuth 2.1', 'JWT', 'Rate limiting', 'OpenAPI', 'Audit log'],
  },
  {
    id: 'services',
    ref: 'L4',
    name: 'Services',
    nodes: ['identity-svc', 'orders-svc', 'billing-svc', 'events-worker'],
    compact: 'identity · orders · billing · events-worker',
    runs: 'Independently deployable services, each owning its own data and its own release train. Synchronous calls go over HTTP; anything that can wait goes on the event bus with at-least-once delivery and idempotent consumers.',
    budget: '≤ 120 ms',
    budgetNote: 'p95 for a write path, measured from gateway in to response out.',
    tech: ['TypeScript / Node', 'Go', 'Java', 'Kubernetes', 'Event bus'],
  },
  {
    id: 'data',
    ref: 'L5',
    name: 'Data layer',
    nodes: ['PostgreSQL', 'Redis cache', 'Object store', 'Warehouse'],
    compact: 'PostgreSQL · Redis · object store · warehouse',
    runs: 'A primary relational store with read replicas, a cache tier in front of the hot paths, object storage for files and a separate warehouse so analytics never competes with production traffic.',
    budget: '≤ 15 ms',
    budgetNote: 'p95 primary read; a cache hit answers in under 2 ms.',
    tech: ['PostgreSQL', 'Read replicas', 'Redis', 'Object storage', 'Warehouse'],
  },
  {
    id: 'observability',
    ref: 'OBS',
    name: 'Observability',
    nodes: ['metrics', 'traces', 'structured logs', 'alerting · SLO'],
    compact: 'metrics · traces · logs · alerting · SLO',
    runs: 'A plane that cuts across every layer above. One trace id follows a request from the edge to the database and back, so a slow call is explained from evidence instead of guessed at.',
    budget: '≤ 60 s',
    budgetNote: 'From a breached threshold to a human being paged.',
    tech: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Structured logs', 'On-call rotation'],
  },
];

const byId = (id: LayerId) => systemLayers.find((layer) => layer.id === id)!;

/** The five columns of the request path, left to right. */
export const flowLayers: SystemLayer[] = ['clients', 'edge', 'gateway', 'services', 'data'].map((id) =>
  byId(id as LayerId),
);

/** The layers a visitor can select. `clients` is the origin of the request, not a layer we run. */
export const controlLayers: SystemLayer[] = ['edge', 'gateway', 'services', 'data', 'observability'].map((id) =>
  byId(id as LayerId),
);

export const defaultLayer: LayerId = 'services';

export const architectureDisclaimer =
  'Sample topology and illustrative latency budgets for the shape of platform we build — not telemetry from a live customer system.';
