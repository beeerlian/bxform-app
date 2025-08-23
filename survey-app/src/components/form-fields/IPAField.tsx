import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface IPAFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  option: any;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

const IPAField: React.FC<IPAFieldProps> = ({
  id,
  name,
  control,
  option,
  error,
  required,
  disabled,
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = { importance: null, performance: null } } }) => (
          <>
            <div className="mb-4 ml-4 border-l-4 border-blue-500 pl-4">
              <p className="font-medium mb-1">{option.importanceQuestion}</p>
              <div className="space-y-1">
                {option.importance.map((opt: any, idx: number) => (
                  <label key={opt.value} className="flex items-center gap-2 mb-1">
                    <input
                      id={`${id}-importance-${idx}`}
                      type="radio"
                      value={opt.value}
                      checked={value.importance === opt.value}
                      onChange={() => {
                        onChange({
                          ...value,
                          importance: opt.value,
                        });
                      }}
                      className={`w-4 h-4 ${error && !value.importance ? 'border-red-500' : ''}`}
                      disabled={disabled}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {error && !value.importance && (
                <p className="mt-1 text-sm text-red-500">Please rate the importance</p>
              )}
            </div>

            <div className="ml-4 border-l-4 border-blue-500 pl-4">
              <p className="font-medium mb-1">{option.performanceQuestion}</p>
              <div className="space-y-1">
                {option.performance.map((opt: any, idx: number) => (
                  <label key={opt.value} className="flex items-center gap-2 mb-1">
                    <input
                      id={`${id}-performance-${idx}`}
                      type="radio"
                      value={opt.value}
                      checked={value.performance === opt.value}
                      onChange={() => {
                        onChange({
                          ...value,
                          performance: opt.value,
                        });
                      }}
                      className={`w-4 h-4 ${error && !value.performance ? 'border-red-500' : ''}`}
                      disabled={disabled}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {error && !value.performance && (
                <p className="mt-1 text-sm text-red-500">Please rate the performance</p>
              )}
            </div>
          </>
        )}
      />
      {error && typeof error.message === 'string' && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default IPAField;
