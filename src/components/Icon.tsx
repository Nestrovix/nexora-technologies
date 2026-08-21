import type { ReactElement, SVGProps } from 'react';

const paths: Record<string, ReactElement> = {
  code: (
    <>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </>
  ),
  browser: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="M2 9h20" />
      <path d="M6 6.5h.01M9 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18.5h2" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19a4.5 4.5 0 0 0 .3-8.99A6 6 0 0 0 6.2 11.2 3.9 3.9 0 0 0 6.5 19Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 20 6v5.5c0 4.6-3.2 8.4-8 9.7-4.8-1.3-8-5.1-8-9.7V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.8 14 9l6.2 2-6.2 2-2 6.2-2-6.2L3.8 11 10 9Z" />
      <path d="M19 3.2v3M17.5 4.7h3" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V11" />
      <path d="M12 21V4" />
      <path d="M18 21v-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-2 5.4-5.4 2 2-5.4Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1" />
      <path d="M18 14.4a6.5 6.5 0 0 1 3.5 5.6" />
    </>
  ),
  scale: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20V9l5-5 5 5v11" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 1 1-3.4-6.5" />
      <path d="M21 4v5h-5" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  loop: (
    <>
      <path d="M3 12a9 9 0 0 1 15.2-6.5L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.2 6.5L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  phone: <path d="M6.5 3h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8.2 19.6Z" />
      <path d="M9 9.2c0 3 2.4 5.4 5.3 5.4.6 0 1-.5 1-.5l-1.3-1.3-1.2.6a5.6 5.6 0 0 1-2.4-2.4l.6-1.2-1.3-1.3s-.7.2-.7.7Z" />
    </>
  ),
  arrow: <path d="M5 12h13m-5.5-5.5L18.5 12l-6 5.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  quote: <path d="M9.5 6C6.8 7.3 5 9.9 5 13.2V18h5.5v-5.5H8c0-2 .7-3.4 2.4-4.4Zm9 0c-2.7 1.3-4.5 3.9-4.5 7.2V18H19.5v-5.5H17c0-2 .7-3.4 2.4-4.4Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  upload: (
    <>
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
      <path d="M4 16v2.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V16" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2M12 16.2h.01" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  className = 'h-5 w-5',
  ...rest
}: { name: string; className?: string } & SVGProps<SVGSVGElement>) {
  const child = paths[name] ?? paths.spark;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {child}
    </svg>
  );
}
