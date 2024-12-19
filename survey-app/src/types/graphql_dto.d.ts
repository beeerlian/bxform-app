/** columns and relationships of "questions" */
export type Questions = {
  __typename?: "questions";
  caption?: string | null;
  content?: string;
  /** An object relationship */
  form: Forms;
  form_id: Scalars["uuid"]["output"];
  id: Scalars["uuid"]["output"];
  option?: Maybe<Scalars["jsonb"]["output"]>;
  option_type_id: Scalars["Int"]["output"];
  /** An array relationship */
  question_answers: Array<Question_Answers>;
  /** An aggregate relationship */
  question_answers_aggregate: Question_Answers_Aggregate;
  /** An object relationship */
  question_type: Question_Types;
  topic?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["timestamptz"]["output"]>;
};
