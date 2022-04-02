import { job } from '../helper';
import authForgotEmail from './processor/auth-forgot-email';
import logger from '../../lib/logger';


const queue = job.getQueue('auth-forgot-email');
queue.process(authForgotEmail.bind(null, logger));

export default queue;
