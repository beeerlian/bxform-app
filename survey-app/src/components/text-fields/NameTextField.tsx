import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface NameTextFieldProps {
  name: string;
  control: Control<any>;
}

const NameTextField: React.FC<NameTextFieldProps> = ({ name, control }) => {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={() => (
          <div className="p-2 border border-gray-200 bg-gray-50 rounded">
            <p className="text-gray-500 italic">[Name Field]</p>
          </div>
        )}
      />
    </div>
  );
};

export default NameTextField;
