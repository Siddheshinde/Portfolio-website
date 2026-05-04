import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { submitContact } from '@/api';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#282621',
  border: '1px solid rgba(255,193,7,0.2)',
  color: '#fff4ca',
  borderRadius: 8,
  padding: '12px 14px',
  fontFamily: "'Public Sans', sans-serif",
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#f3e8d8',
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '0.4rem',
  opacity: 0.85,
};

const errorStyle: React.CSSProperties = {
  color: '#ff6b6b',
  fontSize: '0.78rem',
  marginTop: '0.3rem',
  fontFamily: "'Public Sans', sans-serif",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Contact | Siddhesh Shinde';
  }, []);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) {
      e.email = 'Email is required.';
    } else if (!validateEmail(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) {
      e.message = 'Message is required.';
    } else if (form.message.trim().length < 20) {
      e.message = 'Message must be at least 20 characters.';
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#1d1b18',
        minHeight: '100vh',
        padding: '4rem 1.5rem 5rem',
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left column — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                color: '#ff9500',
                margin: '0 0 1rem',
                lineHeight: 1.1,
              }}
            >
              Let's Build Something
            </h1>
            <p
              style={{
                color: '#f3e8d8',
                fontSize: '1rem',
                lineHeight: 1.75,
                margin: '0 0 2.5rem',
                opacity: 0.85,
              }}
            >
              Got a project idea, a collaboration opportunity, or just want to connect?
            </p>

            {/* Availability badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(170,133,23,0.12)',
                border: '1px solid rgba(170,133,23,0.4)',
                borderRadius: 999,
                padding: '0.4rem 1rem',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#aa8517',
                  display: 'inline-block',
                  boxShadow: '0 0 6px rgba(170,133,23,0.7)',
                }}
              />
              <span
                style={{
                  color: '#aa8517',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                Open to opportunities
              </span>
            </div>

            {/* Email card */}
            <a
              href="mailto:siddhesh.shinde23@spit.ac.in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: '#282621',
                border: '1px solid rgba(255,193,7,0.2)',
                borderRadius: 10,
                padding: '1rem 1.25rem',
                textDecoration: 'none',
                marginBottom: '1rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#aa8517';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(255,193,7,0.2)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>✉</span>
              <div>
                <p
                  style={{
                    color: '#aa8517',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '0 0 2px',
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    color: '#fff4ca',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  siddhesh.shinde23@spit.ac.in
                </p>
              </div>
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <SocialLink
                href="https://github.com/Siddheshinde"
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/siddheshvshinde/"
                label="LinkedIn"
              />
            </div>
          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    backgroundColor: '#282621',
                    border: '1px solid rgba(170,133,23,0.4)',
                    borderRadius: 12,
                    padding: '2.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Russo One', sans-serif",
                      color: '#ff9500',
                      fontSize: '1.2rem',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    Message sent!
                  </h3>
                  <p
                    style={{
                      color: '#f3e8d8',
                      fontSize: '0.95rem',
                      margin: '0 0 1.5rem',
                      opacity: 0.85,
                    }}
                  >
                    I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(170,133,23,0.4)',
                      color: '#aa8517',
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      padding: '0.5rem 1.5rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    backgroundColor: '#282621',
                    border: '1px solid rgba(255,193,7,0.2)',
                    borderRadius: 12,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Name */}
                  <div>
                    <label style={labelStyle} htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={{
                        ...inputStyle,
                        borderColor: errors.name
                          ? 'rgba(255,107,107,0.6)'
                          : 'rgba(255,193,7,0.2)',
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          '#aa8517';
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          errors.name ? 'rgba(255,107,107,0.6)' : 'rgba(255,193,7,0.2)';
                      }}
                    />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      style={{
                        ...inputStyle,
                        borderColor: errors.email
                          ? 'rgba(255,107,107,0.6)'
                          : 'rgba(255,193,7,0.2)',
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          '#aa8517';
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          errors.email ? 'rgba(255,107,107,0.6)' : 'rgba(255,193,7,0.2)';
                      }}
                    />
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle} htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        borderColor: errors.message
                          ? 'rgba(255,107,107,0.6)'
                          : 'rgba(255,193,7,0.2)',
                        minHeight: 120,
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                          '#aa8517';
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                          errors.message
                            ? 'rgba(255,107,107,0.6)'
                            : 'rgba(255,193,7,0.2)';
                      }}
                    />
                    {errors.message && <p style={errorStyle}>{errors.message}</p>}
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p style={{ ...errorStyle, fontSize: '0.85rem', marginTop: 0 }}>
                      {submitError}
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      backgroundColor: submitting
                        ? 'rgba(170,133,23,0.5)'
                        : '#aa8517',
                      border: 'none',
                      color: '#1d1b18',
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.97rem',
                      padding: '0.85rem',
                      borderRadius: 8,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          '#c89a1e';
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting)
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          '#aa8517';
                    }}
                  >
                    {submitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: '#aa8517',
        fontWeight: 600,
        fontSize: '0.88rem',
        textDecoration: 'none',
        border: '1px solid rgba(170,133,23,0.35)',
        padding: '0.45rem 1rem',
        borderRadius: 8,
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
          'rgba(170,133,23,0.1)';
        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#aa8517';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          'rgba(170,133,23,0.35)';
      }}
    >
      {label}
    </a>
  );
}
