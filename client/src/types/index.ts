export interface Project {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  status: 'completed' | 'in-progress';
  order: number;
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategories {
  languages: Skill[];
  backend: Skill[];
  ml: Skill[];
  frontend: Skill[];
  databases: Skill[];
  tools: Skill[];
}

export interface Experience {
  _id: string;
  title: string;
  organization: string;
  period: string;
  type: 'leadership' | 'academic' | 'creative' | 'technical';
  description: string;
  impact: string[];
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
