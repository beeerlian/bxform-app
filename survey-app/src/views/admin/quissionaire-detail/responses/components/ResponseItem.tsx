import QuestionTypeChip from '@/components/chip/QuestionTypeChip';
import { OptionType } from '@/types/dto-types';
import React, { useState } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronRight, FaEnvelope, FaUser } from 'react-icons/fa';

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

interface ResponseItemProps {
  answerSheet: AnswerSheet;
  questions: Array<{ id: string; content: string; option?: { type: string } }>;
  index: number;
}

const ResponseItem: React.FC<ResponseItemProps> = ({ answerSheet, questions, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getQuestionData = (questionId: string) => {
    return questions.find((q) => q.id === questionId);
  };

  const parseAnswer = (answer: string, questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    const questionType = question?.option?.type;

    try {
      const parsed = JSON.parse(answer);

      // Handle different question types
      switch (questionType) {
        case 'Importance Performance':
          if (parsed.importance && parsed.performance) {
            return (
              <div className="space-y-1">
                <div>
                  <span className="font-medium">Importance:</span> {parsed.importance.label}
                </div>
                <div>
                  <span className="font-medium">Performance:</span> {parsed.performance.label}
                </div>
              </div>
            );
          }
          break;

        case 'Multiple':
          if (Array.isArray(parsed)) {
            const selectedOptions = parsed
              .filter((item) => item.selected)
              .map((item) => item.label);
            return selectedOptions.length > 0 ? selectedOptions.join(', ') : 'No options selected';
          }
          break;

        case 'Ratio':
          return parsed.label || 'No option selected';

        default:
          if (typeof parsed === 'object') {
            return JSON.stringify(parsed, null, 2);
          }
          return parsed;
      }
    } catch {
      // If not JSON, return as is
      return answer;
    }

    return answer;
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {isExpanded ? (
                <FaChevronDown className="text-gray-500 text-sm" />
              ) : (
                <FaChevronRight className="text-gray-500 text-sm" />
              )}
              <span className="font-medium text-gray-900">Response #{index + 1}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {answerSheet.user ? (
                <>
                  <div className="flex items-center space-x-1">
                    <FaUser className="text-xs" />
                    <span>{answerSheet.user.name || 'Anonymous'}</span>
                  </div>
                  {answerSheet.user.email && (
                    <div className="flex items-center space-x-1">
                      <FaEnvelope className="text-xs" />
                      <span>{answerSheet.user.email}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-1">
                  <FaUser className="text-xs" />
                  <span>Anonymous User</span>
                </div>
              )}

              <div className="flex items-center space-x-1">
                <FaCalendarAlt className="text-xs" />
                <span>{formatDate(answerSheet.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {answerSheet.question_answers.length} answer
            {answerSheet.question_answers.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t bg-gray-50">
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Answers:</h4>
            {answerSheet.question_answers.length > 0 ? (
              <div className="space-y-3">
                {answerSheet.question_answers.map((answer) => {
                  const questionData = getQuestionData(answer.question_id);
                  return (
                    <div key={answer.id} className="bg-white p-3 rounded border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-gray-700">
                          {questionData?.content || 'Unknown Question'}
                        </div>
                        {questionData?.option?.type && (
                          <QuestionTypeChip type={questionData.option.type as OptionType} />
                        )}
                      </div>
                      <div className="text-gray-900">
                        {parseAnswer(answer.answer, answer.question_id)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Answered: {formatDate(answer.created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500 italic">No answers recorded</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseItem;
