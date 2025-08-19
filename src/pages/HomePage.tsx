import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button, Chip, Card } from '../components/ui';
import IssueCard from '../components/IssueCard';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';
import { Issue, Project } from '../types';

const HomePage: React.FC = () => {
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);

  const techStacks = [
    'JavaScript', 'Python', 'Java', 'Go', 'TypeScript', 'React', 'Vue', 'Angular'
  ];

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Mock data for demonstration
  const quickStartIssues: Issue[] = [
    {
      id: '1',
      title: 'Fix typo in documentation',
      projectName: 'react',
      projectOwner: 'facebook',
      difficulty: 'EASY',
      estimatedHours: 0.5,
      labels: ['documentation', 'good first issue'],
      createdAt: '2024-01-15T10:30:00Z',
      htmlUrl: 'https://github.com/facebook/react/issues/1',
      state: 'open'
    },
    {
      id: '2',
      title: 'Add missing unit tests for utility functions',
      projectName: 'vue',
      projectOwner: 'vuejs',
      difficulty: 'MEDIUM',
      estimatedHours: 2,
      labels: ['testing', 'beginner-friendly'],
      createdAt: '2024-01-14T14:20:00Z',
      htmlUrl: 'https://github.com/vuejs/vue/issues/2',
      state: 'open'
    },
    {
      id: '3',
      title: 'Improve error message clarity',
      projectName: 'node',
      projectOwner: 'nodejs',
      difficulty: 'BEGINNER',
      estimatedHours: 1,
      labels: ['error-handling', 'good first issue'],
      createdAt: '2024-01-13T09:15:00Z',
      htmlUrl: 'https://github.com/nodejs/node/issues/3',
      state: 'open'
    }
  ];

  const trendingProjects: Project[] = [
    {
      id: 1,
      owner: 'microsoft',
      name: 'vscode',
      description: 'Visual Studio Code - 코드 에디터',
      stars: 157000,
      forks: 28000,
      language: 'TypeScript',
      topics: ['editor', 'typescript', 'electron'],
      friendlinessScore: 95,
      openIssuesCount: 8234,
      htmlUrl: 'https://github.com/microsoft/vscode',
      createdAt: '2015-09-03T20:17:00Z',
      updatedAt: '2024-01-15T18:30:00Z',
      responseTime: 2.5,
      prAcceptanceRate: 85,
      hasDocumentation: true,
      communityActivity: 90
    },
    {
      id: 2,
      owner: 'vercel',
      name: 'next.js',
      description: 'React 프레임워크',
      stars: 115000,
      forks: 25000,
      language: 'JavaScript',
      topics: ['react', 'nextjs', 'framework'],
      friendlinessScore: 92,
      openIssuesCount: 1567,
      htmlUrl: 'https://github.com/vercel/next.js',
      createdAt: '2016-10-05T16:20:00Z',
      updatedAt: '2024-01-15T17:45:00Z',
      responseTime: 1.8,
      prAcceptanceRate: 78,
      hasDocumentation: true,
      communityActivity: 88
    },
    {
      id: 3,
      owner: 'tailwindlabs',
      name: 'tailwindcss',
      description: '유틸리티 우선 CSS 프레임워크',
      stars: 75000,
      forks: 3800,
      language: 'CSS',
      topics: ['css', 'tailwind', 'utility-first'],
      friendlinessScore: 89,
      openIssuesCount: 234,
      htmlUrl: 'https://github.com/tailwindlabs/tailwindcss',
      createdAt: '2017-10-31T12:00:00Z',
      updatedAt: '2024-01-15T16:20:00Z',
      responseTime: 3.2,
      prAcceptanceRate: 82,
      hasDocumentation: true,
      communityActivity: 85
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              당신의 첫 오픈소스 기여,<br />
              지금 시작하세요
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              초보자도 쉽게 시작할 수 있는 Good First Issue를 찾아드립니다
            </p>
            
            {/* Tech Stack Selector */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8 animate-slide-up">
              <p className="text-sm mb-4">관심있는 기술을 선택하세요</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {techStacks.map(tech => (
                  <Chip
                    key={tech}
                    selectable
                    selected={selectedTechStack.includes(tech)}
                    onClick={() => handleTechStackToggle(tech)}
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>
            
            <Link to="/issues">
              <Button size="lg" className="animate-slide-up">
                프로젝트 추천받기 <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Issues */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              30분 안에 완료 가능한 이슈
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              처음 시작하는 분들을 위해 쉽고 빠르게 완료할 수 있는 이슈들을 모았습니다
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {quickStartIssues.map((issue, index) => (
              <AnimatedSection 
                key={issue.id} 
                animation="slide-up" 
                delay={index * 100}
              >
                <IssueCard issue={issue} />
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center" animation="slide-up">
            <Link to="/issues">
              <Button variant="outline">
                더 많은 이슈 보기 <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Trending Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              이번 주 인기 프로젝트
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              개발자들이 가장 많이 기여하고 있는 프로젝트들을 확인해보세요
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6">
            {trendingProjects.map((project, index) => (
              <AnimatedSection 
                key={project.id} 
                animation="slide-up" 
                delay={index * 150}
              >
                <Link to={`/project/${project.owner}/${project.name}`}>
                  <ProjectCard project={project} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              어떻게 시작하나요?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              3단계로 간단하게 오픈소스 기여를 시작할 수 있습니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">기술 스택 선택</h3>
              <p className="text-gray-600">
                익숙한 프로그래밍 언어나 프레임워크를 선택하세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">맞춤 이슈 추천</h3>
              <p className="text-gray-600">
                난이도와 예상 시간을 고려한 맞춤형 이슈를 추천받으세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">첫 PR 성공</h3>
              <p className="text-gray-600">
                상세한 가이드와 함께 첫 번째 Pull Request를 성공시키세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            수천 개의 프로젝트에서 당신을 기다리고 있습니다
          </p>
          <Link to="/issues">
            <Button variant="secondary" size="lg">
              이슈 탐색하기 <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;