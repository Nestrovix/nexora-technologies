export type EnquiryPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  industry?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName: string;
  coverMessage?: string;
  website?: string;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
/** Accepts international formats; requires 8–15 digits after stripping separators. */
export const PHONE_RE = /^[+]?[\d][\d\s\-().]{7,20}$/;

const digits = (v: string) => v.replace(/\D/g, '');

export function validateEnquiry(data: Partial<EnquiryPayload>) {
  const errors: Record<string, string> = {};

  if (!data.fullName?.trim()) errors.fullName = 'Please enter your full name.';
  else if (data.fullName.trim().length < 2) errors.fullName = 'Name must be at least 2 characters.';

  if (!data.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Enter a valid email address, e.g. name@example.com.';

  if (!data.phone?.trim()) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_RE.test(data.phone.trim()) || digits(data.phone).length < 8 || digits(data.phone).length > 15)
    errors.phone = 'Enter a valid phone number with 8–15 digits.';

  if (!data.service?.trim()) errors.service = 'Please select the service you need.';

  if (!data.message?.trim()) errors.message = 'Please describe your project.';
  else if (data.message.trim().length < 20) errors.message = 'Please give us at least 20 characters of detail.';

  return errors;
}

export function validateApplication(data: Partial<ApplicationPayload>) {
  const errors: Record<string, string> = {};

  if (!data.fullName?.trim()) errors.fullName = 'Please enter your full name.';
  if (!data.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Enter a valid email address.';

  if (!data.phone?.trim()) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_RE.test(data.phone.trim()) || digits(data.phone).length < 8 || digits(data.phone).length > 15)
    errors.phone = 'Enter a valid phone number with 8–15 digits.';

  if (!data.position?.trim()) errors.position = 'Please select the position you are applying for.';
  if (!data.resumeName?.trim()) errors.resumeName = 'Please attach your resume (PDF or Word, up to 5 MB).';

  return errors;
}
