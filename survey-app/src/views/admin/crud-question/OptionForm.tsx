import { QuestionFormITF } from '@/types/dto-types';
import { optionTypeList } from '@/utils/constants';
import { capitalize } from '@/utils/string.util';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EditableRatioOptionForm from './EditableRatioOptionForm';
import IPAOptionForm from './IPAOptionForm';

interface Props {
  option?: any;
}

const OptionForm: React.FC<Props> = ({ option }) => {
  const { control, watch, formState, setValue } = useFormContext<QuestionFormITF>();

  const type = watch('type');

  useEffect(() => {
    if (type === 'Text') {
      setValue('required', false);
    }
  }, [type]);

  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-end justify-between ">
        <div>
          <label htmlFor="type" className="text-sm">
            Question Type
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select {...field} id="type" className="w-full p-1 border rounded text-sm">
                {optionTypeList.map((type) => (
                  <option key={type} value={type}>
                    {capitalize(type)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        {type !== 'Text' && (
          <Controller
            key="required"
            name="required"
            control={control}
            render={({ field }) => (
              <div className="items-end">
                <label htmlFor="content" className="flex mb-1 items-center text-sm italic">
                  <input
                    type="checkbox"
                    {...field}
                    value={field.value.toString()}
                    checked={!!field.value}
                    ref={field.ref}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                  />
                  This Question is Required
                </label>
                {formState.errors.required && (
                  <p className="text-red-500">{formState.errors.required.message}</p>
                )}
              </div>
            )}
          />
        )}
      </div>
      {type == 'Importance Performance' && <IPAOptionForm option={option} />}
      {(type == 'Multiple' || type == 'Ratio') && <EditableRatioOptionForm option={option} />}
    </div>
  );
};

export default OptionForm;
