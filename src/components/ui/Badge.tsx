import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'difficulty-beginner' | 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard' | 'time';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    'difficulty-beginner': 'badge--difficulty-beginner',
    'difficulty-easy': 'badge--difficulty-easy',
    'difficulty-medium': 'badge--difficulty-medium',
    'difficulty-hard': 'badge--difficulty-hard',
    time: 'badge--time'
  };

  return (
    <span
      className={clsx(
        'badge',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;