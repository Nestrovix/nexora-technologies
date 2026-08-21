import Link from 'next/link';
import Icon from './Icon';
import Logo from './Logo';
import { footerNav, site, whatsappHref } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-band">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-600">
              {site.name} is an India-based IT services company building software, cloud, security, data and AI
              capability for businesses that need technology to keep up with them.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${site.contact.phoneHref}`} className="btn-ghost !px-3.5 !py-2">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a href={`mailto:${site.contact.email}`} className="btn-ghost !px-3.5 !py-2">
                <Icon name="mail" className="h-4 w-4" /> Email
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group, i) => (
              <div key={group.title}>
                <h2 className="spec-label border-b border-line pb-3">
                  <span className="spec-label__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="spec-label__slash" aria-hidden="true">
                    /
                  </span>
                  <span>{group.title}</span>
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ink-600 transition hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-14 grid border-t border-line md:grid-cols-3">
          <div className="border-b border-line py-5 md:border-r md:pr-8">
            <dt className="spec-key">Office</dt>
            <dd className="mt-2.5 text-sm text-ink-700">
              <address className="not-italic leading-relaxed">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </dd>
          </div>
          <div className="border-b border-line py-5 md:border-r md:px-8">
            <dt className="spec-key">Hours</dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-ink-700">
              {site.contact.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="text-ink-500">{h.days}:</span> {h.time}
                </span>
              ))}
            </dd>
          </div>
          <div className="border-b border-line py-5 md:pl-8">
            <dt className="spec-key">Direct</dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-ink-700">
              <a href={`mailto:${site.contact.email}`} className="block break-words transition hover:text-accent">
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phoneHref}`} className="tabnum block transition hover:text-accent">
                {site.contact.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-8 border-y border-line border-l-2 border-l-accent bg-paper px-4 py-3 text-xs leading-relaxed text-ink-700">
          <strong className="font-semibold text-ink-900">Demo content notice:</strong> contact details, statistics, case
          studies, testimonials and team profiles on this website are placeholder content created for this build.
          Replace them with verified company information before going live.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-accent">
              Terms of Use
            </Link>
            <a href="/sitemap.xml" className="transition hover:text-accent">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
