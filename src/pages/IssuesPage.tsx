import React, { useState, useMemo } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import IssueCard from '../components/IssueCard';
import { Button } from '../components/ui';
import { Issue } from '../types';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const IssuesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    difficulty: [
      { id: 'BEGINNER', label: '입문', checked: false },
      { id: 'EASY', label: '초급', checked: false },
      { id: 'MEDIUM', label: '중급', checked: false },
      { id: 'HARD', label: '고급', checked: false },
    ],
    estimatedTime: [
      { id: '0-1', label: '1시간 이내', checked: false },
      { id: '1-3', label: '1-3시간', checked: false },
      { id: '3-8', label: '3-8시간', checked: false },
      { id: '8+', label: '8시간 이상', checked: false },
    ],
    languages: [
      { id: 'javascript', label: 'JavaScript', checked: false },
      { id: 'python', label: 'Python', checked: false },
      { id: 'java', label: 'Java', checked: false },
      { id: 'typescript', label: 'TypeScript', checked: false },
      { id: 'go', label: 'Go', checked: false },
      { id: 'rust', label: 'Rust', checked: false },
    ],
  });

  const sortOptions = [
    { value: 'newest', label: '최신순' },
    { value: 'oldest', label: '오래된 순' },
    { value: 'difficulty', label: '난이도순' },
    { value: 'popularity', label: '인기순' },
  ];

  // Mock data
  const allIssues: Issue[] = [
    {
      id: '1',
      title: 'Fix typo in documentation',
      projectName: 'react',
      projectOwner: 'facebook',
      difficulty: 'EASY',
      estimatedHours: 0.5,
      labels: ['documentation', 'good first issue'],
      createdAt: '2024-01-15T10:30:00Z',
      htmlUrl: 'https://github.com/facebook/react/issues/1',
      state: 'open'
    },
    {
      id: '2',
      title: 'Add missing unit tests for utility functions',
      projectName: 'vue',
      projectOwner: 'vuejs',
      difficulty: 'MEDIUM',
      estimatedHours: 2,
      labels: ['testing', 'beginner-friendly'],
      createdAt: '2024-01-14T14:20:00Z',
      htmlUrl: 'https://github.com/vuejs/vue/issues/2',
      state: 'open'
    },
    {
      id: '3',
      title: 'Improve error message clarity',
      projectName: 'node',
      projectOwner: 'nodejs',
      difficulty: 'BEGINNER',
      estimatedHours: 1,
      labels: ['error-handling', 'good first issue'],
      createdAt: '2024-01-13T09:15:00Z',
      htmlUrl: 'https://github.com/nodejs/node/issues/3',
      state: 'open'
    },
    {
      id: '4',
      title: 'Update README with installation instructions',
      projectName: 'webpack',
      projectOwner: 'webpack',
      difficulty: 'EASY',
      estimatedHours: 1,
      labels: ['documentation', 'help wanted'],
      createdAt: '2024-01-12T16:45:00Z',
      htmlUrl: 'https://github.com/webpack/webpack/issues/4',
      state: 'open'
    },
    {
      id: '5',
      title: 'Implement dark mode toggle',
      projectName: 'tailwindcss',
      projectOwner: 'tailwindlabs',
      difficulty: 'HARD',
      estimatedHours: 8,
      labels: ['feature', 'ui'],
      createdAt: '2024-01-11T11:20:00Z',
      htmlUrl: 'https://github.com/tailwindlabs/tailwindcss/issues/5',
      state: 'open'
    },
  ];

  const handleFilterChange = (category: string, optionId: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].map(option =>
        option.id === optionId ? { ...option, checked: !option.checked } : option
      )
    }));
  };

  const handleClearFilters = () => {
    setFilters(prev => ({
      difficulty: prev.difficulty.map(opt => ({ ...opt, checked: false })),
      estimatedTime: prev.estimatedTime.map(opt => ({ ...opt, checked: false })),
      languages: prev.languages.map(opt => ({ ...opt, checked: false })),
    }));
  };

  const filteredIssues = useMemo(() => {
    let filtered = allIssues;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.projectOwner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Difficulty filter
    const selectedDifficulties = filters.difficulty
      .filter(d => d.checked)
      .map(d => d.id);
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(issue =>
        selectedDifficulties.includes(issue.difficulty)
      );
    }

    // Estimated time filter
    const selectedTimes = filters.estimatedTime
      .filter(t => t.checked)
      .map(t => t.id);
    if (selectedTimes.length > 0) {
      filtered = filtered.filter(issue => {
        const hours = issue.estimatedHours;
        return selectedTimes.some(timeRange => {
          switch (timeRange) {
            case '0-1': return hours <= 1;
            case '1-3': return hours > 1 && hours <= 3;
            case '3-8': return hours > 3 && hours <= 8;
            case '8+': return hours > 8;
            default: return false;
          }
        });
      });
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'difficulty':
        const difficultyOrder = { BEGINNER: 1, EASY: 2, MEDIUM: 3, HARD: 4, EXPERT: 5 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.labels.length - a.labels.length);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [allIssues, searchQuery, filters, sortBy]);

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: filteredIssues.length,
    onSelect: (index) => {
      const issue = filteredIssues[index];
      if (issue) {
        window.open(issue.htmlUrl, '_blank');
      }
    }
  });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">이슈 탐색</h1>
          <p className="text-gray-600">
            당신에게 맞는 오픈소스 프로젝트 이슈를 찾아보세요
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
                  필터
                </Button>
                <SortDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                />
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                총 <strong className="text-gray-900">{filteredIssues.length}개</strong>의 이슈를 찾았습니다
              </p>
            </div>

            {/* Issue List */}
            {filteredIssues.length > 0 ? (
              <div 
                className="space-y-4"
                role="list"
                aria-label="이슈 목록"
              >
                {filteredIssues.map((issue, index) => (
                  <div
                    key={issue.id}
                    className={`${
                      index === focusedIndex ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                    }`}
                    tabIndex={index === focusedIndex ? 0 : -1}
                    role="listitem"
                  >
                    <IssueCard issue={issue} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.062a7.962 7.962 0 01-6-2.769M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-4">
                  다른 검색어나 필터를 시도해보세요
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;