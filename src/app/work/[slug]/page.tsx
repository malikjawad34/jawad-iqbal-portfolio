import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { pageMetadata, siteUrl } from '@/data/seo';
import { SectionLabel, Tags, Arrow } from '@/components/ui';
import { Architecture } from '@/components/architecture';
import { ContactCTA } from '@/components/footer';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(`${p.name} — engineering case study`, p.description, `/work/${p.slug}/`)
    : {};
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${p.name} — engineering case study`,
    description: p.description,
    url: `${siteUrl}/work/${p.slug}/`,
    author: { '@type': 'Person', name: 'M. Jawad Iqbal', url: siteUrl },
    about: p.technologies,
  };
  return (
    <>
      <main id="main">
        <section className="container case-intro">
          <Link href="/work/" className="text-link back-link">
            ← All work
          </Link>
          <SectionLabel>
            {p.name.toUpperCase()} / {p.eyebrow}
          </SectionLabel>
          <h1>{p.headline}</h1>
          <p className="case-summary">{p.description}</p>
          <dl className="case-meta">
            <div>
              <dt>MY ROLE</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>CONTEXT</dt>
              <dd>{p.context}</dd>
            </div>
            <div>
              <dt>CORE STACK</dt>
              <dd>
                <Tags items={p.technologies.slice(0, 4)} />
              </dd>
            </div>
          </dl>
        </section>
        <div className="container case-visual">
          <Architecture project={p} />
        </div>
        <div className="container case-body">
          <nav className="case-sidebar" aria-label="Case study sections">
            <a href="#context">01 · The context</a>
            <a href="#approach">02 · The engineering</a>
            <a href="#outcomes">03 · What was delivered</a>
          </nav>
          <div className="case-prose">
            <section id="context">
              <SectionLabel>01 / THE CONTEXT</SectionLabel>
              <h2>The problem behind the product.</h2>
              <p>{p.problem}</p>
            </section>
            <section id="approach">
              <SectionLabel>02 / THE ENGINEERING</SectionLabel>
              <h2>How the pieces come together.</h2>
              {p.approach.map((a, i) => (
                <article className="approach-item" key={a.title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </div>
                </article>
              ))}
              <Tags items={p.technologies} />
            </section>
            <section id="outcomes">
              <SectionLabel>03 / THE DELIVERY</SectionLabel>
              <h2>What the work made possible.</h2>
              <ul className="outcomes">
                {p.outcomes.map((o) => (
                  <li key={o}>
                    <span aria-hidden="true">↗</span>
                    {o}
                  </li>
                ))}
              </ul>
              <p className="scope-note">{p.scope}</p>
              {p.links.length > 0 && (
                <div className="case-links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      className="button button-outline"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                      <Arrow diagonal />
                    </a>
                  ))}
                </div>
              )}
            </section>
            <div className="next-project">
              <Link href={`/work/${next.slug}/`}>
                <div>
                  <p>NEXT CASE STUDY</p>
                  <h2>{next.name}</h2>
                </div>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      </main>
      <ContactCTA />
    </>
  );
}
