export interface Issue {
  id: string;
  title: string;
  projectName: string;
  projectOwner: string;
  difficulty: 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  estimatedHours: number;
  labels: string[];
  createdAt: string;
  htmlUrl: string;
  description?: string;
  assignee?: string;
  state: 'open' | 'closed';
}

export interface Project {
  id: number;
  owner: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  friendlinessScore: number;
  openIssuesCount: number;
  avatarUrl?: string;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
  responseTime: number;
  prAcceptanceRate: number;
  hasDocumentation: boolean;
  communityActivity: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  preferences: {
    languages: string[];
    difficulty: string[];
    estimatedTime: string[];
  };
}

export interface FilterOptions {
  difficulty: string[];
  estimatedTime: string[];
  languages: string[];
  labels: string[];
  sortBy: 'newest' | 'oldest' | 'difficulty' | 'popularity';
}

export interface FriendlinessMetrics {
  overall: number;
  responseTime: number;
  prAcceptanceRate: number;
  documentation: number;
  communityActivity: number;
}