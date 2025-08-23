import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface RatioFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  options: any[];
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

const RatioField: React.FC<RatioFieldProps> = ({
  id,
  name,
  control,
  options,
  error,
  required,
  disabled,
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="space-y-1">
            {options.map((option, idx) => (
              <label key={option.value} className="flex items-center gap-2 mb-1">
                <input
                  id={`${id}-${idx}`}
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className={`w-4 h-4 ${
                    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={disabled}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default RatioField;
