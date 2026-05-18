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
