import React from 'react';
import { projects } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';

export const ProjectGrid: React.FC = () => (
  <section id="projects" className="container section">
    <h2>Projects</h2>
    <div className="grid reveal-stagger">
      {projects.map(p => (
        <Reveal key={p.id}><ProjectCard project={p} /></Reveal>
      ))}
    </div>
  </section>
);