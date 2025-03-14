import React from 'react';

import { FieldProps } from '@/types/dto-types';
import { Controller } from 'react-hook-form';
import RadioItem from './Radio';
interface Props extends React.HTMLAttributes<HTMLInputElement> {
  data: any;
  fieldData?: FieldProps;
  disabled?: boolean;
}

const IpaOption: React.FC<Props> = ({ data, fieldData, ...rest }) => {
  if (!fieldData) {
    return (
      <div>
        <div className="bg-gray-50 rounded-lg p-4">
          {data.importanceQuestion && <p>{data.importanceQuestion}</p>}
          <div className="md:grid md:grid-flow-row md:grid-cols-5 gap-1">
            {(data.importance ?? []).map((option: any, index: number) => (
              <RadioItem option={option} key={index} {...rest} disabled={rest.disabled} />
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          {data.performanceQuestion && <p className="mt-2">{data.performanceQuestion}</p>}
          <div className="md:grid md:grid-flow-row md:grid-cols-5 gap-1">
            {(data.performance ?? []).map((option: any, index: number) => (
              <RadioItem option={option} key={index} {...rest} disabled={rest.disabled} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-50 rounded-lg p-4">
        {data.importanceQuestion && <p>{data.importanceQuestion}</p>}
        <Controller
          key={`${fieldData.name}.data.importance`}
          name={`${fieldData.name}.data.importance`}
          control={fieldData.control}
          render={({ field }) => (
            <div key={fieldData.name} className="md:grid md:grid-flow-row md:grid-cols-5 gap-1">
              {(data.importance ?? []).map((option: any, index: number) => (
                <div key={`${fieldData.name}.${option.id}`} style={{ margin: '10px 0' }}>
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      {...field}
                      {...rest}
                      value={JSON.stringify(option)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mt-2">
        {data.performanceQuestion && <p>{data.performanceQuestion}</p>}
        <Controller
          key={`${fieldData.name}.data.performance`}
          name={`${fieldData.name}.data.performance`}
          control={fieldData.control}
          render={({ field }) => (
            <div key={fieldData.name} className="md:grid md:grid-flow-row md:grid-cols-5 gap-1">
              {(data.performance ?? []).map((option: any, index: number) => (
                <div key={`${fieldData.name}.${option.id}`} style={{ margin: '10px 0' }}>
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      {...field}
                      {...rest}
                      value={JSON.stringify(option)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IpaOption;
