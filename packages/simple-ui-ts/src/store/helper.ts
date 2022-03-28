// DO NOT import this file in index.ts. It'll cause cyclic reference
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './helper';

export * from './base-query';

export const createAppApi = (reducerPath: string) => {
  return createApi({
    reducerPath,
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
  });
};
