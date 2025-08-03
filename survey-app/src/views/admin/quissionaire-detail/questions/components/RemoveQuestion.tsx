import { QUESTION } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import { ApolloError, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

interface RemoveQuestionProps {
  onSuccess: () => void;
  onCancel: () => void;
  questionId: string;
}

const RemoveQuestion: React.FC<RemoveQuestionProps> = ({ onSuccess, onCancel, questionId }) => {
  const [removeQ, { data: removeQData, loading: removeQLoading, error: removeQError }] =
    useMutation(QUESTION.deleteQuestion);

  const onDelete = async () => {
    try {
      await removeQ({ variables: { id: questionId } });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      } else {
        toast.error('Gagal memuat');
      }
    }
  };

  useEffect(() => {
    if (removeQData) {
      onSuccess();
    }
    if (removeQError) {
      toast.error(removeQError.message);
    }
  }, [removeQData, removeQError]);

  return (
    <div className="mx-auto p-4">
      <div className="justify-center py-8">
        <p className="text-lg">Are you sure you want to delete this question?</p>
      </div>

      <div className="mt-6 flex justify-center space-x-2 ">
        <button
          type="button"
          onClick={onCancel}
          disabled={removeQLoading}
          className={`flex-1 px-4 py-2 bg-blue-500 text-white rounded ${
            removeQLoading ? 'opacity-50' : ''
          }`}
        >
          {removeQLoading ? <Spinner /> : 'Cancel'}
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={removeQLoading}
          className={`flex-1 px-4 py-2 bg-red-500 text-white rounded ${
            removeQLoading ? 'opacity-50' : ''
          }`}
        >
          {removeQLoading ? <Spinner /> : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default RemoveQuestion;
