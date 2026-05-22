import React from 'react';
import { profile } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:john.guidry92@gmail.com">Email</a>
          </div>
          <div className="footer-info">
            <p>Last Updated: {__BUILD_TIME__}</p>
            <p>&copy; {new Date().getFullYear()} {profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
