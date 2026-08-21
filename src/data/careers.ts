/** SAMPLE job openings — replace with real vacancies before publishing. */

export type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobCategories = ['Engineering', 'Cloud & DevOps', 'Data & AI', 'Design', 'Consulting'];

export const jobs: Job[] = [
  {
    id: 'senior-fullstack-engineer',
    title: 'Senior Full-Stack Engineer',
    category: 'Engineering',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '5–8 years',
    summary: 'Build and own production web applications across the stack for enterprise and growth-stage clients.',
    responsibilities: [
      'Design and deliver features across React/Next.js frontends and Node.js services',
      'Own technical design for assigned modules and review peer contributions',
      'Work directly with client stakeholders during iteration reviews',
    ],
    requirements: [
      'Strong TypeScript, React and Node.js experience in production systems',
      'Relational database modelling and query optimisation',
      'Familiarity with CI/CD and containerised deployment',
    ],
  },
  {
    id: 'cloud-infrastructure-engineer',
    title: 'Cloud Infrastructure Engineer',
    category: 'Cloud & DevOps',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    experience: '4–7 years',
    summary: 'Design, automate and operate cloud environments for client platforms across AWS and Azure.',
    responsibilities: [
      'Build and maintain Terraform-managed environments',
      'Design CI/CD pipelines and deployment strategies',
      'Participate in on-call rotation for managed clients',
    ],
    requirements: [
      'Hands-on AWS or Azure experience at production scale',
      'Terraform, Kubernetes and container tooling',
      'Monitoring, alerting and incident response practice',
    ],
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    category: 'Data & AI',
    location: 'Remote (India)',
    type: 'Full-time',
    experience: '3–6 years',
    summary: 'Build reliable data pipelines and warehouse models that power client reporting and analytics.',
    responsibilities: [
      'Develop ELT pipelines and warehouse transformations',
      'Implement data quality testing and observability',
      'Partner with analysts to model business metrics',
    ],
    requirements: ['Strong SQL and Python', 'Experience with dbt, Airflow or equivalent', 'Warehouse platforms such as BigQuery, Snowflake or PostgreSQL'],
  },
  {
    id: 'ai-engineer',
    title: 'Applied AI Engineer',
    category: 'Data & AI',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '3–6 years',
    summary: 'Take AI use cases from evaluation through to production with monitoring and guardrails.',
    responsibilities: [
      'Build retrieval, extraction and classification pipelines',
      'Design evaluation harnesses and track model quality',
      'Implement human-in-the-loop review workflows',
    ],
    requirements: ['Python and modern ML tooling', 'Experience deploying models or LLM applications to production', 'Comfort with evaluation methodology'],
  },
  {
    id: 'product-designer',
    title: 'Product Designer (UI/UX)',
    category: 'Design',
    location: 'Remote (India)',
    type: 'Full-time',
    experience: '3–6 years',
    summary: 'Design interfaces for complex business applications where clarity matters more than decoration.',
    responsibilities: [
      'Run discovery and usability sessions with client users',
      'Produce flows, wireframes and high-fidelity designs',
      'Maintain and extend the shared design system',
    ],
    requirements: ['Portfolio of shipped B2B or enterprise product work', 'Strong systems thinking and component design', 'Working knowledge of accessibility standards'],
  },
  {
    id: 'technology-consultant',
    title: 'Technology Consultant',
    category: 'Consulting',
    location: 'Bengaluru / Travel',
    type: 'Full-time',
    experience: '6–10 years',
    summary: 'Advise client leadership on architecture, transformation sequencing and technology investment.',
    responsibilities: [
      'Run assessments and produce evidence-backed recommendations',
      'Build roadmaps, cost models and build-vs-buy analyses',
      'Support delivery teams during execution',
    ],
    requirements: ['Broad architecture background across cloud and application platforms', 'Strong written and executive communication', 'Prior consulting or client-facing leadership experience'],
  },
];

export const careerBenefits = [
  { title: 'Hybrid & Remote Flexibility', text: 'Roles are hybrid or remote-first depending on the team, with core collaboration hours.' },
  { title: 'Learning Budget', text: 'Annual allowance for certifications, courses and conferences, with dedicated study time.' },
  { title: 'Health Coverage', text: 'Medical insurance for employees and immediate family.' },
  { title: 'Real Ownership', text: 'Engineers own modules end to end, including architecture decisions and client conversations.' },
  { title: 'Sustainable Delivery', text: 'Planned capacity, no default overtime culture, and on-call compensated where applicable.' },
  { title: 'Internal Mobility', text: 'Structured paths between engineering, cloud, data and consulting practices.' },
];

export const cultureDisclaimer =
  'Sample openings and benefits shown for demonstration. Replace with the company’s actual vacancies and policy details before publishing.';
