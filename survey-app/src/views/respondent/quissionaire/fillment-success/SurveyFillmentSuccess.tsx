import React from 'react';
import { FaPlus } from 'react-icons/fa';

const SurveyFillmentSuccess: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-green-500 text-white rounded-full p-4">
            <FaPlus className="text-2xl transform rotate-45" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Thank you for your submission!</h1>
        <p className="text-gray-600 mt-2">Your responses have been successfully recorded.</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default SurveyFillmentSuccess;
