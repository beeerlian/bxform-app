import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  options: any;
  required?: boolean;
  disabled?: boolean;
}

const RatioOption: React.FC<Props> = ({ name, options, required, disabled }) => {
  const { register } = useFormContext();

  return (
    <div>
      {(options.option as any[]).map((option, idx) => (
        <label key={option.value} className="flex items-center gap-2 mb-1">
          <input
            type="radio"
            value={option.value}
            disabled={disabled}
            {...register(`${name}.data`, {
              required: required ? 'This field is required' : false,
            })}
            className="w-4 h-4"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RatioOption;
