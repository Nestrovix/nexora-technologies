'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { site, whatsappHref } from '@/data/site';

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 transition-all duration-500 ease-premium sm:bottom-7 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_-12px_rgba(37,211,102,0.8)] transition hover:scale-105"
      >
        <Icon name="whatsapp" className="h-6 w-6" />
      </a>
      <a
        href={`tel:${site.contact.phoneHref}`}
        aria-label={`Call ${site.name}`}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-navy-800/90 text-electric-400 shadow-card backdrop-blur-xl transition hover:scale-105 hover:text-white"
      >
        <Icon name="phone" className="h-5 w-5" />
      </a>
      <a
        href={`mailto:${site.contact.email}`}
        aria-label={`Email ${site.name}`}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-navy-800/90 text-electric-400 shadow-card backdrop-blur-xl transition hover:scale-105 hover:text-white"
      >
        <Icon name="mail" className="h-5 w-5" />
      </a>
    </div>
  );
}
