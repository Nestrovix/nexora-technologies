export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  image: string;
  heroImage: string;
  overview: string[];
  challenges: { title: string; text: string }[];
  solution: { title: string; text: string }[];
  features: string[];
  technologies: string[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    short: 'Custom web and software applications engineered around how your business actually operates.',
    icon: 'code',
    image: '/assets/images/services/software-development.webp',
    heroImage: '/assets/images/services/software-development-detail.webp',
    overview: [
      'We design and build custom software for organisations that have outgrown spreadsheets, disconnected tools and off-the-shelf products that almost fit. Every engagement starts with the workflow, not the technology.',
      'Our engineering teams deliver production systems in short, reviewable increments — so you see working software early, and priorities can shift without rewriting the plan.',
    ],
    challenges: [
      { title: 'Fragmented internal tools', text: 'Critical processes live across spreadsheets, email threads and legacy tools with no single source of truth.' },
      { title: 'Systems that cannot scale', text: 'Applications built for a smaller team start failing as data volume, users and integrations grow.' },
      { title: 'Slow release cycles', text: 'Manual testing and deployment mean every change is risky, expensive and slow to reach users.' },
    ],
    solution: [
      { title: 'Domain-first architecture', text: 'We model your actual business domain first, then design services and data structures that map cleanly onto it.' },
      { title: 'Incremental delivery', text: 'Two-week iterations with working demos, so scope and budget stay under your control throughout.' },
      { title: 'Automated quality gates', text: 'Unit, integration and end-to-end tests plus CI/CD pipelines make every release repeatable and reversible.' },
    ],
    features: [
      'Custom business application development',
      'API design, versioning and documentation',
      'Legacy system modernisation and re-platforming',
      'Third-party and ERP/CRM integrations',
      'Role-based access control and audit trails',
      'Automated testing and CI/CD pipelines',
      'Performance profiling and optimisation',
      'Documentation and engineering handover',
    ],
    technologies: ['TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    benefits: [
      { title: 'One source of truth', text: 'Replace scattered tools with a single system your teams actually want to use.' },
      { title: 'Lower cost of change', text: 'Clean architecture and test coverage keep future features cheap to add.' },
      { title: 'You own the code', text: 'Full source ownership, documentation and knowledge transfer at the end of every engagement.' },
    ],
    faqs: [
      { q: 'Can you take over an existing codebase?', a: 'Yes. We start with a structured code and infrastructure audit, document the findings, and agree a stabilisation plan before adding new features.' },
      { q: 'How do you handle changing requirements?', a: 'Scope is reviewed at the end of every iteration. Changes are estimated and prioritised together with you, so the roadmap adapts without contract renegotiation for every adjustment.' },
      { q: 'Do you provide long-term maintenance?', a: 'Yes. Support and enhancement retainers are available with defined response and resolution targets.' },
    ],
    metaTitle: 'Custom Software Development Company in India',
    metaDescription:
      'Custom software development services from Nexora Technologies — business applications, API platforms, legacy modernisation and integrations built for scale.',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    short: 'Modern, responsive business websites and web applications built for speed and conversion.',
    icon: 'browser',
    image: '/assets/images/services/web-development.webp',
    heroImage: '/assets/images/services/web-development-detail.webp',
    overview: [
      'Your website is usually the first technical impression a customer gets. We build fast, accessible, search-friendly web experiences that are straightforward for your marketing team to run day to day.',
      'From corporate websites to complex customer portals, we engineer for Core Web Vitals, accessibility and measurable conversion — not just visual polish.',
    ],
    challenges: [
      { title: 'Slow, heavy pages', text: 'Bloated templates and unoptimised media push away mobile visitors and hurt search rankings.' },
      { title: 'No content control', text: 'Every small copy or image change needs a developer, so the site goes stale.' },
      { title: 'Poor mobile experience', text: 'Desktop layouts squeezed onto phones create overflow, tiny tap targets and lost enquiries.' },
    ],
    solution: [
      { title: 'Performance budget from day one', text: 'Image optimisation, code splitting and server rendering are designed in, not bolted on.' },
      { title: 'Editable content model', text: 'Structured content with a headless CMS so your team can publish without engineering support.' },
      { title: 'Mobile-first engineering', text: 'Layouts are designed for the smallest viewport first and expand upward.' },
    ],
    features: [
      'Corporate and marketing websites',
      'Customer portals and dashboards',
      'Headless CMS integration',
      'Progressive Web Apps',
      'Core Web Vitals optimisation',
      'WCAG-aligned accessibility',
      'Technical SEO implementation',
      'Analytics and conversion tracking',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Vercel', 'Headless CMS'],
    benefits: [
      { title: 'Faster load, better ranking', text: 'Performance improvements directly support organic search visibility.' },
      { title: 'Marketing independence', text: 'Content, landing pages and campaigns ship without a development queue.' },
      { title: 'Consistent brand system', text: 'A reusable component library keeps every new page on-brand.' },
    ],
    faqs: [
      { q: 'Do you redesign existing websites?', a: 'Yes. We can redesign and re-platform an existing site while preserving URLs, search equity and existing content.' },
      { q: 'Which CMS do you recommend?', a: 'It depends on your team. We commonly work with headless options that separate content from presentation, and we will recommend based on your editing workflow and budget.' },
      { q: 'Is hosting included?', a: 'We can deploy to your infrastructure or set up managed hosting. Hosting costs are billed at cost or directly to your account.' },
    ],
    metaTitle: 'Web Development Company | Business Websites & Web Apps',
    metaDescription:
      'Responsive business websites, customer portals and web applications engineered for performance, accessibility and search visibility.',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    short: 'Native and cross-platform iOS and Android applications your customers keep on their home screen.',
    icon: 'mobile',
    image: '/assets/images/services/mobile-app-development.webp',
    heroImage: '/assets/images/services/mobile-app-development-detail.webp',
    overview: [
      'We build mobile applications for customer engagement, field operations and internal workforce productivity — covering design, engineering, store release and post-launch iteration.',
      'Whether you need a single cross-platform codebase or fully native applications, we select the approach that fits your feature set, budget and long-term roadmap.',
    ],
    challenges: [
      { title: 'Two codebases, double the cost', text: 'Maintaining separate iOS and Android teams stretches budgets and slows every release.' },
      { title: 'Low retention after install', text: 'Apps launch without onboarding, offline support or performance tuning and get uninstalled quickly.' },
      { title: 'Store rejection and delays', text: 'Missing privacy declarations and review guidelines stall launches for weeks.' },
    ],
    solution: [
      { title: 'Right platform strategy', text: 'A clear recommendation between React Native, Flutter or fully native based on your requirements.' },
      { title: 'Offline-first data layer', text: 'Local caching and sync so the app stays usable on unreliable networks.' },
      { title: 'Managed store release', text: 'We handle build signing, store listings, privacy declarations and phased rollouts.' },
    ],
    features: [
      'iOS and Android application development',
      'Cross-platform React Native and Flutter apps',
      'Offline-first architecture and sync',
      'Push notifications and deep linking',
      'In-app payments and subscriptions',
      'App Store and Play Store release management',
      'Crash reporting and performance monitoring',
      'Ongoing feature releases and OS upgrades',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'REST & GraphQL APIs', 'Fastlane'],
    benefits: [
      { title: 'One team, both platforms', text: 'Shared codebases reduce build and maintenance cost without compromising experience.' },
      { title: 'Measurable engagement', text: 'Analytics and event tracking wired in from the first release.' },
      { title: 'Predictable release cadence', text: 'Automated build pipelines make shipping updates routine.' },
    ],
    faqs: [
      { q: 'Native or cross-platform — which is better?', a: 'Cross-platform suits most business applications and content-driven products. Native is the better choice for heavy graphics, advanced device APIs or strict platform-specific interaction requirements.' },
      { q: 'Do you publish the app for us?', a: 'Yes. We prepare and submit builds to the App Store and Play Store using your developer accounts, so you retain ownership.' },
      { q: 'What about post-launch support?', a: 'We offer maintenance retainers covering OS updates, bug fixes, store compliance and new feature development.' },
    ],
    metaTitle: 'Mobile App Development Company | iOS & Android',
    metaDescription:
      'iOS, Android and cross-platform mobile app development — design, engineering, store release and post-launch support.',
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    short: 'Cloud migration, infrastructure engineering and cost optimisation across AWS, Azure and Google Cloud.',
    icon: 'cloud',
    image: '/assets/images/services/cloud-solutions.webp',
    heroImage: '/assets/images/services/cloud-solutions-detail.webp',
    overview: [
      'We help businesses move to the cloud without disrupting operations — and help those already there bring spend, reliability and security back under control.',
      'Infrastructure is delivered as code, so environments are reproducible, reviewable and recoverable.',
    ],
    challenges: [
      { title: 'Unpredictable cloud bills', text: 'Over-provisioned instances and forgotten resources quietly inflate monthly spend.' },
      { title: 'Risky migrations', text: 'Lift-and-shift without redesign moves the same bottlenecks into a more expensive environment.' },
      { title: 'Manual, fragile environments', text: 'Hand-configured servers cannot be rebuilt quickly when something fails.' },
    ],
    solution: [
      { title: 'Assessment before migration', text: 'Workload analysis and a phased migration plan with clear rollback points.' },
      { title: 'Infrastructure as code', text: 'Terraform-managed environments that are versioned, peer-reviewed and repeatable.' },
      { title: 'FinOps discipline', text: 'Right-sizing, autoscaling policies, reserved capacity planning and spend dashboards.' },
    ],
    features: [
      'Cloud readiness assessment and TCO modelling',
      'AWS, Azure and Google Cloud migration',
      'Kubernetes and container platform engineering',
      'Infrastructure as code with Terraform',
      'CI/CD pipeline design',
      'High availability and disaster recovery',
      'Cost monitoring and optimisation',
      'Managed cloud operations',
    ],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus'],
    benefits: [
      { title: 'Lower run cost', text: 'Right-sized, autoscaled infrastructure typically removes a meaningful share of idle spend.' },
      { title: 'Faster recovery', text: 'Codified environments can be rebuilt in minutes rather than days.' },
      { title: 'Room to grow', text: 'Capacity expands with demand instead of requiring procurement cycles.' },
    ],
    faqs: [
      { q: 'Can you migrate without downtime?', a: 'Most workloads can be migrated with little or no downtime using phased cut-over, data replication and traffic shifting. We confirm the approach during assessment.' },
      { q: 'Which cloud provider should we use?', a: 'We stay provider-neutral. The recommendation depends on your existing licensing, team skills, compliance needs and workload profile.' },
      { q: 'Do you manage infrastructure after migration?', a: 'Yes. Managed cloud operations with monitoring, patching and incident response are available as an ongoing service.' },
    ],
    metaTitle: 'Cloud Solutions & Migration Services | AWS, Azure, GCP',
    metaDescription:
      'Cloud migration, Kubernetes platform engineering, infrastructure as code and cloud cost optimisation for growing businesses.',
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    short: 'Security assessment, continuous monitoring and hardening across applications, cloud and endpoints.',
    icon: 'shield',
    image: '/assets/images/services/cybersecurity.webp',
    heroImage: '/assets/images/services/cybersecurity-detail.webp',
    overview: [
      'Security is treated as an engineering discipline, not a checklist. We assess your current exposure, fix what matters most first, and put monitoring in place so problems surface early.',
      'Our work covers application security, cloud configuration, identity, endpoint protection and incident readiness.',
    ],
    challenges: [
      { title: 'Unknown attack surface', text: 'Shadow IT, forgotten subdomains and stale credentials expand exposure invisibly.' },
      { title: 'Late-stage security testing', text: 'Vulnerabilities found just before launch force expensive rework or risky go-lives.' },
      { title: 'No detection capability', text: 'Without logging and alerting, incidents are discovered by customers rather than by you.' },
    ],
    solution: [
      { title: 'Prioritised risk register', text: 'Findings ranked by exploitability and business impact, with fix guidance for each.' },
      { title: 'Security in the pipeline', text: 'Dependency scanning, secret detection and SAST integrated into CI so issues are caught at commit time.' },
      { title: 'Detect and respond', text: 'Centralised logging, alert rules and a documented incident response runbook.' },
    ],
    features: [
      'Application and API security assessment',
      'Cloud configuration and IAM review',
      'Vulnerability management programme',
      'Secure SDLC enablement and code review',
      'Identity, SSO and MFA implementation',
      'Security monitoring and alerting',
      'Incident response planning and tabletop exercises',
      'Security awareness training for teams',
    ],
    technologies: ['OWASP ASVS', 'SAST & DAST tooling', 'SIEM platforms', 'Cloud-native security services', 'Zero Trust access', 'MFA / SSO'],
    benefits: [
      { title: 'Fewer critical findings', text: 'Issues are caught in development instead of during audits or after incidents.' },
      { title: 'Audit readiness', text: 'Evidence, policies and controls documented for customer and regulatory reviews.' },
      { title: 'Faster incident response', text: 'Defined runbooks and alerting reduce time to detection and containment.' },
    ],
    faqs: [
      { q: 'Do you perform penetration testing?', a: 'We perform application and infrastructure security assessments including manual testing. For formal certification-grade penetration tests we work alongside accredited partners.' },
      { q: 'How often should we be assessed?', a: 'At minimum annually, plus before any major release or architecture change. Continuous scanning in CI covers the period in between.' },
      { q: 'Can you help with compliance?', a: 'Yes. We help implement and document the technical controls required by common frameworks, and prepare evidence for auditors.' },
    ],
    metaTitle: 'Cybersecurity Services | Assessment, Monitoring & Hardening',
    metaDescription:
      'Cybersecurity services covering application security assessment, cloud hardening, monitoring, incident response and secure SDLC enablement.',
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    short: 'AI-powered products and workflow automation that remove manual effort from daily operations.',
    icon: 'spark',
    image: '/assets/images/services/ai-automation.webp',
    heroImage: '/assets/images/services/ai-automation-detail.webp',
    overview: [
      'We build AI capability into real business workflows — document processing, customer support, forecasting, quality inspection and internal knowledge retrieval — with measurable outcomes attached.',
      'Every engagement begins with a narrow, high-value use case and a defined evaluation method, so results can be judged on evidence rather than impression.',
    ],
    challenges: [
      { title: 'AI pilots that never ship', text: 'Promising demos stall because there is no path to production, monitoring or ownership.' },
      { title: 'Manual, repetitive work', text: 'Skilled staff spend hours on data entry, reconciliation and routing that software can handle.' },
      { title: 'Unreliable outputs', text: 'Without evaluation and guardrails, model responses cannot be trusted in a customer-facing process.' },
    ],
    solution: [
      { title: 'Use case selection', text: 'We score candidate workflows by value, feasibility and risk before writing any code.' },
      { title: 'Evaluation-driven build', text: 'Test sets and accuracy thresholds are defined up front and tracked through every iteration.' },
      { title: 'Human-in-the-loop design', text: 'Confidence thresholds route uncertain cases to a person instead of guessing.' },
    ],
    features: [
      'AI opportunity assessment and roadmap',
      'Document and invoice processing automation',
      'Retrieval-augmented internal knowledge assistants',
      'Customer support automation and triage',
      'Forecasting and demand prediction models',
      'Computer vision for inspection and monitoring',
      'Workflow and back-office automation',
      'Model evaluation, monitoring and guardrails',
    ],
    technologies: ['Python', 'PyTorch', 'LLM APIs', 'Vector databases', 'LangChain-style orchestration', 'MLflow', 'Airflow'],
    benefits: [
      { title: 'Hours returned to teams', text: 'Automating repetitive steps frees skilled staff for judgement-based work.' },
      { title: 'Consistent decisions', text: 'Rules and models apply the same logic every time, with a full audit trail.' },
      { title: 'Evidence, not hype', text: 'Accuracy and business impact are measured before and after rollout.' },
    ],
    faqs: [
      { q: 'Do we need a data science team first?', a: 'No. We can deliver the initial use cases end to end, and optionally train your team to take ownership afterwards.' },
      { q: 'How is our data handled?', a: 'Data handling, residency and retention are agreed before any processing begins. We can work entirely within your cloud tenancy where required.' },
      { q: 'What if the model is wrong?', a: 'Confidence thresholds, human review queues and fallback paths are designed into the workflow so incorrect outputs never reach customers unchecked.' },
    ],
    metaTitle: 'AI Development & Business Automation Services',
    metaDescription:
      'AI development and workflow automation — document processing, knowledge assistants, forecasting and computer vision built for production use.',
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    short: 'Business intelligence, reporting and data platforms that turn operational data into decisions.',
    icon: 'chart',
    image: '/assets/images/services/data-analytics.webp',
    heroImage: '/assets/images/services/data-analytics-detail.webp',
    overview: [
      'We build the pipelines, warehouse models and dashboards that give leadership a reliable, shared view of the business — replacing conflicting spreadsheet reports with agreed definitions.',
      'The work is deliberately unglamorous: correct data, defined metrics, and dashboards people actually open.',
    ],
    challenges: [
      { title: 'Conflicting numbers', text: 'Different teams report different figures for the same metric because definitions are undocumented.' },
      { title: 'Manual reporting cycles', text: 'Analysts spend days each month assembling reports by hand from exported files.' },
      { title: 'Data trapped in systems', text: 'Operational data sits in tools that do not talk to each other.' },
    ],
    solution: [
      { title: 'Single warehouse layer', text: 'All sources consolidated into a governed warehouse with tested transformations.' },
      { title: 'Metric definitions in code', text: 'Business definitions are version-controlled, reviewed and reused everywhere.' },
      { title: 'Self-service dashboards', text: 'Role-based dashboards designed around the decisions each team actually makes.' },
    ],
    features: [
      'Data warehouse and lakehouse design',
      'ETL / ELT pipeline engineering',
      'Data quality testing and observability',
      'Executive and operational dashboards',
      'Self-service analytics enablement',
      'Forecasting and cohort analysis',
      'Data governance and access control',
      'Migration from legacy reporting tools',
    ],
    technologies: ['PostgreSQL', 'BigQuery', 'Snowflake', 'dbt', 'Airflow', 'Power BI', 'Metabase', 'Python'],
    benefits: [
      { title: 'Decisions in hours, not weeks', text: 'Leadership gets current numbers without waiting on a reporting cycle.' },
      { title: 'One agreed definition', text: 'Metrics mean the same thing in every meeting and every dashboard.' },
      { title: 'Analyst time recovered', text: 'Automation replaces manual assembly so analysts can do actual analysis.' },
    ],
    faqs: [
      { q: 'Can you work with our existing BI tool?', a: 'Yes. We build the underlying data model and connect it to whichever BI tool your team already uses.' },
      { q: 'How long before we see dashboards?', a: 'A first useful dashboard on a priority domain is typically achievable within the first few weeks, with the wider platform built out behind it.' },
      { q: 'Do you handle data privacy requirements?', a: 'Yes. Access control, masking of sensitive fields and retention policies are part of the platform design.' },
    ],
    metaTitle: 'Data Analytics & Business Intelligence Services',
    metaDescription:
      'Data warehouse design, ETL pipelines, dashboards and business intelligence services that give teams one reliable view of performance.',
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    short: 'Technology strategy, architecture review and digital transformation guidance you can act on.',
    icon: 'compass',
    image: '/assets/images/services/it-consulting.webp',
    heroImage: '/assets/images/services/it-consulting-detail.webp',
    overview: [
      'We help leadership teams make technology decisions with confidence — what to build, what to buy, what to retire, and in which order.',
      'Deliverables are practical: a current-state assessment, a target architecture, a sequenced roadmap and a cost model your finance team can work with.',
    ],
    challenges: [
      { title: 'Competing technology opinions', text: 'Internal teams and vendors give conflicting advice with no neutral assessment.' },
      { title: 'Transformation without sequence', text: 'Multiple initiatives run in parallel, compete for the same people and none finish.' },
      { title: 'Rising technical debt', text: 'Short-term fixes accumulate until every change becomes slow and risky.' },
    ],
    solution: [
      { title: 'Independent assessment', text: 'A structured review of architecture, delivery process, security and cost with evidence behind each finding.' },
      { title: 'Sequenced roadmap', text: 'Initiatives ordered by dependency, risk and return — not by whoever asked loudest.' },
      { title: 'Build-vs-buy analysis', text: 'Clear commercial and technical comparison for each major capability decision.' },
    ],
    features: [
      'Technology and architecture assessment',
      'Digital transformation roadmap',
      'Build vs buy evaluation',
      'Vendor and platform selection',
      'IT cost optimisation review',
      'Delivery process and DevOps maturity assessment',
      'Technical due diligence',
      'CTO advisory and fractional leadership',
    ],
    technologies: ['Architecture review frameworks', 'TCO modelling', 'DORA metrics', 'Cloud well-architected reviews'],
    benefits: [
      { title: 'Clarity before spend', text: 'Decisions are made with a documented rationale rather than vendor pressure.' },
      { title: 'Focused investment', text: 'Effort concentrates on the initiatives that actually move business outcomes.' },
      { title: 'Internal capability', text: 'We work alongside your team so the knowledge stays after the engagement ends.' },
    ],
    faqs: [
      { q: 'How long does an assessment take?', a: 'A focused assessment typically runs two to four weeks depending on the number of systems and stakeholders involved.' },
      { q: 'Will you recommend your own delivery services?', a: 'Recommendations are made on merit. If the right answer is an off-the-shelf product or another partner, we will say so.' },
      { q: 'Do you offer ongoing advisory?', a: 'Yes. Fractional CTO and architecture advisory retainers are available for teams without a senior technology leader in place.' },
    ],
    metaTitle: 'IT Consulting & Digital Transformation Services',
    metaDescription:
      'IT consulting services — technology assessment, architecture review, digital transformation roadmaps and CTO advisory for Indian and global businesses.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
