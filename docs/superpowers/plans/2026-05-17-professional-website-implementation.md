# Professional "Evolver" Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page interactive professional site for John Guidry that showcases his career transition from a Senior Database Specialist to an AI Agent Developer.

**Architecture:** Single-page React (TypeScript) application using Vanilla CSS for styling. Features a vertical interactive timeline, a project grid, and a slide-out drawer for technical deep dives.

**Tech Stack:** React, TypeScript, Vite, Vanilla CSS.

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Initialize Vite project**

Run: `npm create vite@latest . -- --template react-ts`

- [ ] **Step 2: Install basic dependencies**

Run: `npm install`

- [ ] **Step 3: Set up global styles and CSS variables**

Create `src/index.css`:
```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-primary: #38bdf8;
  --accent-secondary: #0ea5e9;
  --border-color: #334155;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', monospace;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.5;
}

h1, h2, h3 { color: var(--text-primary); margin-top: 0; }
a { color: var(--accent-primary); text-decoration: none; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
```

- [ ] **Step 4: Verify basic app runs**

Run: `npm run dev` (Verify placeholder content shows)

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: initial vite setup with theme variables"
```

---

### Task 2: Data & Types

**Files:**
- Create: `src/types.ts`, `src/data/content.ts`

- [ ] **Step 1: Define TypeScript interfaces**

Create `src/types.ts`:
```typescript
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string[];
  deepDive?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  deepDive: string;
}

export interface Profile {
  name: string;
  headline: string;
  subheadline: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}
```

- [ ] **Step 2: Create mock data from CV/Digest**

Create `src/data/content.ts`:
```typescript
import { Profile, Experience, Project } from '../types';

export const profile: Profile = {
  name: "John Guidry",
  headline: "Full-Stack Engineer & Database Specialist",
  subheadline: "Bridging enterprise reliability with modern AI automation. Currently evolving data workflows into agentic systems.",
  email: "john.guidry92@gmail.com",
  linkedin: "https://www.linkedin.com/in/jrguidry/",
  github: "https://github.com/JohnGuidry",
  location: "Port Townsend, Washington"
};

export const experiences: Experience[] = [
  {
    id: "kinder",
    company: "KinderSystems",
    role: "Database Developer II",
    period: "Oct 2024 – Present",
    location: "Remote",
    summary: [
      "Maintained and enhanced ETL processes including SSIS packages and stored procedures.",
      "Improved customer satisfaction through direct technical support and clear communication.",
      "Analyzed and resolved complex data performance issues."
    ],
    deepDive: "Focus on mission-critical ETL pipeline maintenance for state-regulated child care data. Bridges the gap between deep technical implementation and business value."
  },
  {
    id: "secu",
    company: "State Employees Credit Union",
    role: "Software Engineer II",
    period: "Aug 2019 – Nov 2023",
    location: "Raleigh, NC",
    summary: [
      "Led the development of a comprehensive SDLC for facility projects.",
      "Optimized project efficiency through SQL Agent Jobs and Always On AG management.",
      "Transitioned projects from Bugzilla to Jira for streamlined tracking."
    ],
    deepDive: "Managed high-availability SQL Server environments using Always On Availability Groups. Led compliance-driven releases and runbook documentation for a Top-10 US Credit Union."
  }
];

export const projects: Project[] = [
  {
    id: "wam",
    title: "WoW Addon Manager",
    description: "Python CLI tool for managing addons on Linux using CurseForge and GitHub APIs.",
    tags: ["Python", "API", "CLI"],
    githubUrl: "https://github.com/JohnGuidry/wow-addon-manager",
    deepDive: "Features a dual-layered management system (local .toc parsing + JSON registry) to handle complex multi-folder addons. Automated updates and installations via third-party APIs."
  },
  {
    id: "beat",
    title: "Beat Tracking Android App",
    description: "Academic research project using signal processing to match exercise tempo with music BPM.",
    tags: ["Java", "Android", "Research"],
    githubUrl: "https://github.com/JohnGuidry/Acc",
    deepDive: "CCSC-SE finalist. Implemented magnitude calculation from 3-axis accelerometer data and a moving threshold algorithm for real-time step detection and BPM matching."
  }
];
```

- [ ] **Step 3: Commit**

```bash
git add src/types.ts src/data/content.ts
git commit -m "feat: add typed content from cv and digest"
```

---

### Task 3: Layout & Hero

**Files:**
- Modify: `src/App.tsx`, `src/index.css`
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Implement Hero component**

Create `src/components/Hero.tsx`:
```tsx
import React from 'react';
import { profile } from '../data/content';

