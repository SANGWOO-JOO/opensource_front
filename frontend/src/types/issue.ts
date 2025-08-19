export interface Issue {
  id: number;
  githubId: string;
  projectOwner: string;
  projectName: string;
  title: string;
  htmlUrl: string;
  difficulty: 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';
  estimatedMinutes: number;
  labels: string[];
  createdAt: string;
  fetchedAt: string;
}

export interface IssueFilters {
  difficulty?: string[];
  language?: string[];
  maxHours?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface IssueStats {
  totalIssues: number;
  lastUpdated: string;
  languageDistribution?: Record<string, number>;
  difficultyDistribution?: Record<string, number>;
}

export type Difficulty = {
  value: 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';
  label: string;
  color: string;
};

export type Language = {
  value: string;
  label: string;
  count?: number;
};

export type TimeEstimate = {
  value: number;
  label: string;
};