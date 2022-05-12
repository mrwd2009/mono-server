import { job } from '../helper';
import authForgotEmail from './processor/auth-forgot-email';
import logger from '../../lib/logger';
import appDB from '../../config/model/app';

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
}));

export default queue;
