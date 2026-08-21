'use client';

import { useId, useRef, useState } from 'react';
import Icon from './Icon';
import { jobs } from '@/data/careers';
import { validateApplication } from '@/lib/validation';

const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT || '/api/apply';
const PREVIEW_ONLY =
  process.env.NEXT_PUBLIC_STATIC_PREVIEW === '1' && !process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function ApplicationForm({ defaultPosition = '' }: { defaultPosition?: string }) {
  const uid = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: defaultPosition,
    coverMessage: '',
    website: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'preview'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const fieldId = (n: string) => `${uid}-${n}`;
  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }));
  };

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setErrors((p) => ({ ...p, resumeName: '' }));

    if (selected) {
      if (selected.size > MAX_BYTES) {
        setErrors((p) => ({ ...p, resumeName: 'Resume must be 5 MB or smaller.' }));
        setFile(null);
        e.target.value = '';
        return;
      }
      if (!ALLOWED.includes(selected.type)) {
        setErrors((p) => ({ ...p, resumeName: 'Resume must be a PDF or Word document.' }));
        setFile(null);
        e.target.value = '';
        return;
      }
    }
    setFile(selected);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateApplication({ ...values, resumeName: file?.name || '' });
    setErrors(found);
    if (Object.keys(found).length) {
      const key = Object.keys(found)[0];
      document.getElementById(fieldId(key === 'resumeName' ? 'resume' : key))?.focus();
      return;
    }

    if (PREVIEW_ONLY) {
      setStatus('preview');
      return;
    }

    setStatus('loading');
    setServerMessage('');

    const body = new FormData();
    Object.entries(values).forEach(([k, v]) => body.append(k, v));
    if (file) body.append('resume', file);

    try {
      const res = await fetch(APPLY_ENDPOINT, { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setServerMessage(data?.message || 'We could not submit your application. Please try again.');
        if (data?.errors) setErrors(data.errors);
        return;
      }
      setStatus('success');
      setValues({ fullName: '', email: '', phone: '', position: '', coverMessage: '', website: '' });
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      setStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'preview') {
    return (
      <div className="plate rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-sm bg-accent-50 text-ink-700">
          <Icon name="alert" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Validation passed — preview build</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          This static preview has no server, so the application was not submitted or stored. Run the full app or set{' '}
          <code className="font-mono text-ink-700">NEXT_PUBLIC_APPLY_ENDPOINT</code> to accept real applications.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
          Back to the form
        </button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="plate rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-sm bg-accent-50 text-accent">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Application received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          Thank you! Your application has been received. Our talent team will be in touch if there is a match.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="plate rounded-2xl p-5 sm:p-7">
      <h2 className="text-xl font-semibold">Apply to Nexora</h2>
      <p className="mt-2 text-sm text-ink-600">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      {status === 'error' && (
        <div className="mt-5 flex gap-3 rounded-xl border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverMessage}</p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={fieldId('fullName')}>
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('fullName')}
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={set('fullName')}
            className={`field ${errors.fullName ? 'field-error' : ''}`}
            aria-invalid={!!errors.fullName}
            placeholder="Your name"
          />
          {errors.fullName && <p className="mt-1.5 text-xs text-red-700">{errors.fullName}</p>}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('email')}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('email')}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            className={`field ${errors.email ? 'field-error' : ''}`}
            aria-invalid={!!errors.email}
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('phone')}>
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('phone')}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            className={`field ${errors.phone ? 'field-error' : ''}`}
            aria-invalid={!!errors.phone}
            placeholder="+91 00000 00000"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('position')}>
            Position <span className="text-accent">*</span>
          </label>
          <select
            id={fieldId('position')}
            value={values.position}
            onChange={set('position')}
            className={`field ${errors.position ? 'field-error' : ''}`}
            aria-invalid={!!errors.position}
          >
            <option value="">Select a position</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.title}>
                {j.title}
              </option>
            ))}
            <option value="General application">General application</option>
          </select>
          {errors.position && <p className="mt-1.5 text-xs text-red-700">{errors.position}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor={fieldId('resume')}>
            Resume <span className="text-accent">*</span>
          </label>
          <label
            htmlFor={fieldId('resume')}
            className={`flex cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-5 transition ${
              errors.resumeName ? 'border-red-600 bg-red-50' : 'border-line bg-band hover:border-accent'
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent">
              <Icon name="upload" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm text-ink-900">{file ? file.name : 'Choose a file'}</span>
              <span className="block text-xs text-ink-500">PDF or Word document, up to 5 MB</span>
            </span>
          </label>
          <input
            ref={fileRef}
            id={fieldId('resume')}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFile}
            className="sr-only"
            aria-invalid={!!errors.resumeName}
          />
          {errors.resumeName && <p className="mt-1.5 text-xs text-red-700">{errors.resumeName}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor={fieldId('coverMessage')}>
            Cover Message
          </label>
          <textarea
            id={fieldId('coverMessage')}
            rows={4}
            value={values.coverMessage}
            onChange={set('coverMessage')}
            className="field resize-y"
            placeholder="Anything you would like us to know about your work"
          />
        </div>
      </div>

      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Leave empty</label>
        <input id={fieldId('website')} type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-white" />
            Submitting…
          </>
        ) : (
          <>
            Submit Application
            <Icon name="arrow" className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 rounded-xl border border-line bg-band px-4 py-3 text-xs leading-relaxed text-ink-700">
        <strong className="font-semibold">Backend required:</strong> the resume is validated in the browser and on the
        server, but file storage is not yet connected. Wire <code className="font-mono">/api/apply</code> to S3, Vercel
        Blob or your ATS before accepting live applications.
      </p>
    </form>
  );
}
