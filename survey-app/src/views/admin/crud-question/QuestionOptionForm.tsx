import { OptionType } from '@/types/dto-types';
import { optionTypeList } from '@/utils/constants';
import { capitalize } from '@/utils/string.util';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface Props {
  onOptionChanged: (data: any) => void;
  option?: any;
}
interface FormData {
  type: OptionType,
  option: { label: string; value: number }[];
}

const QuestionOptionForm: React.FC<Props> = ({
  onOptionChanged,
  option
}) => {
  
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    defaultValues: {
      type : option?.type || "Text",
      option: option?.option || [],
    },
  });


  const { fields, append, remove, } = useFieldArray({
    control,
    name: 'option',
  });


  const addOption = () => {
    const newOption = { label: `Option ${fields.length + 1}`, value: fields.length + 1 };
    append(newOption);
  };

  const removeOption = (index: number) => {
    remove(index);
  };

  const onFormChanged = (data: any) => {
    console.log(data);
    onOptionChanged(data);
  }

  // Trigger onOptionChanged when fields are appended or removed
  useEffect(() => {
    onOptionChanged(getValues());
  }, [fields, getValues]);

  return (
    <div  onChange={handleSubmit(onFormChanged)} className="space-y-4">
      <div>
            <label htmlFor="type" className="block mb-1">
              Question Type
            </label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Question type is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="type"
                  className="w-full p-2 border rounded"
                >
                  {optionTypeList.map((type) => (
                    <option key={type} value={type}>
                      {capitalize(type)}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          </div>
      {fields.map((field, index) => (
        <div>     
        <div key={field.id} className={`flex gap-2 ${index}`}>
          <Controller
            name={`option.${index}.label`}
            control={control}
            defaultValue={field.label}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border rounded"
                placeholder="Option Label"
              />
            )}
          />
          <Controller
            name={`option.${index}.value`}
            control={control}
            defaultValue={field.value}
            render={({ field }) => (
              <input
                {...field}
                className="w-20 p-2 border rounded"
                placeholder="Value"
              />
            )}
          />
          <button type="button" onClick={() => removeOption(index)} className="ml-2 px-2 py-1 text-white rounded bg-red-500">
            Remove
          </button>
        </div>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>
      ))}
      <button type="button" onClick={addOption} className="px-4 py-2 bg-green-500 text-white rounded">
        Add Option
      </button>
    </div>
  );
};

export default QuestionOptionForm;
