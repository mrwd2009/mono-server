import { ReactNode, Component } from 'react';
import memoizedOne from 'memoize-one';
import devWarning from '../_util/devWarning';

import { TransferLocale as TransferLocaleForEmpty } from '../empty';
import LocaleContext from './context';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  Pagination?: any;
  DatePicker?: any;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  Table?: any;
  Modal?: any;
  Popconfirm?: any;
  Transfer?: any;
  Select?: Record<string, any>;
  Upload?: any;
  Empty?: TransferLocaleForEmpty;
  global?: Record<string, any>;
  PageHeader?: { back: string };
  Icon?: Record<string, any>;
  Text?: Record<string, any>;
  Form?: {
    optional?: string;
    defaultValidateMessages: any;
  };
  Image?: {
    preview: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: ReactNode;
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    devWarning(props._ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale');
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps: LocaleProviderProps) {

  }

  componentWillUnmount() {

  }

  render() {
    const { locale, children } = this.props;
    const contextValue = memoizedOne(localeValue => ({
      ...localeValue,
      exist: true
    }))(locale);

    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
  }
}