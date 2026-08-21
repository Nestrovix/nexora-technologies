# Nexora Technologies — Corporate Website

A production-ready corporate website for an IT services company, built with Next.js 15
(App Router), TypeScript and Tailwind CSS.

> **Important:** this build ships with clearly-labelled **sample content**. Statistics,
> case studies, testimonials, leadership profiles, job openings and all contact details
> are placeholders. Replace them with verified company information before going live.
> Every placeholder is marked in the UI and in code comments.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL
npm run dev                    # http://localhost:3000
npm run build && npm start     # production build
```

Node 18.18+ (Node 20/22 recommended).

> **Looking for `index.html`?** There isn't one in the source — this is a Next.js
> app, so pages live in `src/app/` and the HTML is generated at build time. If you
> want plain HTML files, use the static export below.

---

## Static export (plain HTML, no Node server)

A ready-built copy already ships in **`out/`** — `out/index.html`,
`out/about/index.html`, `out/services/cloud-solutions/index.html` and so on, plus
all images, CSS and JS.

To regenerate it after changing anything:

```bash
npm run build:static     # → writes ./out
```

To view it locally:

```bash
npx serve out            # → http://localhost:3000
# or: python3 -m http.server 8000 --directory out
```

Opening `out/index.html` straight from the filesystem (`file://`) will **not**
work — Next.js exports use absolute asset paths, so the page needs to be served
over HTTP. Any static host works: Netlify, Cloudflare Pages, GitHub Pages, S3,
Apache, nginx, or Vercel.

**What changes in the static build**

| | Server build (`npm run build`) | Static build (`npm run build:static`) |
| --- | --- | --- |
| Hosting | Vercel / any Node host | Any static host |
| API routes | `/api/enquiry`, `/api/apply` included | excluded (no server to run them) |
| Forms | post to the built-in API routes | validate, then show a clearly-labelled preview notice |
| Images | optimised on demand by Next.js | served as pre-built WebP |

To make the forms work on the static build, point them at a hosted form service
and rebuild:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx \
NEXT_PUBLIC_APPLY_ENDPOINT=https://formspree.io/f/yyyy \
npm run build:static
```

**Recommendation:** deploy the server build to Vercel. It keeps the working API
routes, on-demand image optimisation and the security headers, none of which a
static host can provide.

---

## Project structure

```
nexora/
├── public/assets/images/        # WebP imagery, organised by section
│   ├── hero/ services/ solutions/ industries/
│   ├── projects/ team/ about/ careers/ insights/ pages/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, metadata, Organization + WebSite JSON-LD
│   │   ├── page.tsx             # homepage (12 sections)
│   │   ├── about/ services/ solutions/ industries/
│   │   ├── case-studies/ insights/ careers/ contact/ faq/
│   │   ├── privacy-policy/ terms/ not-found.tsx
│   │   ├── services/[slug]/     # 8 generated service detail pages
│   │   ├── case-studies/[slug]/ # 6 generated case study pages
│   │   ├── insights/[slug]/     # 5 generated article pages
│   │   ├── api/enquiry/         # project enquiry endpoint
│   │   ├── api/apply/           # job application endpoint
│   │   ├── sitemap.ts robots.ts icon.svg globals.css
│   ├── components/              # Header, Footer, forms, cards, accordion, …
│   ├── data/                    # ALL site content lives here
│   └── lib/                     # validation + rate limiting
├── next.config.mjs              # security headers, image config
├── tailwind.config.ts           # design tokens
└── vercel.json
```

### Where to edit content

| What | File |
| --- | --- |
| Company name, contact details, navigation, social links | `src/data/site.ts` |
| Services + service detail pages | `src/data/services.ts` |
| Packaged solutions | `src/data/solutions.ts` |
| Industries | `src/data/industries.ts` |
| Case studies | `src/data/case-studies.ts` |
| Blog / insights articles | `src/data/insights.ts` |
| Stats, values, process, tech stack, leadership, testimonials, FAQs | `src/data/company.ts` |
| Job openings and benefits | `src/data/careers.ts` |

Adding a service, case study or article to its data file automatically creates the
detail page, the sitemap entry and the related-content links.

---

## Design system

| Token | Value |
| --- | --- |
| Base / surface | `navy-950 #050b1c`, `navy-900 #07112b`, `navy-800 #0b1a3d` |
| Accent | `electric-500 #1f8bff` → `violet-500 #8b5cf6` gradient |
| Text | `white`, `ink-200 #dde5f4`, `ink-400 #8697b8`, `ink-500 #8290b4` |
| Display font | Sora (500/600/700) |
| Body font | Inter (400/500/600) |
| Radius | 0.875 / 1.25 / 1.75 rem |
| Motion | `cubic-bezier(.22,.61,.36,1)`, IntersectionObserver scroll reveal |

Glassmorphism is applied through the `.glass` / `.glass-strong` utilities in
`globals.css`; all reusable button, card, field and section styles live in the same file.

---

## Features

- Sticky header that compacts on scroll, full mobile drawer with Call / WhatsApp actions
- 12-section homepage: hero, stats, services, tech stack, industries, why-us, process,
  case studies, testimonials, insights, FAQ, CTA and contact
- 8 service detail pages: hero → overview → challenges → solution → features →
  technology → process → benefits → FAQ → CTA
- Filterable case study listing (industry / service / technology / free-text) with
  detail pages
- Careers page with sample openings and an application form (resume upload)
- Project enquiry form with client + server validation, loading / success / error states
- Floating WhatsApp, call and email actions
- Accordion FAQ with `aria-expanded` / `aria-controls`
- Legal pages, 404 page, sitemap, robots, JSON-LD

---

## Forms and backend integration

Both endpoints validate input, enforce a honeypot field and apply per-IP rate limiting,
but **neither delivers the submission anywhere yet**.

### `POST /api/enquiry`
Handled in `src/app/api/enquiry/route.ts`. Replace the `deliver()` function with one of:

1. **Transactional email** — Resend / SendGrid / SES
   (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`)
2. **CRM record** — HubSpot / Zoho / Salesforce (`CRM_API_KEY`, `CRM_PIPELINE_ID`)
3. **Database row** — PostgreSQL / MongoDB (`DATABASE_URL`)

### `POST /api/apply`
Handled in `src/app/api/apply/route.ts`. The resume is validated (PDF/DOC/DOCX, ≤ 5 MB)
but not stored. Stream it to object storage and persist the returned key:

- Vercel Blob (`BLOB_READ_WRITE_TOKEN`), or
- Amazon S3 (`AWS_REGION`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), or
- push directly into an ATS (Greenhouse, Lever).

For files larger than a few MB, issue a pre-signed upload URL from the server and upload
straight from the browser instead of proxying through the API route.

### Rate limiting
`src/lib/rate-limit.ts` is an in-memory limiter — it only bounds bursts per serverless
instance. For a real control, swap it for Upstash Redis / Vercel KV or an edge WAF rule.

---

## Security

- Security headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) set in `next.config.mjs`
- All form input validated on the client **and** revalidated on the server
- Honeypot field plus per-IP rate limiting on both endpoints
- Request body size caps and field length truncation
- No secrets in client code; only `NEXT_PUBLIC_SITE_URL` is exposed to the browser
- HTTPS is provided by the host (automatic on Vercel)

---

## SEO

- Per-page `title` / `description`, canonical URLs, Open Graph and Twitter cards
- Single `<h1>` per page with a consistent H2/H3 hierarchy
- `sitemap.xml` and `robots.txt` generated from the data files
- JSON-LD: `Organization`, `WebSite`, `Service`, `FAQPage`, `Article`,
  `ProfessionalService` (local SEO on the contact page)
- Descriptive `alt` text on every content image
- Clean, human-readable URLs (`/services/cloud-solutions`)

---

## Performance

- All imagery pre-converted to WebP, served through `next/image`
  (AVIF/WebP negotiation, responsive `sizes`, lazy loading below the fold)
- Only the hero image is marked `priority`
- No animation library — CSS transitions plus a single shared IntersectionObserver
- Self-hosted Google Fonts via `next/font` with `display: swap`
- Static pre-rendering for every page except the two API routes
- Immutable cache headers on `/assets/*`

---

## Accessibility

- Semantic landmarks, skip-to-content link, visible focus rings
- Keyboard-operable navigation, accordion, filters and forms
- Labels bound to every field; errors linked with `aria-describedby` / `aria-invalid`
- `prefers-reduced-motion` respected; `<noscript>` fallback reveals all content
- Verified with axe-core (WCAG 2.1 A/AA): **0 violations** across the audited pages

---

## Testing performed

Automated with Playwright + axe-core against the production build:

- 32 routes crawled at 1440 / 820 / 390 px — no console errors, no failed requests,
  no broken images, no horizontal overflow, exactly one `<h1>` per page
- Mobile navigation open / navigate / close
- FAQ accordion toggling
- Case study filters, search, empty state and reset
- Enquiry form: empty submit, invalid email / phone / message, successful submit
- Application form validation
- API routes: 422 on invalid payload, 200 on valid payload
- Keyboard focus order (skip link first)
- axe-core WCAG 2.1 A/AA scan on 9 representative pages, desktop and mobile

---

## Deployment (Netlify)

A `netlify.toml` is included with two options — pick one.

**Option A — server build (default).** Keeps the API routes, on-demand image
optimisation and security headers.

```toml
[build]
  command = "npm run build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Option B — static export.** No server, no API routes; deploys as plain files.
Comment out Option A in `netlify.toml` and uncomment:

```toml
[build]
  command = "npm run build:static"
  publish = "out"
```

### If the Netlify build fails

Work through these in order — the exit code alone rarely says which one it is.

| Check | Why it breaks |
| --- | --- |
| **Node version** | Next 15 needs Node ≥ 18.18. `netlify.toml` and `.nvmrc` both pin Node 20; if the Netlify UI has an older `NODE_VERSION` set it overrides the file — clear it. |
| **`NEXT_PUBLIC_SITE_URL`** | Must be a full origin. `www.example.com` is now auto-corrected to `https://www.example.com`, and an unparseable value falls back with a warning instead of crashing the build — but set it properly anyway. |
| **Publish directory** | Must be `.next` for Option A, `out` for Option B. A mismatch fails at the deploy step with HTTP 400. |
| **Both plugin and toml** | If `@netlify/plugin-nextjs` is installed from the Netlify UI *and* declared in `netlify.toml`, remove one. Duplicates can conflict. |
| **Stale cache** | Deploys → *Trigger deploy* → **Clear cache and deploy site**. |
| **Memory** | Very large Next builds can exhaust the build container. Set `NODE_OPTIONS=--max-old-space-size=4096` in the build environment. |

The build is verified to pass from a clean checkout: `npm ci && npm run build`
succeeds with no warnings on Node 20 and Node 22.

---

## Deployment (Vercel)

1. Push this folder to a Git repository.
2. In Vercel, **Add New → Project** and import the repository.
   Framework preset is detected as Next.js; no build overrides are needed.
3. Add environment variables (at minimum `NEXT_PUBLIC_SITE_URL`) for
   Production and Preview.
4. Deploy, then attach your custom domain. HTTPS is issued automatically.
5. After the domain is live, submit `https://your-domain.com/sitemap.xml`
   to Google Search Console.

The project also runs on any Node host with `npm run build && npm start`, and on
Netlify or Cloudflare with their Next.js adapters.

> This project has **not** been deployed. The steps above must be run before any
> URL exists.

---

## Before you publish — checklist

- [ ] Replace phone, email, address and map embed in `src/data/site.ts`
- [ ] Replace sample statistics in `src/data/company.ts`
- [ ] Replace or remove sample case studies in `src/data/case-studies.ts`
- [ ] Replace demo testimonials with approved client quotes
- [ ] Replace placeholder leadership profiles and photos
- [ ] Replace sample job openings and benefits in `src/data/careers.ts`
- [ ] Remove the demo-content notice in `src/components/Footer.tsx`
- [ ] Connect `/api/enquiry` and `/api/apply` to real delivery/storage
- [ ] Swap the in-memory rate limiter for a shared store
- [ ] Have the privacy policy and terms reviewed legally
- [ ] Replace stock photography if licence terms require it for your use

---

## Image credits

All photography is sourced from Unsplash under the
[Unsplash License](https://unsplash.com/license), which permits commercial use without
attribution. Files were resized, cropped and converted to WebP for this project.
Replace them with your own brand photography where possible.
