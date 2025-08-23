import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface MultipleFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  options: any[];
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

const MultipleField: React.FC<MultipleFieldProps> = ({
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
        render={({ field: { onChange, value = [] } }) => (
          <div className="space-y-1">
            {options.map((option, idx) => (
              <label key={option.value} className="flex items-center gap-2 mb-1">
                <input
                  id={`${id}-${idx}`}
                  type="checkbox"
                  className={`w-4 h-4 ${
                    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                  checked={value[idx]?.selected || false}
                  onChange={(e) => {
                    const newValue = [...(value || [])];
                    newValue[idx] = {
                      ...option,
                      selected: e.target.checked,
                    };
                    onChange(newValue);
                  }}
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

export default MultipleField;
