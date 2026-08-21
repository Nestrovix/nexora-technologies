/**
 * CENTRAL SITE CONFIGURATION
 * -------------------------------------------------------------------------
 * Every value marked `PLACEHOLDER` must be replaced with the real company
 * details before this website goes live. No real phone number, email address
 * or postal address has been invented for this build.
 */

/**
 * Accepts "example.com", "www.example.com", "http://example.com" or a full URL
 * and returns a valid absolute origin, or an empty string if it cannot be parsed.
 */
function normaliseSiteUrl(value?: string): string {
  const raw = value?.trim();
  if (!raw) return '';
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`[site] NEXT_PUBLIC_SITE_URL is not a valid URL ("${raw}") — falling back to the default.`);
    return '';
  }
}

export const site = {
  name: 'Nexora Technologies',
  legalName: 'Nexora Technologies Pvt. Ltd.',
  tagline: 'Technology That Moves Your Business Forward.',
  description:
    'Nexora Technologies is an India-based IT services company delivering software development, cloud, cybersecurity, AI automation, data analytics and IT consulting for growing and enterprise businesses.',
  // PLACEHOLDER — set to the real production domain before deployment.
  // Normalised so a value without a protocol (a common mistake when setting the
  // variable in a hosting dashboard) cannot crash the build via `new URL(...)`.
  url: normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) || 'https://www.nexoratechnologies.example',
  locale: 'en_IN',
  founded: '2015',
  contact: {
    // PLACEHOLDER contact details — replace with verified company information.
    phoneDisplay: '+91 00000 00000',
    phoneHref: '+910000000000',
    whatsappNumber: '910000000000',
    whatsappMessage: 'Hello Nexora Technologies, I would like to discuss a project.',
    email: 'hello@nexoratechnologies.example',
    careersEmail: 'careers@nexoratechnologies.example',
    salesEmail: 'sales@nexoratechnologies.example',
    addressLines: ['Sample Technology Park, Outer Ring Road', 'Bengaluru, Karnataka 560103', 'India'],
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560103',
    country: 'IN',
    hours: [
      { days: 'Monday – Friday', time: '9:30 AM – 7:00 PM IST' },
      { days: 'Saturday', time: '10:00 AM – 2:00 PM IST' },
      { days: 'Sunday', time: 'Closed (24/7 support for managed clients)' },
    ],
    // PLACEHOLDER map embed — replace `q=` with the real office address.
    mapEmbed:
      'https://maps.google.com/maps?q=Outer+Ring+Road,+Bengaluru,+Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed',
  },
  social: {
    // PLACEHOLDER social profiles — replace with the company's real handles.
    linkedin: 'https://www.linkedin.com/company/example',
    x: 'https://x.com/example',
    github: 'https://github.com/example',
    youtube: 'https://www.youtube.com/@example',
  },
} as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/insights' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Software Development', href: '/services/software-development' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development' },
      { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'AI & Automation', href: '/services/ai-automation' },
      { label: 'Data Analytics', href: '/services/data-analytics' },
      { label: 'IT Consulting', href: '/services/it-consulting' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Talk to an Expert', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
] as const;

export const whatsappHref = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;
