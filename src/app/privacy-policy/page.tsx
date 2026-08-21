import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { Note } from '@/components/Section';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Nexora Technologies collects, uses and protects information submitted through this website.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: 'Information we collect',
    body: 'When you submit the project enquiry form or a job application, we collect the details you provide — name, company, email address, phone number, project information and, for applications, your resume. We also collect standard technical data such as browser type and pages visited through analytics, where enabled.',
  },
  {
    heading: 'How we use information',
    body: 'Enquiry details are used to respond to your request, prepare a proposal and maintain a record of our correspondence. Application details are used to assess your suitability for current and future roles. We do not sell personal information.',
  },
  {
    heading: 'Legal basis and consent',
    body: 'We process the information you submit on the basis of your consent and our legitimate interest in responding to business enquiries. You may withdraw consent at any time by contacting us.',
  },
  {
    heading: 'Data retention',
    body: 'Enquiry records are retained for as long as needed to serve the relationship and meet legal or accounting obligations. Application records are retained for a limited period unless you ask us to remove them sooner.',
  },
  {
    heading: 'Sharing and processors',
    body: 'We may share information with service providers who host our infrastructure, deliver email or provide analytics. These providers process data on our instructions under contractual confidentiality obligations.',
  },
  {
    heading: 'Security',
    body: 'The site is served over HTTPS. Form submissions are validated and rate-limited, and access to enquiry records is restricted to staff who need it. No transmission over the internet can be guaranteed completely secure.',
  },
  {
    heading: 'Cookies',
    body: 'This website uses only the cookies required for it to function, plus analytics cookies where analytics is enabled. You can control cookies through your browser settings.',
  },
  {
    heading: 'Your rights',
    body: 'You may request access to, correction of, or deletion of the personal information we hold about you. Contact us using the details below and we will respond within a reasonable period.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle information submitted through this website."
        image="/assets/images/pages/faq-hero.webp"
        imageAlt="Privacy policy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <Note>
            <strong className="font-semibold">Template document:</strong> this policy is a starting template, not legal
            advice. Have it reviewed against the Digital Personal Data Protection Act, 2023 and any other regulation
            that applies to your business before publishing.
          </Note>

          {sections.map((s) => (
            <div key={s.heading} className="reveal mt-10">
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-300">{s.body}</p>
            </div>
          ))}

          <div className="reveal mt-10">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-300">
              Questions about this policy can be sent to{' '}
              <a href={`mailto:${site.contact.email}`} className="text-electric-400 underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
              , or by post to {site.contact.addressLines.join(', ')}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
