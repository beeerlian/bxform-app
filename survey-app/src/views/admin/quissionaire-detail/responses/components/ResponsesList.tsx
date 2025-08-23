import Spinner from '@/components/loading/Spinner';
import React, { useMemo, useState } from 'react';
import { FaClipboardList, FaUsers } from 'react-icons/fa';
import ResponseItem from './ResponseItem';
import ResponsesFilter from './ResponsesFilter';

interface FilterOptions {
  dateFrom?: string;
  dateTo?: string;
  userType: 'all' | 'registered' | 'anonymous';
  searchTerm: string;
}

interface QuestionAnswer {
  id: string;
  question_id: string;
  answer: string;
  created_at: string;
}

interface User {
  id: string;
  name?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

interface AnswerSheet {
  id: string;
  form_id: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  recorded?: boolean;
  user?: User;
  question_answers: QuestionAnswer[];
}

interface ResponsesListProps {
  answerSheets: AnswerSheet[];
  questions: Array<{ id: string; content: string; option?: { type: string } }>;
  loading: boolean;
  error?: any;
}

const ResponsesList: React.FC<ResponsesListProps> = ({
  answerSheets,
  questions,
  loading,
  error,
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateFrom: undefined,
    dateTo: undefined,
    userType: 'all',
    searchTerm: '',
  });

  // Filter the answer sheets based on the current filters
  const filteredAnswerSheets = useMemo(() => {
    if (!answerSheets) return [];

    return answerSheets.filter((sheet) => {
      // Date filter
      if (filters.dateFrom) {
        const sheetDate = new Date(sheet.created_at);
        const fromDate = new Date(filters.dateFrom);
        if (sheetDate < fromDate) return false;
      }

      if (filters.dateTo) {
        const sheetDate = new Date(sheet.created_at);
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // Include the entire day
        if (sheetDate > toDate) return false;
      }

      // User type filter
      if (filters.userType === 'registered' && !sheet.user) return false;
      if (filters.userType === 'anonymous' && sheet.user) return false;

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const matchesUser =
          sheet.user?.name?.toLowerCase().includes(searchTerm) ||
          sheet.user?.email?.toLowerCase().includes(searchTerm);
        const matchesAnswers = sheet.question_answers.some((answer) =>
          answer.answer.toLowerCase().includes(searchTerm)
        );
        if (!matchesUser && !matchesAnswers) return false;
      }

      return true;
    });
  }, [answerSheets, filters]);
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
        <span className="ml-2">Loading responses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-red-700">
          <FaClipboardList />
          <span className="font-medium">Error loading responses</span>
        </div>
        <p className="text-red-600 text-sm mt-1">
          {error.message || 'An error occurred while fetching responses'}
        </p>
      </div>
    );
  }

  if (!answerSheets || answerSheets.length === 0) {
    return (
      <div className="space-y-4">
        <ResponsesFilter filters={filters} onFiltersChange={setFilters} />
        <div className="text-center py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <FaClipboardList className="mx-auto text-gray-400 text-3xl mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Responses Yet</h3>
            <p className="text-gray-600">
              This survey hasn't received any responses yet. Share your survey link to start
              collecting responses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalResponses = filteredAnswerSheets.length;
  const totalAnswers = filteredAnswerSheets.reduce(
    (sum, sheet) => sum + sheet.question_answers.length,
    0
  );

  return (
    <div className="space-y-4">
      {/* Filter Component */}
      <ResponsesFilter filters={filters} onFiltersChange={setFilters} />

      {/* Summary Statistics */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaUsers className="text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900">Response Summary</h3>
              <p className="text-blue-700 text-sm">
                {totalResponses} response{totalResponses !== 1 ? 's' : ''} shown • {totalAnswers}{' '}
                total answer{totalAnswers !== 1 ? 's' : ''}
                {totalResponses !== answerSheets.length && (
                  <span className="text-blue-600">
                    {' '}
                    (filtered from {answerSheets.length} total)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responses List */}
      {filteredAnswerSheets.length > 0 ? (
        <div className="space-y-3">
          {filteredAnswerSheets.map((answerSheet, index) => (
            <ResponseItem
              key={answerSheet.id}
              answerSheet={answerSheet}
              questions={questions}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <FaClipboardList className="mx-auto text-gray-400 text-3xl mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Matching Responses</h3>
            <p className="text-gray-600">
              No responses match your current filter criteria. Try adjusting your filters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsesList;
