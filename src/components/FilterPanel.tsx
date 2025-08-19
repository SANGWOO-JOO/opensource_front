import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button } from './ui';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterPanelProps {
  filters: {
    difficulty: FilterOption[];
    estimatedTime: FilterOption[];
    languages: FilterOption[];
  };
  onFilterChange: (category: string, optionId: string) => void;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearAll
}) => {
  const FilterSection: React.FC<{
    title: string;
    options: FilterOption[];
    category: string;
  }> = ({ title, options, category }) => (
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label
            key={option.id}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => onFilterChange(category, option.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                option.checked 
                  ? 'bg-primary-600 border-primary-600' 
                  : 'border-gray-300'
              }`}>
                {option.checked && (
                  <CheckIcon className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <span className="ml-3 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border rounded-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">필터</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-gray-500 hover:text-gray-700"
        >
          초기화
        </Button>
      </div>

      <FilterSection
        title="난이도"
        options={filters.difficulty}
        category="difficulty"
      />

      <FilterSection
        title="예상 시간"
        options={filters.estimatedTime}
        category="estimatedTime"
      />

      <FilterSection
        title="프로그래밍 언어"
        options={filters.languages}
        category="languages"
      />
    </div>
  );
};

export default FilterPanel;