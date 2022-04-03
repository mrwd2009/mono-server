import { job } from '../helper';
import authLockEmail from './processor/auth-lock-email';
import logger from '../../lib/logger';

const queue = job.getQueue('auth-lock-email');
queue.process(authLockEmail.bind(null, logger));

export default queue;
