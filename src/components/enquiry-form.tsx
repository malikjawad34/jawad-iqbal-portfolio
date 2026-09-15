'use client';
import { useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { Arrow } from './ui';
type Inquiry = { name: string; email: string; type: string; message: string };
function bodyText({ name, email, type, message }: Inquiry) {
  return `Hi Jawad,\n\nI'm reaching out about: ${type}.\n\n${message}\n\nName: ${name}\nReply to: ${email}`;
}
function readForm(form: HTMLFormElement): Inquiry {
  const data = new FormData(form);
  return {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    type: String(data.get('type') || ''),
    message: String(data.get('message') || '').trim(),
  };
}
export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [notice, setNotice] = useState('');
  async function copy() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(bodyText(readForm(form)));
      setNotice('Enquiry copied. Paste it into an email to ' + profile.email + '.');
    } catch {
      setNotice(
        'Clipboard access is unavailable. You can email Jawad directly using the email link on this page.',
      );
    }
  }
  return (
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        const inquiry = readForm(e.currentTarget);
        const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`${inquiry.type} enquiry — ${inquiry.name}`)}&body=${encodeURIComponent(bodyText(inquiry))}`;
        window.location.href = mailto;
        setNotice(
          'Your email app should open with a draft. Review it and send it there. Nothing has been submitted by this website.',
        );
      }}
    >
      <h2>Start a conversation.</h2>
      <p>
        A few details help me understand what you need. This prepares a draft in your email app.
      </p>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" maxLength={100} required />
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
        <button type="submit" className="button button-blue">
          Prepare email <Arrow diagonal />
        </button>
        <button type="button" className="text-link" onClick={copy}>
          Copy enquiry
        </button>
      </div>
      <p className="form-notice" role="status">
        {notice}
      </p>
    </form>
  );
}
