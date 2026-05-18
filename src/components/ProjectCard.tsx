import React from 'react';
import type { Project } from '../types';

interface Props {
  project: Project;
  onDeepDive: (id: string) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onDeepDive }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDeepDive(project.id);
    }
  };

  return (
    <div 
      className="project-card" 
      onClick={() => onDeepDive(project.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <div className="project-tags">
        {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-footer">
        <span>View Details →</span>
      </div>
    </div>
  );
};
