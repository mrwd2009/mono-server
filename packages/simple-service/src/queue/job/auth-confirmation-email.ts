import { job } from '../helper';
import authConfirmationEmail from './processor/auth-confirmation-email';
import logger from '../../lib/logger';

const queue = job.getQueue('auth-confirmation-email');
queue.process(authConfirmationEmail.bind(null, logger));

export default queue;
