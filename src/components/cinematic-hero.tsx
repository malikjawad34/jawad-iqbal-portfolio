import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/ui';

export function CinematicHero() {
  return (
    <div className="cinematic-stage" aria-label="Featured engineering work">
      <div className="cinematic-portrait">
        <Image
          src="/images/jawad-iqbal.webp"
          alt="Jawad Iqbal, lead software engineer"
          fill
          sizes="(max-width: 700px) 75vw, 400px"
          priority
        />
        <div className="portrait-caption"><span>THE ENGINEER BEHIND THE WORK</span><strong>Jawad Iqbal</strong></div>
      </div>
      <Link href="/work/chatclb/" className="floating-project floating-platform">
        <span className="floating-category">01 / PLATFORMS</span>
        <strong>Built to connect.</strong>
        <span className="floating-detail">ChatCLB · Full-stack delivery</span>
        <span className="floating-footer">.NET / React / AWS <Arrow diagonal /></span>
      </Link>
      <Link href="/work/chatclb-gpt/" className="floating-project floating-ai">
        <span className="floating-category">02 / APPLIED AI</span>
        <strong>Beyond the chat.</strong>
        <span className="floating-detail">GPT Actions · 21 operations</span>
        <span className="floating-footer">Explore the integration <Arrow diagonal /></span>
      </Link>
      <span className="cinematic-index" aria-hidden="true">IDEA → ARCHITECTURE → PRODUCTION</span>
    </div>
  );
}
