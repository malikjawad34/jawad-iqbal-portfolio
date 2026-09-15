import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="section-label">404 / PAGE NOT FOUND</p>
      <h1>A small detour.</h1>
      <p>This page doesn’t exist. You can explore the work or head back home.</p>
      <Link className="button button-blue" href="/">
        Back to home
      </Link>
    </main>
  );
}
