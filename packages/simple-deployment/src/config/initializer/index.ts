import * as axios from './axios';

export const initialize = async (): Promise<void> => {
  await axios.initialize();
};

export default initialize;