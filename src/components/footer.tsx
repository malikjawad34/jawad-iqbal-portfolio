import Link from 'next/link';
import { profile } from '@/data/profile';
import { Arrow, SectionLabel } from './ui';
export function ContactCTA() {
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
        <Link className="button button-blue" href="/contact/">
          Discuss your project <Arrow diagonal />
        </Link>
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
