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
  const [copied, setCopied] = useState(false);

  function getDraftDetails() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    const inquiry = readForm(form);
    const subject = `${inquiry.type} enquiry — ${inquiry.name}`;
    const body = bodyText(inquiry);
    return { subject, body };
  }

  function openGmail() {
    const draft = getDraftDetails();
    if (!draft) return;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setNotice('Opened a draft in Gmail. Review and send your message there.');
  }

  function openOutlook() {
    const draft = getDraftDetails();
    if (!draft) return;
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(profile.email)}&subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setNotice('Opened a draft in Outlook Web. Review and send your message there.');
  }

  async function copy() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(bodyText(readForm(form)));
      setCopied(true);
      setNotice('Enquiry copied to clipboard. You can paste it into an email to ' + profile.email + '.');
      setTimeout(() => setCopied(false), 3500);
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
        const draft = getDraftDetails();
        if (!draft) return;
        const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
        window.location.href = mailto;
        setNotice(
          'Your default email app should open with a draft. Review it and send it there.',
        );
      }}
    >
      <h2>Start a conversation.</h2>
      <p>
        A few details help me understand what you need. Choose your preferred way to send.
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
          Default Mail App <Arrow diagonal />
        </button>
        <button type="button" className="button button-outline webmail-btn" onClick={openGmail}>
          Open in Gmail <Arrow diagonal />
        </button>
        <button type="button" className="button button-outline webmail-btn" onClick={openOutlook}>
          Open in Outlook <Arrow diagonal />
        </button>
        <button type="button" className="text-link copy-link-btn" onClick={copy}>
          {copied ? '✓ Copied to clipboard' : 'Copy enquiry'}
        </button>
      </div>
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
      {notice && (
        <p className="form-notice" role="status">
          {notice}
        </p>
      )}
    </form>
  );
}
