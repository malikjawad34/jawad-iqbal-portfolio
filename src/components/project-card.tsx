import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Arrow, Tags } from './ui';
import { Architecture } from './architecture';
export function ProjectCard({
  project,
  index = 0,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <Link
        className="project-visual"
        href={`/work/${project.slug}/`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Architecture project={project} compact />
      </Link>
      <div className="project-copy">
        <div className="project-eyebrow">
          <span>
            {String(index + 1).padStart(2, '0')} / {project.eyebrow}
          </span>
          <span className="project-context">{project.context}</span>
        </div>
        <h3>
          <Link href={`/work/${project.slug}/`}>
            {project.name}
            <Arrow diagonal />
          </Link>
        </h3>
        <p>{project.description}</p>
        <Tags items={project.technologies.slice(0, 4)} />
        <Link className="text-link" href={`/work/${project.slug}/`}>
          Explore case study <Arrow />
        </Link>
      </div>
    </article>
  );
}
