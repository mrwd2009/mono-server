import { job } from '../helper';
import authForgotEmail from './processor/auth-forgot-email';
import config from '../../config/config';
import logger from '../../lib/logger';
import appDB from '../../config/model/app';
import { sendForgotPasswordEmail } from '../../lib/email';

const {
  gateway: {
    models: {
      UITask,
    },
  },
} = appDB;

const queue = job.getQueue('auth-forgot-email');
queue.process(authForgotEmail.bind(null, {
  logger,
  UITask,
  sendForgotPasswordEmail,
  forgotPasswordPath: config.auth.pathInfo.forgotPassword
}));

export default queue;
