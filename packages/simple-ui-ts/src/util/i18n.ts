import type { i18n, TFunctionResult, TFunctionKeys, StringMap, TOptions } from 'i18next'

let _i18n: i18n;

export const updateI18n = (input: i18n) => {
  _i18n = input;
};

export function t<
  TResult extends TFunctionResult = string,
  TKeys extends TFunctionKeys = string,
  TInterpolationMap extends object = StringMap,
>(key: TKeys | TKeys[], defaultValue?: string, options?: TOptions<TInterpolationMap> | string): TResult {
  return _i18n.t(key, defaultValue, options);
}

const i18nDelegate = {
  updateI18n,
  t,
};

export default i18nDelegate;




