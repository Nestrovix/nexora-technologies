'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import { primaryNav, site, whatsappHref } from '@/data/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-paper transition-colors duration-200 ease-premium ${
        scrolled ? 'border-line' : 'border-line/60'
      }`}
    >
      <div
        className={`container relative z-10 flex items-center justify-between gap-4 bg-paper transition-all duration-200 ease-premium ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative block whitespace-nowrap px-2.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.06em] transition ${
                    isActive(item.href) ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-2.5 bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-200 ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.contact.phoneHref}`}
            className="tabnum hidden whitespace-nowrap border-r border-line pr-4 text-[13px] font-medium text-ink-600 transition hover:text-accent xl:block"
          >
            {site.contact.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-primary whitespace-nowrap !px-4 !py-2.5">
            Talk to an Expert
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-11 w-11 place-items-center rounded-sm border border-line bg-paper text-ink-900 transition hover:border-ink-900 lg:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        ref={panelRef}
        aria-hidden={!open}
        className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`fixed inset-0 bg-ink-900/25 transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-x-0 top-full max-h-[calc(100vh-84px)] overflow-y-auto border-y border-line bg-paper transition-all duration-200 ease-premium ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <nav aria-label="Mobile" className="container py-2">
            <ul className="flex flex-col">
              {primaryNav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    className={`flex items-center gap-4 border-b border-line py-3.5 text-[15px] font-medium transition ${
                      isActive(item.href)
                        ? 'border-l-2 border-l-accent pl-3 font-semibold text-ink-900'
                        : 'text-ink-700 hover:text-accent'
                    }`}
                  >
                    <span className="idx w-6">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{item.label}</span>
                    <Icon name="arrow" className="h-4 w-4 text-ink-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container grid gap-2 pb-5">
            <Link href="/contact" tabIndex={open ? 0 : -1} className="btn-primary w-full">
              Talk to an Expert
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a href={`tel:${site.contact.phoneHref}`} tabIndex={open ? 0 : -1} className="btn-ghost w-full !px-3">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="btn-ghost w-full !px-3"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
