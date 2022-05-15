import { job } from '../helper';
import authConfirmationEmail from './processor/auth-confirmation-email';
import config from '../../config/config';
import logger from '../../lib/logger';
import appDB from '../../config/model/app';
import { sendConfirmAccountEmail } from '../../lib/email';

const {
  gateway: {
    models: {
      UITask,
    },
  },
} = appDB;

const queue = job.getQueue('auth-confirmation-email');
queue.process(authConfirmationEmail.bind(null, {
  logger,
  UITask,
  sendConfirmAccountEmail,
  confirmAccountPath: config.auth.pathInfo.confirmAccount,
  homePath: config.auth.pathInfo.home,
}));

export default queue;
