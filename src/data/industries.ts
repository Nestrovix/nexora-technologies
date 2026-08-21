export type Industry = {
  slug: string;
  name: string;
  short: string;
  image: string;
  challenges: string[];
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: 'retail',
    name: 'Retail',
    short: 'Unified inventory, billing and customer data across stores, warehouses and online channels.',
    image: '/assets/images/industries/retail.webp',
    challenges: ['Stock visibility split across stores and warehouses', 'Disconnected billing and loyalty systems', 'No single customer view across channels'],
    solutions: ['Centralised inventory and replenishment platform', 'POS and ERP integration', 'Customer data platform and loyalty engine'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    short: 'Patient scheduling, records and care coordination built with privacy and uptime in mind.',
    image: '/assets/images/industries/healthcare.webp',
    challenges: ['Manual appointment handling and long queues', 'Records spread across departments', 'Strict privacy and audit requirements'],
    solutions: ['Online booking and queue management', 'Interoperable records and referral workflows', 'Role-based access with full audit trails'],
  },
  {
    slug: 'finance',
    name: 'Finance',
    short: 'Secure digital lending, onboarding and reporting platforms for financial services teams.',
    image: '/assets/images/industries/finance.webp',
    challenges: ['Slow, paper-heavy customer onboarding', 'Fragmented risk and compliance reporting', 'High security and availability expectations'],
    solutions: ['Digital KYC and onboarding journeys', 'Automated regulatory and MIS reporting', 'Hardened, monitored cloud infrastructure'],
  },
  {
    slug: 'education',
    name: 'Education',
    short: 'Learning platforms, admissions systems and student engagement tools that scale with intake.',
    image: '/assets/images/industries/education.webp',
    challenges: ['Admissions handled over email and spreadsheets', 'Content scattered across tools', 'Peak-season traffic spikes'],
    solutions: ['Admissions and enquiry management systems', 'Learning platforms with progress tracking', 'Autoscaling infrastructure for peak load'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    short: 'Property discovery, lead management and site-visit workflows in one connected system.',
    image: '/assets/images/industries/real-estate.webp',
    challenges: ['Leads lost between portals and sales teams', 'Inconsistent inventory and pricing data', 'Slow document and approval cycles'],
    solutions: ['Property listing and inventory platform', 'CRM integration with lead scoring', 'Digital document and approval workflows'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    short: 'Production visibility, quality tracking and IoT-driven maintenance across plants.',
    image: '/assets/images/industries/manufacturing.webp',
    challenges: ['No real-time view of line performance', 'Reactive, unplanned maintenance', 'Quality issues detected too late'],
    solutions: ['Shop-floor dashboards and OEE tracking', 'IoT sensor integration and predictive maintenance', 'Computer-vision quality inspection'],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    short: 'Fleet, warehouse and delivery operations with live tracking and route intelligence.',
    image: '/assets/images/industries/logistics.webp',
    challenges: ['Limited visibility once a shipment leaves', 'Manual route and load planning', 'Proof of delivery on paper'],
    solutions: ['Live tracking and customer notifications', 'Route optimisation and load planning', 'Driver apps with digital proof of delivery'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    short: 'High-performance storefronts, checkout flows and order operations built to convert.',
    image: '/assets/images/industries/ecommerce.webp',
    challenges: ['Slow storefronts and abandoned carts', 'Order data split across marketplaces', 'Peak-sale traffic failures'],
    solutions: ['Headless commerce storefronts', 'Unified order and returns management', 'Load-tested, autoscaling architecture'],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
