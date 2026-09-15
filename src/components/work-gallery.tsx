'use client';
import { useState } from 'react';
import { categories, projects } from '@/data/projects';
import { ProjectCard } from './project-card';
export function WorkGallery() {
  const [category, setCategory] = useState<string>('All work');
  const visible =
    category === 'All work' ? projects : projects.filter((p) => p.category === category);
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        <span className="filter-status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
