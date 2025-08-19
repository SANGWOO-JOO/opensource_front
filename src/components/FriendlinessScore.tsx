import React from 'react';
import { ClockIcon, CheckCircleIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Card } from './ui';
import { FriendlinessMetrics } from '../types';
import { formatPercentage } from '../utils/format';

interface FriendlinessScoreProps {
  metrics: FriendlinessMetrics;
}

const FriendlinessScore: React.FC<FriendlinessScoreProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const CircularProgress: React.FC<{ value: number; size?: number }> = ({ value, size = 120 }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            className={getScoreColor(value)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(value)}`}>
              {Math.round(value)}
            </div>
            <div className="text-xs text-gray-500">친화도</div>
          </div>
        </div>
      </div>
    );
  };

  const MetricItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: number;
    isPercentage?: boolean;
  }> = ({ icon, label, value, isPercentage = false }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getScoreBackground(value)}`}>
          {icon}
        </div>
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <div className="text-right">
        <div className={`text-lg font-bold ${getScoreColor(value)}`}>
          {isPercentage ? formatPercentage(value) : Math.round(value)}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">친화도 점수</h2>
      
      <div className="flex items-center justify-center mb-8">
        <CircularProgress value={metrics.overall} />
      </div>

      <div className="space-y-4">
        <MetricItem
          icon={<ClockIcon className="w-5 h-5" />}
          label="평균 응답 시간"
          value={metrics.responseTime}
        />
        
        <MetricItem
          icon={<CheckCircleIcon className="w-5 h-5" />}
          label="PR 승인률"
          value={metrics.prAcceptanceRate}
          isPercentage
        />
        
        <MetricItem
          icon={<DocumentTextIcon className="w-5 h-5" />}
          label="문서화 수준"
          value={metrics.documentation}
        />
        
        <MetricItem
          icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
          label="커뮤니티 활동"
          value={metrics.communityActivity}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">친화도 점수란?</h3>
        <p className="text-sm text-gray-600">
          초보자가 기여하기 쉬운 정도를 나타내는 지표입니다. 
          응답 시간, PR 승인률, 문서화 수준, 커뮤니티 활동 등을 종합적으로 평가합니다.
        </p>
      </div>
    </Card>
  );
};

export default FriendlinessScore;