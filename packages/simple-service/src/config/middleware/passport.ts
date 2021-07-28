import Koa from 'koa';
import passport from 'koa-passport';
import cookie from 'cookie';
import { Strategy, ExtractJwt, StrategyOptions, VerifyCallback, JwtFromRequestFunction } from 'passport-jwt';
import config from '../config';

const getToken: JwtFromRequestFunction = (req) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[config.jwt.cookieKey];
};

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([getToken]),
  secretOrKey: config.jwt.secret,
  issuer: config.jwt.issuer,
  audience: config.jwt.audience,
};

const getUser: VerifyCallback = (payload, done) => {
  done(null, { email: payload.sub });
};

passport.use(new Strategy(options, getUser));

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(passport.initialize());
};

export default initialize;
