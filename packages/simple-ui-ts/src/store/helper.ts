// DO NOT import this file in index.ts. It'll cause cyclic reference
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './helper';

export * from './base-query';

interface ApiOptions {
  reducerPath: string;
  tagTypes: string[];
}

export const createAppApi = (options: ApiOptions | string) => {
  let reducerPath = '';
  let tagTypes: string[] = [];

  if (typeof options === 'string') {
    reducerPath = options;
    tagTypes = [options];
  } else {
    reducerPath = options.reducerPath;
    tagTypes = options.tagTypes;
  }

  return createApi({
    reducerPath,
    tagTypes,
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
  });
};
