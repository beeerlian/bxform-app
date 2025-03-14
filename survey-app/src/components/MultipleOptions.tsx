import { FieldProps } from '@/types/dto-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import CheckBoxItem from './CheckBox';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  data: any;
  fieldData?: FieldProps;
  disabled?: boolean;
}

const MultipleOption: React.FC<Props> = ({ data, fieldData, ...rest }) => {
  if (!fieldData) {
    return (
      <div>
        {data.option.map((option: any, index: number) => (
          <CheckBoxItem option={option} key={index} {...rest} disabled={rest.disabled} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {data.option.map((option: any, index: number) => (
        <Controller
          key={`${fieldData!.name}.${index}`}
          name={fieldData!.name + `.answer.data.${index}.selected`}
          control={fieldData!.control}
          render={({ field }) => (
            <div style={{ margin: '10px 0' }}>
              <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  {...field}
                  checked={!!field.value}
                  ref={field.ref}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                />
                {option.label}
              </label>
            </div>
          )}
        />
      ))}
    </div>
  );
};

export default MultipleOption;
