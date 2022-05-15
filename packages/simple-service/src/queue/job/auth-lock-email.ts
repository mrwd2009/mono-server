import { job } from '../helper';
import authLockEmail from './processor/auth-lock-email';
import config from '../../config/config';
import logger from '../../lib/logger';
import appDB from '../../config/model/app';
import { sendLockAccountEmail } from '../../lib/email';

const {
  gateway: {
    models: {
      UITask,
    },
  },
} = appDB;

const queue = job.getQueue('auth-lock-email');
queue.process(authLockEmail.bind(null, {
  logger,
  UITask,
  sendLockAccountEmail,
  unlockAccountPath: config.auth.pathInfo.unlockAccount
}));

export default queue;
