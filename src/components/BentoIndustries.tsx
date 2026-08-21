import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { industries } from '@/data/industries';

/**
 * Industries as a bento grid — mixed tile sizes rather than eight equal cards.
 * Tile 0 spans 2×2, tiles 3 and 5 span two columns, the rest are 1×1.
 */
/**
 * 8 tiles laid out as a clean 4×3 grid on desktop:
 *   row 1-2 col 1-2 → tile 0 (2×2 feature)
 *   row 1   col 3-4 → tiles 1, 2
 *   row 2   col 3-4 → tiles 3, 4
 *   row 3   col 1-2 → tile 5 (wide)
 *   row 3   col 3-4 → tiles 6, 7
 * On two-column screens tile 0 stays a 2×2 feature and tile 5 stays wide.
 */
const span = [
  'col-span-2 row-span-2',
  '',
  '',
  '',
  '',
  'col-span-2',
  '',
  '',
];

export default function BentoIndustries() {
  return (
    <div className="grid auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[180px] lg:grid-cols-4">
      {industries.map((industry, i) => {
        const big = i === 0;
        const wide = i === 5;
        return (
          <Link
            key={industry.slug}
            href={`/industries#${industry.slug}`}
            className={`bento reveal reveal-d${i % 4} group ${span[i]}`}
          >
            <Image
              src={industry.image}
              alt={`${industry.name} technology solutions`}
              fill
              loading="lazy"
              sizes={big || wide ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
              className="object-cover opacity-70 transition duration-700 ease-premium group-hover:scale-105 group-hover:opacity-90"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />

            <span className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
              <span className="font-display text-base font-semibold text-white sm:text-lg">{industry.name}</span>
              {(big || wide) && (
                <span className="mt-2 max-w-sm text-sm leading-relaxed text-ink-300">{industry.short}</span>
              )}
              <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-electric-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore Solution
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
