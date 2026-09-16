import Image from 'next/image';
import { SectionLabel, Arrow, Tags } from '@/components/ui';
import { ContactCTA } from '@/components/footer';
import { pageMetadata } from '@/data/seo';
import { experience, technicalSkills } from '@/data/profile';
export const metadata = pageMetadata(
  'About Jawad',
  'Meet M. Jawad Iqbal, a lead software engineer in Islamabad with 5+ years across full-stack applications, cloud delivery, and secure integrations.',
  '/about/',
);
const principles = [
  {
    title: 'Understand before building.',
    text: 'Start with the workflow, the people using it, and the constraints. A clear shared understanding makes the technical decisions easier.',
  },
  {
    title: 'Keep the system understandable.',
    text: 'Choose clear interfaces, maintainable code, and an architecture the team can reason about. Review and collaboration are part of the engineering.',
  },
  {
    title: 'Stay close to delivery.',
    text: 'A feature is part of a running product. Deployment, production troubleshooting, and ongoing support belong in the same conversation as implementation.',
  },
];
export default function About() {
  return (
    <>
      <main id="main">
        <section className="container about-hero">
          <div>
            <SectionLabel>ABOUT ME</SectionLabel>
            <h1>
              An engineer.
              <br />A problem solver.
              <br />A collaborator.
            </h1>
            <p>
              I’m M. Jawad Iqbal, a lead software engineer based in Islamabad, Pakistan. I work
              across the frontend, backend, and cloud to turn complex requirements into dependable
              software.
            </p>
            <p>
              My focus is practical: understand the business, connect the right pieces, and help the
              team deliver a product they can keep improving.
            </p>
            <a href="/M-Jawad-Iqbal-CV.pdf" download className="text-link">
              Download my CV <Arrow diagonal />
            </a>
          </div>
          <figure className="about-portrait">
            <Image
              src="/images/jawad-iqbal.webp"
              width={800}
              height={1042}
              priority
              alt="M. Jawad Iqbal, lead software engineer"
            />
            <figcaption className="portrait-caption">
              <span>M. JAWAD IQBAL</span>
              <span>ISLAMABAD, PK</span>
            </figcaption>
          </figure>
        </section>
        <section className="about-story">
          <div className="container about-story-inner">
            <div>
              <SectionLabel>THE JOURNEY</SectionLabel>
              <h2>
                From interfaces
                <br />
                to entire systems.
              </h2>
            </div>
            <div>
              <p>
                I began with web development at SIQA Software Services, building a foundation in
                JavaScript, React, Firebase, and collaborative development while completing my
                computer science degree.
              </p>
              <p>
                Since joining Applivity in June 2022, my work has grown into leading full-stack
                delivery across SaaS, ERP, and academic-management applications. I collaborate with
                stakeholders, review code, mentor engineers, and support production systems on AWS.
              </p>
              <p>
                Alongside enterprise work, I have delivered independent client projects such as Al
                Zayed’s luggage tracking platform. I also build practical AI integrations, including
                a published Custom GPT that connects to ChatCLB through secure, focused API
                operations.
              </p>
            </div>
          </div>
        </section>
        <section className="container section-space">
          <SectionLabel>HOW I WORK</SectionLabel>
          <div className="principle-grid">
            {principles.map((p, i) => (
              <article key={p.title}>
                <span className="mono">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="container section-space" style={{ paddingTop: 0 }}>
          <figure className="engineering-banner-card">
            <Image
              src="/images/engineering-banner.webp"
              width={1600}
              height={600}
              alt="Full-Stack .NET & React Engineer — Architecture, Development, and AWS Cloud Deployment"
              className="engineering-banner-img"
            />
          </figure>
          <div className="section-heading">
            <div>
              <SectionLabel>TECHNICAL TOOLKIT</SectionLabel>
              <h2>
                Technologies
                <br />
                in production.
              </h2>
            </div>
            <p>
              From database architecture to responsive frontends and cloud releases.
            </p>
          </div>
          <div className="skills-matrix-grid">
            {technicalSkills.map((cat, idx) => (
              <article className="skill-category-card" key={cat.category}>
                <div className="skill-cat-header">
                  <span className="mono">0{idx + 1}</span>
                  <h3>{cat.category}</h3>
                </div>
                <p>{cat.summary}</p>
                <Tags items={cat.skills} />
              </article>
            ))}
          </div>
        </section>
        <section className="container section-space" style={{ paddingTop: 0 }}>
          <div className="experience-layout">
            <div>
              <SectionLabel>EXPERIENCE & EDUCATION</SectionLabel>
              <h2>
                A foundation
                <br />
                in delivery.
              </h2>
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
          <div className="education">
            <div>
              <h3>BS in Computer Science</h3>
              <p>International Islamic University, Islamabad</p>
            </div>
            <span className="mono">2018 — 2022</span>
          </div>
        </section>
      </main>
      <ContactCTA />
    </>
  );
}
