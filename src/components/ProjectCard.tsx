import React from 'react';
import type { Project } from '../types';

const tagColors: Record<string, string> = {
  Python: '#f7df1e',
  API: '#38bdf8',
  CLI: '#4ade80',
  Java: '#ed8b00',
  Android: '#3ddc84',
  Research: '#c084fc',
  Scraping: '#fb923c',
  Discord: '#5865f2',
  'C#': '#9b4f96',
  '.NET': '#512bd4',
  AWS: '#ff9900',
  SQL: '#00758f',
};

interface Props {
  project: Project;
}

export const ProjectCard: React.FC<Props> = ({ project }) => (
  <a
    className="project-card"
    href={project.githubUrl || undefined}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="project-tags">
      {project.tags.map(tag => (
        <span
          key={tag}
          className="tag"
          style={{ '--tag-color': tagColors[tag] ?? '#94a3b8' } as React.CSSProperties}
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="project-card-body">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  </a>
);