import * as axios from './axios';
import * as dayjs from './dayjs';
import * as email from '../../lib/email';

export const initialize = async (): Promise<void> => {
  await axios.initialize();
  await dayjs.initialize();
  await email.initialize();
};

export default initialize;
