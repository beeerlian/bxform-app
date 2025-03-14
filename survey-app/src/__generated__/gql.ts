/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment UserFragment on users {\n    email\n    name\n    id\n    created_at\n  }\n": types.UserFragmentFragmentDoc,
    "\n  fragment RoleFragment on roles {\n    code\n    name\n    id\n    created_at\n  }\n": types.RoleFragmentFragmentDoc,
    "\n  fragment QuestionAnswerFragment on question_answers {\n    id\n    form_id\n    user_id\n    question_id\n    answer\n    created_at\n    updated_at\n  }\n": types.QuestionAnswerFragmentFragmentDoc,
    "\n  fragment FormAccessFragment on form_access {\n    user {\n      ...UserFragment\n    }\n    user_id\n    id\n    updated_at\n    created_at\n    form_id\n  }\n  \n": types.FormAccessFragmentFragmentDoc,
    "\n  fragment FormAudienceFragment on form_audiences {\n    role_id\n    id\n    role {\n      ...RoleFragment\n    }\n    form_id\n    created_at\n  }\n  \n": types.FormAudienceFragmentFragmentDoc,
    "\n  fragment QuestionTypeFragment on question_types {\n    id\n    code\n    name\n    created_at\n    updated_at\n  }\n": types.QuestionTypeFragmentFragmentDoc,
    "\n  fragment QuestionFragment on questions {\n    id\n    form_id\n    question_type {\n      ...QuestionTypeFragment\n    }\n    question_type_id\n    topic\n    updated_at\n    created_at\n    content\n    caption\n    order\n    option\n    required\n  }\n  \n": types.QuestionFragmentFragmentDoc,
    "\n  fragment FormDetailFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    is_public\n    updated_at\n    user {\n      ...UserFragment\n    }\n\n    questions(order_by: { order: asc }) {\n      ...QuestionFragment\n    }\n    form_accesses {\n      ...FormAccessFragment\n    }\n    form_audiences {\n      ...FormAudienceFragment\n    }\n  }\n  \n  \n  \n  \n": types.FormDetailFragmentFragmentDoc,
    "\n  fragment FormOverviewFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    updated_at\n  }\n": types.FormOverviewFragmentFragmentDoc,
    "\n  query GetForms($limit: Int, $orderBy: [forms_order_by!], $where: forms_bool_exp) {\n    forms(limit: $limit, order_by: $orderBy, where: $where) {\n      ...FormOverviewFragment\n    }\n  }\n\n  \n": types.GetFormsDocument,
    "\n  query GetFormById($id: uuid!) {\n    forms_by_pk(id: $id) {\n      ...FormDetailFragment\n    }\n  }\n  \n": types.GetFormByIdDocument,
    "\n  query GetFormByPublicId($id: uuid!) {\n    forms(limit: 1, where: { public_id: { _eq: $id } }) {\n      ...FormDetailFragment\n    }\n  }\n  \n": types.GetFormByPublicIdDocument,
    "\n  mutation UpdateFormStatusByPK($id: uuid!, $status: smallint) {\n    update_forms_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {\n      status\n    }\n  }\n": types.UpdateFormStatusByPkDocument,
    "\n  mutation UpdateFormByPK(\n    $id: uuid!\n    $end_date: timestamptz\n    $start_date: timestamptz\n    $title: String!\n    $password: String\n    $target_audience: Int\n    $is_public: Boolean\n  ) {\n    update_forms_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        end_date: $end_date\n        password: $password\n        start_date: $start_date\n        title: $title\n        target_audience: $target_audience\n        is_public: $is_public\n      }\n    ) {\n      end_date\n      password\n      start_date\n      title\n      target_audience\n      is_public\n    }\n  }\n": types.UpdateFormByPkDocument,
    "\n  mutation CreateQuestion(\n    $form_id: uuid!\n    $order: Int!\n    $required: Boolean\n    $question_type_id: Int\n    $caption: String\n    $content: String\n    $option: jsonb\n  ) {\n    insert_questions_one(\n      object: {\n        caption: $caption\n        content: $content\n        required: $required\n        form_id: $form_id\n        order: $order\n        option: $option\n        question_type_id: $question_type_id\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n": types.CreateQuestionDocument,
    "\n  mutation DeleteQuestion($id: uuid!) {\n    delete_questions_by_pk(id: $id) {\n      ...QuestionFragment\n    }\n  }\n  \n": types.DeleteQuestionDocument,
    "\n  mutation UpdateQuestionByPk(\n    $id: uuid!\n    $caption: String\n    $topic: String\n    $required: Boolean\n    $content: String!\n    $order: Int!\n    $option: jsonb\n  ) {\n    update_questions_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        caption: $caption\n        topic: $topic\n        required: $required\n        content: $content\n        order: $order\n        option: $option\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n": types.UpdateQuestionByPkDocument,
    "\n  mutation CreateMultipleQuestions($objects: [question_answers_insert_input!]!) {\n    insert_question_answers(objects: $objects) {\n      returning {\n        ...QuestionAnswerFragment\n      }\n    }\n  }\n": types.CreateMultipleQuestionsDocument,
    "\n  query QuestionType {\n    question_types {\n      ...QuestionTypeFragment\n    }\n  }\n\n  \n": types.QuestionTypeDocument,
    "\n  query MyQuery {\n    roles {\n      ...RoleFragment\n    }\n  }\n  \n": types.MyQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFragment on users {\n    email\n    name\n    id\n    created_at\n  }\n"): (typeof documents)["\n  fragment UserFragment on users {\n    email\n    name\n    id\n    created_at\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RoleFragment on roles {\n    code\n    name\n    id\n    created_at\n  }\n"): (typeof documents)["\n  fragment RoleFragment on roles {\n    code\n    name\n    id\n    created_at\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment QuestionAnswerFragment on question_answers {\n    id\n    form_id\n    user_id\n    question_id\n    answer\n    created_at\n    updated_at\n  }\n"): (typeof documents)["\n  fragment QuestionAnswerFragment on question_answers {\n    id\n    form_id\n    user_id\n    question_id\n    answer\n    created_at\n    updated_at\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FormAccessFragment on form_access {\n    user {\n      ...UserFragment\n    }\n    user_id\n    id\n    updated_at\n    created_at\n    form_id\n  }\n  \n"): (typeof documents)["\n  fragment FormAccessFragment on form_access {\n    user {\n      ...UserFragment\n    }\n    user_id\n    id\n    updated_at\n    created_at\n    form_id\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FormAudienceFragment on form_audiences {\n    role_id\n    id\n    role {\n      ...RoleFragment\n    }\n    form_id\n    created_at\n  }\n  \n"): (typeof documents)["\n  fragment FormAudienceFragment on form_audiences {\n    role_id\n    id\n    role {\n      ...RoleFragment\n    }\n    form_id\n    created_at\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment QuestionTypeFragment on question_types {\n    id\n    code\n    name\n    created_at\n    updated_at\n  }\n"): (typeof documents)["\n  fragment QuestionTypeFragment on question_types {\n    id\n    code\n    name\n    created_at\n    updated_at\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment QuestionFragment on questions {\n    id\n    form_id\n    question_type {\n      ...QuestionTypeFragment\n    }\n    question_type_id\n    topic\n    updated_at\n    created_at\n    content\n    caption\n    order\n    option\n    required\n  }\n  \n"): (typeof documents)["\n  fragment QuestionFragment on questions {\n    id\n    form_id\n    question_type {\n      ...QuestionTypeFragment\n    }\n    question_type_id\n    topic\n    updated_at\n    created_at\n    content\n    caption\n    order\n    option\n    required\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FormDetailFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    is_public\n    updated_at\n    user {\n      ...UserFragment\n    }\n\n    questions(order_by: { order: asc }) {\n      ...QuestionFragment\n    }\n    form_accesses {\n      ...FormAccessFragment\n    }\n    form_audiences {\n      ...FormAudienceFragment\n    }\n  }\n  \n  \n  \n  \n"): (typeof documents)["\n  fragment FormDetailFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    is_public\n    updated_at\n    user {\n      ...UserFragment\n    }\n\n    questions(order_by: { order: asc }) {\n      ...QuestionFragment\n    }\n    form_accesses {\n      ...FormAccessFragment\n    }\n    form_audiences {\n      ...FormAudienceFragment\n    }\n  }\n  \n  \n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FormOverviewFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    updated_at\n  }\n"): (typeof documents)["\n  fragment FormOverviewFragment on forms {\n    id\n    public_id\n    category_id\n    created_at\n    created_by\n    end_date\n    password\n    start_date\n    status\n    target_audience\n    title\n    updated_at\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetForms($limit: Int, $orderBy: [forms_order_by!], $where: forms_bool_exp) {\n    forms(limit: $limit, order_by: $orderBy, where: $where) {\n      ...FormOverviewFragment\n    }\n  }\n\n  \n"): (typeof documents)["\n  query GetForms($limit: Int, $orderBy: [forms_order_by!], $where: forms_bool_exp) {\n    forms(limit: $limit, order_by: $orderBy, where: $where) {\n      ...FormOverviewFragment\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFormById($id: uuid!) {\n    forms_by_pk(id: $id) {\n      ...FormDetailFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query GetFormById($id: uuid!) {\n    forms_by_pk(id: $id) {\n      ...FormDetailFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFormByPublicId($id: uuid!) {\n    forms(limit: 1, where: { public_id: { _eq: $id } }) {\n      ...FormDetailFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query GetFormByPublicId($id: uuid!) {\n    forms(limit: 1, where: { public_id: { _eq: $id } }) {\n      ...FormDetailFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateFormStatusByPK($id: uuid!, $status: smallint) {\n    update_forms_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFormStatusByPK($id: uuid!, $status: smallint) {\n    update_forms_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateFormByPK(\n    $id: uuid!\n    $end_date: timestamptz\n    $start_date: timestamptz\n    $title: String!\n    $password: String\n    $target_audience: Int\n    $is_public: Boolean\n  ) {\n    update_forms_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        end_date: $end_date\n        password: $password\n        start_date: $start_date\n        title: $title\n        target_audience: $target_audience\n        is_public: $is_public\n      }\n    ) {\n      end_date\n      password\n      start_date\n      title\n      target_audience\n      is_public\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFormByPK(\n    $id: uuid!\n    $end_date: timestamptz\n    $start_date: timestamptz\n    $title: String!\n    $password: String\n    $target_audience: Int\n    $is_public: Boolean\n  ) {\n    update_forms_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        end_date: $end_date\n        password: $password\n        start_date: $start_date\n        title: $title\n        target_audience: $target_audience\n        is_public: $is_public\n      }\n    ) {\n      end_date\n      password\n      start_date\n      title\n      target_audience\n      is_public\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateQuestion(\n    $form_id: uuid!\n    $order: Int!\n    $required: Boolean\n    $question_type_id: Int\n    $caption: String\n    $content: String\n    $option: jsonb\n  ) {\n    insert_questions_one(\n      object: {\n        caption: $caption\n        content: $content\n        required: $required\n        form_id: $form_id\n        order: $order\n        option: $option\n        question_type_id: $question_type_id\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateQuestion(\n    $form_id: uuid!\n    $order: Int!\n    $required: Boolean\n    $question_type_id: Int\n    $caption: String\n    $content: String\n    $option: jsonb\n  ) {\n    insert_questions_one(\n      object: {\n        caption: $caption\n        content: $content\n        required: $required\n        form_id: $form_id\n        order: $order\n        option: $option\n        question_type_id: $question_type_id\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteQuestion($id: uuid!) {\n    delete_questions_by_pk(id: $id) {\n      ...QuestionFragment\n    }\n  }\n  \n"): (typeof documents)["\n  mutation DeleteQuestion($id: uuid!) {\n    delete_questions_by_pk(id: $id) {\n      ...QuestionFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateQuestionByPk(\n    $id: uuid!\n    $caption: String\n    $topic: String\n    $required: Boolean\n    $content: String!\n    $order: Int!\n    $option: jsonb\n  ) {\n    update_questions_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        caption: $caption\n        topic: $topic\n        required: $required\n        content: $content\n        order: $order\n        option: $option\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateQuestionByPk(\n    $id: uuid!\n    $caption: String\n    $topic: String\n    $required: Boolean\n    $content: String!\n    $order: Int!\n    $option: jsonb\n  ) {\n    update_questions_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        caption: $caption\n        topic: $topic\n        required: $required\n        content: $content\n        order: $order\n        option: $option\n      }\n    ) {\n      ...QuestionFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMultipleQuestions($objects: [question_answers_insert_input!]!) {\n    insert_question_answers(objects: $objects) {\n      returning {\n        ...QuestionAnswerFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMultipleQuestions($objects: [question_answers_insert_input!]!) {\n    insert_question_answers(objects: $objects) {\n      returning {\n        ...QuestionAnswerFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QuestionType {\n    question_types {\n      ...QuestionTypeFragment\n    }\n  }\n\n  \n"): (typeof documents)["\n  query QuestionType {\n    question_types {\n      ...QuestionTypeFragment\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyQuery {\n    roles {\n      ...RoleFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query MyQuery {\n    roles {\n      ...RoleFragment\n    }\n  }\n  \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;