export interface QuestionOptionITF {}

export interface IpaOptionITF extends QuestionOptionITF {
  importanceLabel: string;
  importance: OptionItemITF[];
  performanceLabel: string;
  performance: OptionItemITF[];
}

export interface MultipleOptionITF extends QuestionOptionITF {
  options: OptionItemITF[];
}

export interface OptionItemITF {
  value: number;
  label: string;
}

export interface RationOptionITF extends QuestionOptionITF {
  options: OptionItemITF[]?;
}

export interface OptionAnswerITF {
  value: number;
  label: string;
}

export interface MultipleAnswerITF {
  answer: OptionAnswerITF;
}

export interface RationAnswerITF {
  answer: OptionAnswerITF;
}

export interface IpaAnswerITF {
  importance: OptionItemITF;
  performance: OptionItemITF;
}
