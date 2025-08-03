import { Control } from 'react-hook-form';

export type FormListProps = {
  limit?: number;
  offset?: number;
  status?: number;
  orderBy?: { field: string; asc: boolean };
};

export interface QuestionOptionType {
  label: string;
  value: number;
}
export interface IPQuestionOptionType {
  importance: QuestionOptionType[];
  performance: QuestionOptionType[];
}

export type OptionType = 'Importance Performance' | 'Multiple' | 'Ratio' | 'Essai' | 'Text';

export interface ModalWithPropsType<T> {
  isOpen: boolean;
  props: T | null;
}


export interface OptionITF {
  id: string;
  answer: {
    data: any;
    option: any;
  };
}

export interface FieldProps {
  name: string;
  control: Control<any, any>;
}

export type QuissionareStatus = 1 | 2 | 3;

export interface QuestionFormITF {
  content: string;
  caption?: string;
  type: OptionType;
  required: boolean;
  ipaOpt: {
    importanceQuestion: string;
    performanceQuestion: string;
    importance: { id: string; label: string; value: number }[];
    performance: { id: string; label: string; value: number }[];
  };
  otherOpt: {
    option: { id: string; label: string; value: number }[] | null;
  };
}
