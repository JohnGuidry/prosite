import React from 'react';
import { profile } from '../data/content';

export const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="container navbar-inner">
      <a href="#" className="navbar-logo" aria-label="Home">
        JG
      </a>
      <div className="navbar-links">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <div className="navbar-social">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Contact</a>
        </div>
      </div>
    </div>
  </nav>
);