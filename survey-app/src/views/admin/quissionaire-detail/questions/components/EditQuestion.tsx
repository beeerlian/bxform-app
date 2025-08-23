import { Questions } from '@/__generated__/graphql';
import { QUESTION } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import { QuestionFormITF } from '@/types/dto-types';
import { getQuestionFormDefaultValue, normalizeOptionObject } from '@/utils/quissionare.util';
import { ApolloError, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import FormErrorMessage from '@/components/error/FormErrorMessage';
import OptionForm from '@/components/form/OptionForm';

interface EditQuestionProps {
  onSuccess: () => void;
  question: Questions;
}

const EditQuestion: React.FC<EditQuestionProps> = ({ onSuccess, question: questionData }) => {
  const [updateQ, { data: updateQData, loading: updateQLoading, error: updateQError }] =
    useMutation(QUESTION.updateQuestionByPk);

  const form = useForm<QuestionFormITF>({
    defaultValues: getQuestionFormDefaultValue(questionData),
  });

  const onSubmit = async (data: QuestionFormITF) => {
    try {
      await updateQ({
        variables: { ...questionData, ...form.getValues(), option: normalizeOptionObject(data) },
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      } else {
        toast.error('Gagal memuat');
      }
    }
  };

  useEffect(() => {
    if (updateQData) {
      onSuccess();
    }
    if (updateQError) {
      toast.error(updateQError.message);
    }
  }, [updateQData, updateQError]);

  return (
    <div className="max-w mx-auto p-4">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            key="content"
            name="content"
            control={form.control}
            render={({ field }) => (
              <div>
                <label htmlFor="content" className="block mb-1 font-medium">
                  Question Title
                </label>
                <input
                  type="text"
                  id="content"
                  {...field}
                  value={field.value ?? ''}
                  className="w-full p-2 border rounded"
                />
                <FormErrorMessage message={form.formState.errors?.content?.message} />
              </div>
            )}
          />

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Question Configuration</h3>
            <OptionForm option={questionData.option} />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Additional Information</h3>
            <Controller
              key="caption"
              name="caption"
              control={form.control}
              render={({ field }) => (
                <div>
                  <label htmlFor="caption" className="block text-xs text-gray-500 mb-1">
                    Note/Caption (optional)
                  </label>
                  <input
                    type="text"
                    id="caption"
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional information or hint for respondents"
                    className="w-full p-2 border rounded italic text-xs"
                  />
                  <FormErrorMessage message={form.formState.errors?.caption?.message} />
                </div>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="submit"
              disabled={updateQLoading}
              className={`px-4 py-2 bg-blue-500 text-white text-sm min-w-24 min-h-8 rounded-full`}
            >
              {updateQLoading ? <Spinner /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditQuestion;
