import React from 'react';
import type { Project } from '../types';

interface Props {
  project: Project;
}

export const ProjectCard: React.FC<Props> = ({ project }) => (
  <div className="project-card">
    <div className="project-tags">
      {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </div>
);
