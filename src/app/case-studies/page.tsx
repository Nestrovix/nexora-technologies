import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import CTASection from '@/components/CTASection';
import CaseStudyExplorer from '@/components/CaseStudyExplorer';
import { Note } from '@/components/Section';
import { caseStudies, caseStudyIndustries, caseStudyServices, caseStudyTechnologies } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies — Sample Technology Projects',
  description:
    'Browse sample project examples from Nexora Technologies across retail, healthcare, e-commerce, logistics, finance and manufacturing. Filter by industry, service and technology.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Case Studies"
        title={
          <>
            How we approach
            <br />
            <span className="text-accent">real delivery problems</span>
          </>
        }
        lead="Filter by industry, service or technology. Every project below is a sample built for this website — not a real client engagement."
        image="/assets/images/pages/case-studies-hero.webp"
        imageAlt="Team reviewing a project delivery plan"
        breadcrumbs={[{ label: 'Case Studies' }]}
        meta={[
          { k: 'Projects', v: `${caseStudies.length} sample engagements` },
          { k: 'Industries', v: `${caseStudyIndustries.length} sectors covered` },
          { k: 'Duration', v: '5 – 9 months typical' },
          { k: 'Status', v: 'Illustrative, not real clients' },
        ]}
      />

      <section className="section pt-0">
        <div className="container">
          <CaseStudyExplorer
            items={caseStudies}
            industriesList={caseStudyIndustries}
            servicesList={caseStudyServices}
            technologiesList={caseStudyTechnologies}
          />
          <Note>
            <strong className="font-semibold">Sample projects:</strong> these case studies are illustrative content
            created for this website build. They do not describe real clients, engagements or verified results. Replace
            them with genuine, client-approved case studies before publishing.
          </Note>
        </div>
      </section>

      <CTASection title="Have a similar problem?" text="Tell us what is not working and we will describe how we would approach it." />
    </>
  );
}
