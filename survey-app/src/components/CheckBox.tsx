import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  option: any;
  disabled?: boolean;
  field?: ControllerRenderProps<any, string>;
}

const CheckBoxItem: React.FC<Props> = ({ option, ...rest }) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          {...rest}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
        />
        {option.label}
      </label>
    </div>
  );
};

export default CheckBoxItem;
