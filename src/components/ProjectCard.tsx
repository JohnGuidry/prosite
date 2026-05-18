import React from 'react';
import { Project } from '../types';

interface Props {
  project: Project;
  onDeepDive: (id: string) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onDeepDive }) => (
  <div className="project-card" onClick={() => onDeepDive(project.id)}>
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
