export type Solution = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  outcomes: string[];
  includes: string[];
};

export const solutions: Solution[] = [
  {
    slug: 'enterprise-application-platform',
    title: 'Enterprise Application Platform',
    summary:
      'A modular application backbone that replaces scattered internal tools with one governed system for operations, approvals and reporting.',
    image: '/assets/images/solutions/enterprise-application-platform.webp',
    outcomes: ['Single source of truth for operational data', 'Configurable approval and audit workflows', 'Extensible module architecture'],
    includes: ['Domain modelling workshop', 'Core platform build', 'Role and permission framework', 'Reporting layer', 'Handover and training'],
  },
  {
    slug: 'digital-integration-fabric',
    title: 'Digital Integration Fabric',
    summary:
      'An API and event layer that connects ERP, CRM, POS, payment and logistics systems so data moves reliably instead of being re-keyed.',
    image: '/assets/images/solutions/digital-integration-fabric.webp',
    outcomes: ['Reliable system-to-system data flow', 'Reduced manual reconciliation', 'Faster onboarding of new tools'],
    includes: ['Integration audit', 'API gateway setup', 'Event bus and retry handling', 'Monitoring and alerting', 'Partner onboarding kit'],
  },
  {
    slug: 'managed-cloud-infrastructure',
    title: 'Managed Cloud Infrastructure',
    summary:
      'Production-grade cloud environments delivered as code, monitored around the clock and tuned continuously for cost and reliability.',
    image: '/assets/images/solutions/managed-infrastructure.webp',
    outcomes: ['Reproducible environments', 'Defined recovery objectives', 'Visible and controlled cloud spend'],
    includes: ['Landing zone design', 'Terraform environment build', 'CI/CD pipelines', 'Observability stack', 'Managed operations'],
  },
  {
    slug: 'intelligent-automation-suite',
    title: 'Intelligent Automation Suite',
    summary:
      'Document processing, decision routing and internal assistants that take repetitive work out of back-office operations.',
    image: '/assets/images/solutions/intelligent-automation.webp',
    outcomes: ['Reduced manual processing time', 'Consistent, auditable decisions', 'Human review only where needed'],
    includes: ['Use case scoring', 'Data and document pipeline', 'Model evaluation harness', 'Human-in-the-loop console', 'Monitoring dashboard'],
  },
  {
    slug: 'data-and-insights-platform',
    title: 'Data & Insights Platform',
    summary:
      'A governed warehouse, tested transformations and role-based dashboards that give every team the same trusted numbers.',
    image: '/assets/images/solutions/data-and-insights.webp',
    outcomes: ['One agreed metric definition', 'Automated reporting cycles', 'Self-service access for teams'],
    includes: ['Source inventory', 'Warehouse and modelling layer', 'Data quality tests', 'Dashboard suite', 'Analyst enablement'],
  },
  {
    slug: 'digital-commerce-suite',
    title: 'Digital Commerce Suite',
    summary:
      'Headless storefronts, unified order management and campaign tooling engineered for conversion and sale-day traffic.',
    image: '/assets/images/solutions/digital-commerce.webp',
    outcomes: ['Faster storefront performance', 'Unified orders across channels', 'Confident peak-load handling'],
    includes: ['Storefront build', 'Commerce backend integration', 'Order and returns console', 'Load testing', 'Analytics instrumentation'],
  },
];
