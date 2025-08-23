import { Questions } from '@/__generated__/graphql';
import { OptionType } from '@/types/dto-types';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

// Import all text field components
import AddressTextField from '@/components/text-fields/AddressTextField';
import DateTextField from '@/components/text-fields/DateTextField';
import DateTimeTextField from '@/components/text-fields/DateTimeTextField';
import EmailTextField from '@/components/text-fields/EmailTextField';
import NameTextField from '@/components/text-fields/NameTextField';
import NumberTextField from '@/components/text-fields/NumberTextField';
import PhoneTextField from '@/components/text-fields/PhoneTextField';
import TimeTextField from '@/components/text-fields/TimeTextField';

interface TextFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  question?: Questions;
}

const TextField: React.FC<TextFieldProps> = ({ id, name, control, question }) => {
  // Get the question type if available
  const type = question?.option?.type as OptionType;

  // Render different components based on the question type
  if (type) {
    switch (type) {
      case 'Name':
        return <NameTextField name={name} control={control} />;
      case 'Email':
        return <EmailTextField name={name} control={control} />;
      case 'Date':
        return <DateTextField name={name} control={control} />;
      case 'Time':
        return <TimeTextField name={name} control={control} />;
      case 'DateTime':
        return <DateTimeTextField name={name} control={control} />;
      case 'Number':
        return <NumberTextField name={name} control={control} />;
      case 'Phone':
        return <PhoneTextField name={name} control={control} />;
      case 'Address':
        return <AddressTextField name={name} control={control} />;
    }
  }

  // Default display for text or unknown types
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => <p className="">{field.value}</p>}
      />
    </div>
  );
};

export default TextField;
