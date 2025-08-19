import React from 'react';
import { StarIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Card } from './ui';
import { Project } from '../types';
import { formatNumber } from '../utils/format';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="p-6 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={`https://github.com/${project.owner}.png?size=48`}
            alt={project.owner}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600">{project.owner}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">
            {project.friendlinessScore}
          </div>
          <div className="text-xs text-gray-500">친화도</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">{formatNumber(project.stars)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <CodeBracketIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{project.language}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm">{project.openIssuesCount} issues</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {project.topics.slice(0, 3).map(topic => (
          <span key={topic} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
            {topic}
          </span>
        ))}
        {project.topics.length > 3 && (
          <span className="px-2 py-1 text-gray-500 text-xs">
            +{project.topics.length - 3}
          </span>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;