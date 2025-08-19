import axios, { AxiosInstance } from 'axios';
import { Issue, IssueFilters, PageResponse, IssueStats } from '../types/issue';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          // eslint-disable-next-line no-console
          console.error('API Error:', error.response.data);
        } else if (error.request) {
          // eslint-disable-next-line no-console
          console.error('Network Error:', error.request);
        } else {
          // eslint-disable-next-line no-console
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async getIssues(
    filters: IssueFilters = {},
    page = 0,
    size = 20
  ): Promise<PageResponse<Issue>> {
    const params: any = {
      page,
      size,
    };

    if (filters.difficulty && filters.difficulty.length > 0) {
      params.difficulty = filters.difficulty.join(',');
    }

    if (filters.language && filters.language.length > 0) {
      params.language = filters.language.join(',');
    }

    if (filters.maxHours) {
      params.maxHours = filters.maxHours;
    }

    const response = await this.api.get<PageResponse<Issue>>('/issues', { params });
    return response.data;
  }

  async getStats(): Promise<IssueStats> {
    const response = await this.api.get<IssueStats>('/issues/stats');
    return response.data;
  }

  async getLanguages(): Promise<string[]> {
    const response = await this.api.get<string[]>('/languages');
    return response.data;
  }

  async refreshIssues(): Promise<{ message: string }> {
    const response = await this.api.post('/issues/refresh');
    return response.data;
  }

  async checkHealth(): Promise<{ status: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();

// Utility functions
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};