import type { FC } from 'react';
import { experiences } from '../data/content';
import { ExperienceCard } from './ExperienceCard';

export const Timeline: FC<{onDeepDive: (id: string) => void}> = ({ onDeepDive }) => (
  <section id="experience" className="container section">
    <h2>Experience</h2>
    <div className="timeline">
      {experiences.map(exp => (
        <ExperienceCard key={exp.id} exp={exp} onDeepDive={onDeepDive} />
      ))}
    </div>
  </section>
);
