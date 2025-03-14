import React from 'react';

import { FieldProps } from '@/types/dto-types';
import { Controller } from 'react-hook-form';
interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  data: any;
  fieldData?: FieldProps;
  disabled?: boolean;
}

const EssaiOption: React.FC<Props> = ({ data, fieldData, ...rest }) => {
  if (!fieldData) {
    return (
      <div>
        <textarea className="w-full h-24 p-2 border rounded resize-none" {...rest} />
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
          <textarea
            className="w-full h-24 p-2 border rounded resize-none"
            {...field}
            {...rest}
            value={field.value ?? ''}
          />
        </div>
      )}
    />
  );
};

export default EssaiOption;
