import React from 'react';

interface Props {
  message?: string;
}

const FormErrorMessage: React.FC<Props> = ({ message }) => {
  return <div>{message && <p className="text-red-500 text-xs italic">{message!}</p>}</div>;
};

export default FormErrorMessage;
