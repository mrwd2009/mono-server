import { DefaultState } from 'koa';
import _ from 'lodash';
import appDBs from '../../../config/model/app';
import config from '../../../config';
import { rbac } from '../../../config/middleware'

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

  const permissions: string[] = [];
  const permissionIds = await rbac.getUserPermissions(state.user.id);
  _.forEach(rbac.permissions, (val, key) => {
    if (_.includes(permissionIds, val)) {
      permissions.push(key);
    }
  });

  return {
    appEnv: config.appEnv,
    user: state.user.email,
    username: profile?.display_name,
    permissions,
  };
};

export { getInfo };
