import Koa from 'koa';
import passport from 'koa-passport';
import cookie from 'cookie';
import { Strategy, ExtractJwt, StrategyOptions, VerifyCallbackWithRequest, JwtFromRequestFunction } from 'passport-jwt';
import config from '../config';
import appDBs from '../../config/model/app';
import { AuthError } from '../../lib/error';
import util from '../../lib/util';

const {
  gateway: {
    models: { User, UserToken },
  },
} = appDBs;

const getToken: JwtFromRequestFunction = (req) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[config.jwt.cookieKey];
};

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([getToken]),
  secretOrKey: config.jwt.secret,
  issuer: config.jwt.issuer,
  audience: config.jwt.audience,
  passReqToCallback: true,
};

const getUser: VerifyCallbackWithRequest = (req, payload, done) => {
  const token = getToken(req);
  try {
    const data = JSON.parse(payload.sub);
    if (data.type === 'user') {
      const queryUser = User.findOne({
        attributes: ['id', 'email'],
        where: {
          id: data.id,
        },
        include: {
          model: UserToken,
          attributes: ['id'],
          where: {
            user_id: data.id,
            signature: util.getJwtTokenSignature(token),
            status: 'enabled',
          },
        },
      });
      return queryUser
        .then((user) => {
          if (!user || !user.UserTokens?.length) {
            done(new AuthError('Invalid or expired token.'));
          } else {
            done(null, {
              id: user.id,
              email: user.email,
            });
          }
        })
        .catch(() => {
          done(new AuthError('Invalid or expired token.'));
        });
    } else {
      done(null, { id: data.id, email: data.id });
    }
  } catch (error) {
    done(new AuthError('Unknown token.'));
  }
};

passport.use(new Strategy(options, getUser));

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(passport.initialize());
};

export default initialize;
