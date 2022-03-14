import Koa from 'koa';
import Tokens, { Options } from 'csrf';
import { Middleware } from 'koa';
/**
 * This middleware is used to check csrf token received from client and generate new csrf token.
 * We use cookie to store csrf secret which is used to compare with received one.
 * If we are using separation of UI and API, we don't need to use this middleware.
 * Because cors(middleware) checking is enough.
 * 
 * Refer https://segmentfault.com/a/1190000024490213
 * 
 * If you want to use this middleware, you need to call method context.generateCSRFToken?.() to get csrf token.
 * Then save this token in you client and add this token in http header 'csrf-token' before sending any ajax request.
 */

// Refer from https://github.com/koajs/csrf
const createCSRFMiddleware = (options: Options = {}): Middleware => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opts: any = Object.assign({
    invalidTokenMessage: 'Invalid CSRF token',
    csrfSecretCookieKey: 'csrf-secret',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false
  }, options);
  const tokens = new Tokens(opts);

  return async (ctx, next) => {
    ctx.generateCSRFToken = () => {
      let secret = ctx.cookies.get(opts.csrfSecretCookieKey);
      if (!secret) {
        secret = tokens.secretSync();
        ctx.cookies.set(opts.csrfSecretCookieKey, secret, { httpOnly: true });
      }
      return tokens.create(secret!);
    };

    if (opts.excludedMethods.indexOf(ctx.method) !== -1) {
      return await next();
    }

    const secret = ctx.cookies.get(opts.csrfSecretCookieKey);
    if (!secret) {
      return await next();
    }

    const bodyToken =
      ctx.request.body && typeof ctx.request.body._csrf === 'string'
        ? ctx.request.body._csrf
        : false;

    const token =
      bodyToken ||
      (!opts.disableQuery && ctx.query && ctx.query._csrf) ||
      ctx.get('csrf-token') ||
      ctx.get('xsrf-token') ||
      ctx.get('x-csrf-token') ||
      ctx.get('x-xsrf-token');

    if (!token) {
      return ctx.throw(
        opts.invalidTokenStatusCode,
        typeof opts.invalidTokenMessage === 'function'
          ? opts.invalidTokenMessage(ctx)
          : opts.invalidTokenMessage
      );
    }

    if (!tokens.verify(secret!, token)) {
      return ctx.throw(
        opts.invalidTokenStatusCode,
        typeof opts.invalidTokenMessage === 'function'
          ? opts.invalidTokenMessage(ctx)
          : opts.invalidTokenMessage
      );
    }

    return await next();
  };
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(createCSRFMiddleware());
};

export default initialize;