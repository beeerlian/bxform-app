/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  jsonb: { input: any; output: any; }
  smallint: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "answer_sheets" */
export type Answer_Sheets = {
  __typename?: 'answer_sheets';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  form: Forms;
  form_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  question_answers: Array<Question_Answers>;
  /** An aggregate relationship */
  question_answers_aggregate: Question_Answers_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "answer_sheets" */
export type Answer_SheetsQuestion_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


/** columns and relationships of "answer_sheets" */
export type Answer_SheetsQuestion_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};

/** aggregated selection of "answer_sheets" */
export type Answer_Sheets_Aggregate = {
  __typename?: 'answer_sheets_aggregate';
  aggregate?: Maybe<Answer_Sheets_Aggregate_Fields>;
  nodes: Array<Answer_Sheets>;
};

export type Answer_Sheets_Aggregate_Bool_Exp = {
  count?: InputMaybe<Answer_Sheets_Aggregate_Bool_Exp_Count>;
};

export type Answer_Sheets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Answer_Sheets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "answer_sheets" */
export type Answer_Sheets_Aggregate_Fields = {
  __typename?: 'answer_sheets_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Answer_Sheets_Max_Fields>;
  min?: Maybe<Answer_Sheets_Min_Fields>;
};


/** aggregate fields of "answer_sheets" */
export type Answer_Sheets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "answer_sheets" */
export type Answer_Sheets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Answer_Sheets_Max_Order_By>;
  min?: InputMaybe<Answer_Sheets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "answer_sheets" */
