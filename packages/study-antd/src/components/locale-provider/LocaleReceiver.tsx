import { useContext, useMemo, ReactNode, Component } from 'react';
import defaultLocaleData from './default';
import LocaleContext from './context';
import { Locale } from '.';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<C extends LocaleComponentName = LocaleComponentName> {
  componentName: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (
    locale: Exclude<Locale[C], undefined>,
    localeCode?: string,
    fullLocale?: object,
  ) => ReactNode;
}

export default class LocaleReceiver< C extends LocaleComponentName = LocaleComponentName> extends Component<LocaleReceiverProps<C>> {
  static defaultProps = {
    componentName: 'global',
  };

  static contextType = LocaleContext;

  getLocale(): Exclude<Locale[C], undefined> {
    const { componentName, defaultLocale } = this.props;
    const locale = defaultLocale || defaultLocaleData[componentName ?? 'global'];
    const antLocale = this.context;
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {})
    };
  }

  getLocaleCode() {
    const antLocale = this.context;
    const localeCode = antLocale && antLocale.locale;

    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }

    return localeCode;
  }

  render() {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context);
  }
}

export function useLocaleReceiver<T extends LocaleComponentName>(
  componentName: T,
  defaultLocale?: Locale[T] | Function,
): [Locale[T]] {
  const antLocale = useContext(LocaleContext);

  const componentLocale = useMemo(() => {
    const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};

    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [componentLocale];
}