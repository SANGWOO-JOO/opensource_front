import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right';
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0
}) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const animationClasses = {
    'fade-in': 'opacity-0 transition-opacity duration-700',
    'slide-up': 'opacity-0 translate-y-8 transition-all duration-700',
    'slide-left': 'opacity-0 translate-x-8 transition-all duration-700',
    'slide-right': 'opacity-0 -translate-x-8 transition-all duration-700'
  };

  const visibleClasses = {
    'fade-in': 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0'
  };

  return (
    <div
      ref={ref}
      className={`
        ${animationClasses[animation]}
        ${isVisible ? visibleClasses[animation] : ''}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;