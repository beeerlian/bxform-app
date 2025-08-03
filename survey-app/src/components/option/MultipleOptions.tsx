import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  options: any;
  required?: boolean;
  disabled?: boolean;
}

const MultipleOption: React.FC<Props> = ({ name, options, required, disabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {(options.option as any[]).map((option, idx) => (
        <label key={option.value} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            {...register(`${name}.data.${idx}.selected`, {
              required: required ? 'This field is required' : false,
            })}
            className="w-4 h-4"
            disabled={disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default MultipleOption;
