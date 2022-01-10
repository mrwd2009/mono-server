import { useCallback, ReactNode, FC } from 'react';
import type { RenderEmptyHandler } from './renderEmpty';
import {
  ConfigConsumer,
  ConfigContext,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
  Theme,
} from './context';
import useUtilMemo from '../../dependents/util/src/hooks/useMemo';
import { SizeContextProvider, SizeType } from './SizeContext';

export type {
  RenderEmptyHandler,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
};

export {
  ConfigContext,
  ConfigConsumer,
};

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

const PASSED_PROPS: Exclude<keyof ConfigConsumerProps, 'rootPrefixCls' | 'getPrefixCls'>[] = [
  'getTargetContainer',
  'getPopupContainer',
  'renderEmpty',
  'pageHeader',
  'input',
  // 'form',
];

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: ReactNode,
  renderEmpty?: RenderEmptyHandler,
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  // form?: {
  //   validateMessages?: ValidateMessages;
  //   requiredMark?: RequiredMark;
  //   colon?: boolean;
  // }
  input?: {
    autoComplete?: string;
  };
  // locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
  componentSize?: SizeType;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}

export const defaultPrefixCls = 'ant';
export const defaultIconPrefixCls = 'anticon';
let globalPrefixCls: string;
let globalIconPrefixCls: string;

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls;
}


const setGlobalConfig = ({
  prefixCls,
  iconPrefixCls,
  theme,
}: Pick<ConfigProviderProps, 'prefixCls' | 'iconPrefixCls'> & { theme?: Theme }) => {
  if (prefixCls !== undefined) {
    globalPrefixCls = prefixCls;
  }

  if (iconPrefixCls !== undefined) {
    globalIconPrefixCls = iconPrefixCls;
  }

  // if (theme) {
  //   registerTheme(getGlobalPrefixCls(), theme);
  // }
}

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    if (globalPrefixCls) {
      return globalPrefixCls;
    }

    return getGlobalPrefixCls();
  }
});


const ProviderChildren: FC<ProviderChildrenProps> = props => {
  const {
    children,
    csp,
    autoInsertSpaceInButton,
    componentSize,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    parentContext,
    parentContext: {
      getPrefixCls: parentGetPrefixCls,
    },
    prefixCls,
    // iconPrefixCls,
  } = props;

  const getPrefixCls = useCallback((suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }

    const mergedPrefixCls = prefixCls || parentGetPrefixCls('');

    return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
  }, [parentGetPrefixCls, prefixCls]);

  const config = {
    ...parentContext,
    csp,
    autoInsertSpaceInButton,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    getPrefixCls,
  };

  PASSED_PROPS.forEach(propName => {
    const val: any = props[propName];
    if (val) {
      (config as any)[propName] = val;
    }
  });

  const memoizedConfig = useUtilMemo(() => config, config, (prevConfig: Record<string, any>, currentConfig) => {
    const prevKeys = Object.keys(prevConfig);
    const currentKeys = Object.keys(currentConfig);
    return (
      prevKeys.length !== currentKeys.length ||
      prevKeys.some(key => prevConfig[key] !== currentConfig[key])
    );
  });

  // const memoizedIconContextValue = useMemo(() => ({ prefixCls: iconPrefixCls, csp }), [iconPrefixCls, csp]);

  let childNode = children;

  // if (iconPrefixCls) {
  //   childNode = (
  //     <IconContext.Provider value={memoizedIconContextValue}>{childNode}</IconContext.Provider>
  //   );
  // }

  if (componentSize) {
    childNode = <SizeContextProvider size={componentSize}>{childNode}</SizeContextProvider>;
  }

  return <ConfigContext.Provider value={memoizedConfig as any}>{childNode}</ConfigContext.Provider>;
}

const ConfigProvider: FC<ConfigProviderProps> = props => {
  return (
    <ConfigConsumer>
      {context => (
        <ProviderChildren
          parentContext={context}
          {...props}
        />
      )}
    </ConfigConsumer>
  );
}

// ConfigProvider.ConfigContext = ConfigContext;
// ConfigProvider.SizeContext = SizeContext;
// ConfigProvider.config = setGlobalConfig;

export default ConfigProvider;