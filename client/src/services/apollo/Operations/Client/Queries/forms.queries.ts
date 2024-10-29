import { gql } from "@apollo/client";
import { FormListProps } from "types/dto-types";

export const getList = ({ limit, orderBy }: FormListProps) => gql`
  query GetForms {
    forms(limit: ${limit ?? null}, ${
  orderBy
    ? `order_by: {${orderBy.field} : ${orderBy.asc ? "asc" : "desc"}}`
    : ""
}) {
      created_at
      created_by
      end_date
      id
      public_id
      start_date
      status
      target_audience
      title
      updated_at
      answer_sheets_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const getByStatus = ({ limit, status }: FormListProps) => gql`
  query GetForms {
    forms(limit: ${limit ?? null}, where: {status: {_eq: ${status}}}) {
      created_at
      created_by
      end_date
      id
      public_id
      start_date
      status
      target_audience
      title
      updated_at
      answer_sheets_aggregate {
      aggregate {
        count
      }
    }
    }
  }
`;

export const getById = ({ id }: { id: string }) => gql`
  query GetFormById {
    forms_by_pk(id: "${id}") {
      category_id
      created_at
      created_by
      end_date
      answer_sheets {
        form_id
        id
        updated_at
        user_id
        created_at
        user {
          email
          name
          id
          created_at
        }
        question_answers {
          answer
          answer_sheet_id
          created_at
          id
          question_id
          updated_at
        }
      }
      form_accesses {
        user {
          email
          id
          name
          created_at
        }
        user_id
        id
        updated_at
        created_at
        form_id
      }
      form_audiences {
        role_id
        id
        role {
          code
          name
          id
          created_at
        }
        form_id
        created_at
      }
      password
      id
      public_id
      start_date
      status
      target_audience
      title
      updated_at
      user {
        name
        id
        email
      }
      answer_sheets_aggregate {
        aggregate {
          count
        }
      }
      questions(order_by: {order: asc}) {
        id
        form_id
        question_type {
          id
          code
          name
          created_at
          updated_at
        }
        topic
        updated_at
        created_at
        content
        caption
        option
      }
    }
  }
`;

export const createEmptyForm = gql`
  mutation CreateEmptyForm($created_by: uuid!, $title: String!) {
    insert_forms_one(object: { created_by: $created_by, title: $title }) {
      id
    }
  }
`;

