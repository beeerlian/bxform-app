import React, { useState } from 'react';
import { FaCalendarAlt, FaFilter, FaTimes, FaUser } from 'react-icons/fa';

interface FilterOptions {
  dateFrom?: string;
  dateTo?: string;
  userType: 'all' | 'registered' | 'anonymous';
  searchTerm: string;
}

interface ResponsesFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const ResponsesFilter: React.FC<ResponsesFilterProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateFrom: undefined,
      dateTo: undefined,
      userType: 'all',
      searchTerm: '',
    });
  };

  const hasActiveFilters =
    filters.dateFrom || filters.dateTo || filters.userType !== 'all' || filters.searchTerm;

  return (
    <div className="bg-white border rounded-lg">
      <div
        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500" />
            <span className="font-medium text-gray-700">Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilters();
                }}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                <FaTimes />
              </button>
            )}
            <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Responses
              </label>
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                placeholder="Search in answers..."
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            {/* User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaUser className="inline mr-1" />
                User Type
              </label>
              <select
                value={filters.userType}
                onChange={(e) => updateFilter('userType', e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="all">All Users</option>
                <option value="registered">Registered Users</option>
                <option value="anonymous">Anonymous Users</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsesFilter;
