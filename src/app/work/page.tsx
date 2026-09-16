import Image from 'next/image';
import { pageMetadata } from '@/data/seo';
import { SectionLabel } from '@/components/ui';
import { WorkGallery } from '@/components/work-gallery';
import { ContactCTA } from '@/components/footer';
export const metadata = pageMetadata(
  'Selected work',
  'Case studies in SaaS platforms, secure APIs, logistics software, enterprise systems, and GPT Actions integrations.',
  '/work/',
);
export default function Work() {
  return (
    <>
      <main id="main">
        <section className="page-intro">
          <div className="container">
            <SectionLabel>THE WORK</SectionLabel>
            <h1>
              Software with <br />a real job to do.
            </h1>
            <p>
              Enterprise platforms, independent client projects, and connected AI. Here’s what I
              worked on, how the pieces fit together, and what was delivered.
            </p>
          </div>
        </section>
        <div className="container work-banner-wrap">
          <figure className="engineering-banner-card">
            <Image
              src="/images/engineering-banner.webp"
              width={1600}
              height={600}
              alt="Full-Stack .NET & React Engineer — SaaS, APIs, AI Integrations, AWS Cloud Delivery"
              priority
              className="engineering-banner-img"
            />
          </figure>
        </div>
        <section className="container work-content" aria-label="Projects">
          <WorkGallery />
          <div className="more-work">
            <p>
              My earlier work includes a responsive events website and a demonstration e-commerce
              application. The projects above best represent my current engineering focus.
            </p>
          </div>
        </section>
      </main>
      <ContactCTA />
    </>
  );
}
