import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { Note } from '@/components/Section';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply to your use of the Nexora Technologies website.',
  alternates: { canonical: '/terms' },
};

const sections = [
  { heading: 'Acceptance', body: 'By accessing this website you agree to these terms. If you do not agree, please do not use the site.' },
  { heading: 'Use of the site', body: 'You may browse and use this website for lawful purposes only. You may not attempt to gain unauthorised access to any part of the site, interfere with its operation, or use automated tools to scrape content at a rate that degrades service.' },
  { heading: 'Content and intellectual property', body: 'Unless stated otherwise, the content, design and code of this website belong to the company. Sample case studies, statistics, testimonials and team profiles shown on this site are demonstration content and are labelled as such.' },
  { heading: 'Third-party images', body: 'Photography used on this site is licensed from third-party stock providers under their respective licences. Replace or re-license imagery if you repurpose this site for another brand.' },
  { heading: 'No warranty', body: 'The website and its content are provided on an "as is" basis. We make no warranty that the site will be uninterrupted or error-free, or that information on it is complete or current.' },
  { heading: 'Limitation of liability', body: 'To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website.' },
  { heading: 'External links', body: 'This site may link to third-party websites. We are not responsible for their content or practices.' },
  { heading: 'Governing law', body: 'These terms are governed by the laws of India, and the courts at the company’s registered location have exclusive jurisdiction.' },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms that apply when you use this website."
        image="/assets/images/pages/faq-hero.webp"
        imageAlt="Terms of use"
        breadcrumbs={[{ label: 'Terms of Use' }]}
      />

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <Note>
            <strong className="font-semibold">Template document:</strong> review these terms with a qualified adviser
            and adapt them to your company before publishing.
          </Note>

          {sections.map((s) => (
            <div key={s.heading} className="reveal mt-10">
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700">{s.body}</p>
            </div>
          ))}

          <div className="reveal mt-10">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${site.contact.email}`} className="text-accent underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
