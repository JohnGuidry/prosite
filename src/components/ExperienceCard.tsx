import React from 'react';
import type { Experience } from '../types';

interface Props {
  exp: Experience;
}

export const ExperienceCard: React.FC<Props> = ({ exp }) => (
  <div className="experience-card">
    <div className="card-header">
      <h3>{exp.role} @ {exp.company}</h3>
      <span className="period">{exp.period}</span>
    </div>
    <ul className="summary">
      {exp.summary.map((point, i) => <li key={i}>{point}</li>)}
    </ul>
  </div>
);
