import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import IssueList from './components/IssueList';
import { Issue, IssueFilters, PageResponse, IssueStats } from './types/issue';
import { apiService, debounce } from './services/api';
import './styles/App.css';

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pageInfo, setPageInfo] = useState<PageResponse<Issue> | null>(null);
  const [stats, setStats] = useState<IssueStats>({ totalIssues: 0, lastUpdated: '' });
  const [filters, setFilters] = useState<IssueFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 이슈 데이터 로드
  const loadIssues = useCallback(async (
    newFilters: IssueFilters = filters,
    page = 0,
    append = false
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.getIssues(newFilters, page, 20);
      
      if (append && page > 0) {
        setIssues(prev => [...prev, ...response.content]);
      } else {
        setIssues(response.content);
      }
      
      setPageInfo(response);
      setCurrentPage(page);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load issues:', err);
      setError('이슈를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 통계 데이터 로드
  const loadStats = useCallback(async () => {
    try {
      const statsData = await apiService.getStats();
      setStats(statsData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load stats:', err);
    }
  }, []);

  // 디바운스된 필터 변경 핸들러
  const debouncedFilterChange = useCallback(
    debounce((newFilters: IssueFilters) => {
      setCurrentPage(0);
      loadIssues(newFilters, 0, false);
    }, 500),
    []
  );

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters: IssueFilters) => {
    setFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  // 더 보기 핸들러
  const handleLoadMore = () => {
    if (pageInfo && !pageInfo.last) {
      loadIssues(filters, currentPage + 1, true);
    }
  };

  // 이슈 클릭 핸들러
  const handleIssueClick = (issue: Issue) => {
    // 추후 이슈 상세 모달이나 페이지로 이동할 수 있음
    // eslint-disable-next-line no-console
    console.log('Issue clicked:', issue);
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadIssues();
    loadStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 에러 복구 핸들러
  const handleRetry = () => {
    setError(null);
    loadIssues();
    loadStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="issues" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            이슈 탐색
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            당신에게 맞는 오픈소스 프로젝트 이슈를 찾아보세요
          </p>
          
          {/* 통계 정보 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="text-2xl">📊</span>
                <p className="text-blue-800">
                  총 <span className="font-bold text-blue-900">{stats.totalIssues.toLocaleString()}</span>개의 이슈를 추적하고 있습니다
                </p>
              </div>
              {stats.lastUpdated && (
                <p className="text-sm text-blue-600">
                  마지막 업데이트: {new Date(stats.lastUpdated).toLocaleString('ko-KR')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 필터 바 */}
        <FilterBar 
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
        />

        {/* 검색 결과 헤더 */}
        {!isLoading && !error && pageInfo && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                검색 결과
              </h2>
              {pageInfo.totalElements > 0 && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {pageInfo.totalElements.toLocaleString()}개 발견
                </span>
              )}
            </div>
            
            {/* 정렬 옵션 (추후 구현) */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-600">정렬:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                <option value="created">최신순</option>
                <option value="difficulty">난이도순</option>
                <option value="time">예상시간순</option>
              </select>
            </div>
          </div>
        )}

        {/* 이슈 리스트 */}
        <IssueList
          issues={issues}
          isLoading={isLoading}
          error={error}
          pageInfo={pageInfo}
          onLoadMore={handleLoadMore}
          onIssueClick={handleIssueClick}
        />

        {/* 전역 에러 상태 */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-sm">{error}</span>
              <button
                onClick={handleRetry}
                className="ml-4 text-red-700 hover:text-red-900 font-medium text-sm"
              >
                재시도
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Made with ❤️ for Open Source Contributors
            </p>
            <p className="text-sm">
              데이터는 GitHub API를 통해 매일 업데이트됩니다
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;