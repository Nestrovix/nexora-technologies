import { NextResponse } from 'next/server';
import { validateEnquiry } from '@/lib/validation';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PROJECT ENQUIRY ENDPOINT
 * -------------------------------------------------------------------------
 * This route validates and rate-limits submissions, then logs them. It does
 * NOT yet deliver the enquiry anywhere.
 *
 * === BACKEND INTEGRATION REQUIRED ===
 * Replace the `deliver()` function below with one of:
 *   1. Transactional email  — Resend / SendGrid / Amazon SES
 *      env: RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *   2. CRM record           — HubSpot / Zoho / Salesforce API
 *      env: CRM_API_KEY, CRM_PIPELINE_ID
 *   3. Database row         — PostgreSQL / MongoDB via a server-side client
 *      env: DATABASE_URL
 * Never place these keys in NEXT_PUBLIC_* variables — they must stay
 * server-side only.
 */
async function deliver(payload: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.info('[enquiry] validated submission (no delivery configured)', {
    ...payload,
    receivedAt: new Date().toISOString(),
  });
  return { delivered: false as const };
}

const MAX_BODY = 20_000;

export async function POST(request: Request) {
  const limit = rateLimit(`enquiry:${clientKey(request.headers)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not read the request.' }, { status: 400 });
  }

  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, message: 'Your message is too long.' }, { status: 413 });
  }

  let body: Record<string, string>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request format.' }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were filtered.
  if (body.website) {
    return NextResponse.json({ ok: true, message: 'Enquiry received.' });
  }

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: 'Please correct the highlighted fields.', errors },
      { status: 422 },
    );
  }

  const clean = {
    fullName: body.fullName.trim().slice(0, 120),
    companyName: (body.companyName || '').trim().slice(0, 160),
    email: body.email.trim().toLowerCase().slice(0, 160),
    phone: body.phone.trim().slice(0, 32),
    industry: (body.industry || '').trim().slice(0, 80),
    service: body.service.trim().slice(0, 80),
    budget: (body.budget || '').trim().slice(0, 80),
    timeline: (body.timeline || '').trim().slice(0, 80),
    message: body.message.trim().slice(0, 5000),
  };

  await deliver(clean);

  return NextResponse.json({
    ok: true,
    message: 'Thank you! Your project enquiry has been received. Our team will contact you shortly.',
  });
}
