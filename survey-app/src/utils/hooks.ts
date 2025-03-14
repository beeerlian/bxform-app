import {
  FetchResult,
  MutationFunctionOptions,
  MutationResult,
  OperationVariables,
  QueryResult,
} from '@apollo/client';
import { useMemo } from 'react';

type MaybeMasked<T> = T;

/**
 * Custom hook that transforms the data returned by a query
 *
 * @param queryResult - The result from useQuery
 * @param transformFn - Function to transform the data
 * @returns The query result with transformed data
 */
export function useTransformedQuery<
  TData,
  TTransformed,
  TVariables extends OperationVariables = OperationVariables
>(
  queryResult: QueryResult<TData, TVariables>,
  transformFn: (data: TData | undefined | null) => TTransformed
): Omit<QueryResult<TData, TVariables>, 'data'> & { data: TTransformed } {
  const { data, ...rest } = queryResult;

  // Transform the data using the provided transform function
  const transformedData = useMemo(() => {
    return transformFn(data as TData | undefined | null);
  }, [data, transformFn]);

  // Return a new object with the transformed data and all other properties
  return {
    ...rest,
    data: transformedData,
  } as Omit<QueryResult<TData, TVariables>, 'data'> & { data: TTransformed };
}

/**
 * Custom hook that transforms the data returned by a mutation
 *
 * @param mutationResult - The result and function from useMutation
 * @param transformFn - Function to transform the data
 * @returns The mutation tuple with transformed data and wrapped mutation function
 */
export function useTransformedMutation<
  TData,
  TTransformed,
  TVariables extends OperationVariables = OperationVariables
>(
  mutationResult: [
    (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>,
    MutationResult<TData>
  ],
  transformFn: (data: TData | undefined | null) => TTransformed
): [
  (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>,
  Omit<MutationResult<TData>, 'data'> & { data: TTransformed }
] {
  const [mutate, result] = mutationResult;
  const { data, ...restResult } = result;

  // Transform the data using the provided transform function
  const transformedData = useMemo(() => {
    return transformFn(data as TData | undefined | null);
  }, [data, transformFn]);

  // Return the mutation function and the result with transformed data
  return [
    mutate,
    {
      ...restResult,
      data: transformedData,
    } as Omit<MutationResult<TData>, 'data'> & { data: TTransformed },
  ];
}
