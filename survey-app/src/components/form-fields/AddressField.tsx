import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface AddressFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

const AddressField: React.FC<AddressFieldProps> = ({
  id,
  name,
  control,
  error,
  required,
  disabled,
}) => {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            id={id}
            {...field}
            className={`w-full h-24 p-2 border rounded resize-none ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Enter your address"
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default AddressField;
