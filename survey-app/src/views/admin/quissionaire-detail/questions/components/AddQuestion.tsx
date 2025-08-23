import { QUESTION } from '@/apollo/Operations';
import FormErrorMessage from '@/components/error/FormErrorMessage';
import OptionForm from '@/components/form/OptionForm';
import Spinner from '@/components/loading/Spinner';
import { QuestionFormITF } from '@/types/dto-types';
import { getQuestionFormDefaultValue, normalizeOptionObject } from '@/utils/quissionare.util';
import { ApolloError, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface AddQuestionProps {
  formId: string;
  onSuccess: () => void;
  order: number;
}

const AddQuestion: React.FC<AddQuestionProps> = ({ onSuccess, formId, order }) => {
  const [addQ, { data: addQData, loading: addQLoading, error: addQError }] = useMutation(
    QUESTION.createQuestion
  );
  const form = useForm<QuestionFormITF>({ defaultValues: getQuestionFormDefaultValue() });

  const onSubmit = async (data: QuestionFormITF) => {
    try {
      await addQ({
        variables: {
          content: data.content,
          form_id: formId,
          required: data.required,
          option: normalizeOptionObject(data),
          order: order,
        },
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
    if (addQData) {
      onSuccess();
    }
    if (addQError) {
      toast.error(addQError.message);
    }
  }, [addQData, addQError]);

  return (
    <div className="max-w mx-auto p-4">
      {
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              key="content"
              name="content"
              control={form.control}
              rules={{ required: 'Required' }}
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
                    placeholder="Enter your question..."
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                  <FormErrorMessage message={form.formState.errors?.content?.message} />
                </div>
              )}
            />

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Question Configuration</h3>
              <OptionForm />
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
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={addQLoading}
                className={`px-4 py-2 bg-blue-500 text-white text-sm min-w-24 min-h-8 rounded-full hover:bg-blue-600 transition-colors`}
              >
                {addQLoading ? <Spinner /> : 'Add Question'}
              </button>
            </div>
          </form>
        </FormProvider>
      }
    </div>
  );
};

export default AddQuestion;
