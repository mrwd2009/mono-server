import i18next, { i18n } from 'i18next';
import locale from '../../config/locale';

export const supportedLangs = ['en-US'];

const cachedI18n: Record<string, i18n> = {};
export const getI18n = async (lang?: string | null) => {
  lang = lang || 'en-US';

  // set unknown lang to 'en-US'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(locale as any)[lang]) {
    lang = 'en-US';
  }

  let target =  cachedI18n[lang];
  if (target) {
    return target;
  }

  target = i18next.createInstance();
  cachedI18n[lang] = target;

  await target.init({
    lng: lang,
    resources: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [lang]: (locale as any)[lang]
    }
  });

  return target;
};

export default getI18n;