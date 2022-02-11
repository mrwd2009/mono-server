import {
  assert,
  each,
  isFunction,
  isObject,
  indexOf,
  bind,
  clone,
  setAsPrimitive,
  extend,
  HashMap,
  createHashMap,
  map,
  defaults,
  isDom,
  isArray,
  noop,
  isString
} from 'zrender/src/core/util';
import env from 'zrender/src/core/env';
import timsort from 'zrender/src/core/timsort';
import Eventful, { EventCallbackSingleParam } from 'zrender/src/core/Eventful';
import Element, { ElementEvent } from 'zrender/src/Element';
import GlobalModel, { QueryConditionKindA, GlobalModelSetOptionOpt } from '../model/Global';
import ExtensionAPI from './ExtensionAPI';
import CoordinateSystemManager from './CoordinateSystem';
import OptionManager from '../model/OptionManager';
import backwardCompat from '../preprocessor/backwardCompat';
import dataStack from '../processor/dataStack';
import ComponentModel from '../model/Component';
import SeriesModel from '../model/Series';
import ComponentView, { ComponentViewConstructor } from '../view/Component';
import ChartView, { ChartViewConstructor } from '../view/Chart';
import * as graphic from '../util/graphic';
import { getECData } from '../util/innerStore';
import {
  isHighDownDispatcher,
  HOVER_STATE_EMPHASIS,
  HOVER_STATE_BLUR,
  blurSeriesFromHighlightPayload,
  toggleSelectionFromPayload,
  updateSeriesElementSelection,
  getAllSelectedIndices,
  isSelectChangePayload,
  isHighDownPayload,
  HIGHLIGHT_ACTION_TYPE,
  DOWNPLAY_ACTION_TYPE,
  SELECT_ACTION_TYPE,
  UNSELECT_ACTION_TYPE,
  TOGGLE_SELECT_ACTION_TYPE,
  savePathStates,
  enterEmphasis,
  leaveEmphasis,
  enterBlur,
  leaveBlur,
  allLeaveBlur,
  enterSelect,
  leaveSelect,
  findComponentHighDownDispatchers,
  blurComponent,
  handleGlobalMouseOverForHighDown,
  handleGlobalMouseOutForHighDown
} from '../util/states';
import * as modelUtil from '../util/model';
import { throttle } from '../util/throttle';
import { seriesStyleTask, dataStyleTask, dataColorPaletteTask } from '../visual/style';
import loadingDefault from '../loading/default';
import Scheduler from './Scheduler';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';
import { CoordinateSystemMaster, CoordinateSystemCreator, CoordinateSystemHostModel } from '../coord/CoordinateSystem';
import { parseClassType } from '../util/clazz';
import { ECEventProcessor } from '../util/ECEventProcessor';
import {
  Playload,
  ECElement,
  RendererType,
  ECActionEvent,
  ActionHandler,
  ActionInfo,
  OptionPreprocessor,
  PostUpdater,
  LoadingEffect,
  LoadingEffectCreator,
  StageHandlerInternal,
  StageHandlerOverallReset,
  StageHandler,
  ViewRootGroup,
  DimensionDefinitionLoose,
  ECEventData,
  ThemeOption,
  ECBasicOption,
  ECUnitOption,
  ZRColor,
  ComponentMainType,
  ComponentSubType,
  ColorString,
  SelectChangedPayload,
  ScalaDataValue,
  ZRElementEventName,
  ECElementEvent,
  AnimationOption
} from '../util/types';
import Displayable from 'zrender/src/graphic/Displayable';
import { seriesSymbolTask, dataSymbolTask } from '../visual/symbol';
import { getVisualFromData, getItemVisualFromData } from '../visual/helper';
import { deprecateLog, deprecateReplaceLog, error } from '../util/log';
import { handleLegacySelectEvents } from '../legacy/dataSelectAction';

import { registerExternalTransform } from '../data/helper/transform';
import { createLocaleObjet, SYSTEM_LANG, LocaleOption } from './locale';

import type { EChartsOption } from '../export/option';
import { findEventDispatcher } from '../util/event';
import decal from '../visual/decal';
import SVGPainer from 'zrender/src/svg/Painter';
import lifecycle, {
  LifecycleEvents,
  UpdateLifecycleTransitionItem,
  UpdateLifecycleParams,
  UpdateLifecycleTransitionOpt
} from './lifecyle';
import { platformApi, setPlatformAPI } from 'zrender/src/core/platform';
import { getImpl } from './impl';
import type geoSourceManager from '../coord/geo/geoSourceManager';

type ModelFinder = modelUtil.ModelFinder;

const hasWindow = typeof window !== 'undefined';

export const version = '5.3.0';

export const dependencies = {
  zrender: '5.3.0',
};

const TEST_FRAME_REMAIN_TIME = 1;


