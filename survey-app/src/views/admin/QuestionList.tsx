import { Questions } from '@/__generated__/graphql';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionListProps {
  questions: Questions[];
  quissionareId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, quissionareId }) => {
  const navigate = useNavigate();

  const editQuestion = (question?: Questions) => {
    navigate(`/admin/questionnaire/${quissionareId}/edit`, { state: question });
  };

  const renderQuestion = (question: Questions) => {
    switch (question.question_type.code) {
      case 'essai':
        return <p>Essay question</p>;
      case 'multiple':
        return (
          <div>
            <p>Multiple choice question</p>
            <ul className="list-disc pl-4">
              {/* {question.options?.map((option: any, index: number) => (
                <li key={index}>{option}</li>
              ))} */}
            </ul>
          </div>
        );
      case 'option':
        return (
          <div>
            <p>Ratio choice question</p>
            <ul className="list-disc pl-4">
              {/* {question.options?.map((option, index) => (
                <li key={index}>{option}</li>
              ))} */}
            </ul>
          </div>
        );
      case 'text':
        return <p className="font-semibold">Title: {question.content}</p>;
      case 'ipa':
        return (
          <div>
            <p>IPA question</p>
            <ul className="list-disc pl-4">
              {/* {question.questions?.map((subQuestion, index) => (
                <li key={index}>{subQuestion}</li>
              ))} */}
            </ul>
          </div>
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  console.log(questions);
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={question.id} className="flex flex-row gap-2">
          <div className="border p-4 rounded w-full">
            <h3 className="font-semibold mb-2">
              Question {index + 1}: {question.content}
            </h3>
            {renderQuestion(question)}
          </div>
          <button
            className={`mr-2 px-4 py-2 bg-blue-500 text-white`}
            onClick={() => editQuestion(question)}
          >
            Edit
          </button>
        </div>
      ))}
      <button key={'add-question'} className="border p-4 rounded" onClick={() => editQuestion()}>
        <h3 className="font-semibold mb-2">Tambah Pertanyaan</h3>
      </button>
    </div>
  );
};

export default QuestionList;
