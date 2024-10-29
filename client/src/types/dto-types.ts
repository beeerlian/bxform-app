export enum SurveyStatusLabel {
  Active = "active",
  Closed = "closed",
  Draft = "draft",
}
export enum SurveyStatus {
  Active = 2,
  Closed = 3,
  Draft = 1,
}

export function convertSurveyStatus(surveyStatus: number): SurveyStatus | null {
  switch (surveyStatus) {
    case 2:
      return SurveyStatus.Active;
    case 3:
      return SurveyStatus.Closed;
    case 1:
      return SurveyStatus.Draft;
    default:
      return null;
  }
}

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
