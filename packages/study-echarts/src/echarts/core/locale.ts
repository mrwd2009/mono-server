import { Dictionary } from '../util/types';
import Model from '../model/Model';
import env from 'zrender/src/core/env';
import langEN from '../i18n/langEN';
import langZH from '../i18n/langZH';
import { isString, clone, merge } from 'zrender/src/core/util';

export type LocaleOption = typeof langEN;

const LOCALE_ZH = 'ZH';
const LOCALE_EN = 'EN';
const DEFAULT_LOCALE = LOCALE_EN;

const localeStorage: Dictionary<LocaleOption> = {};
const localeModels: Dictionary<Model> = {};

export const SYSTEM_LANG = !env.domSupported ? DEFAULT_LOCALE : (function() {
  const langStr = (
    /* eslint-disable-next-line */
    document.documentElement.lang || navigator.language || (navigator as any).browserLanguage
  ).toUpperCase();
  return langStr.indexOf(LOCALE_ZH) > -1 ? LOCALE_ZH : DEFAULT_LOCALE;
})();

export function registerLocale(locale: string, localeObj: LocaleOption) {
  locale = locale.toUpperCase();
  localeModels[locale] = new Model(localeObj);
  localeStorage[locale] = localeObj;
}

export function createLocaleObject(locale: string | LocaleOption): LocaleOption {
  if (isString(locale)) {
    const localeObj = localeStorage[locale.toUpperCase()] || {} as LocaleOption;
    if (locale === LOCALE_EN || locale === LOCALE_ZH) {
      return clone(localeObj);
    } else {
      return merge(clone(localeObj), clone(localeStorage[DEFAULT_LOCALE]), false)
    }
  } else {
    return merge(clone(locale), clone(localeStorage[DEFAULT_LOCALE]), false);
  }
}

export function getLocaleModel(lang: string): Model<LocaleOption> {
  return localeModels[lang];
}

export function getDefaultLocaleModel(): Model<LocaleOption> {
  return localeModels[DEFAULT_LOCALE];
}

registerLocale(LOCALE_EN, langEN);
registerLocale(LOCALE_ZH, langZH);