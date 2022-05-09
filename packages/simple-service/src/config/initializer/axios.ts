/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { BackendError } from '../../lib/error';

declare module 'axios' {
  export interface AxiosRequestConfig {
    raw?: boolean; // whether process response automatically
  }
}

export const initialize = async (): Promise<void> => {
  axios.defaults.timeout = 60000 * 3;
  axios.interceptors.response.use(
    (response) => {
      const config = response.config;
      // custom config field to return response object.
      if (config.raw) {
        return response;
      }
      if (response.data?.meta?.code) {
        if (response.data.meta.code === 200) {
          return response.data.data;
        }
        return Promise.reject(
          new BackendError({
            request: response.request,
            response,
            config: response.config,
          } as AxiosError),
        );
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(new BackendError(error));
    },
  );
  return;
};
