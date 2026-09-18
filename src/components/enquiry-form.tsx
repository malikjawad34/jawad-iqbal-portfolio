'use client';
import { useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { Arrow } from './ui';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    setStatus('submitting');
    setErrorMessage('');

    const form = formRef.current;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const type = String(formData.get('type') || 'General');

    formData.set('access_key', ACCESS_KEY);
    formData.set('subject', `Portfolio Inquiry: ${type} — ${name}`);
    formData.set('from_name', `${name} via Portfolio`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSenderName(name);
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(
          data.message || 'We could not deliver your message right now. Please try again or use direct email.',
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error while connecting to the email service. You can email Jawad directly or reach out on WhatsApp.',
      );
    }
  }

  function openGmailFallback() {
    const form = formRef.current;
    const name = form ? String(new FormData(form).get('name') || '').trim() : '';
    const message = form ? String(new FormData(form).get('message') || '').trim() : '';
    const subject = encodeURIComponent(`Portfolio Inquiry — ${name || 'Client'}`);
    const body = encodeURIComponent(message || 'Hi Jawad,\n\nI would like to discuss a project with you.');
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="enquiry-card">
      {status === 'success' ? (
        <div className="form-success-banner" role="status">
          <div className="success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>Message Delivered!</h2>
          <p>
            Thank you{senderName ? `, ${senderName}` : ''}. Your inquiry has been sent directly to Jawad&apos;s personal Gmail (<strong>{profile.email}</strong>).
          </p>
          <p className="success-subtext">
            I review all direct inquiries personally and reply within 24 hours.
          </p>
          <button
            type="button"
            className="button button-blue"
            onClick={() => {
              setStatus('idle');
              setErrorMessage('');
            }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit}>
          <h2>Start a conversation.</h2>
          <p>
            Fill out the details below and click Send Message to deliver your inquiry directly to my Gmail.
          </p>

          {/* Anti-spam honeypot */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" autoComplete="name" maxLength={100} required placeholder="e.g. Alex Miller" />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={160}
                required
                placeholder="e.g. alex@company.com"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="type">What would you like to discuss?</label>
            <select id="type" name="type" defaultValue="SaaS or product development">
              <option>SaaS or product development</option>
              <option>API or AI integration</option>
              <option>Cloud deployment or an existing system</option>
              <option>Engineering role or contract</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Tell me a little about it</label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={1500}
              placeholder="What are you building or improving? Include your goals, timeline, and any useful context."
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="button button-blue send-btn"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className="send-spinner" aria-hidden="true" />
                  Sending message...
                </>
              ) : (
                <>
                  Send Message <Arrow diagonal />
                </>
              )}
            </button>
          </div>

          {status === 'error' && (
            <div className="form-error-banner" role="alert">
              <p><strong>{errorMessage}</strong></p>
              <p>You can also reach me directly:</p>
              <div className="error-fallback-actions">
                <button type="button" className="button button-outline error-btn" onClick={openGmailFallback}>
                  Open in Gmail <Arrow diagonal />
                </button>
                <a
                  href={profile.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline error-btn"
                >
                  Chat on WhatsApp <Arrow diagonal />
                </a>
              </div>
            </div>
          )}

          <div className="form-secondary-actions">
            <span>Prefer instant messaging?</span>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-inline-link"
            >
              Chat on WhatsApp <Arrow diagonal />
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
