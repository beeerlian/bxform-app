import React from 'react';
import { IoClipboard } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface Props {
  value: any;
  disabled?: boolean;
}

const CopyableField: React.FC<Props> = ({ value, ...rest }) => {
  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
    toast.success('Copied to clipboard');
  };
  return (
    <div style={{ margin: '10px 0' }}>
      <div className="relative">
        <input
          type="text"
          value={value}
          {...rest}
          readOnly
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          type="button"
          onClick={() => copyToClipboard(value)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          <IoClipboard className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CopyableField;
