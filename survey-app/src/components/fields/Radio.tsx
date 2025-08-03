import React from 'react';

interface Props {
  option: any;
  disabled?: boolean;
}

const RadioItem: React.FC<Props> = ({ option, ...rest }) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
        <input type="radio" {...rest} style={{ marginRight: '10px' }} />
        {option.label}
      </label>
    </div>
  );
};

export default RadioItem;
