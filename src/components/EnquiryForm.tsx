'use client';

import { useId, useRef, useState } from 'react';
import Icon from './Icon';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { validateEnquiry, type EnquiryPayload } from '@/lib/validation';

const budgets = [
  'Under ₹5 lakh',
  '₹5 – 15 lakh',
  '₹15 – 40 lakh',
  '₹40 lakh – 1 crore',
  'Above ₹1 crore',
  'Not decided yet',
];

const timelines = ['As soon as possible', '1 – 3 months', '3 – 6 months', '6 months or later', 'Still exploring'];

/**
 * Where the form posts.
 * - Default (server build): the built-in Next.js route handler.
 * - Static export: set NEXT_PUBLIC_FORM_ENDPOINT to a hosted form service
 *   (Formspree, Basin, Web3Forms…) or your own API URL.
 * - If neither exists, the form runs in preview mode and says so plainly
 *   rather than pretending the enquiry was sent.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/enquiry';
const PREVIEW_ONLY =
  process.env.NEXT_PUBLIC_STATIC_PREVIEW === '1' && !process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const empty: EnquiryPayload = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  industry: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  website: '',
};

export default function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'preview'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const liveRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof EnquiryPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const fieldId = (name: string) => `${uid}-${name}`;

  const errorProps = (name: string) =>
    errors[name]
      ? ({ 'aria-invalid': true as const, 'aria-describedby': `${fieldId(name)}-error` })
      : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);

    if (Object.keys(found).length) {
      setStatus('idle');
      const first = document.getElementById(fieldId(Object.keys(found)[0]));
      first?.focus();
      return;
    }

    if (PREVIEW_ONLY) {
      setStatus('preview');
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setServerMessage(data?.message || 'We could not submit your enquiry. Please try again or email us directly.');
        if (data?.errors) setErrors(data.errors);
        return;
      }

      setStatus('success');
      setValues(empty);
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
          This is the static preview export, which has no server, so nothing was actually sent. Run the full app
          (<code className="font-mono text-ink-700">npm run dev</code>) or set{' '}
          <code className="font-mono text-ink-700">NEXT_PUBLIC_FORM_ENDPOINT</code> to a hosted form service to deliver
          real enquiries.
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
        <h3 className="mt-5 text-xl font-semibold">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          Thank you! Your project enquiry has been received. Our team will contact you shortly.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="plate rounded-2xl p-5 sm:p-7" aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="text-xl font-semibold">
        Project Enquiry
      </h3>
      <p className="mt-2 text-sm text-ink-600">
        Tell us about your project. Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div ref={liveRef} aria-live="assertive" className="sr-only">
        {status === 'error' ? serverMessage : ''}
      </div>

      {status === 'error' && (
        <div className="mt-5 flex gap-3 rounded-xl border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverMessage}</p>
        </div>
      )}

      <div className={`mt-6 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="label" htmlFor={fieldId('fullName')}>
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('fullName')}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={set('fullName')}
            className={`field ${errors.fullName ? 'field-error' : ''}`}
            placeholder="Your name"
            {...errorProps('fullName')}
          />
          {errors.fullName && (
            <p id={`${fieldId('fullName')}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('companyName')}>
            Company Name
          </label>
          <input
            id={fieldId('companyName')}
            name="companyName"
            type="text"
            autoComplete="organization"
            value={values.companyName}
            onChange={set('companyName')}
            className="field"
            placeholder="Company or organisation"
          />
        </div>

        <div>
          <label className="label" htmlFor={fieldId('email')}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set('email')}
            className={`field ${errors.email ? 'field-error' : ''}`}
            placeholder="name@example.com"
            {...errorProps('email')}
          />
          {errors.email && (
            <p id={`${fieldId('email')}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('phone')}>
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={set('phone')}
            className={`field ${errors.phone ? 'field-error' : ''}`}
            placeholder="+91 00000 00000"
            {...errorProps('phone')}
          />
          {errors.phone && (
            <p id={`${fieldId('phone')}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('industry')}>
            Industry
          </label>
          <select id={fieldId('industry')} name="industry" value={values.industry} onChange={set('industry')} className="field">
            <option value="">Select industry</option>
            {industries.map((i) => (
              <option key={i.slug} value={i.name}>
                {i.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor={fieldId('service')}>
            Required Service <span className="text-accent">*</span>
          </label>
          <select
            id={fieldId('service')}
            name="service"
            required
            value={values.service}
            onChange={set('service')}
            className={`field ${errors.service ? 'field-error' : ''}`}
            {...errorProps('service')}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.service && (
            <p id={`${fieldId('service')}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor={fieldId('budget')}>
            Project Budget
          </label>
          <select id={fieldId('budget')} name="budget" value={values.budget} onChange={set('budget')} className="field">
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor={fieldId('timeline')}>
            Expected Timeline
          </label>
          <select id={fieldId('timeline')} name="timeline" value={values.timeline} onChange={set('timeline')} className="field">
            <option value="">Select a timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="label" htmlFor={fieldId('message')}>
            Project Description <span className="text-accent">*</span>
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={set('message')}
            className={`field resize-y ${errors.message ? 'field-error' : ''}`}
            placeholder="What are you trying to build or solve? Include any systems it needs to work with."
            {...errorProps('message')}
          />
          {errors.message && (
            <p id={`${fieldId('message')}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot field — hidden from users, filled only by bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Leave this field empty</label>
        <input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Submit Enquiry
            <Icon name="arrow" className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        By submitting this form you agree to be contacted about your enquiry. We do not share your details with third
        parties.
      </p>
    </form>
  );
}
