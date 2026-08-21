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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        scrolled
          ? 'border-b border-white/10 bg-navy-950/85 py-2 backdrop-blur-xl shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]'
          : 'border-b border-transparent bg-gradient-to-b from-navy-950/80 to-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                    isActive(item.href) ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric-400 to-violet-400 transition-transform duration-300 ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.contact.phoneHref}`} className="text-sm font-medium text-ink-300 transition hover:text-white">
            {site.contact.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-primary !px-5 !py-2.5">
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
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/10 lg:hidden"
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
          className={`fixed inset-0 top-[68px] bg-navy-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-x-0 top-full mx-3 mt-2 max-h-[calc(100vh-92px)] overflow-y-auto rounded-2xl border border-white/10 bg-navy-900/95 p-4 shadow-card backdrop-blur-2xl transition-all duration-300 ease-premium ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
          }`}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                      isActive(item.href) ? 'bg-white/[0.07] text-white' : 'text-ink-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    {item.label}
                    <Icon name="arrow" className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 grid gap-2 border-t border-white/10 pt-4">
            <Link href="/contact" tabIndex={open ? 0 : -1} className="btn-primary w-full">
              Talk to an Expert
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a href={`tel:${site.contact.phoneHref}`} tabIndex={open ? 0 : -1} className="btn-ghost w-full !px-3 text-[13px]">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="btn-ghost w-full !px-3 text-[13px]"
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
