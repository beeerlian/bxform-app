import React from 'react';
import { Question, Response } from '../../types/survey';

interface ResponseListProps {
  responses: Response[];
  questions: Question[];
}

const ResponseList: React.FC<ResponseListProps> = ({ responses, questions }) => {
  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <div key={response.id} className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Respondent: {response.respondent}</h3>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-2">
              <p className="font-medium">{question.title}</p>
              <p>{JSON.stringify(response.answers[index])}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResponseList;

