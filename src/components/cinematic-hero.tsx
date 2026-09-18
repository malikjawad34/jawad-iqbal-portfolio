import Image from 'next/image';

export function CinematicHero() {
  return (
    <div className="cinematic-stage" aria-label="Lead software engineer profile">
      <div className="cinematic-portrait">
        <Image
          src="/images/jawad-iqbal.webp"
          alt="Jawad Iqbal, lead software engineer"
          fill
          sizes="(max-width: 700px) 75vw, 440px"
          priority
        />
        <div className="portrait-caption">
          <span>THE ENGINEER BEHIND THE WORK</span>
          <strong>Jawad Iqbal</strong>
        </div>
      </div>
      <span className="cinematic-index" aria-hidden="true">IDEA → ARCHITECTURE → PRODUCTION</span>
    </div>
  );
}
