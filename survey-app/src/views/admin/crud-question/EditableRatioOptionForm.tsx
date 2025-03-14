import FormErrorMessage from '@/components/FormErrorMessage';
import { QuestionFormITF } from '@/types/dto-types';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  onOptionChanged?: (data: any) => void;
  option?: any;
}

const EditableRatioOptionForm: React.FC<Props> = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext<QuestionFormITF>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherOpt.option',
  });

  const addOption = () => {
    const newOption = {
      id: uuidv4(),
      label: `Option ${fields.length + 1}`,
      value: fields.length + 1,
    };
    append(newOption);
  };

  const removeOption = (index: number) => {
    remove(index);
  };

  return (
    <div className="p-4 space-y-1 rounded-lg bg-gray-50 ">
      <p>Pilihan :</p>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div key={index} className={`flex gap-2 ${index}`}>
            <Controller
              name={`otherOpt.option.${index}.label`}
              control={control}
              defaultValue={field.label}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Option Label"
                />
              )}
            />
            <Controller
              name={`otherOpt.option.${index}.value`}
              control={control}
              defaultValue={field.value}
              render={({ field }) => (
                <input {...field} className="w-20 p-2 text-sm border rounded" placeholder="Value" />
              )}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="ml-2 px-2 py-1 text-white text-sm rounded bg-red-500"
            >
              Remove
            </button>
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          </div>
          <FormErrorMessage message={errors?.otherOpt?.option?.[index]?.label?.message} />
          <FormErrorMessage message={errors?.otherOpt?.option?.[index]?.value?.message} />
        </div>
      ))}
      <div className="mt-4">
        <button
          type="button"
          onClick={addOption}
          className="px-2 py-1 bg-green-500 text-sm text-white rounded"
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default EditableRatioOptionForm;
