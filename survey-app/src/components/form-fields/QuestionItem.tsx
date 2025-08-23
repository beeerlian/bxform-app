import { Questions } from '@/__generated__/graphql';
import QuestionTypeChip from '@/components/chip/QuestionTypeChip';
import AddressField from '@/components/form-fields/AddressField';
import DateField from '@/components/form-fields/DateField';
import DateTimeField from '@/components/form-fields/DateTimeField';
import EmailField from '@/components/form-fields/EmailField';
import EssaiField from '@/components/form-fields/EssaiField';
import IPAField from '@/components/form-fields/IPAField';
import MultipleField from '@/components/form-fields/MultipleField';
import NameField from '@/components/form-fields/NameField';
import NumberField from '@/components/form-fields/NumberField';
import PhoneField from '@/components/form-fields/PhoneField';
import RatioField from '@/components/form-fields/RatioField';
import TimeField from '@/components/form-fields/TimeField';
import { OptionType } from '@/types/dto-types';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import TextField from './TextField';

interface QuestionItemProps {
  question: Questions;
  control: Control<any>;
  errors: FieldErrors;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, control, errors }) => {
  const fieldName = `question_${question.id}`;
  const error = errors[fieldName];

  const renderField = () => {
    const type = question.option?.type as OptionType;
    const errorMessage = error ? (error.message as string) : undefined;
    const errorObj = error ? { type: 'validate', message: errorMessage } : undefined;

    switch (type) {
      case 'Multiple':
        return (
          <MultipleField
            id={fieldName}
            name={fieldName}
            control={control}
            options={question.option?.option || []}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Ratio':
        return (
          <RatioField
            id={fieldName}
            name={fieldName}
            control={control}
            options={question.option?.option || []}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Importance Performance':
        return (
          <IPAField
            id={fieldName}
            name={fieldName}
            control={control}
            option={question.option}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Essai':
        return (
          <EssaiField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Name':
        return (
          <NameField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Email':
        return (
          <EmailField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Date':
        return (
          <DateField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Time':
        return (
          <TimeField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'DateTime':
        return (
          <DateTimeField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Number':
        return (
          <NumberField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Phone':
        return (
          <PhoneField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Address':
        return (
          <AddressField
            id={fieldName}
            name={fieldName}
            control={control}
            error={errorObj}
            required={question.required}
          />
        );

      case 'Text':
        return <TextField id={fieldName} name={fieldName} control={control} question={question} />;

      default:
        return null;
    }
  };

  return (
    <div className="border p-4 rounded w-full">
      <div className="flex gap-2 justify-end">
        {question.required && (
          <div className="flex items-center justify-center px-2 rounded bg-red-100 text-red-500 text-xs">
            Required
          </div>
        )}
        <QuestionTypeChip type={question.option?.type} />
      </div>
      <p className="font-medium mb-2">{question.content}</p>
      {question.caption && <p className="text-sm text-gray-500 mb-3">{question.caption}</p>}
      {renderField()}
    </div>
  );
};

export default QuestionItem;
