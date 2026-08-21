import { NextResponse } from 'next/server';
import { validateApplication } from '@/lib/validation';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * JOB APPLICATION ENDPOINT
 * -------------------------------------------------------------------------
 * Validates and rate-limits applications. The resume file is accepted and
 * checked, but NOT persisted.
 *
 * === BACKEND INTEGRATION REQUIRED ===
 * To store resumes, stream the file to object storage and save the returned
 * key alongside the application record:
 *   - Amazon S3 (env: AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
 *   - Vercel Blob (env: BLOB_READ_WRITE_TOKEN)
 *   - Or push into an ATS such as Greenhouse / Lever via their API.
 * For files larger than a few MB, prefer issuing a pre-signed upload URL from
 * the server and uploading directly from the browser.
 */
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function POST(request: Request) {
  const limit = rateLimit(`apply:${clientKey(request.headers)}`, 4, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many applications submitted. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not read the submitted form.' }, { status: 400 });
  }

  if (form.get('website')) {
    return NextResponse.json({ ok: true, message: 'Application received.' });
  }

  const resume = form.get('resume');
  const file = resume instanceof File && resume.size > 0 ? resume : null;

  const payload = {
    fullName: String(form.get('fullName') || ''),
    email: String(form.get('email') || ''),
    phone: String(form.get('phone') || ''),
    position: String(form.get('position') || ''),
    coverMessage: String(form.get('coverMessage') || ''),
    resumeName: file?.name || '',
  };

  const errors = validateApplication(payload);

  if (file) {
    if (file.size > MAX_RESUME_BYTES) errors.resumeName = 'Resume must be 5 MB or smaller.';
    else if (!ALLOWED_TYPES.includes(file.type)) errors.resumeName = 'Resume must be a PDF or Word document.';
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: 'Please correct the highlighted fields.', errors }, { status: 422 });
  }

  // eslint-disable-next-line no-console
  console.info('[apply] validated application (no storage configured)', {
    ...payload,
    resumeBytes: file?.size ?? 0,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: 'Thank you! Your application has been received. Our talent team will be in touch if there is a match.',
  });
}
