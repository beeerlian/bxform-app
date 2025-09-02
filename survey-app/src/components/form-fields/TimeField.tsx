import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface TimeFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

const TimeField: React.FC<TimeFieldProps> = ({ id, name, control, error, required, disabled }) => {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type="time"
            id={id}
            {...field}
            value={field.value ?? ''}
            className={`w-full p-2 border rounded ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TimeField;
