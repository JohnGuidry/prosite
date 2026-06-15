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
    period: "Oct 2024 – June 2026",
    location: "Remote",
    summary: [
      "Integrating AI-assisted development into ETL workflows to accelerate data pipeline modernization.",
      "Built ETL pipelines connecting client systems via SSIS and stored procedures, with integration points through customer-facing APIs.",
      "Improved customer satisfaction through direct technical support — diagnosing data issues and delivering clear resolutions.",
      "Resolved complex data performance issues through systematic query analysis and targeted optimization."
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
      "Managed high-availability SQL Server environments using Always On Availability Groups for a Top-10 US credit union.",
      "Led compliance-driven SDLC for facility projects — ensuring audit readiness across all regulatory releases.",
      "Built REST API integrations and automated database maintenance through SQL Agent Jobs and performance monitoring.",
      "Standardized project tracking by migrating from Bugzilla to Jira, improving cross-team visibility."
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
      "Led end-to-end SDLC for multiple state-level software initiatives — managing requirements, releases, and cross-team coordination.",
      "Built SQL Server data migration and reporting pipelines processing large-scale datasets for public sector clients.",
      "Reduced query execution times through systematic performance tuning: indexing, query refactoring, and stored procedure optimization.",
      "Served as technical liaison between engineering teams and government stakeholders, translating business needs into technical requirements."
    ],
    deepDive: "Focused on SDLC leadership and performance optimization within a public sector consulting context. Managed large-scale data operations and coordinated between technical and non-technical stakeholders."
  }
];

export const projects: Project[] = [
  {
    id: "prosite",
    title: "Prosite — Portfolio & Pi-Hole Infrastructure",
    description: "React/Vite portfolio self-hosted on a Raspberry Pi behind Cloudflare Tunnel with Pi-hole DNS and Nginx reverse proxy.",
    tags: ["React", "TypeScript", "Nginx", "Cloudflare"],
    githubUrl: "https://github.com/JohnGuidry/prosite",
    deepDive: "Full-stack infrastructure project: React/Vite SPA deployed via rsync to a Raspberry Pi running Nginx + Pi-hole. Secured through Cloudflare Tunnel with rate-limited API, security headers, and automated DNS-level ad blocking. Demonstrates self-hosting, DNS management, and infrastructure-as-code discipline."
  },
  {
    id: "wam",
    title: "WoW Addon Manager",
    description: "Python CLI tool for managing addons on Linux using CurseForge and GitHub APIs.",
    tags: ["Python", "API", "CLI"],
    githubUrl: "https://github.com/JohnGuidry/wow-addon-manager",
    deepDive: "Features a dual-layered management system (local .toc parsing + JSON registry) to handle complex multi-folder addons. Automated updates and installations via third-party APIs."
  },
  {
    id: "aws_site",
    title: "Personal ASP.NET Site",
    description: "Personal website built in ASP.NET Core with live SQL database connectivity, deployed to AWS.",
    tags: ["C#", ".NET", "AWS", "SQL"],
    githubUrl: "https://github.com/JohnGuidry/JohnGuidrySite",
    deepDive: "Full-stack project featuring a C# backend (Razor Pages) and SQL Server integration. Orchestrated a two-stage database lifecycle: local development migrated to Amazon RDS. Deployment managed via AWS Elastic Beanstalk with .ebextensions configuration."
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
    id: "beat",
    title: "Beat Tracking Android App",
    description: "Academic research project using signal processing to match exercise tempo with music BPM.",
    tags: ["Java", "Android", "Research"],
    githubUrl: "https://github.com/JohnGuidry/Acc",
    deepDive: "CCSC-SE finalist. Implemented magnitude calculation from 3-axis accelerometer data and a moving threshold algorithm for real-time step detection and BPM matching."
  }
];