const PRIORITY_PROCESSOR_SERIES_FILTER = 800;
// Some data processors depends on the stack result dimension (to calculate data extent).
// So data stack stage should be in front of data processing stage.
const PRIORITY_PROCESSOR_DATASTACK = 900;
// "Data filter" will block the stream, so it should be
// put at the begining of data processing.
const PRIORITY_PROCESSOR_FILTER = 1000;
const PRIORITY_PROCESSOR_DEFAULT = 2000;
const PRIORITY_PROCESSOR_STATISTIC = 5000;

const PRIORITY_VISUAL_LAYOUT = 1000;
const PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100;
const PRIORITY_VISUAL_GLOBAL = 2000;
const PRIORITY_VISUAL_CHART = 3000;
const PRIORITY_VISUAL_COMPONENT = 4000;
// Visual property in data. Greater than `PRIORITY_VISUAL_COMPONENT` to enable to
// overwrite the viusal result of component (like `visualMap`)
// using data item specific setting (like itemStyle.xxx on data item)
const PRIORITY_VISUAL_CHART_DATA_CUSTOM = 4500;
// Greater than `PRIORITY_VISUAL_CHART_DATA_CUSTOM` to enable to layout based on
// visual result like `symbolSize`.
const PRIORITY_VISUAL_POST_CHART_LAYOUT = 4600;
const PRIORITY_VISUAL_BRUSH = 5000;
const PRIORITY_VISUAL_ARIA = 6000;
const PRIORITY_VISUAL_DECAL = 7000;

export const PRIORITY = {
  PROCESSOR: {
    FILTER: PRIORITY_PROCESSOR_FILTER,
    SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
    STATISTIC: PRIORITY_PROCESSOR_STATISTIC
  },
  VISUAL: {
    LAYOUT: PRIORITY_VISUAL_LAYOUT,
    PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
    GLOBAL: PRIORITY_VISUAL_GLOBAL,
    CHART: PRIORITY_VISUAL_CHART,
    POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
    COMPONENT: PRIORITY_VISUAL_COMPONENT,
    BRUSH: PRIORITY_VISUAL_BRUSH,
    CHART_ITEM: PRIORITY_VISUAL_CHART_DATA_CUSTOM,
    ARIA: PRIORITY_VISUAL_ARIA,
    DECAL: PRIORITY_VISUAL_DECAL
  }
};

// Main process have three entries: `setOption`, `dispatchAction` and `resize`,
// where they must not be invoked nestedly, except the only case: invoke
// dispatchAction with updateMethod "none" in main process.
// This flag is used to carry out this rule.
// All events will be triggered out side main process (i.e. when !this[IN_MAIN_PROCESS]).
const IN_MAIN_PROCESS_KEY = '__flagInMainProcess' as const;
const PENDING_UPDATE = '__pendingUpdate' as const;
const STATUS_NEEDS_UPDATE_KEY = '__needsUpdateStatus' as const;
const ACTION_REG = /^[a-zA-Z0-9_]+$/;

const CONNECT_STATUS_KEY = '__connectUpdateStatus' as const;
const CONNECT_STATUS_PENDING = 0 as const;
const CONNECT_STATUS_UPDATING = 1 as const;
const CONNECT_STATUS_UPDATED = 2 as const;
type ConnectStatus =
    typeof CONNECT_STATUS_PENDING
    | typeof CONNECT_STATUS_UPDATING
    | typeof CONNECT_STATUS_UPDATED;

export type SetOptionTransitionOpt = UpdateLifecycleTransitionOpt;
export type SetOptionTransitionOptItem = UpdateLifecycleTransitionItem;

export interface SetOptionOpts {
  notMerge?: boolean;
  lazyUpdate?: boolean;
  silent?: boolean;
  replaceMerge?: GlobalModelSetOptionOpt['replaceMerge'];
  transition?: SetOptionTransitionOpt;
}

export interface ResizeOpts {
  width?: number | 'auto';
  height?: number | 'auto';
  animation?: AnimationOption;
  silent?: boolean;
}

interface PostIniter {
  (chart: EChartsType): void;
}

type EventMethodName = 'on' | 'off';

function createRegisterEventWithLowercaseECharts(method: EventMethodName) {
  return function (this: ECharts, ...args: any): ECharts {
    if (this.isDisposed()) {
      disposeWarning(this.id);
      return;
    }
    return toLowercaseNameAndCallEventful<ECharts>(this, method, args);
  }
}

function createRegisterEventWithLowercaseMessageCenter(method: EventMethodName) {
  return function (this: MessageCenter, ...args: any): MessageCenter {
    return toLowercaseNameAndCallEventful<MessageCenter>(this, method, args);
  };
}

function toLowercaseNameAndCallEventful<T>(host: T, method: EventMethodName, args: any): T {
  args[0] = args[0] && args[0].toLowerCase();
  return (Eventful.prototype[method] as any).apply(host, args) as any;
}

class MessageCenter extends Eventful {};
const messageCenterProto = MessageCenter.prototype;
messageCenterProto.on = createRegisterEventWithLowercaseMessageCenter('on');
messageCenterProto.off = createRegisterEventWithLowercaseMessageCenter('off');

let prepare: (ecIns: ECharts) => void;
let prepareView: (ecIns: ECharts, isComponent: boolean) => void;


