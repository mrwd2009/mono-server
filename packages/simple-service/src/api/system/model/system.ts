import _ from 'lodash';
import appDBs from '../../../config/model/app';
import config from '../../../config';
import { rbac } from '../../../config/middleware';

const {
  gateway: {
    models: { UserProfile, OAuth2User },
  },
} = appDBs;

const getInfo = async (user: { id: number, email: string, type: string }, getPermissions: () => Promise<Array<number>>) => {
  const info: {
    appEnv: string;
    user?: string;
    username?: string;
    permissions?: string[],
  } = {
    appEnv: config.appEnv,
    user: user.email,
  };

  if (user.type === 'user') {
    const profile = await UserProfile.findOne({
      attributes: ['display_name'],
      where: {
        user_id: user.id,
      },
    });
    info.username = profile?.display_name;
  } else if (user.type === 'oauth2') {
    const oauth2User = await OAuth2User.findOne({
      attributes: ['name'],
      where: {
        id: user.id,
      }
    });
    info.username = oauth2User!.name!;
  }

  const permissions: string[] = [];
  const permissionIds = await getPermissions();
  _.forEach(rbac.permissions, (val, key) => {
    if (_.includes(permissionIds, val)) {
      permissions.push(key);
    }
  });

  info.permissions = permissions;

  return info;
};

export { getInfo };
