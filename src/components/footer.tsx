import Link from 'next/link';
import { profile } from '@/data/profile';
import { Arrow, SectionLabel } from './ui';
export function ContactCTA() {
  const linkedIn = profile.socials.find((s) => s.label === 'LinkedIn');
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div>
          <SectionLabel light>HAVE SOMETHING IN MIND?</SectionLabel>
          <h2>
            Let’s make it
            <br />
            <span>work beautifully.</span>
          </h2>
          <p>A new product, a complex integration, or a system ready for its next chapter.</p>
        </div>
        <div className="cta-action">
          <Link className="button button-blue" href="/contact/">
            Discuss your project <Arrow diagonal />
          </Link>
          <p className="cta-meta">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>Replies within 24 hours · UTC +05:00</span>
            {linkedIn && (
              <a href={linkedIn.href} target="_blank" rel="noopener noreferrer">
                {linkedIn.label} <Arrow diagonal />
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Link href="/" className="footer-name">
          M. Jawad Iqbal<span>Engineering with intent.</span>
        </Link>
        <div className="footer-socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} M. Jawad Iqbal</span>
        <span>Islamabad, Pakistan · Working globally</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
