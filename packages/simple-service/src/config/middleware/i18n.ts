import Koa, { Middleware } from 'koa';
import { i18n as I18nType } from 'i18next';
import { locale } from '../../lib/util';
import { pick } from '../../lib/util/accept-lang-parser';

declare module 'koa' {
  interface DefaultContext {
    i18n: I18nType;
  }
}
export const i18n: Middleware = async (context, next) => {
  const receivedLang = context.headers['accept-language'];
  const lang = pick(locale.supportedLangs, receivedLang);
  const i18n = await locale.getI18n(lang);
  context.i18n = i18n;
  await next();
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(i18n);
};

export default initialize;
