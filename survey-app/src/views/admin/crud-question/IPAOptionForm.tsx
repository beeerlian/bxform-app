import FormErrorMessage from '@/components/FormErrorMessage';
import { QuestionFormITF } from '@/types/dto-types';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface Props {
  onOptionChanged?: (data: any) => void;
  option?: any;
}

const IPAOptionForm: React.FC<Props> = ({}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuestionFormITF>();

  const { fields: importanceF } = useFieldArray({
    control,
    name: 'ipaOpt.importance',
  });

  const { fields: performanceF } = useFieldArray({
    control,
    name: 'ipaOpt.performance',
  });

  // const onFormChanged = (data: any) => {
  //   console.log(data);
  //   onOptionChanged(data);
  // };

  // // Trigger onOptionChanged when fields are appended or removed
  // useEffect(() => {
  //   onOptionChanged(getValues());
  // }, [importanceF, performanceF, getValues]);

  return (
    <div>
      <p>Pilihan</p>
      <p>Importance</p>
      <Controller
        name={`ipaOpt.importanceQuestion`}
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => (
          <div>
            <input
              {...field}
              className="w-full p-2 border rounded"
              placeholder="Bagaimana performa dari aspek ini menurut anda?"
            />
            <FormErrorMessage message={errors?.ipaOpt?.importanceQuestion?.message} />
          </div>
        )}
      />
      {importanceF.map((item, index) => (
        <div key={`${item.id}`}>
          <div key={`${item.id}`} className={`flex gap-2 ${index}`}>
            <Controller
              name={`ipaOpt.importance.${index}.label`}
              control={control}
              defaultValue={item.label}
              rules={{ required: 'label is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded"
                  placeholder="Option Label"
                />
              )}
            />
            <Controller
              name={`ipaOpt.importance.${index}.value`}
              control={control}
              defaultValue={item.value}
              rules={{ required: 'value is required' }}
              render={({ field }) => (
                <input {...field} className="w-20 p-2 border rounded" placeholder="Value" />
              )}
            />
          </div>
          <FormErrorMessage message={errors?.ipaOpt?.importance?.[index]?.label?.message} />
          <FormErrorMessage message={errors?.ipaOpt?.importance?.[index]?.value?.message} />
        </div>
      ))}
      <p>Performance</p>
      <Controller
        name={`ipaOpt.performanceQuestion`}
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => (
          <div>
            <input
              {...field}
              className="w-full p-2 border rounded"
              placeholder="Seberapa penting aspek ini bagi anda?"
            />
            <FormErrorMessage message={errors?.ipaOpt?.performanceQuestion?.message} />
          </div>
        )}
      />

      {performanceF.map((item, index) => (
        <div key={`${item.id}`}>
          <div key={`${item.id}`} className={`flex gap-2 ${index}`}>
            <Controller
              name={`ipaOpt.performance.${index}.label`}
              control={control}
              defaultValue={item.label}
              rules={{ required: 'required' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded"
                  placeholder="Option Label"
                />
              )}
            />
            <Controller
              name={`ipaOpt.performance.${index}.value`}
              control={control}
              defaultValue={item.value}
              rules={{ required: 'required' }}
              render={({ field }) => (
                <input {...field} className="w-20 p-2 border rounded" placeholder="Value" />
              )}
            />
          </div>
          <FormErrorMessage message={errors?.ipaOpt?.performance?.[index]?.label?.message} />
          <FormErrorMessage message={errors?.ipaOpt?.performance?.[index]?.value?.message} />
        </div>
      ))}
    </div>
  );
};

export default IPAOptionForm;
