import React, { useState } from 'react';
import { Question } from '../../types/survey';

interface EditQuestionModalProps {
  question: Question;
  onClose: () => void;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ question, onClose, onSave }) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({ ...question });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(editedQuestion.options || [])];
    newOptions[index] = value;
    setEditedQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setEditedQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const removeOption = (index: number) => {
    const newOptions = [...(editedQuestion.options || [])];
    newOptions.splice(index, 1);
    setEditedQuestion(prev => ({ ...prev, options: newOptions }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Question</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedQuestion.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="type" className="block mb-1">Question Type</label>
            <select
              id="type"
              name="type"
              value={editedQuestion.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="essay">Essay</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="ratioChoice">Ratio Choice</option>
              <option value="title">Title</option>
              <option value="ipa">IPA</option>
            </select>
          </div>
          {(editedQuestion.type === 'multipleChoice' || editedQuestion.type === 'ratioChoice') && (
            <div>
              <label className="block mb-1">Options</label>
              {editedQuestion.options?.map((option, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-grow p-2 border rounded-l"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-r"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addOption}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Add Option
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={() => onSave(editedQuestion)} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;

