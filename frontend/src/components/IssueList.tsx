import React from 'react';
import { Issue, PageResponse } from '../types/issue';
import IssueCard from './IssueCard';

interface IssueListProps {
  issues: Issue[];
  isLoading: boolean;
  error: string | null;
  pageInfo?: PageResponse<Issue> | null;
  onLoadMore?: () => void;
  onIssueClick?: (issue: Issue) => void;
}

const IssueList: React.FC<IssueListProps> = ({
  issues,
  isLoading,
  error,
  pageInfo,
  onLoadMore,
  onIssueClick,
}) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.732 15c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">데이터를 불러올 수 없습니다</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (isLoading && issues.length === 0) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
            <div className="flex gap-2 mb-4">
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (issues.length === 0 && !isLoading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          조건에 맞는 이슈가 없습니다
        </h3>
        <p className="text-gray-600 mb-4">
          다른 필터 조건을 시도해보세요
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          필터 초기화
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 이슈 그리드 */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => onIssueClick?.(issue)}
          />
        ))}
      </div>

      {/* 로딩 더 보기 */}
      {isLoading && issues.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>이슈를 불러오는 중...</span>
          </div>
        </div>
      )}

      {/* 더 보기 버튼 또는 페이지네이션 */}
      {!isLoading && pageInfo && !pageInfo.last && (
        <div className="flex justify-center py-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            더 많은 이슈 보기
          </button>
        </div>
      )}

      {/* 페이지 정보 */}
      {pageInfo && issues.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
            {pageInfo.totalElements > 0 ? (
              <>
                총 <span className="font-semibold text-gray-900">{pageInfo.totalElements.toLocaleString()}</span>개 중{' '}
                <span className="font-semibold text-gray-900">{issues.length.toLocaleString()}</span>개 표시
              </>
            ) : (
              '이슈가 없습니다'
            )}
          </div>
        </div>
      )}

      {/* 마지막 페이지 메시지 */}
      {pageInfo && pageInfo.last && issues.length > 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm">
            🎉 모든 이슈를 확인했습니다!
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueList;