import type { FC } from 'react';
import type { Experience } from '../types';

interface Props {
  exp: Experience;
  onDeepDive: (id: string) => void;
}

export const ExperienceCard: FC<Props> = ({ exp, onDeepDive }) => (
  <div className="experience-card">
    <div className="card-header">
      <h3>{exp.role} @ {exp.company}</h3>
      <span className="period">{exp.period}</span>
    </div>
    <ul className="summary">
      {exp.summary.map((point, i) => <li key={i}>{point}</li>)}
    </ul>
    {exp.deepDive && (
      <button onClick={() => onDeepDive(exp.id)} className="btn-deep-dive">
        Technical Deep Dive →
      </button>
    )}
  </div>
);
