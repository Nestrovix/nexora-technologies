export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  body: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: 'ai-and-business-automation',
    title: 'AI and Business Automation: Where It Actually Pays Off',
    category: 'AI & Automation',
    excerpt:
      'Most automation value comes from unglamorous, high-volume workflows — not from the demos that get shared internally. Here is how we pick use cases.',
    image: '/assets/images/insights/ai-and-business-automation.webp',
    date: '2026-06-18',
    readTime: '7 min read',
    author: 'Nexora Engineering',
    body: [
      {
        heading: 'Start with volume, not novelty',
        paragraphs: [
          'The strongest early automation candidates are boring: invoice matching, document classification, support ticket triage, order exception handling. They are repetitive, well-defined, and happen hundreds of times a day.',
          'Novelty use cases attract attention but rarely survive a cost review, because the work being replaced was never expensive in the first place.',
        ],
        bullets: [
          'How many times per day does this workflow run?',
          'How long does one instance take a person?',
          'How consistent is the input format?',
          'What is the cost of an incorrect output?',
        ],
      },
      {
        heading: 'Define the evaluation before you build',
        paragraphs: [
          'Agree a test set and an accuracy threshold up front. Without one, every discussion about whether the system is good enough becomes a matter of opinion, and projects stall in perpetual pilot.',
          'Treat the evaluation set as a product asset. It is what allows you to change models or prompts later without guessing at the impact.',
        ],
      },
      {
        heading: 'Design for the uncertain cases',
        paragraphs: [
          'The failure mode that damages trust is not a wrong answer — it is a wrong answer delivered confidently into a customer-facing process. Confidence thresholds and human review queues keep that from happening.',
          'A system that handles 70% of volume automatically and routes the rest to a person is usually more valuable than one that attempts everything unreliably.',
        ],
      },
    ],
  },
  {
    slug: 'cloud-computing-trends',
    title: 'Cloud Computing Trends Shaping Enterprise IT',
    category: 'Cloud',
    excerpt:
      'Cost discipline, platform engineering and workload placement decisions are replacing the migrate-everything mindset of earlier cloud programmes.',
    image: '/assets/images/insights/cloud-computing-trends.webp',
    date: '2026-05-27',
    readTime: '6 min read',
    author: 'Nexora Cloud Practice',
    body: [
      {
        heading: 'FinOps has become a core engineering concern',
        paragraphs: [
          'Cloud spend is now reviewed with the same rigour as headcount. Engineering teams are increasingly accountable for the run cost of the services they own, with per-service cost visibility built into dashboards.',
          'The practical changes are unglamorous: right-sizing, autoscaling policies that actually scale down, lifecycle rules on storage, and killing idle non-production environments overnight.',
        ],
      },
      {
        heading: 'Platform engineering over per-team improvisation',
        paragraphs: [
          'Rather than every team assembling its own pipeline, organisations are building an internal platform: golden paths for deployment, standard observability, and paved-road templates for new services.',
          'This reduces cognitive load on product teams and makes security and compliance controls consistent by default.',
        ],
      },
      {
        heading: 'Workload placement is a deliberate decision again',
        paragraphs: [
          'Not everything belongs in a hyperscaler region. Data residency requirements, latency-sensitive edge workloads and predictable high-utilisation systems each have a defensible case for different placement.',
          'The mature position is neither cloud-first nor cloud-only, but placement decided per workload with cost and risk documented.',
        ],
      },
    ],
  },
  {
    slug: 'cybersecurity-best-practices',
    title: 'Cybersecurity Best Practices for Growing Businesses',
    category: 'Cybersecurity',
    excerpt:
      'A small number of controls prevent the majority of incidents. Get those right before investing in advanced tooling.',
    image: '/assets/images/insights/cybersecurity-best-practices.webp',
    date: '2026-05-06',
    readTime: '8 min read',
    author: 'Nexora Security Practice',
    body: [
      {
        heading: 'Identity is the perimeter',
        paragraphs: [
          'Most incidents at mid-sized businesses begin with a credential, not an exotic exploit. Enforcing multi-factor authentication, removing shared accounts and reviewing access quarterly addresses a disproportionate share of real risk.',
          'Offboarding deserves particular attention: access that outlives employment is one of the most common findings in our assessments.',
        ],
      },
      {
        heading: 'Know your attack surface',
        paragraphs: [
          'You cannot protect systems you have forgotten about. Maintain an inventory of internet-facing assets, including subdomains, staging environments and third-party integrations.',
          'Automated discovery run on a schedule catches the environments that get spun up for a demo and never shut down.',
        ],
        bullets: [
          'Inventory of internet-facing services and owners',
          'Dependency and container image scanning in CI',
          'Secret scanning across repositories',
          'Centralised logging with alerting on privileged actions',
        ],
      },
      {
        heading: 'Practise the response',
        paragraphs: [
          'A response plan that has never been rehearsed will not hold under pressure. A short tabletop exercise once or twice a year exposes gaps in contact lists, decision authority and communication far more cheaply than a real incident.',
        ],
      },
    ],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation Without the Stalled Programme',
    category: 'Strategy',
    excerpt:
      'Transformation programmes rarely fail on technology. They fail on sequencing, ownership and the absence of a decision-making forum.',
    image: '/assets/images/insights/digital-transformation.webp',
    date: '2026-04-15',
    readTime: '6 min read',
    author: 'Nexora Advisory',
    body: [
      {
        heading: 'Sequence by dependency, not by enthusiasm',
        paragraphs: [
          'Running six initiatives in parallel with the same three senior engineers guarantees that none finish. Order the roadmap by technical dependency and by which capability unlocks the next.',
          'A programme that delivers one visible outcome per quarter sustains sponsorship far better than one promising everything in eighteen months.',
        ],
      },
      {
        heading: 'Name an accountable owner per outcome',
        paragraphs: [
          'Committee ownership means no ownership. Each outcome needs a single accountable person with the authority to make trade-offs between scope, cost and date.',
        ],
      },
      {
        heading: 'Measure the business outcome, not the milestone',
        paragraphs: [
          'Delivery milestones tell you the project is moving. They do not tell you it is working. Define the operational metric each initiative is meant to move, and instrument it before go-live so the baseline exists.',
        ],
      },
    ],
  },
  {
    slug: 'building-scalable-web-applications',
    title: 'Building Scalable Web Applications',
    category: 'Engineering',
    excerpt:
      'Scalability problems are usually data-access problems. Architecture choices matter less than the queries underneath them.',
    image: '/assets/images/insights/scalable-web-applications.webp',
    date: '2026-03-28',
    readTime: '7 min read',
    author: 'Nexora Engineering',
    body: [
      {
        heading: 'Fix the data layer first',
        paragraphs: [
          'Before adding services, caches or queues, look at query patterns. Missing indexes, N+1 access patterns and unbounded result sets account for most performance collapses we are called in to diagnose.',
          'These are also the cheapest problems to fix, and fixing them often removes the perceived need for a larger architectural change.',
        ],
      },
      {
        heading: 'Cache deliberately',
        paragraphs: [
          'Caching without an invalidation strategy converts a performance problem into a correctness problem. Decide per data type how stale a value may be, and make that decision explicit in code.',
        ],
      },
      {
        heading: 'Make scaling boring',
        paragraphs: [
          'Stateless application servers, externalised sessions, idempotent background jobs and a load test that runs in CI turn scaling into a configuration change rather than a project.',
        ],
        bullets: [
          'Stateless services behind a load balancer',
          'Connection pooling sized to the database, not the app',
          'Background work in queues with retry and dead-letter handling',
          'Load tests against realistic data volumes',
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
