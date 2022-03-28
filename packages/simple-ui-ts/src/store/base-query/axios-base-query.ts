import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type QueryFn = BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
>;

const axiosBaseQuery = (): QueryFn => async ({ url, method, data, params }, api) => {
  try {
    const result = await axios({ url, method, params, data, signal: api.signal });
    return { data: result };
  } catch (axiosError) {
    const error = axiosError as AxiosError;
    return {
      error: {
        status: error.response?.status,
        message: error.message,
      },
    };
  }
};

export default axiosBaseQuery