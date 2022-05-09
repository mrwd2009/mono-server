import querystring from 'query-string';
import dayjs from 'dayjs';
import { Op } from '@sequelize/core';
import { URLSearchParams } from 'url';
import axios from 'axios';
import config from '../../../config/config';
import appDBs from '../../../config/model/app';
import { userHelper } from '../helper';
import { AuthError } from '../../../lib/error';

const {
  gateway: {
    models: { OAuth2User, OAuth2UserToken, UserLoginHistory },
    sequelize,
  },
} = appDBs;

export const getLoginUrl = async () => {
  const params = {
    client_id: config.oauth2.consumerKey,
    redirect_uri: config.oauth2.callbackUrl,
    response_type: 'code',
  };
  return `${config.oauth2.loginUrl}?${querystring.stringify(params)}`;
};

interface OAuth2CallbackParams {
  ip: string;
  userAgent?: string;
  referer?: string;
  origin?: string;
  code: string;
}
export const oauth2Callback = async (params: OAuth2CallbackParams) => {
  const postData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: params.code,
    client_id: config.oauth2.consumerKey,
    client_secret: config.oauth2.consumerSecret,
    redirect_uri: config.oauth2.callbackUrl,
  });

  const { data: token_info } = await axios.post(config.oauth2.tokenUrl, postData, { raw: true });

  const { access_token, token_type } = token_info;

  const { data: user_info } = await axios.get(config.oauth2.userInfoUrl, {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
    raw: true,
  });

  return await sequelize.transaction(async (transaction) => {
    let user = await OAuth2User.findOne({
      where: {
        sub: user_info.sub,
      },
      transaction,
    });
    if (!user) {
      user = await OAuth2User.create(
        {
          email: user_info.email,
          name: user_info.name,
          sub: user_info.sub,
          picture: user_info.picture,
          access_token,
          token_type,
          token_info: JSON.stringify(token_info),
          user_info: JSON.stringify(user_info),
        },
        {
          transaction,
        },
      );
    } else {
      if (!user.enabled) {
        throw new AuthError('Your account has been frozen, please contact administrator.');
      }
      await user.update(
        {
          email: user_info.email,
          name: user_info.name,
          sub: user_info.sub,
          picture: user_info.picture,
          access_token,
          token_type,
          token_info: JSON.stringify(token_info),
          user_info: JSON.stringify(user_info),
        },
        {
          transaction,
        },
      );

      await OAuth2UserToken.destroy({
        where: {
          user_id: user.id,
          expired_at: {
            [Op.lte]: dayjs.utc().format(),
          },
        },
        transaction,
      });
    }

    if (config.auth.traceLogin) {
      await UserLoginHistory.create(
        {
          node_env: config.nodeEnv,
          app_env: config.appEnv,
          sso_env: 'salesforce',
          email: user.email!,
          ip: params.ip,
          user_agent: params.userAgent,
          referer: params.referer,
        },
        { transaction },
      );
    }

    const token = await userHelper.createJwtToken({
      id: user.id,
      type: 'oauth2',
      transaction,
      UserToken: OAuth2UserToken,
    });

    return token;
  });
};
