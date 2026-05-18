import React from 'react';
import { projects } from '../data/content';
import { ProjectCard } from './ProjectCard';

export const ProjectGrid: React.FC = () => (
  <section id="projects" className="container section">
    <h2>Projects</h2>
    <div className="grid">
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  </section>
);
