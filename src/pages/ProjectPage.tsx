import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  StarIcon, 
  EyeIcon, 
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Button, Badge, Card } from '../components/ui';
import FriendlinessScore from '../components/FriendlinessScore';
import IssueCard from '../components/IssueCard';
import { Project, Issue, FriendlinessMetrics } from '../types';
import { formatNumber } from '../utils/format';

const ProjectPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - in real app, this would be fetched based on owner/repo
  const project: Project = {
    id: 1,
    owner: owner || 'microsoft',
    name: repo || 'vscode',
    description: 'Visual Studio Code는 Microsoft에서 개발한 무료 오픈 소스 코드 에디터입니다. Windows, macOS, Linux에서 실행되며 디버깅, 임베디드 Git 컨트롤, 구문 강조 표시, 인텔리전트 코드 완성, 스니펫 및 코드 리팩터링을 지원합니다.',
    stars: 157000,
    forks: 28000,
    language: 'TypeScript',
    topics: ['editor', 'typescript', 'electron', 'vscode', 'ide'],
    friendlinessScore: 95,
    openIssuesCount: 8234,
    htmlUrl: `https://github.com/${owner}/${repo}`,
    createdAt: '2015-09-03T20:17:00Z',
    updatedAt: '2024-01-15T18:30:00Z',
    responseTime: 2.5,
    prAcceptanceRate: 85,
    hasDocumentation: true,
    communityActivity: 90
  };

  const friendlinessMetrics: FriendlinessMetrics = {
    overall: 95,
    responseTime: 88,
    prAcceptanceRate: 85,
    documentation: 98,
    communityActivity: 90
  };

  const availableIssues: Issue[] = [
    {
      id: '1',
      title: 'Fix syntax highlighting for TypeScript decorators',
      projectName: project.name,
      projectOwner: project.owner,
      difficulty: 'EASY',
      estimatedHours: 2,
      labels: ['syntax-highlighting', 'typescript', 'good first issue'],
      createdAt: '2024-01-15T10:30:00Z',
      htmlUrl: `${project.htmlUrl}/issues/1`,
      state: 'open'
    },
    {
      id: '2',
      title: 'Add missing translations for Korean locale',
      projectName: project.name,
      projectOwner: project.owner,
      difficulty: 'BEGINNER',
      estimatedHours: 1,
      labels: ['i18n', 'korean', 'help wanted'],
      createdAt: '2024-01-14T14:20:00Z',
      htmlUrl: `${project.htmlUrl}/issues/2`,
      state: 'open'
    },
    {
      id: '3',
      title: 'Improve performance of large file handling',
      projectName: project.name,
      projectOwner: project.owner,
      difficulty: 'HARD',
      estimatedHours: 8,
      labels: ['performance', 'file-handling'],
      createdAt: '2024-01-13T09:15:00Z',
      htmlUrl: `${project.htmlUrl}/issues/3`,
      state: 'open'
    }
  ];

  const tabs = [
    { id: 'all', label: '전체', count: availableIssues.length },
    { id: 'beginner', label: '입문', count: availableIssues.filter(i => i.difficulty === 'BEGINNER').length },
    { id: 'easy', label: '초급', count: availableIssues.filter(i => i.difficulty === 'EASY').length },
    { id: 'medium', label: '중급', count: availableIssues.filter(i => i.difficulty === 'MEDIUM').length },
  ];

  const filteredIssues = activeTab === 'all' 
    ? availableIssues 
    : availableIssues.filter(issue => 
        issue.difficulty.toLowerCase() === activeTab
      );

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img 
                src={`https://github.com/${project.owner}.png?size=80`}
                alt={project.owner}
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {project.owner}/{project.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {project.description}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <EyeIcon className="w-4 h-4 mr-2" />
                Watch
              </Button>
              <Button variant="outline" size="sm">
                <StarIconSolid className="w-4 h-4 mr-2 text-yellow-500" />
                Star
              </Button>
              <Button 
                size="sm"
                onClick={() => window.open(project.htmlUrl, '_blank')}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                GitHub에서 보기
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{formatNumber(project.stars)}</span>
              <span className="text-gray-500">stars</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="font-medium">{project.language}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="font-medium">{formatNumber(project.openIssuesCount)}</span>
              <span className="text-gray-500">open issues</span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {project.topics.map(topic => (
              <Badge key={topic} className="bg-primary-50 text-primary-700">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Issues Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  기여 가능한 이슈
                </h2>
                <Link to="/issues">
                  <Button variant="outline" size="sm">
                    전체 보기 <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Issue List */}
              <div className="space-y-4">
                {filteredIssues.length > 0 ? (
                  filteredIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">해당 난이도의 이슈가 없습니다.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Contribution Guide */}
            <section>
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  기여 가이드
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">시작하기</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      <li>프로젝트를 fork하고 로컬에 clone합니다</li>
                      <li>새로운 브랜치를 생성합니다</li>
                      <li>변경사항을 commit하고 push합니다</li>
                      <li>Pull Request를 생성합니다</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">필수 사항</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Node.js 16+ 설치</li>
                      <li>npm 또는 yarn 설치</li>
                      <li>Git 기본 사용법 숙지</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`${project.htmlUrl}/blob/main/CONTRIBUTING.md`, '_blank')}
                  >
                    전체 가이드 보기 <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FriendlinessScore metrics={friendlinessMetrics} />
            
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">프로젝트 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributors</span>
                  <span className="font-medium">1,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commits</span>
                  <span className="font-medium">23,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Releases</span>
                  <span className="font-medium">348</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License</span>
                  <span className="font-medium">MIT</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;