import { SectionLabel, Arrow } from '@/components/ui';
import { EnquiryForm } from '@/components/enquiry-form';
import { profile } from '@/data/profile';
import { pageMetadata } from '@/data/seo';
export const metadata = pageMetadata(
  'Let’s talk',
  'Discuss SaaS development, API and AI integrations, cloud delivery, or an engineering role with M. Jawad Iqbal.',
  '/contact/',
);
export default function Contact() {
  return (
    <main id="main">
      <section className="page-intro">
        <div className="container">
          <SectionLabel>LET’S WORK TOGETHER</SectionLabel>
          <h1>
            A good product starts <br />
            with a conversation.
          </h1>
          <p>
            Building something new, connecting existing systems, or growing an engineering team?
            Tell me what you have in mind.
          </p>
        </div>
      </section>
      <div className="container contact-layout">
        <section className="contact-details">
          <h2>Direct is good.</h2>
          <a href={`mailto:${profile.email}`} className="email-link">
            {profile.email}
          </a>
          <p>
            Open to selected freelance projects, contracts, and remote engineering opportunities.
          </p>
          <p className="contact-response">Usually replies within 24 hours.</p>
          <nav className="contact-socials" aria-label="Professional profiles">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
          <div className="contact-location">
            Based in Islamabad, Pakistan
            <br />
            UTC +05:00 · Collaborating globally
          </div>
        </section>
        <EnquiryForm />
      </div>
    </main>
  );
}
