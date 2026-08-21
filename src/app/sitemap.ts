import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { insights } from '@/data/insights';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${site.url}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: new Date(i.date),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
