import { techStack } from '@/data/company';

/**
 * Technology stack as a hairline specification table — one row per category,
 * values set as bordered tags. Static by design: nothing scrolls on its own.
 */
export default function TechRails() {
  return (
    <div className="container">
      <dl className="border-t border-line">
        {techStack.map((group, i) => (
          <div
            key={group.category}
            className={`reveal reveal-d${i % 4} grid gap-x-8 gap-y-3 border-b border-line py-5 lg:grid-cols-[13rem_1fr]`}
          >
            <dt className="flex items-baseline gap-2">
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="spec-key text-ink-900">{group.category}</span>
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-line bg-paper px-2.5 py-1.5 text-[13px] leading-none text-ink-700"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
