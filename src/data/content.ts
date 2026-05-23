import type { Profile, Experience, Project } from '../types';

export const profile: Profile = {
  name: "John Guidry",
  headline: "Full-Stack Engineer & Database Specialist",
  tagline: "Bridging enterprise reliability with modern AI automation.",
  subheadline: "Currently evolving data workflows into agentic systems.",
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
      "Integrating AI-assisted development into ETL workflows to accelerate data pipeline modernization.",
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
  },
  {
    id: "pcg",
    company: "Public Consulting Group (PCG)",
    role: "Software Engineer II",
    period: "Jun 2015 – Aug 2019",
    location: "Blacksburg, VA",
    summary: [
      "Developed SQL scripts for complex data migrations and reporting.",
      "Led SDLC processes for multiple software initiatives.",
      "Enhanced software performance through query optimization and code refactoring.",
      "Collaborated with cross-functional teams to deliver high-quality solutions."
    ],
    deepDive: "Focused on SDLC leadership and performance optimization within a public sector consulting context. Managed large-scale data operations and coordinated between technical and non-technical stakeholders."
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
  },
  {
    id: "covid_bot",
    title: "COVID19_BOT",
    description: "Python Discord Bot that scrapes real-time COVID-19 case data from the NYT dashboard.",
    tags: ["Python", "Scraping", "Discord"],
    githubUrl: "https://github.com/JohnGuidry/COVID19_BOT",
    deepDive: "A Discord bot using async/await event handlers and HTTP scraping (BeautifulSoup4). Features formatted state-by-state tables and numeric filter arguments. Demonstrates practical async framework and environment variable handling."
  },
  {
    id: "aws_site",
    title: "Personal ASP.NET Site",
    description: "Personal website built in ASP.NET Core with live SQL database connectivity, deployed to AWS.",
    tags: ["C#", ".NET", "AWS", "SQL"],
    githubUrl: "https://github.com/JohnGuidry/JohnGuidrySite",
    deepDive: "Full-stack project featuring a C# backend (Razor Pages) and SQL Server integration. Orchestrated a two-stage database lifecycle: local development migrated to Amazon RDS. Deployment managed via AWS Elastic Beanstalk with .ebextensions configuration."
  }
];
