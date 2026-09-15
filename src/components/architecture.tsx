import type { Project } from '@/data/projects';
export function Architecture({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <figure className={`architecture architecture-${project.theme}${compact ? ' compact' : ''}`}>
      <div className="diagram-top">
        <span>
          {project.slug === 'chatclb-gpt' ? 'CONVERSATION → ACTION' : 'PRODUCT → PLATFORM'}
        </span>
        <span>Architecture overview</span>
      </div>
      <div className="diagram-nodes">
        {project.architecture.map((n, i) => (
          <div className="node-wrap" key={n.label}>
            <div className="diagram-node">
              <span className="node-index">0{i + 1}</span>
              <strong>{n.label}</strong>
              <span>{n.detail}</span>
            </div>
            {i < 2 && (
              <span className="node-connector" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>{compact ? project.proof : project.architectureNote}</figcaption>
    </figure>
  );
}
export function HeroDiagram() {
  return (
    <figure
      className="hero-diagram"
      aria-label="Engineering scope: product experience, application services, and cloud delivery"
    >
      <div className="diagram-top">
        <span>BUILT AS ONE SYSTEM</span>
        <span className="crosshair" aria-hidden="true">
          +
        </span>
      </div>
      <div className="hero-layer">
        <span className="layer-num">01</span>
        <div>
          <strong>The experience</strong>
          <span>React · TypeScript</span>
        </div>
        <svg
          width="34"
          height="30"
          viewBox="0 0 34 30"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="30" height="24" rx="2" />
          <path d="M2 10h30M8 7h1m3 0h1" />
        </svg>
      </div>
      <div className="layer-link" aria-hidden="true" />
      <div className="hero-layer">
        <span className="layer-num">02</span>
        <div>
          <strong>The logic</strong>
          <span>.NET · APIs · AI integrations</span>
        </div>
        <svg
          width="34"
          height="30"
          viewBox="0 0 34 30"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="m11 6-8 9 8 9m12-18 8 9-8 9M20 2l-6 26" />
        </svg>
      </div>
      <div className="layer-link" aria-hidden="true" />
      <div className="hero-layer">
        <span className="layer-num">03</span>
        <div>
          <strong>The foundation</strong>
          <span>PostgreSQL · AWS · Kubernetes</span>
        </div>
        <svg
          width="34"
          height="30"
          viewBox="0 0 34 30"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="17" cy="6" rx="13" ry="4" />
          <path d="M4 6v17c0 6 26 6 26 0V6M4 14c0 6 26 6 26 0" />
        </svg>
      </div>
      <figcaption>From first requirement to production.</figcaption>
    </figure>
  );
}