export const Hero: React.FC = () => (
  <section className="hero">
    <div className="container">
      <h1>{profile.name}</h1>
      <p className="headline">{profile.headline}</p>
      <p className="subheadline">{profile.subheadline}</p>
      <div className="contact-links">
        <a href={profile.linkedin} target="_blank">LinkedIn</a>
        <a href={profile.github} target="_blank">GitHub</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </div>
  </section>
);
```

- [ ] **Step 2: Add Hero styling**

Modify `src/index.css`:
```css
.hero {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, #1e293b 100%);
  border-bottom: 1px solid var(--border-color);
}
.hero h1 { font-size: 3.5rem; margin-bottom: 0.5rem; }
.hero .headline { font-size: 1.5rem; color: var(--accent-primary); font-family: var(--font-mono); margin-bottom: 1rem; }
.hero .subheadline { font-size: 1.25rem; color: var(--text-secondary); max-width: 700px; margin-bottom: 2rem; }
.contact-links { display: flex; gap: 1.5rem; }
.contact-links a { font-weight: 600; border-bottom: 1px solid transparent; }
.contact-links a:hover { border-color: var(--accent-primary); }
```

- [ ] **Step 3: Update App entry**

Modify `src/App.tsx`:
```tsx
import React from 'react';
import { Hero } from './components/Hero';
import './index.css';

function App() {
  return (
    <main>
      <Hero />
      {/* Other sections will go here */}
    </main>
  );
}

export default App;
```

- [ ] **Step 4: Verify hero renders**

Check dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx src/index.css
git commit -m "feat: implement hero section with transitions"
```

---

### Task 4: Interactive Timeline

**Files:**
- Create: `src/components/Timeline.tsx`, `src/components/ExperienceCard.tsx`
- Modify: `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Implement ExperienceCard**

Create `src/components/ExperienceCard.tsx`:
```tsx
import React from 'react';
import { Experience } from '../types';

interface Props {
  exp: Experience;
  onDeepDive: (id: string) => void;
}

export const ExperienceCard: React.FC<Props> = ({ exp, onDeepDive }) => (
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
```

- [ ] **Step 2: Implement Timeline**

Create `src/components/Timeline.tsx`:
```tsx
import React from 'react';
import { experiences } from '../data/content';
import { ExperienceCard } from './ExperienceCard';

export const Timeline: React.FC<{onDeepDive: (id: string) => void}> = ({ onDeepDive }) => (
  <section id="experience" className="container section">
    <h2>Experience</h2>
    <div className="timeline">
      {experiences.map(exp => (
        <ExperienceCard key={exp.id} exp={exp} onDeepDive={onDeepDive} />
      ))}
    </div>
  </section>
);
```

- [ ] **Step 3: Add Timeline styling**

Modify `src/index.css`:
```css
.section { padding: 4rem 0; }
.section h2 { font-size: 2rem; margin-bottom: 2rem; border-bottom: 2px solid var(--accent-primary); width: fit-content; }

.timeline { display: flex; flex-direction: column; gap: 2rem; position: relative; }
.experience-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
}
.experience-card:hover { transform: translateX(5px); border-color: var(--accent-primary); }
.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; }
.summary { margin: 0 0 1.5rem 0; padding-left: 1.25rem; color: var(--text-secondary); }
.btn-deep-dive {
  background: transparent;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}
.btn-deep-dive:hover { background: var(--accent-primary); color: var(--bg-primary); }
```

- [ ] **Step 4: Update App**

Modify `src/App.tsx`:
```tsx
import React from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
// ... existing imports

