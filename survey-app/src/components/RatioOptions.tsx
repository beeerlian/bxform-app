import React from 'react';

import { FieldProps } from '@/types/dto-types';
import { Controller } from 'react-hook-form';
import RadioItem from './Radio';
interface Props extends React.HTMLAttributes<HTMLInputElement> {
  data: any;
  fieldData?: FieldProps;
  disabled?: boolean;
}

const RatioOption: React.FC<Props> = ({ data, fieldData, ...rest }) => {
  if (!fieldData) {
    return (
      <div>
        {data.option.map((option: any, index: number) => (
          <RadioItem option={option} key={index} {...rest} disabled={rest.disabled} />
        ))}
      </div>
    );
  }
  return (
    <Controller
      key={fieldData.name}
      name={`${fieldData.name}.answer.data`}
      control={fieldData.control}
      render={({ field }) => (
        <div key={fieldData.name}>
          {data.option.map((option: any, index: number) => (
            <div key={`${fieldData.name}.${option.id}`} style={{ margin: '10px 0' }}>
              <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  {...field}
                  {...rest}
                  value={JSON.stringify(option)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default RatioOption;
