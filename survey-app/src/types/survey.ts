export interface Survey {
  id: string;
  title: string;
  questions: string[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: string[];
}

export interface Question {
  id: string;
  type: string;
  title: string;
  options: any;
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

export interface Response {
  id: string;
  respondent: string;
  answers: any;
}

export enum SurveyStatusLabel {
  Active = 'active',
  Closed = 'closed',
  Draft = 'draft',
}
export enum SurveyStatus {
  Active = 2,
  Closed = 3,
  Draft = 1,
}


