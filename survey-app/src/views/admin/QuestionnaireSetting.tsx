import { Forms } from '@/__generated__/graphql';
import React, { useState } from 'react';

interface QuestionnaireSettingProps {
  questionnaire: Forms;
}

const QuestionnaireSetting: React.FC<QuestionnaireSettingProps> = ({ questionnaire }) => {
  const [title, setTitle] = useState(questionnaire.title);
  const [password, setPassword] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSave = () => {
    console.log('Saving settings:', { title, password, isPublic });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">
          Password (optional)
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          Make public
        </label>
      </div>
      <div>
        <p>Share link:</p>
        <input
          type="text"
          value={`http://example.com/survey/${questionnaire.id}`}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save Settings
      </button>
    </div>
  );
};

export default QuestionnaireSetting;