export type Answer_Sheets_Arr_Rel_Insert_Input = {
  data: Array<Answer_Sheets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Answer_Sheets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "answer_sheets". All fields are combined with a logical 'AND'. */
export type Answer_Sheets_Bool_Exp = {
  _and?: InputMaybe<Array<Answer_Sheets_Bool_Exp>>;
  _not?: InputMaybe<Answer_Sheets_Bool_Exp>;
  _or?: InputMaybe<Array<Answer_Sheets_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form?: InputMaybe<Forms_Bool_Exp>;
  form_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  question_answers?: InputMaybe<Question_Answers_Bool_Exp>;
  question_answers_aggregate?: InputMaybe<Question_Answers_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "answer_sheets" */
export enum Answer_Sheets_Constraint {
  /** unique or primary key constraint on columns "id" */
  AnswerSheetsPkey = 'answer_sheets_pkey'
}

/** input type for inserting data into table "answer_sheets" */
export type Answer_Sheets_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form?: InputMaybe<Forms_Obj_Rel_Insert_Input>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  question_answers?: InputMaybe<Question_Answers_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Answer_Sheets_Max_Fields = {
  __typename?: 'answer_sheets_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "answer_sheets" */
export type Answer_Sheets_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Answer_Sheets_Min_Fields = {
  __typename?: 'answer_sheets_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "answer_sheets" */
export type Answer_Sheets_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "answer_sheets" */
export type Answer_Sheets_Mutation_Response = {
  __typename?: 'answer_sheets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Answer_Sheets>;
};

/** input type for inserting object relation for remote table "answer_sheets" */
export type Answer_Sheets_Obj_Rel_Insert_Input = {
  data: Answer_Sheets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Answer_Sheets_On_Conflict>;
};

/** on_conflict condition type for table "answer_sheets" */
export type Answer_Sheets_On_Conflict = {
  constraint: Answer_Sheets_Constraint;
  update_columns?: Array<Answer_Sheets_Update_Column>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};

/** Ordering options when selecting data from "answer_sheets". */
export type Answer_Sheets_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form?: InputMaybe<Forms_Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_answers_aggregate?: InputMaybe<Question_Answers_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: answer_sheets */
export type Answer_Sheets_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "answer_sheets" */
export enum Answer_Sheets_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "answer_sheets" */
export type Answer_Sheets_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "answer_sheets" */
export type Answer_Sheets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Answer_Sheets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Answer_Sheets_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "answer_sheets" */
export enum Answer_Sheets_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Answer_Sheets_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Answer_Sheets_Set_Input>;
  /** filter the rows which have to be updated */
  where: Answer_Sheets_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "form_access" */
export type Form_Access = {
  __typename?: 'form_access';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  form: Forms;
  form_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "form_access" */
export type Form_Access_Aggregate = {
  __typename?: 'form_access_aggregate';
  aggregate?: Maybe<Form_Access_Aggregate_Fields>;
  nodes: Array<Form_Access>;
};

export type Form_Access_Aggregate_Bool_Exp = {
  count?: InputMaybe<Form_Access_Aggregate_Bool_Exp_Count>;
};

export type Form_Access_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Form_Access_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Form_Access_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "form_access" */
export type Form_Access_Aggregate_Fields = {
  __typename?: 'form_access_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Form_Access_Max_Fields>;
  min?: Maybe<Form_Access_Min_Fields>;
};


/** aggregate fields of "form_access" */
export type Form_Access_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Form_Access_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "form_access" */
export type Form_Access_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Form_Access_Max_Order_By>;
  min?: InputMaybe<Form_Access_Min_Order_By>;
};

/** input type for inserting array relation for remote table "form_access" */
export type Form_Access_Arr_Rel_Insert_Input = {
  data: Array<Form_Access_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Form_Access_On_Conflict>;
};

/** Boolean expression to filter rows from the table "form_access". All fields are combined with a logical 'AND'. */
export type Form_Access_Bool_Exp = {
  _and?: InputMaybe<Array<Form_Access_Bool_Exp>>;
  _not?: InputMaybe<Form_Access_Bool_Exp>;
  _or?: InputMaybe<Array<Form_Access_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form?: InputMaybe<Forms_Bool_Exp>;
  form_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "form_access" */
export enum Form_Access_Constraint {
  /** unique or primary key constraint on columns "id" */
  FormAccessPkey = 'form_access_pkey'
}

/** input type for inserting data into table "form_access" */
export type Form_Access_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form?: InputMaybe<Forms_Obj_Rel_Insert_Input>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Form_Access_Max_Fields = {
  __typename?: 'form_access_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "form_access" */
export type Form_Access_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Form_Access_Min_Fields = {
  __typename?: 'form_access_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "form_access" */
export type Form_Access_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "form_access" */
export type Form_Access_Mutation_Response = {
  __typename?: 'form_access_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Form_Access>;
};

/** on_conflict condition type for table "form_access" */
export type Form_Access_On_Conflict = {
  constraint: Form_Access_Constraint;
  update_columns?: Array<Form_Access_Update_Column>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};

/** Ordering options when selecting data from "form_access". */
export type Form_Access_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form?: InputMaybe<Forms_Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: form_access */
export type Form_Access_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "form_access" */
export enum Form_Access_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "form_access" */
export type Form_Access_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "form_access" */
export type Form_Access_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Form_Access_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Form_Access_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "form_access" */
export enum Form_Access_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Form_Access_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Form_Access_Set_Input>;
  /** filter the rows which have to be updated */
  where: Form_Access_Bool_Exp;
};

/** columns and relationships of "form_audiences" */
export type Form_Audiences = {
  __typename?: 'form_audiences';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  form: Forms;
  form_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  role: Roles;
  role_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "form_audiences" */
export type Form_Audiences_Aggregate = {
  __typename?: 'form_audiences_aggregate';
  aggregate?: Maybe<Form_Audiences_Aggregate_Fields>;
  nodes: Array<Form_Audiences>;
};

export type Form_Audiences_Aggregate_Bool_Exp = {
  count?: InputMaybe<Form_Audiences_Aggregate_Bool_Exp_Count>;
};

export type Form_Audiences_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Form_Audiences_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "form_audiences" */
export type Form_Audiences_Aggregate_Fields = {
  __typename?: 'form_audiences_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Form_Audiences_Max_Fields>;
  min?: Maybe<Form_Audiences_Min_Fields>;
};


/** aggregate fields of "form_audiences" */
export type Form_Audiences_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "form_audiences" */
export type Form_Audiences_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Form_Audiences_Max_Order_By>;
  min?: InputMaybe<Form_Audiences_Min_Order_By>;
};

/** input type for inserting array relation for remote table "form_audiences" */
export type Form_Audiences_Arr_Rel_Insert_Input = {
  data: Array<Form_Audiences_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Form_Audiences_On_Conflict>;
};

/** Boolean expression to filter rows from the table "form_audiences". All fields are combined with a logical 'AND'. */
export type Form_Audiences_Bool_Exp = {
  _and?: InputMaybe<Array<Form_Audiences_Bool_Exp>>;
  _not?: InputMaybe<Form_Audiences_Bool_Exp>;
  _or?: InputMaybe<Array<Form_Audiences_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form?: InputMaybe<Forms_Bool_Exp>;
  form_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Roles_Bool_Exp>;
  role_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "form_audiences" */
export enum Form_Audiences_Constraint {
  /** unique or primary key constraint on columns "id" */
  FormAudiencesPkey = 'form_audiences_pkey'
}

/** input type for inserting data into table "form_audiences" */
export type Form_Audiences_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form?: InputMaybe<Forms_Obj_Rel_Insert_Input>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Roles_Obj_Rel_Insert_Input>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Form_Audiences_Max_Fields = {
  __typename?: 'form_audiences_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "form_audiences" */
export type Form_Audiences_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Form_Audiences_Min_Fields = {
  __typename?: 'form_audiences_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "form_audiences" */
export type Form_Audiences_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "form_audiences" */
export type Form_Audiences_Mutation_Response = {
  __typename?: 'form_audiences_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Form_Audiences>;
};

/** on_conflict condition type for table "form_audiences" */
export type Form_Audiences_On_Conflict = {
  constraint: Form_Audiences_Constraint;
  update_columns?: Array<Form_Audiences_Update_Column>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};

/** Ordering options when selecting data from "form_audiences". */
export type Form_Audiences_Order_By = {
  created_at?: InputMaybe<Order_By>;
  form?: InputMaybe<Forms_Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Roles_Order_By>;
  role_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: form_audiences */
export type Form_Audiences_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "form_audiences" */
export enum Form_Audiences_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "form_audiences" */
export type Form_Audiences_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "form_audiences" */
export type Form_Audiences_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Form_Audiences_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Form_Audiences_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "form_audiences" */
export enum Form_Audiences_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Form_Audiences_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Form_Audiences_Set_Input>;
  /** filter the rows which have to be updated */
  where: Form_Audiences_Bool_Exp;
};

/** columns and relationships of "form_category" */
export type Form_Category = {
  __typename?: 'form_category';
  /** An object relationship */
  FormCategoryToForm?: Maybe<Forms>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "form_category" */
export type Form_Category_Aggregate = {
  __typename?: 'form_category_aggregate';
  aggregate?: Maybe<Form_Category_Aggregate_Fields>;
  nodes: Array<Form_Category>;
};

/** aggregate fields of "form_category" */
export type Form_Category_Aggregate_Fields = {
  __typename?: 'form_category_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Form_Category_Max_Fields>;
  min?: Maybe<Form_Category_Min_Fields>;
};


/** aggregate fields of "form_category" */
export type Form_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Form_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "form_category". All fields are combined with a logical 'AND'. */
export type Form_Category_Bool_Exp = {
  FormCategoryToForm?: InputMaybe<Forms_Bool_Exp>;
  _and?: InputMaybe<Array<Form_Category_Bool_Exp>>;
  _not?: InputMaybe<Form_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Form_Category_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "form_category" */
export enum Form_Category_Constraint {
  /** unique or primary key constraint on columns "id" */
  FormCategoryPkey = 'form_category_pkey',
  /** unique or primary key constraint on columns "slug" */
  FormCategorySlugKey = 'form_category_slug_key'
}

/** input type for inserting data into table "form_category" */
export type Form_Category_Insert_Input = {
  FormCategoryToForm?: InputMaybe<Forms_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Form_Category_Max_Fields = {
  __typename?: 'form_category_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Form_Category_Min_Fields = {
  __typename?: 'form_category_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "form_category" */
export type Form_Category_Mutation_Response = {
  __typename?: 'form_category_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Form_Category>;
};

/** on_conflict condition type for table "form_category" */
export type Form_Category_On_Conflict = {
  constraint: Form_Category_Constraint;
  update_columns?: Array<Form_Category_Update_Column>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "form_category". */
export type Form_Category_Order_By = {
  FormCategoryToForm?: InputMaybe<Forms_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: form_category */
export type Form_Category_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "form_category" */
export enum Form_Category_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "form_category" */
export type Form_Category_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "form_category" */
export type Form_Category_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Form_Category_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Form_Category_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "form_category" */
export enum Form_Category_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Form_Category_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Form_Category_Set_Input>;
  /** filter the rows which have to be updated */
  where: Form_Category_Bool_Exp;
};

/** columns and relationships of "forms" */
export type Forms = {
  __typename?: 'forms';
  /** An array relationship */
  answer_sheets: Array<Answer_Sheets>;
  /** An aggregate relationship */
  answer_sheets_aggregate: Answer_Sheets_Aggregate;
  category_id?: Maybe<Scalars['uuid']['output']>;
  created_at: Scalars['timestamptz']['output'];
  created_by: Scalars['uuid']['output'];
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  form_accesses: Array<Form_Access>;
  /** An aggregate relationship */
  form_accesses_aggregate: Form_Access_Aggregate;
  /** An array relationship */
  form_audiences: Array<Form_Audiences>;
  /** An aggregate relationship */
  form_audiences_aggregate: Form_Audiences_Aggregate;
  id: Scalars['uuid']['output'];
  password?: Maybe<Scalars['String']['output']>;
  public_id: Scalars['uuid']['output'];
  /** An array relationship */
  questions: Array<Questions>;
  /** An aggregate relationship */
  questions_aggregate: Questions_Aggregate;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status: Scalars['smallint']['output'];
  target_audience?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "forms" */
export type FormsAnswer_SheetsArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsAnswer_Sheets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsForm_AccessesArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsForm_Accesses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsForm_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsForm_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


/** columns and relationships of "forms" */
export type FormsQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};

/** aggregated selection of "forms" */
export type Forms_Aggregate = {
  __typename?: 'forms_aggregate';
  aggregate?: Maybe<Forms_Aggregate_Fields>;
  nodes: Array<Forms>;
};

export type Forms_Aggregate_Bool_Exp = {
  count?: InputMaybe<Forms_Aggregate_Bool_Exp_Count>;
};

export type Forms_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Forms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Forms_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "forms" */
export type Forms_Aggregate_Fields = {
  __typename?: 'forms_aggregate_fields';
  avg?: Maybe<Forms_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Forms_Max_Fields>;
  min?: Maybe<Forms_Min_Fields>;
  stddev?: Maybe<Forms_Stddev_Fields>;
  stddev_pop?: Maybe<Forms_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Forms_Stddev_Samp_Fields>;
  sum?: Maybe<Forms_Sum_Fields>;
  var_pop?: Maybe<Forms_Var_Pop_Fields>;
  var_samp?: Maybe<Forms_Var_Samp_Fields>;
  variance?: Maybe<Forms_Variance_Fields>;
};


/** aggregate fields of "forms" */
export type Forms_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Forms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "forms" */
export type Forms_Aggregate_Order_By = {
  avg?: InputMaybe<Forms_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Forms_Max_Order_By>;
  min?: InputMaybe<Forms_Min_Order_By>;
  stddev?: InputMaybe<Forms_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Forms_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Forms_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Forms_Sum_Order_By>;
  var_pop?: InputMaybe<Forms_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Forms_Var_Samp_Order_By>;
  variance?: InputMaybe<Forms_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "forms" */
export type Forms_Arr_Rel_Insert_Input = {
  data: Array<Forms_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Forms_On_Conflict>;
};

/** aggregate avg on columns */
export type Forms_Avg_Fields = {
  __typename?: 'forms_avg_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "forms" */
export type Forms_Avg_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "forms". All fields are combined with a logical 'AND'. */
export type Forms_Bool_Exp = {
  _and?: InputMaybe<Array<Forms_Bool_Exp>>;
  _not?: InputMaybe<Forms_Bool_Exp>;
  _or?: InputMaybe<Array<Forms_Bool_Exp>>;
  answer_sheets?: InputMaybe<Answer_Sheets_Bool_Exp>;
  answer_sheets_aggregate?: InputMaybe<Answer_Sheets_Aggregate_Bool_Exp>;
  category_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by?: InputMaybe<Uuid_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  form_accesses?: InputMaybe<Form_Access_Bool_Exp>;
  form_accesses_aggregate?: InputMaybe<Form_Access_Aggregate_Bool_Exp>;
  form_audiences?: InputMaybe<Form_Audiences_Bool_Exp>;
  form_audiences_aggregate?: InputMaybe<Form_Audiences_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  public_id?: InputMaybe<Uuid_Comparison_Exp>;
  questions?: InputMaybe<Questions_Bool_Exp>;
  questions_aggregate?: InputMaybe<Questions_Aggregate_Bool_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<Smallint_Comparison_Exp>;
  target_audience?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "forms" */
export enum Forms_Constraint {
  /** unique or primary key constraint on columns "id" */
  FormsPkey = 'forms_pkey',
  /** unique or primary key constraint on columns "public_id" */
  FormsPublicIdKey = 'forms_public_id_key'
}

/** input type for incrementing numeric columns in table "forms" */
export type Forms_Inc_Input = {
  status?: InputMaybe<Scalars['smallint']['input']>;
  target_audience?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "forms" */
export type Forms_Insert_Input = {
  answer_sheets?: InputMaybe<Answer_Sheets_Arr_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_by?: InputMaybe<Scalars['uuid']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  form_accesses?: InputMaybe<Form_Access_Arr_Rel_Insert_Input>;
  form_audiences?: InputMaybe<Form_Audiences_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  public_id?: InputMaybe<Scalars['uuid']['input']>;
  questions?: InputMaybe<Questions_Arr_Rel_Insert_Input>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['smallint']['input']>;
  target_audience?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Forms_Max_Fields = {
  __typename?: 'forms_max_fields';
  category_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_by?: Maybe<Scalars['uuid']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  public_id?: Maybe<Scalars['uuid']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['smallint']['output']>;
  target_audience?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "forms" */
export type Forms_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  public_id?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Forms_Min_Fields = {
  __typename?: 'forms_min_fields';
  category_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_by?: Maybe<Scalars['uuid']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  public_id?: Maybe<Scalars['uuid']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['smallint']['output']>;
  target_audience?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "forms" */
export type Forms_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  public_id?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "forms" */
export type Forms_Mutation_Response = {
  __typename?: 'forms_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Forms>;
};

/** input type for inserting object relation for remote table "forms" */
export type Forms_Obj_Rel_Insert_Input = {
  data: Forms_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Forms_On_Conflict>;
};

/** on_conflict condition type for table "forms" */
export type Forms_On_Conflict = {
  constraint: Forms_Constraint;
  update_columns?: Array<Forms_Update_Column>;
  where?: InputMaybe<Forms_Bool_Exp>;
};

/** Ordering options when selecting data from "forms". */
export type Forms_Order_By = {
  answer_sheets_aggregate?: InputMaybe<Answer_Sheets_Aggregate_Order_By>;
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  form_accesses_aggregate?: InputMaybe<Form_Access_Aggregate_Order_By>;
  form_audiences_aggregate?: InputMaybe<Form_Audiences_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  public_id?: InputMaybe<Order_By>;
  questions_aggregate?: InputMaybe<Questions_Aggregate_Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: forms */
export type Forms_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "forms" */
export enum Forms_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  PublicId = 'public_id',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  TargetAudience = 'target_audience',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "forms" */
export type Forms_Set_Input = {
  category_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_by?: InputMaybe<Scalars['uuid']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  public_id?: InputMaybe<Scalars['uuid']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['smallint']['input']>;
  target_audience?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Forms_Stddev_Fields = {
  __typename?: 'forms_stddev_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "forms" */
export type Forms_Stddev_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Forms_Stddev_Pop_Fields = {
  __typename?: 'forms_stddev_pop_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "forms" */
export type Forms_Stddev_Pop_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Forms_Stddev_Samp_Fields = {
  __typename?: 'forms_stddev_samp_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "forms" */
export type Forms_Stddev_Samp_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "forms" */
export type Forms_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Forms_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Forms_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_by?: InputMaybe<Scalars['uuid']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  public_id?: InputMaybe<Scalars['uuid']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['smallint']['input']>;
  target_audience?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Forms_Sum_Fields = {
  __typename?: 'forms_sum_fields';
  status?: Maybe<Scalars['smallint']['output']>;
  target_audience?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "forms" */
export type Forms_Sum_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** update columns of table "forms" */
export enum Forms_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  PublicId = 'public_id',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  TargetAudience = 'target_audience',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Forms_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Forms_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Forms_Set_Input>;
  /** filter the rows which have to be updated */
  where: Forms_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Forms_Var_Pop_Fields = {
  __typename?: 'forms_var_pop_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "forms" */
export type Forms_Var_Pop_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Forms_Var_Samp_Fields = {
  __typename?: 'forms_var_samp_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "forms" */
export type Forms_Var_Samp_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Forms_Variance_Fields = {
  __typename?: 'forms_variance_fields';
  status?: Maybe<Scalars['Float']['output']>;
  target_audience?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "forms" */
export type Forms_Variance_Order_By = {
  status?: InputMaybe<Order_By>;
  target_audience?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "answer_sheets" */
  delete_answer_sheets?: Maybe<Answer_Sheets_Mutation_Response>;
  /** delete single row from the table: "answer_sheets" */
  delete_answer_sheets_by_pk?: Maybe<Answer_Sheets>;
  /** delete data from the table: "form_access" */
  delete_form_access?: Maybe<Form_Access_Mutation_Response>;
  /** delete single row from the table: "form_access" */
  delete_form_access_by_pk?: Maybe<Form_Access>;
  /** delete data from the table: "form_audiences" */
  delete_form_audiences?: Maybe<Form_Audiences_Mutation_Response>;
  /** delete single row from the table: "form_audiences" */
  delete_form_audiences_by_pk?: Maybe<Form_Audiences>;
  /** delete data from the table: "form_category" */
  delete_form_category?: Maybe<Form_Category_Mutation_Response>;
  /** delete single row from the table: "form_category" */
  delete_form_category_by_pk?: Maybe<Form_Category>;
  /** delete data from the table: "forms" */
  delete_forms?: Maybe<Forms_Mutation_Response>;
  /** delete single row from the table: "forms" */
  delete_forms_by_pk?: Maybe<Forms>;
  /** delete data from the table: "question_answers" */
  delete_question_answers?: Maybe<Question_Answers_Mutation_Response>;
  /** delete single row from the table: "question_answers" */
  delete_question_answers_by_pk?: Maybe<Question_Answers>;
  /** delete data from the table: "question_types" */
  delete_question_types?: Maybe<Question_Types_Mutation_Response>;
  /** delete single row from the table: "question_types" */
  delete_question_types_by_pk?: Maybe<Question_Types>;
  /** delete data from the table: "questions" */
  delete_questions?: Maybe<Questions_Mutation_Response>;
  /** delete single row from the table: "questions" */
  delete_questions_by_pk?: Maybe<Questions>;
  /** delete data from the table: "roles" */
  delete_roles?: Maybe<Roles_Mutation_Response>;
  /** delete single row from the table: "roles" */
  delete_roles_by_pk?: Maybe<Roles>;
  /** delete data from the table: "user_roles" */
  delete_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** delete single row from the table: "user_roles" */
  delete_user_roles_by_pk?: Maybe<User_Roles>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "answer_sheets" */
  insert_answer_sheets?: Maybe<Answer_Sheets_Mutation_Response>;
  /** insert a single row into the table: "answer_sheets" */
  insert_answer_sheets_one?: Maybe<Answer_Sheets>;
  /** insert data into the table: "form_access" */
  insert_form_access?: Maybe<Form_Access_Mutation_Response>;
  /** insert a single row into the table: "form_access" */
  insert_form_access_one?: Maybe<Form_Access>;
  /** insert data into the table: "form_audiences" */
  insert_form_audiences?: Maybe<Form_Audiences_Mutation_Response>;
  /** insert a single row into the table: "form_audiences" */
  insert_form_audiences_one?: Maybe<Form_Audiences>;
  /** insert data into the table: "form_category" */
  insert_form_category?: Maybe<Form_Category_Mutation_Response>;
  /** insert a single row into the table: "form_category" */
  insert_form_category_one?: Maybe<Form_Category>;
  /** insert data into the table: "forms" */
  insert_forms?: Maybe<Forms_Mutation_Response>;
  /** insert a single row into the table: "forms" */
  insert_forms_one?: Maybe<Forms>;
  /** insert data into the table: "question_answers" */
  insert_question_answers?: Maybe<Question_Answers_Mutation_Response>;
  /** insert a single row into the table: "question_answers" */
  insert_question_answers_one?: Maybe<Question_Answers>;
  /** insert data into the table: "question_types" */
  insert_question_types?: Maybe<Question_Types_Mutation_Response>;
  /** insert a single row into the table: "question_types" */
  insert_question_types_one?: Maybe<Question_Types>;
  /** insert data into the table: "questions" */
  insert_questions?: Maybe<Questions_Mutation_Response>;
  /** insert a single row into the table: "questions" */
  insert_questions_one?: Maybe<Questions>;
  /** insert data into the table: "roles" */
  insert_roles?: Maybe<Roles_Mutation_Response>;
  /** insert a single row into the table: "roles" */
  insert_roles_one?: Maybe<Roles>;
  /** insert data into the table: "user_roles" */
  insert_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** insert a single row into the table: "user_roles" */
  insert_user_roles_one?: Maybe<User_Roles>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** register */
  register?: Maybe<RegisterOutput>;
  /** update data of the table: "answer_sheets" */
  update_answer_sheets?: Maybe<Answer_Sheets_Mutation_Response>;
  /** update single row of the table: "answer_sheets" */
  update_answer_sheets_by_pk?: Maybe<Answer_Sheets>;
  /** update multiples rows of table: "answer_sheets" */
  update_answer_sheets_many?: Maybe<Array<Maybe<Answer_Sheets_Mutation_Response>>>;
  /** update data of the table: "form_access" */
  update_form_access?: Maybe<Form_Access_Mutation_Response>;
  /** update single row of the table: "form_access" */
  update_form_access_by_pk?: Maybe<Form_Access>;
  /** update multiples rows of table: "form_access" */
  update_form_access_many?: Maybe<Array<Maybe<Form_Access_Mutation_Response>>>;
  /** update data of the table: "form_audiences" */
  update_form_audiences?: Maybe<Form_Audiences_Mutation_Response>;
  /** update single row of the table: "form_audiences" */
  update_form_audiences_by_pk?: Maybe<Form_Audiences>;
  /** update multiples rows of table: "form_audiences" */
  update_form_audiences_many?: Maybe<Array<Maybe<Form_Audiences_Mutation_Response>>>;
  /** update data of the table: "form_category" */
  update_form_category?: Maybe<Form_Category_Mutation_Response>;
  /** update single row of the table: "form_category" */
  update_form_category_by_pk?: Maybe<Form_Category>;
  /** update multiples rows of table: "form_category" */
  update_form_category_many?: Maybe<Array<Maybe<Form_Category_Mutation_Response>>>;
  /** update data of the table: "forms" */
  update_forms?: Maybe<Forms_Mutation_Response>;
  /** update single row of the table: "forms" */
  update_forms_by_pk?: Maybe<Forms>;
  /** update multiples rows of table: "forms" */
  update_forms_many?: Maybe<Array<Maybe<Forms_Mutation_Response>>>;
  /** update data of the table: "question_answers" */
  update_question_answers?: Maybe<Question_Answers_Mutation_Response>;
  /** update single row of the table: "question_answers" */
  update_question_answers_by_pk?: Maybe<Question_Answers>;
  /** update multiples rows of table: "question_answers" */
  update_question_answers_many?: Maybe<Array<Maybe<Question_Answers_Mutation_Response>>>;
  /** update data of the table: "question_types" */
  update_question_types?: Maybe<Question_Types_Mutation_Response>;
  /** update single row of the table: "question_types" */
  update_question_types_by_pk?: Maybe<Question_Types>;
  /** update multiples rows of table: "question_types" */
  update_question_types_many?: Maybe<Array<Maybe<Question_Types_Mutation_Response>>>;
  /** update data of the table: "questions" */
  update_questions?: Maybe<Questions_Mutation_Response>;
  /** update single row of the table: "questions" */
  update_questions_by_pk?: Maybe<Questions>;
  /** update multiples rows of table: "questions" */
  update_questions_many?: Maybe<Array<Maybe<Questions_Mutation_Response>>>;
  /** update data of the table: "roles" */
  update_roles?: Maybe<Roles_Mutation_Response>;
  /** update single row of the table: "roles" */
  update_roles_by_pk?: Maybe<Roles>;
  /** update multiples rows of table: "roles" */
  update_roles_many?: Maybe<Array<Maybe<Roles_Mutation_Response>>>;
  /** update data of the table: "user_roles" */
  update_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** update single row of the table: "user_roles" */
  update_user_roles_by_pk?: Maybe<User_Roles>;
  /** update multiples rows of table: "user_roles" */
  update_user_roles_many?: Maybe<Array<Maybe<User_Roles_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Answer_SheetsArgs = {
  where: Answer_Sheets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Answer_Sheets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Form_AccessArgs = {
  where: Form_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Form_Access_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Form_AudiencesArgs = {
  where: Form_Audiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Form_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Form_CategoryArgs = {
  where: Form_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Form_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FormsArgs = {
  where: Forms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Forms_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Question_AnswersArgs = {
  where: Question_Answers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Question_Answers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Question_TypesArgs = {
  where: Question_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Question_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_QuestionsArgs = {
  where: Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Questions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RolesArgs = {
  where: Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Roles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_RolesArgs = {
  where: User_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Roles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Answer_SheetsArgs = {
  objects: Array<Answer_Sheets_Insert_Input>;
  on_conflict?: InputMaybe<Answer_Sheets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Answer_Sheets_OneArgs = {
  object: Answer_Sheets_Insert_Input;
  on_conflict?: InputMaybe<Answer_Sheets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_AccessArgs = {
  objects: Array<Form_Access_Insert_Input>;
  on_conflict?: InputMaybe<Form_Access_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_Access_OneArgs = {
  object: Form_Access_Insert_Input;
  on_conflict?: InputMaybe<Form_Access_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_AudiencesArgs = {
  objects: Array<Form_Audiences_Insert_Input>;
  on_conflict?: InputMaybe<Form_Audiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_Audiences_OneArgs = {
  object: Form_Audiences_Insert_Input;
  on_conflict?: InputMaybe<Form_Audiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_CategoryArgs = {
  objects: Array<Form_Category_Insert_Input>;
  on_conflict?: InputMaybe<Form_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Form_Category_OneArgs = {
  object: Form_Category_Insert_Input;
  on_conflict?: InputMaybe<Form_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FormsArgs = {
  objects: Array<Forms_Insert_Input>;
  on_conflict?: InputMaybe<Forms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Forms_OneArgs = {
  object: Forms_Insert_Input;
  on_conflict?: InputMaybe<Forms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Question_AnswersArgs = {
  objects: Array<Question_Answers_Insert_Input>;
  on_conflict?: InputMaybe<Question_Answers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Question_Answers_OneArgs = {
  object: Question_Answers_Insert_Input;
  on_conflict?: InputMaybe<Question_Answers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Question_TypesArgs = {
  objects: Array<Question_Types_Insert_Input>;
  on_conflict?: InputMaybe<Question_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Question_Types_OneArgs = {
  object: Question_Types_Insert_Input;
  on_conflict?: InputMaybe<Question_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestionsArgs = {
  objects: Array<Questions_Insert_Input>;
  on_conflict?: InputMaybe<Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Questions_OneArgs = {
  object: Questions_Insert_Input;
  on_conflict?: InputMaybe<Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RolesArgs = {
  objects: Array<Roles_Insert_Input>;
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Roles_OneArgs = {
  object: Roles_Insert_Input;
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_RolesArgs = {
  objects: Array<User_Roles_Insert_Input>;
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Roles_OneArgs = {
  object: User_Roles_Insert_Input;
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootRegisterArgs = {
  body: RegisterInput;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_SheetsArgs = {
  _set?: InputMaybe<Answer_Sheets_Set_Input>;
  where: Answer_Sheets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Sheets_By_PkArgs = {
  _set?: InputMaybe<Answer_Sheets_Set_Input>;
  pk_columns: Answer_Sheets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Sheets_ManyArgs = {
  updates: Array<Answer_Sheets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Form_AccessArgs = {
  _set?: InputMaybe<Form_Access_Set_Input>;
  where: Form_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Access_By_PkArgs = {
  _set?: InputMaybe<Form_Access_Set_Input>;
  pk_columns: Form_Access_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Access_ManyArgs = {
  updates: Array<Form_Access_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Form_AudiencesArgs = {
  _set?: InputMaybe<Form_Audiences_Set_Input>;
  where: Form_Audiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Audiences_By_PkArgs = {
  _set?: InputMaybe<Form_Audiences_Set_Input>;
  pk_columns: Form_Audiences_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Audiences_ManyArgs = {
  updates: Array<Form_Audiences_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Form_CategoryArgs = {
  _set?: InputMaybe<Form_Category_Set_Input>;
  where: Form_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Category_By_PkArgs = {
  _set?: InputMaybe<Form_Category_Set_Input>;
  pk_columns: Form_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Form_Category_ManyArgs = {
  updates: Array<Form_Category_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FormsArgs = {
  _inc?: InputMaybe<Forms_Inc_Input>;
  _set?: InputMaybe<Forms_Set_Input>;
  where: Forms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Forms_By_PkArgs = {
  _inc?: InputMaybe<Forms_Inc_Input>;
  _set?: InputMaybe<Forms_Set_Input>;
  pk_columns: Forms_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Forms_ManyArgs = {
  updates: Array<Forms_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_AnswersArgs = {
  _append?: InputMaybe<Question_Answers_Append_Input>;
  _delete_at_path?: InputMaybe<Question_Answers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Question_Answers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Question_Answers_Delete_Key_Input>;
  _prepend?: InputMaybe<Question_Answers_Prepend_Input>;
  _set?: InputMaybe<Question_Answers_Set_Input>;
  where: Question_Answers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Answers_By_PkArgs = {
  _append?: InputMaybe<Question_Answers_Append_Input>;
  _delete_at_path?: InputMaybe<Question_Answers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Question_Answers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Question_Answers_Delete_Key_Input>;
  _prepend?: InputMaybe<Question_Answers_Prepend_Input>;
  _set?: InputMaybe<Question_Answers_Set_Input>;
  pk_columns: Question_Answers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Answers_ManyArgs = {
  updates: Array<Question_Answers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_TypesArgs = {
  _inc?: InputMaybe<Question_Types_Inc_Input>;
  _set?: InputMaybe<Question_Types_Set_Input>;
  where: Question_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Types_By_PkArgs = {
  _inc?: InputMaybe<Question_Types_Inc_Input>;
  _set?: InputMaybe<Question_Types_Set_Input>;
  pk_columns: Question_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Types_ManyArgs = {
  updates: Array<Question_Types_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_QuestionsArgs = {
  _append?: InputMaybe<Questions_Append_Input>;
  _delete_at_path?: InputMaybe<Questions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Questions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Questions_Delete_Key_Input>;
  _inc?: InputMaybe<Questions_Inc_Input>;
  _prepend?: InputMaybe<Questions_Prepend_Input>;
  _set?: InputMaybe<Questions_Set_Input>;
  where: Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Questions_By_PkArgs = {
  _append?: InputMaybe<Questions_Append_Input>;
  _delete_at_path?: InputMaybe<Questions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Questions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Questions_Delete_Key_Input>;
  _inc?: InputMaybe<Questions_Inc_Input>;
  _prepend?: InputMaybe<Questions_Prepend_Input>;
  _set?: InputMaybe<Questions_Set_Input>;
  pk_columns: Questions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Questions_ManyArgs = {
  updates: Array<Questions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RolesArgs = {
  _set?: InputMaybe<Roles_Set_Input>;
  where: Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Roles_By_PkArgs = {
  _set?: InputMaybe<Roles_Set_Input>;
  pk_columns: Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Roles_ManyArgs = {
  updates: Array<Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_RolesArgs = {
  _set?: InputMaybe<User_Roles_Set_Input>;
  where: User_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Roles_By_PkArgs = {
  _set?: InputMaybe<User_Roles_Set_Input>;
  pk_columns: User_Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Roles_ManyArgs = {
  updates: Array<User_Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  answer_sheets: Array<Answer_Sheets>;
  /** An aggregate relationship */
  answer_sheets_aggregate: Answer_Sheets_Aggregate;
  /** fetch data from the table: "answer_sheets" using primary key columns */
  answer_sheets_by_pk?: Maybe<Answer_Sheets>;
  /** fetch data from the table: "form_access" */
  form_access: Array<Form_Access>;
  /** fetch aggregated fields from the table: "form_access" */
  form_access_aggregate: Form_Access_Aggregate;
  /** fetch data from the table: "form_access" using primary key columns */
  form_access_by_pk?: Maybe<Form_Access>;
  /** An array relationship */
  form_audiences: Array<Form_Audiences>;
  /** An aggregate relationship */
  form_audiences_aggregate: Form_Audiences_Aggregate;
  /** fetch data from the table: "form_audiences" using primary key columns */
  form_audiences_by_pk?: Maybe<Form_Audiences>;
  /** fetch data from the table: "form_category" */
  form_category: Array<Form_Category>;
  /** fetch aggregated fields from the table: "form_category" */
  form_category_aggregate: Form_Category_Aggregate;
  /** fetch data from the table: "form_category" using primary key columns */
  form_category_by_pk?: Maybe<Form_Category>;
  /** An array relationship */
  forms: Array<Forms>;
  /** An aggregate relationship */
  forms_aggregate: Forms_Aggregate;
  /** fetch data from the table: "forms" using primary key columns */
  forms_by_pk?: Maybe<Forms>;
  /** An array relationship */
  question_answers: Array<Question_Answers>;
  /** An aggregate relationship */
  question_answers_aggregate: Question_Answers_Aggregate;
  /** fetch data from the table: "question_answers" using primary key columns */
  question_answers_by_pk?: Maybe<Question_Answers>;
  /** fetch data from the table: "question_types" */
  question_types: Array<Question_Types>;
  /** fetch aggregated fields from the table: "question_types" */
  question_types_aggregate: Question_Types_Aggregate;
  /** fetch data from the table: "question_types" using primary key columns */
  question_types_by_pk?: Maybe<Question_Types>;
  /** An array relationship */
  questions: Array<Questions>;
  /** An aggregate relationship */
  questions_aggregate: Questions_Aggregate;
  /** fetch data from the table: "questions" using primary key columns */
  questions_by_pk?: Maybe<Questions>;
  /** fetch data from the table: "roles" */
  roles: Array<Roles>;
  /** fetch aggregated fields from the table: "roles" */
  roles_aggregate: Roles_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  roles_by_pk?: Maybe<Roles>;
  /** An array relationship */
  user_roles: Array<User_Roles>;
  /** An aggregate relationship */
  user_roles_aggregate: User_Roles_Aggregate;
  /** fetch data from the table: "user_roles" using primary key columns */
  user_roles_by_pk?: Maybe<User_Roles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootAnswer_SheetsArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


export type Query_RootAnswer_Sheets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


export type Query_RootAnswer_Sheets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootForm_AccessArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


export type Query_RootForm_Access_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


export type Query_RootForm_Access_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootForm_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


export type Query_RootForm_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


export type Query_RootForm_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootForm_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Form_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Category_Order_By>>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};


export type Query_RootForm_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Category_Order_By>>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};


export type Query_RootForm_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


export type Query_RootForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


export type Query_RootForms_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuestion_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


export type Query_RootQuestion_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


export type Query_RootQuestion_Answers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuestion_TypesArgs = {
  distinct_on?: InputMaybe<Array<Question_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Types_Order_By>>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};


export type Query_RootQuestion_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Types_Order_By>>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};


export type Query_RootQuestion_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Query_RootQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Query_RootQuestions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Query_RootRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Query_RootRoles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Query_RootUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Query_RootUser_Roles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "question_answers" */
export type Question_Answers = {
  __typename?: 'question_answers';
  answer: Scalars['jsonb']['output'];
  /** An object relationship */
  answer_sheet: Answer_Sheets;
  answer_sheet_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  question: Questions;
  question_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "question_answers" */
export type Question_AnswersAnswerArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "question_answers" */
export type Question_Answers_Aggregate = {
  __typename?: 'question_answers_aggregate';
  aggregate?: Maybe<Question_Answers_Aggregate_Fields>;
  nodes: Array<Question_Answers>;
};

export type Question_Answers_Aggregate_Bool_Exp = {
  count?: InputMaybe<Question_Answers_Aggregate_Bool_Exp_Count>;
};

export type Question_Answers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Question_Answers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Question_Answers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "question_answers" */
export type Question_Answers_Aggregate_Fields = {
  __typename?: 'question_answers_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Question_Answers_Max_Fields>;
  min?: Maybe<Question_Answers_Min_Fields>;
};


/** aggregate fields of "question_answers" */
export type Question_Answers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Question_Answers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "question_answers" */
export type Question_Answers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Question_Answers_Max_Order_By>;
  min?: InputMaybe<Question_Answers_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Question_Answers_Append_Input = {
  answer?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "question_answers" */
export type Question_Answers_Arr_Rel_Insert_Input = {
  data: Array<Question_Answers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Question_Answers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "question_answers". All fields are combined with a logical 'AND'. */
export type Question_Answers_Bool_Exp = {
  _and?: InputMaybe<Array<Question_Answers_Bool_Exp>>;
  _not?: InputMaybe<Question_Answers_Bool_Exp>;
  _or?: InputMaybe<Array<Question_Answers_Bool_Exp>>;
  answer?: InputMaybe<Jsonb_Comparison_Exp>;
  answer_sheet?: InputMaybe<Answer_Sheets_Bool_Exp>;
  answer_sheet_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  question?: InputMaybe<Questions_Bool_Exp>;
  question_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "question_answers" */
export enum Question_Answers_Constraint {
  /** unique or primary key constraint on columns "id" */
  QuestionAnswersPkey = 'question_answers_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Question_Answers_Delete_At_Path_Input = {
  answer?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Question_Answers_Delete_Elem_Input = {
  answer?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Question_Answers_Delete_Key_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "question_answers" */
export type Question_Answers_Insert_Input = {
  answer?: InputMaybe<Scalars['jsonb']['input']>;
  answer_sheet?: InputMaybe<Answer_Sheets_Obj_Rel_Insert_Input>;
  answer_sheet_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  question?: InputMaybe<Questions_Obj_Rel_Insert_Input>;
  question_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Question_Answers_Max_Fields = {
  __typename?: 'question_answers_max_fields';
  answer_sheet_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  question_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "question_answers" */
export type Question_Answers_Max_Order_By = {
  answer_sheet_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Question_Answers_Min_Fields = {
  __typename?: 'question_answers_min_fields';
  answer_sheet_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  question_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "question_answers" */
export type Question_Answers_Min_Order_By = {
  answer_sheet_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "question_answers" */
export type Question_Answers_Mutation_Response = {
  __typename?: 'question_answers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Question_Answers>;
};

/** on_conflict condition type for table "question_answers" */
export type Question_Answers_On_Conflict = {
  constraint: Question_Answers_Constraint;
  update_columns?: Array<Question_Answers_Update_Column>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};

/** Ordering options when selecting data from "question_answers". */
export type Question_Answers_Order_By = {
  answer?: InputMaybe<Order_By>;
  answer_sheet?: InputMaybe<Answer_Sheets_Order_By>;
  answer_sheet_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question?: InputMaybe<Questions_Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: question_answers */
export type Question_Answers_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Question_Answers_Prepend_Input = {
  answer?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "question_answers" */
export enum Question_Answers_Select_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  AnswerSheetId = 'answer_sheet_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "question_answers" */
export type Question_Answers_Set_Input = {
  answer?: InputMaybe<Scalars['jsonb']['input']>;
  answer_sheet_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  question_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "question_answers" */
export type Question_Answers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Question_Answers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Question_Answers_Stream_Cursor_Value_Input = {
  answer?: InputMaybe<Scalars['jsonb']['input']>;
  answer_sheet_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  question_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "question_answers" */
export enum Question_Answers_Update_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  AnswerSheetId = 'answer_sheet_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Question_Answers_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Question_Answers_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Question_Answers_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Question_Answers_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Question_Answers_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Question_Answers_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Question_Answers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Question_Answers_Bool_Exp;
};

/** Tipe pertanyaan, menjadi refference table dari table questions.option_types */
export type Question_Types = {
  __typename?: 'question_types';
  code: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  questions: Array<Questions>;
  /** An aggregate relationship */
  questions_aggregate: Questions_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** Tipe pertanyaan, menjadi refference table dari table questions.option_types */
export type Question_TypesQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


/** Tipe pertanyaan, menjadi refference table dari table questions.option_types */
export type Question_TypesQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};

/** aggregated selection of "question_types" */
export type Question_Types_Aggregate = {
  __typename?: 'question_types_aggregate';
  aggregate?: Maybe<Question_Types_Aggregate_Fields>;
  nodes: Array<Question_Types>;
};

/** aggregate fields of "question_types" */
export type Question_Types_Aggregate_Fields = {
  __typename?: 'question_types_aggregate_fields';
  avg?: Maybe<Question_Types_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Question_Types_Max_Fields>;
  min?: Maybe<Question_Types_Min_Fields>;
  stddev?: Maybe<Question_Types_Stddev_Fields>;
  stddev_pop?: Maybe<Question_Types_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Question_Types_Stddev_Samp_Fields>;
  sum?: Maybe<Question_Types_Sum_Fields>;
  var_pop?: Maybe<Question_Types_Var_Pop_Fields>;
  var_samp?: Maybe<Question_Types_Var_Samp_Fields>;
  variance?: Maybe<Question_Types_Variance_Fields>;
};


/** aggregate fields of "question_types" */
export type Question_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Question_Types_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Question_Types_Avg_Fields = {
  __typename?: 'question_types_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "question_types". All fields are combined with a logical 'AND'. */
export type Question_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Question_Types_Bool_Exp>>;
  _not?: InputMaybe<Question_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Question_Types_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  questions?: InputMaybe<Questions_Bool_Exp>;
  questions_aggregate?: InputMaybe<Questions_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "question_types" */
export enum Question_Types_Constraint {
  /** unique or primary key constraint on columns "code" */
  OptionTypesCodeKey = 'option_types_code_key',
  /** unique or primary key constraint on columns "id" */
  OptionTypesPkey = 'option_types_pkey'
}

/** input type for incrementing numeric columns in table "question_types" */
export type Question_Types_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "question_types" */
export type Question_Types_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Questions_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Question_Types_Max_Fields = {
  __typename?: 'question_types_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Question_Types_Min_Fields = {
  __typename?: 'question_types_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "question_types" */
export type Question_Types_Mutation_Response = {
  __typename?: 'question_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Question_Types>;
};

/** input type for inserting object relation for remote table "question_types" */
export type Question_Types_Obj_Rel_Insert_Input = {
  data: Question_Types_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Question_Types_On_Conflict>;
};

/** on_conflict condition type for table "question_types" */
export type Question_Types_On_Conflict = {
  constraint: Question_Types_Constraint;
  update_columns?: Array<Question_Types_Update_Column>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};

/** Ordering options when selecting data from "question_types". */
export type Question_Types_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  questions_aggregate?: InputMaybe<Questions_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: question_types */
export type Question_Types_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "question_types" */
export enum Question_Types_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "question_types" */
export type Question_Types_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Question_Types_Stddev_Fields = {
  __typename?: 'question_types_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Question_Types_Stddev_Pop_Fields = {
  __typename?: 'question_types_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Question_Types_Stddev_Samp_Fields = {
  __typename?: 'question_types_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "question_types" */
export type Question_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Question_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Question_Types_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Question_Types_Sum_Fields = {
  __typename?: 'question_types_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "question_types" */
export enum Question_Types_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Question_Types_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Question_Types_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Question_Types_Set_Input>;
  /** filter the rows which have to be updated */
  where: Question_Types_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Question_Types_Var_Pop_Fields = {
  __typename?: 'question_types_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Question_Types_Var_Samp_Fields = {
  __typename?: 'question_types_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Question_Types_Variance_Fields = {
  __typename?: 'question_types_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "questions" */
export type Questions = {
  __typename?: 'questions';
  caption?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  form: Forms;
  form_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  option?: Maybe<Scalars['jsonb']['output']>;
  option_type_id: Scalars['Int']['output'];
  /** An array relationship */
  question_answers: Array<Question_Answers>;
  /** An aggregate relationship */
  question_answers_aggregate: Question_Answers_Aggregate;
  /** An object relationship */
  question_type: Question_Types;
  topic?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "questions" */
export type QuestionsOptionArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "questions" */
export type QuestionsQuestion_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


/** columns and relationships of "questions" */
export type QuestionsQuestion_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};

/** aggregated selection of "questions" */
export type Questions_Aggregate = {
  __typename?: 'questions_aggregate';
  aggregate?: Maybe<Questions_Aggregate_Fields>;
  nodes: Array<Questions>;
};

export type Questions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Questions_Aggregate_Bool_Exp_Count>;
};

export type Questions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Questions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "questions" */
export type Questions_Aggregate_Fields = {
  __typename?: 'questions_aggregate_fields';
  avg?: Maybe<Questions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Questions_Max_Fields>;
  min?: Maybe<Questions_Min_Fields>;
  stddev?: Maybe<Questions_Stddev_Fields>;
  stddev_pop?: Maybe<Questions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Questions_Stddev_Samp_Fields>;
  sum?: Maybe<Questions_Sum_Fields>;
  var_pop?: Maybe<Questions_Var_Pop_Fields>;
  var_samp?: Maybe<Questions_Var_Samp_Fields>;
  variance?: Maybe<Questions_Variance_Fields>;
};


/** aggregate fields of "questions" */
export type Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "questions" */
export type Questions_Aggregate_Order_By = {
  avg?: InputMaybe<Questions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Questions_Max_Order_By>;
  min?: InputMaybe<Questions_Min_Order_By>;
  stddev?: InputMaybe<Questions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Questions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Questions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Questions_Sum_Order_By>;
  var_pop?: InputMaybe<Questions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Questions_Var_Samp_Order_By>;
  variance?: InputMaybe<Questions_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Questions_Append_Input = {
  option?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "questions" */
export type Questions_Arr_Rel_Insert_Input = {
  data: Array<Questions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Questions_On_Conflict>;
};

/** aggregate avg on columns */
export type Questions_Avg_Fields = {
  __typename?: 'questions_avg_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "questions" */
export type Questions_Avg_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "questions". All fields are combined with a logical 'AND'. */
export type Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Questions_Bool_Exp>>;
  _not?: InputMaybe<Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Questions_Bool_Exp>>;
  caption?: InputMaybe<String_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form?: InputMaybe<Forms_Bool_Exp>;
  form_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  option?: InputMaybe<Jsonb_Comparison_Exp>;
  option_type_id?: InputMaybe<Int_Comparison_Exp>;
  question_answers?: InputMaybe<Question_Answers_Bool_Exp>;
  question_answers_aggregate?: InputMaybe<Question_Answers_Aggregate_Bool_Exp>;
  question_type?: InputMaybe<Question_Types_Bool_Exp>;
  topic?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "questions" */
export enum Questions_Constraint {
  /** unique or primary key constraint on columns "id" */
  QuestionsPkey = 'questions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Questions_Delete_At_Path_Input = {
  option?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Questions_Delete_Elem_Input = {
  option?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Questions_Delete_Key_Input = {
  option?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "questions" */
export type Questions_Inc_Input = {
  option_type_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "questions" */
export type Questions_Insert_Input = {
  caption?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form?: InputMaybe<Forms_Obj_Rel_Insert_Input>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  option?: InputMaybe<Scalars['jsonb']['input']>;
  option_type_id?: InputMaybe<Scalars['Int']['input']>;
  question_answers?: InputMaybe<Question_Answers_Arr_Rel_Insert_Input>;
  question_type?: InputMaybe<Question_Types_Obj_Rel_Insert_Input>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Questions_Max_Fields = {
  __typename?: 'questions_max_fields';
  caption?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  option_type_id?: Maybe<Scalars['Int']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "questions" */
export type Questions_Max_Order_By = {
  caption?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  option_type_id?: InputMaybe<Order_By>;
  topic?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Questions_Min_Fields = {
  __typename?: 'questions_min_fields';
  caption?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  option_type_id?: Maybe<Scalars['Int']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "questions" */
export type Questions_Min_Order_By = {
  caption?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  option_type_id?: InputMaybe<Order_By>;
  topic?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "questions" */
export type Questions_Mutation_Response = {
  __typename?: 'questions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Questions>;
};

/** input type for inserting object relation for remote table "questions" */
export type Questions_Obj_Rel_Insert_Input = {
  data: Questions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Questions_On_Conflict>;
};

/** on_conflict condition type for table "questions" */
export type Questions_On_Conflict = {
  constraint: Questions_Constraint;
  update_columns?: Array<Questions_Update_Column>;
  where?: InputMaybe<Questions_Bool_Exp>;
};

/** Ordering options when selecting data from "questions". */
export type Questions_Order_By = {
  caption?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form?: InputMaybe<Forms_Order_By>;
  form_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  option?: InputMaybe<Order_By>;
  option_type_id?: InputMaybe<Order_By>;
  question_answers_aggregate?: InputMaybe<Question_Answers_Aggregate_Order_By>;
  question_type?: InputMaybe<Question_Types_Order_By>;
  topic?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: questions */
export type Questions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Questions_Prepend_Input = {
  option?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "questions" */
export enum Questions_Select_Column {
  /** column name */
  Caption = 'caption',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  Option = 'option',
  /** column name */
  OptionTypeId = 'option_type_id',
  /** column name */
  Topic = 'topic',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "questions" */
export type Questions_Set_Input = {
  caption?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  option?: InputMaybe<Scalars['jsonb']['input']>;
  option_type_id?: InputMaybe<Scalars['Int']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Questions_Stddev_Fields = {
  __typename?: 'questions_stddev_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "questions" */
export type Questions_Stddev_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Questions_Stddev_Pop_Fields = {
  __typename?: 'questions_stddev_pop_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "questions" */
export type Questions_Stddev_Pop_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Questions_Stddev_Samp_Fields = {
  __typename?: 'questions_stddev_samp_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "questions" */
export type Questions_Stddev_Samp_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "questions" */
export type Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Questions_Stream_Cursor_Value_Input = {
  caption?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  option?: InputMaybe<Scalars['jsonb']['input']>;
  option_type_id?: InputMaybe<Scalars['Int']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Questions_Sum_Fields = {
  __typename?: 'questions_sum_fields';
  option_type_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "questions" */
export type Questions_Sum_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** update columns of table "questions" */
export enum Questions_Update_Column {
  /** column name */
  Caption = 'caption',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormId = 'form_id',
  /** column name */
  Id = 'id',
  /** column name */
  Option = 'option',
  /** column name */
  OptionTypeId = 'option_type_id',
  /** column name */
  Topic = 'topic',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Questions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Questions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Questions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Questions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Questions_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Questions_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Questions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Questions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Questions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Questions_Var_Pop_Fields = {
  __typename?: 'questions_var_pop_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "questions" */
export type Questions_Var_Pop_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Questions_Var_Samp_Fields = {
  __typename?: 'questions_var_samp_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "questions" */
export type Questions_Var_Samp_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Questions_Variance_Fields = {
  __typename?: 'questions_variance_fields';
  option_type_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "questions" */
export type Questions_Variance_Order_By = {
  option_type_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "roles" */
export type Roles = {
  __typename?: 'roles';
  code: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  form_audiences: Array<Form_Audiences>;
  /** An aggregate relationship */
  form_audiences_aggregate: Form_Audiences_Aggregate;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_roles: Array<User_Roles>;
  /** An aggregate relationship */
  user_roles_aggregate: User_Roles_Aggregate;
};


/** columns and relationships of "roles" */
export type RolesForm_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type RolesForm_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type RolesUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type RolesUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};

/** aggregated selection of "roles" */
export type Roles_Aggregate = {
  __typename?: 'roles_aggregate';
  aggregate?: Maybe<Roles_Aggregate_Fields>;
  nodes: Array<Roles>;
};

/** aggregate fields of "roles" */
export type Roles_Aggregate_Fields = {
  __typename?: 'roles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Roles_Max_Fields>;
  min?: Maybe<Roles_Min_Fields>;
};


/** aggregate fields of "roles" */
export type Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "roles". All fields are combined with a logical 'AND'. */
export type Roles_Bool_Exp = {
  _and?: InputMaybe<Array<Roles_Bool_Exp>>;
  _not?: InputMaybe<Roles_Bool_Exp>;
  _or?: InputMaybe<Array<Roles_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form_audiences?: InputMaybe<Form_Audiences_Bool_Exp>;
  form_audiences_aggregate?: InputMaybe<Form_Audiences_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_roles?: InputMaybe<User_Roles_Bool_Exp>;
  user_roles_aggregate?: InputMaybe<User_Roles_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "roles" */
export enum Roles_Constraint {
  /** unique or primary key constraint on columns "code" */
  RolesCodeKey = 'roles_code_key',
  /** unique or primary key constraint on columns "id" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "roles" */
export type Roles_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_audiences?: InputMaybe<Form_Audiences_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_roles?: InputMaybe<User_Roles_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Roles_Max_Fields = {
  __typename?: 'roles_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Roles_Min_Fields = {
  __typename?: 'roles_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "roles" */
export type Roles_Mutation_Response = {
  __typename?: 'roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Roles>;
};

/** input type for inserting object relation for remote table "roles" */
export type Roles_Obj_Rel_Insert_Input = {
  data: Roles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};

/** on_conflict condition type for table "roles" */
export type Roles_On_Conflict = {
  constraint: Roles_Constraint;
  update_columns?: Array<Roles_Update_Column>;
  where?: InputMaybe<Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "roles". */
export type Roles_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_audiences_aggregate?: InputMaybe<Form_Audiences_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_roles_aggregate?: InputMaybe<User_Roles_Aggregate_Order_By>;
};

/** primary key columns input for table: roles */
export type Roles_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "roles" */
export enum Roles_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "roles" */
export type Roles_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "roles" */
export type Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Roles_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "roles" */
export enum Roles_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Roles_Bool_Exp;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  answer_sheets: Array<Answer_Sheets>;
  /** An aggregate relationship */
  answer_sheets_aggregate: Answer_Sheets_Aggregate;
  /** fetch data from the table: "answer_sheets" using primary key columns */
  answer_sheets_by_pk?: Maybe<Answer_Sheets>;
  /** fetch data from the table in a streaming manner: "answer_sheets" */
  answer_sheets_stream: Array<Answer_Sheets>;
  /** fetch data from the table: "form_access" */
  form_access: Array<Form_Access>;
  /** fetch aggregated fields from the table: "form_access" */
  form_access_aggregate: Form_Access_Aggregate;
  /** fetch data from the table: "form_access" using primary key columns */
  form_access_by_pk?: Maybe<Form_Access>;
  /** fetch data from the table in a streaming manner: "form_access" */
  form_access_stream: Array<Form_Access>;
  /** An array relationship */
  form_audiences: Array<Form_Audiences>;
  /** An aggregate relationship */
  form_audiences_aggregate: Form_Audiences_Aggregate;
  /** fetch data from the table: "form_audiences" using primary key columns */
  form_audiences_by_pk?: Maybe<Form_Audiences>;
  /** fetch data from the table in a streaming manner: "form_audiences" */
  form_audiences_stream: Array<Form_Audiences>;
  /** fetch data from the table: "form_category" */
  form_category: Array<Form_Category>;
  /** fetch aggregated fields from the table: "form_category" */
  form_category_aggregate: Form_Category_Aggregate;
  /** fetch data from the table: "form_category" using primary key columns */
  form_category_by_pk?: Maybe<Form_Category>;
  /** fetch data from the table in a streaming manner: "form_category" */
  form_category_stream: Array<Form_Category>;
  /** An array relationship */
  forms: Array<Forms>;
  /** An aggregate relationship */
  forms_aggregate: Forms_Aggregate;
  /** fetch data from the table: "forms" using primary key columns */
  forms_by_pk?: Maybe<Forms>;
  /** fetch data from the table in a streaming manner: "forms" */
  forms_stream: Array<Forms>;
  /** An array relationship */
  question_answers: Array<Question_Answers>;
  /** An aggregate relationship */
  question_answers_aggregate: Question_Answers_Aggregate;
  /** fetch data from the table: "question_answers" using primary key columns */
  question_answers_by_pk?: Maybe<Question_Answers>;
  /** fetch data from the table in a streaming manner: "question_answers" */
  question_answers_stream: Array<Question_Answers>;
  /** fetch data from the table: "question_types" */
  question_types: Array<Question_Types>;
  /** fetch aggregated fields from the table: "question_types" */
  question_types_aggregate: Question_Types_Aggregate;
  /** fetch data from the table: "question_types" using primary key columns */
  question_types_by_pk?: Maybe<Question_Types>;
  /** fetch data from the table in a streaming manner: "question_types" */
  question_types_stream: Array<Question_Types>;
  /** An array relationship */
  questions: Array<Questions>;
  /** An aggregate relationship */
  questions_aggregate: Questions_Aggregate;
  /** fetch data from the table: "questions" using primary key columns */
  questions_by_pk?: Maybe<Questions>;
  /** fetch data from the table in a streaming manner: "questions" */
  questions_stream: Array<Questions>;
  /** fetch data from the table: "roles" */
  roles: Array<Roles>;
  /** fetch aggregated fields from the table: "roles" */
  roles_aggregate: Roles_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  roles_by_pk?: Maybe<Roles>;
  /** fetch data from the table in a streaming manner: "roles" */
  roles_stream: Array<Roles>;
  /** An array relationship */
  user_roles: Array<User_Roles>;
  /** An aggregate relationship */
  user_roles_aggregate: User_Roles_Aggregate;
  /** fetch data from the table: "user_roles" using primary key columns */
  user_roles_by_pk?: Maybe<User_Roles>;
  /** fetch data from the table in a streaming manner: "user_roles" */
  user_roles_stream: Array<User_Roles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootAnswer_SheetsArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


export type Subscription_RootAnswer_Sheets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


export type Subscription_RootAnswer_Sheets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAnswer_Sheets_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Answer_Sheets_Stream_Cursor_Input>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


export type Subscription_RootForm_AccessArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


export type Subscription_RootForm_Access_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


export type Subscription_RootForm_Access_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootForm_Access_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Form_Access_Stream_Cursor_Input>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


export type Subscription_RootForm_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


export type Subscription_RootForm_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Audiences_Order_By>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


export type Subscription_RootForm_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootForm_Audiences_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Form_Audiences_Stream_Cursor_Input>>;
  where?: InputMaybe<Form_Audiences_Bool_Exp>;
};


export type Subscription_RootForm_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Form_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Category_Order_By>>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};


export type Subscription_RootForm_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Category_Order_By>>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};


export type Subscription_RootForm_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootForm_Category_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Form_Category_Stream_Cursor_Input>>;
  where?: InputMaybe<Form_Category_Bool_Exp>;
};


export type Subscription_RootFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


export type Subscription_RootForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


export type Subscription_RootForms_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootForms_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Forms_Stream_Cursor_Input>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


export type Subscription_RootQuestion_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


export type Subscription_RootQuestion_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Answers_Order_By>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


export type Subscription_RootQuestion_Answers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootQuestion_Answers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Question_Answers_Stream_Cursor_Input>>;
  where?: InputMaybe<Question_Answers_Bool_Exp>;
};


export type Subscription_RootQuestion_TypesArgs = {
  distinct_on?: InputMaybe<Array<Question_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Types_Order_By>>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};


export type Subscription_RootQuestion_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Types_Order_By>>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};


export type Subscription_RootQuestion_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootQuestion_Types_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Question_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Question_Types_Bool_Exp>;
};


export type Subscription_RootQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootQuestions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootQuestions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootRoles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootRoles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Roles_Stream_Cursor_Input>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUser_Roles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Roles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Roles_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_roles" */
export type User_Roles = {
  __typename?: 'user_roles';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  role: Roles;
  role_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_roles" */
export type User_Roles_Aggregate = {
  __typename?: 'user_roles_aggregate';
  aggregate?: Maybe<User_Roles_Aggregate_Fields>;
  nodes: Array<User_Roles>;
};

export type User_Roles_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Roles_Aggregate_Bool_Exp_Count>;
};

export type User_Roles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Roles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_roles" */
export type User_Roles_Aggregate_Fields = {
  __typename?: 'user_roles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Roles_Max_Fields>;
  min?: Maybe<User_Roles_Min_Fields>;
};


/** aggregate fields of "user_roles" */
export type User_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_roles" */
export type User_Roles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Roles_Max_Order_By>;
  min?: InputMaybe<User_Roles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_roles" */
export type User_Roles_Arr_Rel_Insert_Input = {
  data: Array<User_Roles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_roles". All fields are combined with a logical 'AND'. */
export type User_Roles_Bool_Exp = {
  _and?: InputMaybe<Array<User_Roles_Bool_Exp>>;
  _not?: InputMaybe<User_Roles_Bool_Exp>;
  _or?: InputMaybe<Array<User_Roles_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Roles_Bool_Exp>;
  role_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_roles" */
export enum User_Roles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserRolesPkey = 'user_roles_pkey'
}

/** input type for inserting data into table "user_roles" */
export type User_Roles_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Roles_Obj_Rel_Insert_Input>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Roles_Max_Fields = {
  __typename?: 'user_roles_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_roles" */
export type User_Roles_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Roles_Min_Fields = {
  __typename?: 'user_roles_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_roles" */
export type User_Roles_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_roles" */
export type User_Roles_Mutation_Response = {
  __typename?: 'user_roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Roles>;
};

/** on_conflict condition type for table "user_roles" */
export type User_Roles_On_Conflict = {
  constraint: User_Roles_Constraint;
  update_columns?: Array<User_Roles_Update_Column>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "user_roles". */
export type User_Roles_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Roles_Order_By>;
  role_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_roles */
export type User_Roles_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_roles" */
export enum User_Roles_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_roles" */
export type User_Roles_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_roles" */
export type User_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Roles_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_roles" */
export enum User_Roles_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UserId = 'user_id'
}

export type User_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Roles_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  answer_sheets: Array<Answer_Sheets>;
  /** An aggregate relationship */
  answer_sheets_aggregate: Answer_Sheets_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  /** An array relationship */
  form_accesses: Array<Form_Access>;
  /** An aggregate relationship */
  form_accesses_aggregate: Form_Access_Aggregate;
  /** An array relationship */
  forms: Array<Forms>;
  /** An aggregate relationship */
  forms_aggregate: Forms_Aggregate;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_roles: Array<User_Roles>;
  /** An aggregate relationship */
  user_roles_aggregate: User_Roles_Aggregate;
};


/** columns and relationships of "users" */
export type UsersAnswer_SheetsArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersAnswer_Sheets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Sheets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Sheets_Order_By>>;
  where?: InputMaybe<Answer_Sheets_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersForm_AccessesArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersForm_Accesses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Form_Access_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Form_Access_Order_By>>;
  where?: InputMaybe<Form_Access_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFormsArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersForms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Forms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Forms_Order_By>>;
  where?: InputMaybe<Forms_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  answer_sheets?: InputMaybe<Answer_Sheets_Bool_Exp>;
  answer_sheets_aggregate?: InputMaybe<Answer_Sheets_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  form_accesses?: InputMaybe<Form_Access_Bool_Exp>;
  form_accesses_aggregate?: InputMaybe<Form_Access_Aggregate_Bool_Exp>;
  forms?: InputMaybe<Forms_Bool_Exp>;
  forms_aggregate?: InputMaybe<Forms_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_roles?: InputMaybe<User_Roles_Bool_Exp>;
  user_roles_aggregate?: InputMaybe<User_Roles_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  answer_sheets?: InputMaybe<Answer_Sheets_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  form_accesses?: InputMaybe<Form_Access_Arr_Rel_Insert_Input>;
  forms?: InputMaybe<Forms_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_roles?: InputMaybe<User_Roles_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  answer_sheets_aggregate?: InputMaybe<Answer_Sheets_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  form_accesses_aggregate?: InputMaybe<Form_Access_Aggregate_Order_By>;
  forms_aggregate?: InputMaybe<Forms_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_roles_aggregate?: InputMaybe<User_Roles_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};
