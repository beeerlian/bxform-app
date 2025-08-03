import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  disabled?: boolean;
}

const EssaiOption: React.FC<Props> = ({ name, required, disabled }) => {
  const { register } = useFormContext();

  return (
    <textarea
      {...register(`${name}.data`, {
        required: required ? 'This field is required' : false,
      })}
      className="w-full h-24 p-2 border rounded resize-none"
      disabled={disabled}
    />
  );
};

export default EssaiOption;
