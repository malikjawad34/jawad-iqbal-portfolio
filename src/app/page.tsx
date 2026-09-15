import Link from 'next/link';
import Image from 'next/image';
import { Arrow, SectionLabel, Tags } from '@/components/ui';
import { HeroDiagram } from '@/components/architecture';
import { ProjectCard } from '@/components/project-card';
import { ContactCTA } from '@/components/footer';
import { projects } from '@/data/projects';
import { expertise, experience } from '@/data/profile';
export default function Home() {
  return (
    <>
      <main id="main">
        <section className="hero">
          <div className="container hero-main">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="tiny-rule" /> LEAD SOFTWARE ENGINEER · ISLAMABAD, PK
              </div>
              <h1>
                Complex systems.
                <br />
                <span>Clear outcomes.</span>
              </h1>
              <p>
                I’m Jawad. I build the software behind ambitious businesses — from secure SaaS
                platforms to AI that gets things done.
              </p>
              <div className="hero-actions">
                <Link href="/work/" className="button button-blue">
                  Explore my work <Arrow />
                </Link>
                <Link href="/contact/" className="hero-secondary">
                  Let’s talk <Arrow diagonal />
                </Link>
              </div>
              <div className="hero-availability">
                <span /> Open to selected freelance & contract work
              </div>
            </div>
            <HeroDiagram />
          </div>
          <div className="container hero-proof">
            <div>
              <strong>5+</strong>
              <span>
                Years in software
                <br />
                engineering
              </span>
            </div>
            <div>
              <strong>21</strong>
              <span>
                Operations in a published
                <br />
                GPT Actions integration
              </span>
            </div>
            <div className="proof-text">
              <strong>End to end.</strong>
              <span>
                Architecture, implementation,
                <br />
                and production delivery.
              </span>
            </div>
          </div>
        </section>
        <section className="selected-work section-space">
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel>SELECTED WORK</SectionLabel>
                <h2>
                  Real problems.
                  <br />
                  Thoughtful engineering.
                </h2>
              </div>
              <div>
                <p>
                  A closer look at the systems I build
                  <br className="desktop-break" /> and the decisions that shape them.
                </p>
                <Link href="/work/" className="text-link">
                  View all work <Arrow />
                </Link>
              </div>
            </div>
            <ProjectCard project={projects[0]} featured />
            <div className="project-grid">
              {projects.slice(1, 3).map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i + 1} />
              ))}
            </div>
          </div>
        </section>
        <section id="expertise" className="expertise section-space">
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel>HOW I CAN HELP</SectionLabel>
                <h2>
                  The whole picture.
                  <br />
                  Every layer.
                </h2>
              </div>
              <p>
                Hands-on engineering that connects
                <br className="desktop-break" /> business needs with reliable software.
              </p>
            </div>
            <div className="expertise-grid">
              {expertise.map((e) => (
                <article key={e.number}>
                  <span className="expertise-number">{e.number}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  <Tags items={e.technologies} />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="experience section-space">
          <div className="container experience-layout">
            <div>
              <SectionLabel>EXPERIENCE</SectionLabel>
              <h2>
                Built through
                <br />
                real responsibility.
              </h2>
              <p>
                From frontend foundations to leading full-stack delivery and supporting production
                systems.
              </p>
              <a className="text-link" href="/M-Jawad-Iqbal-CV.pdf" download>
                Download my CV <Arrow diagonal />
              </a>
            </div>
            <div>
              {experience.map((e) => (
                <article className="experience-row" key={e.company}>
                  <span className="mono">{e.dates}</span>
                  <h3>{e.role}</h3>
                  <span className="company">{e.company}</span>
                  <p>{e.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="about-teaser">
          <div className="container about-teaser-inner">
            <Image src="/images/jawad-iqbal.webp" width={240} height={310} alt="M. Jawad Iqbal" />
            <div>
              <SectionLabel>THE PERSON BEHIND THE SYSTEMS</SectionLabel>
              <h2>
                Practical by nature.
                <br />
                Curious by default.
              </h2>
              <p>
                I enjoy making complex requirements understandable, then building software that
                teams can confidently work with and improve.
              </p>
              <Link href="/about/" className="text-link">
                A little more about me <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ContactCTA />
    </>
  );
}
