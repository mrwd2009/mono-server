import { DefaultState } from 'koa';
import config from '../../../config';

const getInfo = async (state: DefaultState): Promise<{ appEnv: string; user: string }> => {
  return {
    appEnv: config.appEnv,
    user: state.user.email,
  };
};

export { getInfo };
