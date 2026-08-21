/**
 * SAMPLE / DEMO PROJECTS
 * -------------------------------------------------------------------------
 * These case studies are illustrative placeholders created for this website
 * build. They do NOT describe real clients, real engagements or verified
 * results. Replace them with genuine, client-approved case studies before
 * publishing. The `isSample` flag drives the "Sample project" badge in the UI.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  service: string;
  summary: string;
  image: string;
  duration: string;
  challenge: string;
  solution: string;
  approach: string[];
  technologies: string[];
  results: { value: string; label: string }[];
  isSample: true;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'retail-management-platform',
    title: 'Retail Management Platform',
    industry: 'Retail',
    service: 'Software Development',
    summary:
      'A unified inventory, billing and store-operations platform replacing three disconnected systems across a multi-store retail chain.',
    image: '/assets/images/projects/retail-management-platform.webp',
    duration: '7 months',
    challenge:
      'Store managers maintained stock in a legacy desktop tool, billing ran on a separate POS, and head office consolidated everything into spreadsheets each week. Stock figures were routinely a week out of date, and inter-store transfers had no reliable record.',
    solution:
      'We designed a single retail platform with a shared product master, real-time stock ledger and store-level billing integration. Head office received live dashboards, and store staff got a simplified interface designed for speed on low-end hardware.',
    approach: [
      'Process mapping across three store formats and the central warehouse',
      'Product master consolidation and data cleansing',
      'Event-driven stock ledger with offline-tolerant store clients',
      'POS and accounting system integration',
      'Phased rollout store by store with on-site support',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    results: [
      { value: 'Live', label: 'Stock visibility, replacing weekly reconciliation' },
      { value: '3 → 1', label: 'Systems consolidated into one platform' },
      { value: 'Faster', label: 'Billing throughput at peak store hours' },
    ],
    isSample: true,
  },
  {
    slug: 'healthcare-booking-system',
    title: 'Healthcare Booking System',
    industry: 'Healthcare',
    service: 'Web Development',
    summary:
      'An online appointment and queue management system for a multi-specialty clinic group, with doctor scheduling and patient reminders.',
    image: '/assets/images/projects/healthcare-booking-system.webp',
    duration: '5 months',
    challenge:
      'Appointments were booked over phone calls, with paper registers per department. Patients arrived without knowing wait times, no-shows were high, and doctors had no reliable view of their day ahead.',
    solution:
      'We built a patient-facing booking experience with real-time slot availability, plus an internal console for reception and doctors. Automated reminders and live queue positions reduced crowding at the front desk.',
    approach: [
      'Slot and resource modelling across departments and doctors',
      'Accessible, mobile-first booking flow',
      'Reception console with walk-in and rescheduling support',
      'Reminder and notification workflows',
      'Role-based access with complete audit logging',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Twilio-style messaging', 'Azure'],
    results: [
      { value: 'Self-serve', label: 'Booking replacing phone-only scheduling' },
      { value: 'Lower', label: 'No-show rate through automated reminders' },
      { value: 'Live', label: 'Queue visibility for patients and staff' },
    ],
    isSample: true,
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    industry: 'E-commerce',
    service: 'Web Development',
    summary:
      'A headless commerce storefront and unified order console for a direct-to-consumer brand selling across its own site and marketplaces.',
    image: '/assets/images/projects/ecommerce-platform.webp',
    duration: '6 months',
    challenge:
      'The existing storefront loaded slowly on mobile, and orders from three marketplaces were downloaded as CSVs and processed manually. Sale events regularly caused outages.',
    solution:
      'We rebuilt the storefront as a server-rendered headless application and introduced a unified order management console that ingests orders from every channel into one queue with automated routing.',
    approach: [
      'Performance audit and Core Web Vitals budget',
      'Headless storefront rebuild with edge caching',
      'Marketplace order ingestion and normalisation',
      'Returns and exchange workflow',
      'Load testing against projected sale-day traffic',
    ],
    technologies: ['Next.js', 'TypeScript', 'GraphQL', 'MongoDB', 'Kubernetes', 'Google Cloud'],
    results: [
      { value: 'Faster', label: 'Mobile page load after storefront rebuild' },
      { value: 'One queue', label: 'For orders across all sales channels' },
      { value: 'Stable', label: 'Performance under load-tested peak traffic' },
    ],
    isSample: true,
  },
  {
    slug: 'logistics-management-system',
    title: 'Logistics Management System',
    industry: 'Logistics',
    service: 'Cloud Solutions',
    summary:
      'Fleet tracking, route planning and digital proof of delivery for a regional distribution operator running a mixed vehicle fleet.',
    image: '/assets/images/projects/logistics-management-system.webp',
    duration: '8 months',
    challenge:
      'Dispatch planning was done on a whiteboard each morning. Once vehicles left the depot there was no visibility, and customers called the office for delivery status. Proof of delivery was collected on paper and often lost.',
    solution:
      'We delivered a dispatch and tracking platform with automated route planning, a driver mobile app with offline support, and customer-facing tracking links that removed most status calls.',
    approach: [
      'Depot and route data modelling',
      'Route optimisation engine with constraint handling',
      'Offline-first driver application',
      'Customer tracking and notification links',
      'Cloud infrastructure as code with autoscaling',
    ],
    technologies: ['React Native', 'Python', 'PostgreSQL', 'Terraform', 'AWS', 'Kubernetes'],
    results: [
      { value: 'Automated', label: 'Daily route planning, replacing manual dispatch' },
      { value: 'Digital', label: 'Proof of delivery captured at the doorstep' },
      { value: 'Fewer', label: 'Inbound status calls to the office' },
    ],
    isSample: true,
  },
  {
    slug: 'fintech-analytics-dashboard',
    title: 'Financial Services Analytics Platform',
    industry: 'Finance',
    service: 'Data Analytics',
    summary:
      'A governed data warehouse and executive dashboard suite consolidating lending, collections and customer data for a financial services firm.',
    image: '/assets/images/projects/fintech-analytics-dashboard.webp',
    duration: '6 months',
    challenge:
      'Each department produced its own monthly figures from exported files. Definitions of core metrics differed between teams, and leadership meetings routinely started with a dispute about whose numbers were correct.',
    solution:
      'We consolidated every source into a governed warehouse, encoded metric definitions in version-controlled transformations, and delivered role-based dashboards with automated daily refresh.',
    approach: [
      'Source system inventory and data profiling',
      'Warehouse modelling with tested transformations',
      'Metric definition catalogue agreed with each department',
      'Executive, operations and risk dashboards',
      'Data quality alerting and access governance',
    ],
    technologies: ['PostgreSQL', 'dbt', 'Airflow', 'Power BI', 'Python', 'Azure'],
    results: [
      { value: 'One', label: 'Agreed definition per business metric' },
      { value: 'Daily', label: 'Automated refresh replacing monthly assembly' },
      { value: 'Governed', label: 'Role-based access across departments' },
    ],
    isSample: true,
  },
  {
    slug: 'manufacturing-iot-platform',
    title: 'Manufacturing IoT & Quality Platform',
    industry: 'Manufacturing',
    service: 'AI & Automation',
    summary:
      'Shop-floor telemetry, OEE dashboards and computer-vision quality inspection deployed across two production lines.',
    image: '/assets/images/projects/manufacturing-iot-platform.webp',
    duration: '9 months',
    challenge:
      'Line performance was recorded manually at shift end, so problems were identified hours after they began. Surface defects were caught at final inspection, after value had already been added to faulty units.',
    solution:
      'We instrumented the lines with sensor telemetry into a streaming pipeline, delivered live OEE dashboards, and deployed a vision model at an earlier inspection point to flag defects as they appear.',
    approach: [
      'Sensor and PLC data acquisition design',
      'Streaming ingestion and time-series storage',
      'OEE and downtime-reason dashboards',
      'Vision model training with a labelled defect dataset',
      'Human review console for low-confidence detections',
    ],
    technologies: ['Python', 'PyTorch', 'MQTT', 'TimescaleDB', 'Docker', 'Edge compute'],
    results: [
      { value: 'Real time', label: 'Line performance visibility per shift' },
      { value: 'Earlier', label: 'Defect detection in the production sequence' },
      { value: 'Reviewed', label: 'Low-confidence cases routed to an operator' },
    ],
    isSample: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseStudyIndustries = Array.from(new Set(caseStudies.map((c) => c.industry))).sort();
export const caseStudyServices = Array.from(new Set(caseStudies.map((c) => c.service))).sort();
export const caseStudyTechnologies = Array.from(new Set(caseStudies.flatMap((c) => c.technologies))).sort();
