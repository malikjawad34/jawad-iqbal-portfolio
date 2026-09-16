'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Arrow } from './ui';
const links = [
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="M. Jawad Iqbal — home"
          onClick={() => setOpen(false)}
        >
          <span className="monogram" aria-hidden="true">
            JI<span>.</span>
          </span>
          <span>
            Jawad Iqbal<span className="brand-role">Software Engineer</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <Link key={l.label} href={l.href} aria-current={path === l.href ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact/">
            Let’s talk <Arrow diagonal />
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {[...links, { label: 'Contact', href: '/contact/' }].map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                <Arrow diagonal />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
