import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../../types/survey';

const dummyQuestionnaire = {
  id: '1',
  title: 'Customer Satisfaction Survey',
  questions: [
    { id: '1', type: 'essay', title: 'What do you like most about our product?' },
    { id: '2', type: 'multipleChoice', title: 'Which features do you use most?', options: ['Feature A', 'Feature B', 'Feature C'] },
    { id: '3', type: 'ratioChoice', title: 'How likely are you to recommend our product?', options: ['1', '2', '3', '4', '5'] },
    { id: '4', type: 'title', title: 'Thank you for your feedback!' },
    { id: '5', type: 'ipa', title: 'Rate the importance and satisfaction of the following aspects:', questions: ['Ease of use', 'Customer support'] },
  ],
};

const SurveyFillment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<(string | string[])[]>(Array(dummyQuestionnaire.questions.length).fill(''));

  const handleAnswerChange = (index: number, value: string | string[]) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case 'essay':
        return (
          <textarea
            value={answers[index] as string}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
      case 'multipleChoice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(answers[index] as string[])?.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = answers[index] as string[] || [];
                    if (e.target.checked) {
                      handleAnswerChange(index, [...currentAnswers, option]);
                    } else {
                      handleAnswerChange(index, currentAnswers.filter((a) => a !== option));
                    }
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'ratioChoice':
        return (
          <div className="space-x-4">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="inline-flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-1"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'title':
        return null;
      case 'ipa':
        return (
          <div className="space-y-4">
            {question.questions?.map((subQuestion, subIndex) => (
              <div key={subIndex}>
                <p className="font-medium">{subQuestion}</p>
                <div className="flex justify-between">
                  <div>
                    <p>Importance:</p>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="inline-flex items-center mr-2">
                        <input
                          type="radio"
                          value={value}
                          checked={(answers[index] as string[])?.[subIndex * 2] === value.toString()}
                          onChange={(e) => {
                            const currentAnswers = answers[index] as string[] || [];
                            currentAnswers[subIndex * 2] = e.target.value;
                            handleAnswerChange(index, currentAnswers);
                          }}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                  <div>
                    <p>Satisfaction:</p>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="inline-flex items-center mr-2">
                        <input
                          type="radio"
                          value={value}
                          checked={(answers[index] as string[])?.[subIndex * 2 + 1] === value.toString()}
                          onChange={(e) => {
                            const currentAnswers = answers[index] as string[] || [];
                            currentAnswers[subIndex * 2 + 1] = e.target.value;
                            handleAnswerChange(index, currentAnswers);
                          }}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting survey:', answers);
    // Here you would typically send the answers to your backend
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{dummyQuestionnaire.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {dummyQuestionnaire.questions.map((question, index) => (
          <div key={question.id} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">{question.title}</h3>
            {renderQuestion(question, index)}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyFillment;

