import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  option: any;
  required?: boolean;
  disabled?: boolean;
}

const IpaOption: React.FC<Props> = ({ name, option, required, disabled }) => {
  const { register } = useFormContext();

  return (
    <div>
      <div className="mb-2">
        <p>{option.importanceQuestion}</p>
        {option.importance.map((opt: any, idx: number) => (
          <label key={opt.value} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              value={opt.value}
              {...register(`${name}.data.importance`, {
                required: required ? 'This field is required' : false,
              })}
              className="w-4 h-4"
              disabled={disabled}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div>
        <p>{option.performanceQuestion}</p>
        {option.performance.map((opt: any, idx: number) => (
          <label key={opt.value} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              value={opt.value}
              {...register(`${name}.data.performance`, {
                required: required ? 'This field is required' : false,
              })}
              className="w-4 h-4"
              disabled={disabled}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default IpaOption;
