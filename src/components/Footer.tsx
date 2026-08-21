import Link from 'next/link';
import Icon from './Icon';
import Logo from './Logo';
import { footerNav, site, whatsappHref } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-4 border-t border-white/10 bg-navy-900/60">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.35]" aria-hidden="true" />
      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              {site.name} is an India-based IT services company building software, cloud, security, data and AI
              capability for businesses that need technology to keep up with them.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${site.contact.phoneHref}`} className="btn-ghost !px-4 !py-2 text-[13px]">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a href={`mailto:${site.contact.email}`} className="btn-ghost !px-4 !py-2 text-[13px]">
                <Icon name="mail" className="h-4 w-4" /> Email
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-[13px]">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400">{group.title}</h2>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ink-300 transition hover:text-electric-400">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
          <div className="flex gap-3 text-sm text-ink-400">
            <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
            <address className="not-italic leading-relaxed">
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="flex gap-3 text-sm text-ink-400">
            <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
            <div className="leading-relaxed">
              {site.contact.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="text-ink-300">{h.days}:</span> {h.time}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 text-sm text-ink-400">
            <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
            <div className="leading-relaxed">
              <a href={`mailto:${site.contact.email}`} className="block transition hover:text-electric-400">
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phoneHref}`} className="block transition hover:text-electric-400">
                {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-200/80">
          <strong className="font-semibold">Demo content notice:</strong> contact details, statistics, case studies,
          testimonials and team profiles on this website are placeholder content created for this build. Replace them
          with verified company information before going live.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-ink-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-ink-300">
              Terms of Use
            </Link>
            <a href="/sitemap.xml" className="transition hover:text-ink-300">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
