import axios, { AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import assign from 'lodash/assign';
import { useNavigate, NavigateFunction, useLocation, Location } from 'react-router-dom';
import { baseURL } from '../api-endpoints';
import { getRouteInfo } from '../routes-info';
import util from '../../util';

declare module 'axios' {
  export interface AxiosRequestConfig {
    raw?: boolean; // whether process response automatically
    showError?: boolean; // show error for 401
    useAxiosHook?: boolean; // whether use axios hook
  }
}

let navigateRef: NavigateFunction;
let locationRef: Location;
const loginPath = getRouteInfo('login')!.path;

assign(axios.defaults, {
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000,
  raw: false,
  useAxiosHook: false,
});

const requestSuccessInterceptor = (response: AxiosResponse) => {
  if (response.config.raw) {
    return response;
  }
  let data: any;
  if (response.data && response.data.meta) {
    const { code, message, publicMessage } = response.data.meta;
    if (code !== 200 && code !== '200') {
      // for error which response code is not 200
      let error: any = new Error(publicMessage || message || response.data.message);
      error.displayed = true;
      util.showError(error.message, 'axios-non-200-error');
      return Promise.reject(error);
    }
    data = response.data.data;
  } else {
    data = response.data;
  }
  if (response.config.useAxiosHook) {
    // in useAxios we need to return response instead of data
    response.data = data;
    return response;
  }
  return data;
};

const requestErrorInterceptor = (err: any) => {
  // this is a cancel request
  if (axios.isCancel(err)) {
    return Promise.reject(err);
  }
  // connection error
  if (err.response) {
    // global process
    if (err.response.status === 401 && !err.response.config.showError) {
      err.skipped = true;
      // clear user information
      // authRef && authRef.clearUserInfo();
      if (locationRef.pathname !== loginPath) {
        navigateRef(loginPath);
      }
    } else {
      let message = err.message;
      let data = err.response.data;
      const getError = () => {
        let internalMessage = '';
        if (data) {
          if (data.meta) {
            message = data.meta.publicMessage || data.meta.message;
            internalMessage = data.meta.internalMessage;
          } else if (data.message) {
            message = data.message;
            internalMessage = data.internalMessage;
          }
        }
        err.displayed = true;
        showAdvancedError(message, internalMessage);
      };
      // If we download a file via blob reponse, we need to consider failed response with json message.
      if (err.response.config && err.response.config.responseType === 'blob') {
        if (data && data.type === 'application/json') {
          return data.text().then(
            (jsonText: string) => {
              data = JSON.parse(jsonText);
              getError();
              throw err;
            },
            (exception: Error) => {
              util.showError(exception.message, 'axios-blob-error');
              throw exception;
            },
          );
        }
      }
      getError();
    }
  } else {
    err.displayed = true;
    util.showError('Connection error, please try it later.', 'axios-connection-error');
  }
  // for local test, show something on UI
  return Promise.reject(err);
};
// intercept response
axios.interceptors.response.use(requestSuccessInterceptor, requestErrorInterceptor);

function showAdvancedError(message: string, internalMessage: string) {
  // // match uuid from message like [reference code:c574ca54-6c6c-4bec-ab81-4ed6d5708ea8]
  // const reg = /\[reference code:([\w-]{36})\]$/;
  // const matched = (message || '').match(reg);
  // if (matched && internalMessage) {
  //   return notification.error({
  //     message: 'Error',
  //     description: <AdvancedError internalMessage={internalMessage} message={message.replace(reg, '')} uuid={matched[1]} />,
  //     duration: 0,
  //   });
  // }
  return util.showError(message, 'axios-advanced-error');
}
const hookAxios = axios.create({
  useAxiosHook: true,
});
// intercept response
hookAxios.interceptors.response.use(requestSuccessInterceptor, requestErrorInterceptor);
configure({
  cache: false,
  axios: hookAxios,
  defaultOptions: {
    manual: true,
    useCache: false,
  },
});

export const useInitializer = () => {
  const currentNavigate = useNavigate();
  const currentLocation = useLocation();
  navigateRef = currentNavigate;
  locationRef = currentLocation;
};

export default axios;
