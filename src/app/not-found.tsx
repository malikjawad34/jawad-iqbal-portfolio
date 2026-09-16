import Link from 'next/link';
import { Arrow, SectionLabel } from '@/components/ui';
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <div className="container not-found-inner">
        <SectionLabel light>404 / PAGE NOT FOUND</SectionLabel>
        <p className="not-found-code" aria-hidden="true">
          4<span>0</span>4
        </p>
        <h1>This page took a detour.</h1>
        <p className="not-found-text">
          The link may be broken, or the page may have moved. The work is still a click away.
        </p>
        <div className="not-found-actions">
          <Link className="button button-blue" href="/">
            Back to home <Arrow />
          </Link>
          <Link className="hero-secondary" href="/work/">
            Explore my work <Arrow diagonal />
          </Link>
        </div>
      </div>
    </main>
  );
}
