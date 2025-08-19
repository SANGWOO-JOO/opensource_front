import React, { useState, useEffect } from 'react';
import { IssueFilters } from '../types/issue';

interface FilterBarProps {
  onFilterChange: (filters: IssueFilters) => void;
  isLoading?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, isLoading = false }) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<number | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);

  const difficulties = [
    { value: 'BEGINNER', label: '입문', color: 'green' },
    { value: 'EASY', label: '초급', color: 'blue' },
    { value: 'MEDIUM', label: '중급', color: 'yellow' },
    { value: 'HARD', label: '고급', color: 'red' },
  ];

  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'Go',
    'Rust',
    'C++',
    'Ruby',
    'PHP',
    'Swift',
  ];

  const timeRanges = [
    { value: 60, label: '1시간 이내' },
    { value: 180, label: '1-3시간' },
    { value: 480, label: '3-8시간' },
    { value: undefined, label: '8시간 이상' },
  ];

  useEffect(() => {
    const filters: IssueFilters = {
      difficulty: selectedDifficulties.length > 0 ? selectedDifficulties : undefined,
      language: selectedLanguages.length > 0 ? selectedLanguages : undefined,
      maxHours: selectedTimeRange,
    };
    onFilterChange(filters);
  }, [selectedDifficulties, selectedLanguages, selectedTimeRange, onFilterChange]);

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleTimeRangeChange = (value: number | undefined) => {
    setSelectedTimeRange(value);
  };

  const resetFilters = () => {
    setSelectedDifficulties([]);
    setSelectedLanguages([]);
    setSelectedTimeRange(undefined);
  };

  const hasActiveFilters = 
    selectedDifficulties.length > 0 || 
    selectedLanguages.length > 0 || 
    selectedTimeRange !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">필터</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                disabled={isLoading}
              >
                필터 초기화
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <svg
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`space-y-4 ${!isExpanded ? 'hidden md:block' : ''}`}>
          {/* 난이도 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              난이도
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => handleDifficultyToggle(value)}
                  disabled={isLoading}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${selectedDifficulties.includes(value)
                      ? color === 'green' ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : color === 'blue' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : color === 'yellow' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                      : 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {label}
                  {selectedDifficulties.includes(value) && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 예상 시간 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예상 시간
            </label>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map(({ value, label }) => (
                <button
                  key={label}
                  onClick={() => handleTimeRangeChange(value)}
                  disabled={isLoading}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${selectedTimeRange === value
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {label}
                  {selectedTimeRange === value && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 프로그래밍 언어 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로그래밍 언어
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map(language => (
                <button
                  key={language}
                  onClick={() => handleLanguageToggle(language)}
                  disabled={isLoading}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${selectedLanguages.includes(language)
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 활성 필터 개수 표시 (모바일) */}
        {!isExpanded && hasActiveFilters && (
          <div className="md:hidden mt-2">
            <span className="text-sm text-blue-600 font-medium">
              {selectedDifficulties.length + selectedLanguages.length + (selectedTimeRange ? 1 : 0)}개 필터 적용 중
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;