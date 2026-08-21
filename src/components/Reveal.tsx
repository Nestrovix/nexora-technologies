'use client';

import { useEffect } from 'react';

/**
 * Reveals every `.reveal` element once it reaches the fold.
 *
 * A single shared IntersectionObserver keeps this cheap on long pages.
 *
 * NOTE: the threshold must stay at 0 and the scroll sweep must stay in place.
 * With a non-zero threshold the observer samples per frame, so a fast wheel
 * flick, an End key or a hash jump can carry an element past the viewport
 * between two samples — it then never fires and the block stays invisible for
 * good. The sweep has no lower bound on purpose: anything the reader has
 * already scrolled past must be shown, not left blank.
 */
export default function Reveal() {
  useEffect(() => {
    const SEL = '.reveal:not(.is-visible)';
    const all = () => Array.from(document.querySelectorAll<HTMLElement>(SEL));
    const show = (el: Element) => el.classList.add('is-visible');

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      all().forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );

    const sweep = () => {
      const fold = window.innerHeight * 0.96;
      all().forEach((el) => {
        if (el.getBoundingClientRect().top < fold) show(el);
      });
    };

    const scan = () => all().forEach((n) => observer.observe(n));

    scan();
    sweep();

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sweep();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // new nodes can arrive from filters, accordions and route transitions
    const mo = new MutationObserver(() => {
      scan();
      sweep();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = window.setTimeout(sweep, 2500);

    return () => {
      observer.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(safety);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  return null;
}
