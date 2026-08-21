import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import type { Service } from '@/data/services';

export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <article
      className={`group glass card-hover reveal reveal-d${Math.min(delay, 5)} flex flex-col overflow-hidden rounded-2xl`}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} services at Nexora Technologies`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-navy-950/70 text-electric-400 backdrop-blur-md">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-400">{service.short}</p>
        <Link href={`/services/${service.slug}`} className="link-arrow mt-5">
          Learn More
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
