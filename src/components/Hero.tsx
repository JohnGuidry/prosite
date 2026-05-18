import type { FC } from 'react';
import { profile } from '../data/content';

export const Hero: FC = () => (
  <section className="hero">
    <div className="container">
      <h1>{profile.name}</h1>
      <p className="headline">{profile.headline}</p>
      <p className="subheadline">{profile.subheadline}</p>
      <div className="contact-links">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </div>
  </section>
);
