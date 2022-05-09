import Koa from 'koa';
import passport from 'koa-passport';
import cookie from 'cookie';
import { Strategy, ExtractJwt, StrategyOptions, VerifyCallbackWithRequest, JwtFromRequestFunction } from 'passport-jwt';
import config from '../../config';
import { AuthError } from '../../../lib/error';
import './gateway-checker';
import './oauth2-checker';
import { executeCheckers, checkerMiddleware, AfterChecker } from './checker';

declare module 'koa' {
  interface DefaultContext {
    _passportAfterChecker?: AfterChecker;
    skipSessionExtend?: boolean;
  }
}

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
  if (!token) {
    return done(new AuthError('Unknown token.'));
  }
  executeCheckers(payload, token)
    .then((result) => {
      if (result?.passed && result?.entity) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (req as any).ctx._passportAfterChecker = result.afterChecker;
        done(null, result.entity);
      } else {
        done(new AuthError('Unknown token.'));
      }
    })
    .catch(() => {
      done(new AuthError('Unknown token.'));
    });
};

passport.use(new Strategy(options, getUser));

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(passport.initialize());
  await app.use(checkerMiddleware);
};

export default initialize;
