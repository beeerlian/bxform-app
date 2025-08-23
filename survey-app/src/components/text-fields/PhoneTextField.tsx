import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface PhoneTextFieldProps {
  name: string;
  control: Control<any>;
}

const PhoneTextField: React.FC<PhoneTextFieldProps> = ({ name, control }) => {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={() => (
          <div className="p-2 border border-gray-200 bg-gray-50 rounded">
            <p className="text-gray-500 italic">[Phone Field]</p>
          </div>
        )}
      />
    </div>
  );
};

export default PhoneTextField;
