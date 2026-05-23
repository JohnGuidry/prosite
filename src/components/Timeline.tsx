import React from 'react';
import { experiences } from '../data/content';
import { ExperienceCard } from './ExperienceCard';
import { Reveal } from './Reveal';

export const Timeline: React.FC = () => (
  <section id="experience" className="container section">
    <h2>Experience</h2>
    <div className="timeline reveal-stagger">
      {experiences.map(exp => (
        <Reveal key={exp.id}><ExperienceCard exp={exp} /></Reveal>
      ))}
    </div>
  </section>
);