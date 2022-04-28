import { DefaultState } from 'koa';
import appDBs from '../../../config/model/app';
import config from '../../../config';

const {
  gateway: {
    models: { UserProfile },
  },
} = appDBs;

const getInfo = async (state: DefaultState) => {
  const profile = await UserProfile.findOne({
    attributes: ['display_name'],
    where: {
      user_id: state.user.id,
    },
  });
  return {
    appEnv: config.appEnv,
    user: state.user.email,
    username: profile?.display_name,
  };
};

export { getInfo };
