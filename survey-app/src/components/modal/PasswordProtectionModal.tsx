import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import Spinner from '../loading/Spinner';

interface PasswordProtectionModalProps {
  isOpen: boolean;
  onSubmit: (password: string) => void;
  errorMessage?: string;
  isLoading?: boolean;
  surveyTitle?: string;
}

const PasswordProtectionModal: React.FC<PasswordProtectionModalProps> = ({
  isOpen,
  onSubmit,
  errorMessage,
  isLoading = false,
  surveyTitle,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
          <FaLock className="text-blue-600 text-xl" />
        </div>

        <h3 className="text-xl font-bold text-center mb-1">Password Protected Survey</h3>
        {surveyTitle && <p className="text-center text-gray-600 mb-4">"{surveyTitle}"</p>}

        <p className="text-center text-gray-600 mb-6">
          This survey is password protected. Please enter the password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:outline-none ${
                errorMessage
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex justify-center items-center"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? <Spinner className="fill-white w-5 h-5" /> : 'Continue to Survey'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtectionModal;
