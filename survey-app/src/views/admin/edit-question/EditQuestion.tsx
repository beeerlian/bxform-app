import { Question_Types, Questions } from '@/__generated__/graphql';
import { QUESTION_TYPES } from '@/apollo/Operations';
import { QuestionOptionITF } from '@/types/question_option';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DynamicRatioOptions } from './OptionForm';

interface EditOptionProps {
  question: Questions;
  setQuestion: React.Dispatch<React.SetStateAction<Questions>>;
  handleOptionChange: (index: number, value: string) => void;
  addOption: () => void;
  removeOption: (index: number) => void;
}

// const DynamicRatioOptions: React.FC<EditOptionProps> = ({
//   question,
//   setQuestion,
//   handleOptionChange,
//   removeOption,
//   addOption,
// }) => {
//   return (
//     <div>
//       <label className="block mb-1">Options</label>
//       {/* {(question.question_type ?? []).map((option: any, index: number) => (
//         <div key={index} className="flex mb-2">
//           <div>
//             <label>Value</label>
//             <input
//               type="number"
//               value={option}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               className="flex-grow p-2 border rounded-l"
//             />
//           </div>
//           <div>
//             <label>Label</label>
//             <input
//               type="text"
//               value={option}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               className="flex-grow p-2 border rounded-l"
//             />
//           </div>
//           <button
//             onClick={() => removeOption(index)}
//             className="px-2 bg-red-500 text-white rounded-r"
//           >
//             Remove
//           </button>
//         </div>
//       ))} */}
//       <button onClick={addOption} className="px-2 py-1 bg-green-500 text-white rounded">
//         Add Option
//       </button>
//     </div>
//   );
// };

const EditQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Questions>(state as Questions);
  // const [questionType, setQuestionType] = useState<string>((state as Questions).question_type.code);

  const { data, loading, error } = useQuery<{ question_types: Question_Types[] }>(
    QUESTION_TYPES.getList,
    {
      variables: {
        id: id,
      },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const foundQT = findQuestionTypeByCode(value);
    if (foundQT) {
      setQuestion((prev) => ({
        ...prev,
        question_type: foundQT as Question_Types,
        question_type_id: foundQT!.id,
      }));
    }
  };

  const handleSave = () => {
    // Here you would save the new question to your backend
    console.log('New question:', question);
    // navigate(`/admin/questionnaire/${id}`);
  };

  const findQuestionTypeByCode = (code: string) => {
    return data?.question_types.find((type) => type.code === code);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">{state ? 'Edit' : 'Add'} New Question</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={question.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="type" className="block mb-1">
              Question Type
            </label>
            <select
              id="type"
              name="type"
              value={question.question_type.code}
              onChange={handleQuestionTypeChange}
              className="w-full p-2 border rounded"
            >
              {data.question_types.map((type) => (
                <option value={type.code}>{type.name}</option>
              ))}
            </select>
          </div>
          {(question.question_type.code === 'multiple' ||
            question.question_type.code === 'option' ||
            question.question_type.code === 'ipa') && (
            <DynamicRatioOptions
              question={question}
              setQuestion={setQuestion}
              // removeOption={removeOption}
              // addOption={addOption}
            />
          )}
        </div>
      )}
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={() => navigate(`/admin/questionnaire/${id}`)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
