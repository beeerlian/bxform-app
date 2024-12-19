


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
