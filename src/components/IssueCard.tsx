import React from 'react';
import { ClockIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Card } from './ui';
import { Issue } from '../types';
import { formatRelativeTime } from '../utils/date';

interface IssueCardProps {
  issue: Issue;
  variant?: 'compact' | 'detailed';
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, variant = 'detailed' }) => {
  const difficultyConfig = {
    BEGINNER: { variant: 'difficulty-beginner' as const, label: '입문' },
    EASY: { variant: 'difficulty-easy' as const, label: '초급' },
    MEDIUM: { variant: 'difficulty-medium' as const, label: '중급' },
    HARD: { variant: 'difficulty-hard' as const, label: '고급' },
    EXPERT: { variant: 'difficulty-hard' as const, label: '전문가' }
  };

  if (variant === 'compact') {
    return (
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
              {issue.title}
            </h3>
            <p className="text-sm text-gray-600">
              {issue.projectOwner}/{issue.projectName}
            </p>
          </div>
          <Badge variant={difficultyConfig[issue.difficulty].variant}>
            {difficultyConfig[issue.difficulty].label}
          </Badge>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <header className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={`https://github.com/${issue.projectOwner}.png?size=24`} 
            alt={issue.projectOwner}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">
            {issue.projectOwner}/{issue.projectName}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {issue.title}
        </h3>
      </header>

      <div className="flex items-center gap-3 mb-4">
        <Badge variant={difficultyConfig[issue.difficulty].variant}>
          {difficultyConfig[issue.difficulty].label}
        </Badge>
        <Badge variant="time">
          <ClockIcon className="w-4 h-4 mr-1" />
          약 {issue.estimatedHours}시간
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {issue.labels.map(label => (
          <span key={label} className="label">
            {label}
          </span>
        ))}
      </div>

      <footer className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {formatRelativeTime(issue.createdAt)}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <BookmarkIcon className="w-4 h-4" />
          </Button>
          <Button 
            size="sm"
            onClick={() => window.open(issue.htmlUrl, '_blank')}
          >
            GitHub에서 보기 →
          </Button>
        </div>
      </footer>
    </Card>
  );
};

export default IssueCard;