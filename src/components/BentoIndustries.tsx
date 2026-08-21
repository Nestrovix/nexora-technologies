import Link from 'next/link';
import Icon from './Icon';
import { industries } from '@/data/industries';

/**
 * Industries as bordered spec blocks in a hairline grid. Each block carries a
 * short label → value table (constraint / response) instead of an image tile.
 */
export default function BentoIndustries() {
  return (
    <div className="spec-grid sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry, i) => (
        <Link
          key={industry.slug}
          href={`/industries#${industry.slug}`}
          className={`spec-block reveal reveal-d${i % 4} group`}
        >
          <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <Icon
              name="arrow"
              className="h-3.5 w-3.5 text-line transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
          </div>

          <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{industry.name}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{industry.short}</p>

          <dl className="spec-table mt-auto pt-5">
            <div>
              <dt>Constraint</dt>
              <dd>{industry.challenges[0]}</dd>
            </div>
            <div>
              <dt>Response</dt>
              <dd>{industry.solutions[0]}</dd>
            </div>
          </dl>
        </Link>
      ))}
    </div>
  );
}
