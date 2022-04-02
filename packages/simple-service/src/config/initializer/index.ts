import * as axios from './axios';
import * as dayjs from './dayjs';

export const initialize = async (): Promise<void> => {
  await axios.initialize();
  await dayjs.initialize();
};

export default initialize;
