import { QuestionFormITF } from '@/types/dto-types';
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
    // For read-only field types, set required to false
    if (type === 'Text') {
      setValue('required', false);
    }
  }, [type, setValue]);

  // Group question types for better organization in the dropdown
  const groupedTypes = {
    'Basic Types': ['Importance Performance', 'Multiple', 'Ratio', 'Essai', 'Text'],
    'Form Fields': ['Name', 'Email', 'Date', 'Time', 'DateTime', 'Number', 'Phone', 'Address'],
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end justify-between">
        <div className="w-1/2">
          <label htmlFor="type" className="text-sm font-medium">
            Question Type
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select {...field} id="type" className="w-full p-2 border rounded text-sm">
                {Object.entries(groupedTypes).map(([group, types]) => (
                  <optgroup key={group} label={group}>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {capitalize(type)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
          />
          <p className="text-xs text-gray-500 mt-1">
            {type === 'Multiple' || type === 'Ratio'
              ? 'This question type needs options below'
              : type === 'Importance Performance'
              ? 'This is an IPA question type'
              : 'This is a single input field'}
          </p>
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

      {/* Show appropriate configuration section based on question type */}
      {type === 'Importance Performance' && <IPAOptionForm option={option} />}
      {(type === 'Multiple' || type === 'Ratio') && <EditableRatioOptionForm option={option} />}

      {/* Preview of the field type */}
      {[
        'Name',
        'Email',
        'Date',
        'Time',
        'DateTime',
        'Number',
        'Phone',
        'Address',
        'Essai',
      ].includes(type) && (
        <div className="bg-gray-50 p-2 rounded border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          <div
            className={`p-2 border rounded ${type === 'Essai' || type === 'Address' ? 'h-24' : ''}`}
          >
            <p className="text-gray-400 italic text-sm">[{capitalize(type)} field]</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionForm;