function App() {
  const handleDeepDive = (id: string) => {
    console.log("Deep dive for:", id);
  };

  return (
    <main>
      <Hero />
      <Timeline onDeepDive={handleDeepDive} />
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Timeline.tsx src/components/ExperienceCard.tsx src/App.tsx src/index.css
git commit -m "feat: implement interactive timeline with hover effects"
```

---

### Task 5: Project Grid

**Files:**
- Create: `src/components/ProjectGrid.tsx`, `src/components/ProjectCard.tsx`
- Modify: `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Implement ProjectCard**

Create `src/components/ProjectCard.tsx`:
```tsx
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
```

- [ ] **Step 2: Implement ProjectGrid**

Create `src/components/ProjectGrid.tsx`:
```tsx
import React from 'react';
import { projects } from '../data/content';
import { ProjectCard } from './ProjectCard';

export const ProjectGrid: React.FC<{onDeepDive: (id: string) => void}> = ({ onDeepDive }) => (
  <section id="projects" className="container section">
    <h2>Projects</h2>
    <div className="grid">
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} onDeepDive={onDeepDive} />
      ))}
    </div>
  </section>
);
```

- [ ] **Step 3: Add Grid styling**

Modify `src/index.css`:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.project-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
}
.project-card:hover { border-color: var(--accent-primary); box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1); }
.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: #334155;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}
.project-card h3 { margin: 1rem 0 0.5rem 0; }
.project-card p { color: var(--text-secondary); font-size: 0.95rem; }
.project-footer { margin-top: 1.5rem; color: var(--accent-primary); font-size: 0.85rem; font-weight: bold; }
```

- [ ] **Step 4: Update App**

Modify `src/App.tsx`:
```tsx
// ... imports
import { ProjectGrid } from './components/ProjectGrid';

function App() {
  // ... handleDeepDive
  return (
    <main>
      <Hero />
      <Timeline onDeepDive={handleDeepDive} />
      <ProjectGrid onDeepDive={handleDeepDive} />
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectGrid.tsx src/components/ProjectCard.tsx src/App.tsx src/index.css
git commit -m "feat: implement project grid with card hover effects"
```

---

### Task 6: Deep Dive Drawer

**Files:**
- Create: `src/components/Drawer.tsx`
- Modify: `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Implement Drawer component**

Create `src/components/Drawer.tsx`:
```tsx
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const Drawer: React.FC<Props> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="drawer-body">
          {content}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Add Drawer styling**

Modify `src/index.css`:
```css
.drawer-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: flex-end;
  z-index: 1000;
}
.drawer-content {
  width: 100%; max-width: 500px; height: 100%;
  background: var(--bg-primary);
  padding: 3rem 2rem;
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  animation: slideIn 0.3s ease-out;
  position: relative;
}
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
.close-btn {
  position: absolute; top: 1rem; right: 1rem;
  background: transparent; border: none; color: var(--text-primary);
  font-size: 2rem; cursor: pointer;
}
.drawer-body { line-height: 1.8; color: var(--text-secondary); font-size: 1.1rem; }
```

- [ ] **Step 3: Integrate Drawer into App state**

Modify `src/App.tsx`:
```tsx
import React, { useState } from 'react';
import { experiences, projects } from './data/content';
import { Drawer } from './components/Drawer';
// ... imports

function App() {
  const [drawerData, setDrawerData] = useState<{title: string, content: string} | null>(null);

  const handleDeepDive = (id: string) => {
    const item = [...experiences, ...projects].find(i => i.id === id);
    if (item) {
      setDrawerData({
        title: 'company' in item ? `${item.role} @ ${item.company}` : item.title,
        content: item.deepDive || ""
      });
    }
  };

  return (
    <main>
      <Hero />
      <Timeline onDeepDive={handleDeepDive} />
      <ProjectGrid onDeepDive={handleDeepDive} />
      <Drawer 
        isOpen={!!drawerData} 
        onClose={() => setDrawerData(null)}
        title={drawerData?.title || ""}
        content={drawerData?.content || ""}
      />
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Drawer.tsx src/App.tsx src/index.css
git commit -m "feat: add interactive slide-out drawer for technical proof"
```

---

### Task 7: Final Polish & Verification

**Files:**
- Modify: `src/index.css`, `src/App.tsx`

- [ ] **Step 1: Add smooth scrolling and final layout tweaks**

Modify `src/index.css`:
```css
html { scroll-behavior: smooth; }
.section:nth-child(even) { background: #111827; } /* Subtle section alternating */
```

- [ ] **Step 2: Run build to verify static output**

Run: `npm run build`
Expected: `dist/` directory created with no errors.

- [ ] **Step 3: Run final lint/type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: final polish and build verification"
```
