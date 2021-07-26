import axios from 'axios';
import _ from 'lodash';
import { notification } from 'antd';
import { getRouter } from '../config/router';

let historyRef = null;
let authRef = null;
const loginPath = getRouter('login').pathname;

_.assign(axios.defaults, {
  baseURL: process.env.API_HOST,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
  timeout: 120000,
  raw: false,
});

// intercept response
axios.interceptors.response.use(response => {
  if (response.config.raw) {
    return response;
  }
  if (response.data && response.data.meta) {
    const {
      code,
      message,
      publicMessage,
    } = response.data.meta;
    if (code !== 200 && code !== '200') {
      // for error which response code is not 200
      let error = new Error(publicMessage || message || response.data.message);
      error.displayed = true;
      notification.error({
        message: 'Error',
        description: error.message,
        duration: 0,
      });
      return Promise.reject(error);
    }
    return response.data.data;
  }
  return response.data;
}, err => {
  // this is a cancel request
  if (axios.isCancel(err)) {
    return Promise.reject(err);
  }
  // connection error
  if(err.response) {
    // global process
    if(err.response.status === 401 && !err.response.config.showError) {
      err.skipped = true;
      // clear user information
      authRef && authRef.clearUserInfo();
      if (historyRef) {
        if (historyRef.location.pathname !== loginPath) {
          historyRef.push(loginPath);
        }
      }
    } else {
      let message = err.message;
      let data = err.response.data;
      const getError = () => {
        if (data) {
          if (data.meta) {
            message = data.meta.publicMessage || data.meta.message;
          } else if (data.message) {
            message = data.message;
          }
        }
        err.displayed = true;
        notification.error({
          message: 'Error',
          description: message,
          duration: 0,
        });
      };
      // If we download a file via blob reponse, we need to consider failed response with json message.
      if (err.response.config && err.response.config.responseType === 'blob') {
        if (data && data.type === 'application/json') {
          return data.text()
            .then((jsonText) => {
              data = JSON.parse(jsonText);
              getError();
              throw err;
            }, (exception) => {
              notification.error({
                message: 'Error',
                description: exception.message,
                duration: 0,
              });
              throw exception;
            });
        }
      }
      getError();
    }
  } else {
    err.displayed = true;
    notification.error({
      message: 'Error',
      description: 'Connection error, please try it later.',
      duration: 0,
    });
  }
  // for local test, show something on UI
  return Promise.reject(err);
});

export function request(options) {
  const {
    history = historyRef,
    auth = authRef,
  } = options;
  historyRef = history;
  authRef = auth;
}
