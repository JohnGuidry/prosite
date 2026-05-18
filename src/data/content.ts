import type { Profile, Experience, Project } from '../types';

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
