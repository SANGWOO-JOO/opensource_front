import React from 'react';
import { Issue } from '../types/issue';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const getDifficultyConfig = (difficulty: string) => {
    switch(difficulty) {
      case 'BEGINNER':
        return {
          label: '입문',
          className: 'bg-green-100 text-green-700 border-green-200',
          icon: '🌱'
        };
      case 'EASY':
        return {
          label: '초급',
          className: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: '⭐'
        };
      case 'MEDIUM':
        return {
          label: '중급',
          className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: '🔥'
        };
      case 'HARD':
        return {
          label: '고급',
          className: 'bg-red-100 text-red-700 border-red-200',
          icon: '💪'
        };
      default:
        return {
          label: '알 수 없음',
          className: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: '❓'
        };
    }
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `약 ${minutes}분`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `약 ${hours}시간`;
    return `약 ${hours}시간 ${remainingMinutes}분`;
  };

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return '오늘';
    if (diffInDays === 1) return '어제';
    if (diffInDays < 7) return `${diffInDays}일 전`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}주 전`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}개월 전`;
    return `${Math.floor(diffInDays / 365)}년 전`;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(issue.htmlUrl, '_blank', 'noopener,noreferrer');
  };

  const difficultyConfig = getDifficultyConfig(issue.difficulty);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* 프로젝트 정보 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
            {issue.projectOwner.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {issue.projectOwner}/{issue.projectName}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">
            #{issue.githubId.slice(-4)}
          </span>
        </div>
      </div>

      {/* 이슈 제목 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {issue.title}
      </h3>

      {/* 태그들 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyConfig.className}`}>
          <span className="mr-1">{difficultyConfig.icon}</span>
          {difficultyConfig.label}
        </span>
        
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
          <span className="mr-1">⏱</span>
          {formatTime(issue.estimatedMinutes)}
        </span>
        
        {issue.labels.slice(0, 2).map((label, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200"
          >
            {label}
          </span>
        ))}
        
        {issue.labels.length > 2 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
            +{issue.labels.length - 2}개
          </span>
        )}
      </div>

      {/* 하단 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {getRelativeTime(issue.createdAt)}
          </span>
        </div>
        
        <button
          onClick={handleGitHubClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium group-hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">GitHub에서 보기</span>
          <span className="sm:hidden">GitHub</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IssueCard;