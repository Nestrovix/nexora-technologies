import Link from 'next/link';
import Icon from './Icon';
import type { Service } from '@/data/services';

/** A single practice rendered as a bordered spec block with a label → value table. */
export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <article className={`spec-block reveal reveal-d${Math.min(delay, 5)} group`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
        <span className="idx">{service.slug.slice(0, 2).toUpperCase()}</span>
        <Icon name={service.icon} className="h-4 w-4 text-ink-500" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-600">{service.short}</p>
      <dl className="spec-table">
        <div>
          <dt>Stack</dt>
          <dd>{service.technologies.slice(0, 3).join(' · ')}</dd>
        </div>
        <div>
          <dt>Outputs</dt>
          <dd>{service.features.length} defined deliverables</dd>
        </div>
      </dl>
      <Link href={`/services/${service.slug}`} className="link-arrow mt-5">
        Learn More
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </article>
  );
}
