import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button';
  width?: string;
  height?: string;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = ''
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    card: 'h-32 w-full',
    text: 'h-4 w-full',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24'
  };

  const style = {
    width: width || undefined,
    height: height || undefined
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

interface IssueCardSkeletonProps {
  count?: number;
}

export const IssueCardSkeleton: React.FC<IssueCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-lg p-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <LoadingSkeleton variant="avatar" className="w-6 h-6" />
            <LoadingSkeleton width="120px" />
          </div>
          <LoadingSkeleton className="mb-4" height="24px" />
          <div className="flex gap-2 mb-4">
            <LoadingSkeleton width="60px" height="24px" />
            <LoadingSkeleton width="80px" height="24px" />
          </div>
          <div className="flex gap-1 mb-4">
            <LoadingSkeleton width="100px" height="20px" />
            <LoadingSkeleton width="80px" height="20px" />
          </div>
          <div className="flex justify-between items-center">
            <LoadingSkeleton width="60px" />
            <LoadingSkeleton variant="button" />
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;