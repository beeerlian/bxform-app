import { Questions } from '@/__generated__/graphql';
import { IpaOptionITF, OptionItemITF } from '@/types/question_option';
import React, { useEffect, useState } from 'react';

interface EditOptionProps {
  question: Questions;
  setQuestion: React.Dispatch<React.SetStateAction<Questions>>;
}

interface OptionFormProps {
  options: OptionItemITF[] | null;
  enableAddOption?: boolean;
  enableModifyValue?: boolean;
  onOptionValueChange: (options: OptionItemITF[] | null) => void;
}

const OptionForm: React.FC<OptionFormProps> = ({
  options,
  onOptionValueChange,
  enableAddOption = true,
  enableModifyValue = true,
}) => {
  const [optionModified, setOptionsModified] = useState<OptionItemITF[] | null>(options);

  useEffect(() => {
    onOptionValueChange(optionModified);
  }, [optionModified]);

  const handleOnValueChange = (index: number, value: number) => {
    const newOptions = [...(optionModified || [])];
    newOptions[index] = {
      ...newOptions[index],
      value,
    };
    setOptionsModified(newOptions);
  };

  const handleOnLabelChange = (index: number, label: string) => {
    const newOptions = [...(optionModified || [])];
    newOptions[index] = {
      ...newOptions[index],
      label,
    };
    setOptionsModified(newOptions);
  };

  const addOption = () => {
    setOptionsModified((prev) => [...(prev || []), { label: '', value: 0 }]);
  };

  const removeOption = (index: number) => {
    const newOptions = [...(optionModified || [])];
    newOptions.splice(index, 1);
    setOptionsModified(newOptions);
  };

  return (
    <div className="div">
      {(optionModified ?? []).map((option: OptionItemITF, index: number) => (
        <div key={index} className="flex mb-2">
          <div>
            <label>Value</label>
            <input
              type="number"
              readOnly={!enableModifyValue}
              value={option.value}
              onChange={(e) => handleOnValueChange(index, parseInt(e.target.value) ?? null)}
              className="flex-grow p-2 border rounded-l"
            />
          </div>
          <div>
            <label>Label</label>
            <input
              type="text"
              value={option.label}
              onChange={(e) => handleOnLabelChange(index, e.target.value)}
              className="flex-grow p-2 border rounded-l"
            />
          </div>
          {enableAddOption && (
            <button
              onClick={() => removeOption(index)}
              className="px-2 bg-red-500 text-white rounded-r"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {enableAddOption && (
        <button onClick={addOption} className="px-2 py-1 bg-green-500 text-white rounded">
          Add Option
        </button>
      )}
    </div>
  );
};

const RatioOptionForm: React.FC<EditOptionProps> = ({ question, setQuestion }) => {
  const onOptionValueChange = (options: OptionItemITF[] | null) => {
    setQuestion((prev) => ({
      ...prev,
      option: options,
    }));
  };

  return <OptionForm options={question.option ?? []} onOptionValueChange={onOptionValueChange} />;
};

const MultipleOptionForm: React.FC<EditOptionProps> = ({ question, setQuestion }) => {
  const onOptionValueChange = (options: OptionItemITF[] | null) => {
    setQuestion((prev) => ({
      ...prev,
      option: options,
    }));
  };

  return <OptionForm options={question.option ?? []} onOptionValueChange={onOptionValueChange} />;
};

const defaultIpaOption: IpaOptionITF = {
  importanceLabel: '',
  importance: [
    {
      label: 'Tidak Penting',
      value: 1,
    },
    {
      label: 'Kurang Penting',
      value: 2,
    },
    {
      label: 'Cukup Penting',
      value: 3,
    },
    {
      label: 'Penting',
      value: 4,
    },
    {
      label: 'Sangat Penting',
      value: 5,
    },
  ],
  performanceLabel: '',
  performance: [
    {
      label: 'Tidak Baik',
      value: 1,
    },
    {
      label: 'Kurang Baik',
      value: 2,
    },
    {
      label: 'Cukup Baik',
      value: 3,
    },
    {
      label: 'Baik',
      value: 4,
    },
    {
      label: 'Sangat Baik',
      value: 5,
    },
  ],
};

const IpaOptionForm: React.FC<EditOptionProps> = ({ question, setQuestion }) => {
  let optionDefault = question.option as IpaOptionITF;

  if (
    !(question.option as IpaOptionITF)?.importance ||
    !(question.option as IpaOptionITF)?.performance
  ) {
    optionDefault = defaultIpaOption;
  }

  const [option, setOption] = useState<IpaOptionITF>(optionDefault);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOption(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as IpaOptionITF)
    );
  };
  const handleOptionChange = (name: string, value: OptionItemITF[]) => {
    setOption(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as IpaOptionITF)
    );
  };

  useEffect(() => {
    setQuestion((prev) => ({
      ...prev,
      option: option,
    }));
  }, [option]);

  return (
    <div className="div">
      <label>Importance</label>
      <input
        type="text"
        name="importanceLabel"
        placeholder="Masukan pertanyaan mengenai aspek Kepentingan (Seberapa penting aspek ini bagi anda?)"
        value={option?.importanceLabel}
        onChange={(e) => handleInputChange(e)}
        className="flex-grow p-2 border rounded-l"
      />
      <OptionForm
        options={option?.importance ?? []}
        onOptionValueChange={(value) => handleOptionChange('importance', value ?? [])}
        enableAddOption={false}
        enableModifyValue={false}
      />
      <label>Performance</label>
      <input
        type="text"
        name="performanceLabel"
        placeholder="Masukan pertanyaan mengenai aspek Performa (Seberapa baik kinerja aspek ini?)"
        value={option?.performanceLabel}
        onChange={(e) => handleInputChange(e)}
        className="flex-grow p-2 border rounded-l"
      />
      <OptionForm
        options={option?.performance ?? []}
        onOptionValueChange={(value) => handleOptionChange('performance', value ?? [])}
        enableAddOption={false}
        enableModifyValue={false}
      />
    </div>
  );
};

export const DynamicRatioOptions: React.FC<EditOptionProps> = ({ question, setQuestion }) => {
  const renderQuestion = (question: Questions) => {
    switch (question.question_type.code) {
      case 'essai':
        return <p>Essay question</p>;
      case 'multiple':
        return <MultipleOptionForm question={question} setQuestion={setQuestion} />;
      case 'option':
        return <RatioOptionForm question={question} setQuestion={setQuestion} />;
      case 'text':
        return <p className="font-semibold">Title: {question.content}</p>;
      case 'ipa':
        return <IpaOptionForm question={question} setQuestion={setQuestion} />;
      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <div>
      <label className="block mb-1">Options</label>
      {renderQuestion(question)}
    </div>
  );
};
