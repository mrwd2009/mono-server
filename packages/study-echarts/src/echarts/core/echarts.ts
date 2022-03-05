import { ZRenderType, init as zrenderInit } from 'zrender';
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
import GlobalModel, { QueryConditionKindA, GlobalModelSetOptionOpts } from '../model/Global';
import ExtensionAPI from './ExtensionAPI';
import CoordinateSystemManager from './CoordinateSystem';
import OptionManager from '../model/OptionManager';
import backwardCompat from '../preprocessor/backwardCompat';
import dataStack from '../processor/dataStack';
import ComponentModel from '../model/Component';
import SeriesModel from '../model/Series';
import type Model from '../model/Model';
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
import { throttle, ThrottleController } from '../util/throttle';
import { seriesStyleTask, dataStyleTask, dataColorPaletteTask } from '../visual/style';
import loadingDefault from '../loading/default';
import Scheduler from './Scheduler';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';
import { CoordinateSystemMaster, CoordinateSystemCreator, CoordinateSystemHostModel } from '../coord/CoordinateSystem';
import { parseClassType } from '../util/clazz';
import { ECEventProcessor } from '../util/ECEventProcessor';
import {
  Payload,
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
  // ColorString,
  SelectChangedPayload,
  ScaleDataValue,
  ZRElementEventName,
  ECElementEvent,
  AnimationOption
} from '../util/types';
import Displayable from 'zrender/src/graphic/Displayable';
import { seriesSymbolTask, dataSymbolTask } from '../visual/symbol';
import { getVisualFromData, getItemVisualFromData } from '../visual/helper';
import { error } from '../util/log';
import { handleLegacySelectEvents } from '../legacy/dataSelectAction';

import { registerExternalTransform } from '../data/helper/transform';
import { createLocaleObject, SYSTEM_LANG, LocaleOption } from './locale';

import type { EChartsOption } from '../export/option';
import { findEventDispatcher } from '../util/event';
import decal from '../visual/decal';
import SVGPainter from 'zrender/src/svg/Painter';
import lifecycle, {
  LifecycleEvents,
  UpdateLifecycleTransitionItem,
  UpdateLifecycleParams,
  UpdateLifecycleTransitionOpt
} from './lifecycle';
import { platformApi } from 'zrender/src/core/platform';
import { getImpl } from './impl';
import type geoSourceManager from '../coord/geo/geoSourceManager';

const __DEV__ = process.env.NODE_ENV === 'development';

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
  replaceMerge?: GlobalModelSetOptionOpts['replaceMerge'];
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
      disposedWarning(this.id);
      return this;
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

class MessageCenter extends Eventful { };
const messageCenterProto = MessageCenter.prototype;
messageCenterProto.on = createRegisterEventWithLowercaseMessageCenter('on');
messageCenterProto.off = createRegisterEventWithLowercaseMessageCenter('off');

let prepare: (ecIns: ECharts) => void;
let prepareView: (ecIns: ECharts, isComponent: boolean) => void;
let updateDirectly: (ecIns: ECharts, method: string, payload: Payload, mainType: ComponentMainType, subType?: ComponentSubType) => void;
type UpdateMethod = (this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams) => void;

let updateMethods: {
  prepareAndUpdate: UpdateMethod,
  update: UpdateMethod,
  updateTransform: UpdateMethod,
  updateView: UpdateMethod,
  updateVisual: UpdateMethod,
  updateLayout: UpdateMethod,
};

let doConvertPixel: (
  ecIns: ECharts,
  methodName: 'convertFromPixel' | 'convertToPixel',
  finder: ModelFinder,
  value: (number | number[]) | (ScaleDataValue | ScaleDataValue[]),
) => (number | number[] | undefined);
let updateStreamModes: (ecIns: ECharts, ecModel: GlobalModel) => void;
let doDispatchAction: (this: ECharts, payload: Payload, silent: boolean) => void;
let flushPendingActions: (this: ECharts, silent: boolean) => void;
let triggerUpdatedEvent: (this: ECharts, silent: boolean) => void;
let bindRenderedEvent: (zr: ZRenderType, ecIns: ECharts) => void;
let bindMouseEvent: (zr: ZRenderType, ecIns: ECharts) => void;
let render: (ecIns: ECharts, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload, updateParams: UpdateLifecycleParams) => void;
let renderComponents: (ecIns: ECharts, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload, updateParams: UpdateLifecycleParams, dirtyList?: ComponentView[]) => void;
let renderSeries: (ecIns: ECharts, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload | 'remain', updateParams: UpdateLifecycleParams, dirtyMap?: { [uid: string]: any }) => void;
let createExtensionAPI: (ecIns: ECharts) => ExtensionAPI;
let enableConnect: (ecIns: ECharts) => void;

let markStatusToUpdate: (ecIns: ECharts) => void;
let applyChangedStates: (ecIns: ECharts) => void;

type RenderedEventParam = { elapsedTime: number };
type ECEventDefinition = {
  [key in ZRElementEventName]: EventCallbackSingleParam<ECElementEvent>
} & {
  rendered: EventCallbackSingleParam<RenderedEventParam>,
  finished: () => void | boolean,
} & {
  [key: string]: (...args: unknown[]) => void | boolean,
};

type EChartsInitOpts = {
  locale?: string | LocaleOption,
  renderer?: RendererType,
  devicePixelRatio?: number,
  useDirtyRect?: boolean,
  ssr?: boolean,
  width?: number,
  height?: number,
};

class ECharts extends Eventful<ECEventDefinition> {
  id!: string;

  group!: string;

  private _ssr: boolean;

  private _zr: ZRenderType;

  private _dom: HTMLElement;

  private _model!: GlobalModel;

  private _throttledZrFlush: ThrottleController & (() => void);

  private _theme: ThemeOption;

  private _locale: LocaleOption;

  private _chartsViews: ChartView[] = [];

  private _chartsMap: { [viewId: string]: ChartView } = {};

  private _componentsViews: ComponentView[] = [];

  private _componentsMap: { [viewId: string]: ComponentView } = {};

  private _coordSysMgr: CoordinateSystemManager;

  private _api: ExtensionAPI;

  private _scheduler: Scheduler;

  private _messageCenter: MessageCenter;

  private _pendingActions: Payload[] = [];

  // todo check whether setting to undefined in latest typescript
  protected _$eventProcessor!: never;

  private _disposed!: boolean;

  private _loadingFX?: LoadingEffect;

  private [PENDING_UPDATE]: {
    silent: boolean,
    updateParams: UpdateLifecycleParams,
  } | null;
  private [IN_MAIN_PROCESS_KEY]: boolean;
  private [CONNECT_STATUS_KEY]: ConnectStatus;
  private [STATUS_NEEDS_UPDATE_KEY]: boolean;

  constructor(dom: HTMLElement, theme?: string | ThemeOption, opts?: EChartsInitOpts) {
    super(new ECEventProcessor());

    opts = opts || {};

    if (isString(theme)) {
      theme = themeStorage[theme] as object;
    }

    this._dom = dom;

    let defaultRenderer = 'canvas';
    let defaultUseDirtyRect = false;
    if (__DEV__) {
      const root = (hasWindow ? window : global) as any;
      defaultRenderer = root.__ECHARTS_DEFAULT_RENDERER_ || defaultRenderer;
      const devUseDirtyRect = root.__ECHARTS_DEFAULT__USE_DIRTY_RECT__;
      defaultUseDirtyRect = devUseDirtyRect == null ? defaultUseDirtyRect : devUseDirtyRect;
    }

    const zr = this._zr = zrenderInit(dom, {
      renderer: opts.renderer || defaultRenderer,
      devicePixelRatio: opts.devicePixelRatio,
      width: opts.width,
      height: opts.height,
      // ssr: opts.ssr, // todo not added now
      useDirtyRect: opts.useDirtyRect == null ? defaultUseDirtyRect : opts.useDirtyRect,
    });

    this._ssr = opts.ssr!;

    this._throttledZrFlush = throttle(bind(zr.flush, zr), 17);

    theme = clone(theme);
    theme && backwardCompat(theme as ECUnitOption, true);

    this._theme = theme!;

    this._locale = createLocaleObject(opts.locale || SYSTEM_LANG);

    this._coordSysMgr = new CoordinateSystemManager();

    const api = this._api = createExtensionAPI(this);

    function prioritySortFunc(a: StageHandlerInternal, b: StageHandlerInternal): number {
      return a.__prio - b.__prio;
    }
    timsort(visualFuncs, prioritySortFunc);
    timsort(dataProcessorFuncs, prioritySortFunc);

    this._scheduler = new Scheduler(this, api, dataProcessorFuncs, visualFuncs);

    this._messageCenter = new MessageCenter();

    this._initEvents();

    this.resize = bind(this.resize, this);

    zr.animation.on('frame', this._onframe, this);

    bindRenderedEvent(zr, this);

    bindMouseEvent(zr, this);

    setAsPrimitive(this);
  }

  private _onframe(): void {
    if (this._disposed) {
      return;
    }

    applyChangedStates(this);

    const scheduler = this._scheduler;

    if (this[PENDING_UPDATE]) {
      const silent = this[PENDING_UPDATE]!.silent;
      this[IN_MAIN_PROCESS_KEY] = true;

      try {
        prepare(this);
        updateMethods.update.call(this, undefined, this[PENDING_UPDATE]!.updateParams);
      } catch (e) {
        this[IN_MAIN_PROCESS_KEY] = false;
        this[PENDING_UPDATE] = null;
        throw e;
      }

      this._zr.flush();

      this[IN_MAIN_PROCESS_KEY] = false;
      this[PENDING_UPDATE] = null;

      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    } else if (scheduler.unfinished) {
      let remainTime = TEST_FRAME_REMAIN_TIME;
      const ecModel = this._model;
      const api = this._api;
      scheduler.unfinished = false;

      do {
        const startTime = +new Date();

        scheduler.performSeriesTasks(ecModel);
        scheduler.performDataProcessorTasks(ecModel);
        updateStreamModes(this, ecModel);

        scheduler.performVisualTasks(ecModel);

        renderSeries(this, this._model, api, 'remain', {});

        remainTime -= (+new Date() - startTime);
      } while (remainTime > 0 && scheduler.unfinished);

      if (!scheduler.unfinished) {
        this._zr.flush();
      }
    }
  }

  getDom(): HTMLElement {
    return this._dom;
  }

  getId(): string {
    return this.id;
  }

  getZr(): ZRenderType {
    return this._zr;
  }

  isSSR(): boolean {
    return this._ssr;
  }

  setOption<Opt extends ECBasicOption>(option: Opt, notMerge?: boolean, lazyUpdate?: boolean): void;
  setOption<Opt extends ECBasicOption>(option: Opt, opts?: SetOptionOpts): void;
  setOption<Opt extends ECBasicOption>(option: Opt, notMerge?: boolean | SetOptionOpts, lazyUpdate?: boolean): void {
    if (this[IN_MAIN_PROCESS_KEY]) {
      if (__DEV__) {
        error('`setOption` should not be called during main process.');
      }
      return;
    }

    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    let silent: boolean;
    let replaceMerge;
    let transitionOpt: SetOptionTransitionOpt;
    if (isObject(notMerge)) {
      lazyUpdate = notMerge.lazyUpdate;
      silent = notMerge.silent!;
      replaceMerge = notMerge.replaceMerge;
      transitionOpt = notMerge.transition!;
      notMerge = notMerge.notMerge;
    }

    this[IN_MAIN_PROCESS_KEY] = true;

    if (!this._model || notMerge) {
      const optionsManager = new OptionManager(this._api);
      const theme = this._theme;
      const ecModel = this._model = new GlobalModel();
      ecModel.scheduler = this._scheduler;
      ecModel.ssr = this._ssr;
      ecModel.init(null as any, null as any, null as any, theme, this._locale, optionsManager);
    }

    this._model.setOption(option as ECBasicOption, { replaceMerge: replaceMerge as string | string[] }, optionPreprocessorFuncs);

    const updateParams = {
      seriesTransition: transitionOpt!,
      optionChanged: true,
    } as UpdateLifecycleParams;

    if (lazyUpdate) {
      this[PENDING_UPDATE] = {
        silent: silent!,
        updateParams
      };
      this[IN_MAIN_PROCESS_KEY] = false;
      this.getZr().wakeUp();
    } else {
      try {
        prepare(this);
        updateMethods.update.call(this, undefined, updateParams);
      } catch (e) {
        this[PENDING_UPDATE] = null;
        this[IN_MAIN_PROCESS_KEY] = false;
        throw e;
      }

      if (!this._ssr) {
        this._zr.flush();
      }

      this[PENDING_UPDATE] = null;
      this[IN_MAIN_PROCESS_KEY] = false;

      flushPendingActions.call(this, silent!);
      triggerUpdatedEvent.call(this, silent!);
    }
  }

  private getModel(): GlobalModel {
    return this._model;
  }

  getOption(): ECBasicOption {
    return this._model && this._model.getOption() as ECBasicOption;
  }

  getWidth(): number {
    return this._zr.getWidth();
  }

  getHeight(): number {
    return this._zr.getHeight();
  }

  getDevicePixelRatio(): number {
    // CanvasPainter or svg
    return (this._zr.painter as any).dpr || (hasWindow && window.devicePixelRatio) || 1;
  }

  // for canvas painter
  // getRenderedCanvas(opts?: any): HTMLCanvasElement;

  // renderToCanvas(opts?: { backgroundColor?: ZRColor, pixelRatio?: number }): HTMLCanvasElement;

  renderToSVGString(opts?: { useViewBox?: boolean }): string {
    opts = opts || {};
    const painter = this._zr.painter;
    if (__DEV__) {
      if (painter.type !== 'svg') {
        throw new Error('renderToSVGString can only be used in the svg renderer.');
      }
    }
    // todo migrate this method
    return (painter as SVGPainter).renderToString({
      useViewBox: opts.useViewBox,
    });
  }

  getSvgDataURL(): string | undefined {
    if (!env.svgSupported) {
      return;
    }

    const zr = this._zr;
    const list = zr.storage.getDisplayList();
    each(list, el => el.stopAnimation(null, true));

    return (zr.painter as SVGPainter).toDataURL();
  }

  getDataURL(opts?: {
    type?: 'png' | 'jpg' | 'svg',
    pixelRatio?: number,
    backgroundColor?: ZRColor,
    excludeComponets?: ComponentMainType[]
  }): string | undefined {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    opts = opts || {};
    const excludeComponents = opts.excludeComponets;
    const ecModel = this._model;
    const excludesComponentViews: ComponentView[] = [];

    each(excludeComponents!, (componentType) => {
      ecModel.eachComponent({
        mainType: componentType
      }, (component) => {
        const view = this._componentsMap[component.__viewId!];
        if (!view.group.ignore) {
          excludesComponentViews.push(view);
          view.group.ignore = true;
        }
      })
    });

    // todo for canvas
    const url = this._zr.painter.getType() === 'svg' ? this.getSvgDataURL() : '';

    each(excludesComponentViews, (view) => {
      view.group.ignore = false;
    });

    return url;
  }

  getConnectedDataURL(opts?: {
    type?: 'png' | 'jpg' | 'svg',
    pixelRatio?: number,
    backgroundColor?: ZRColor,
    connectedBackgroundColor?: ZRColor,
    excludeComponents?: string[]
  }): string | undefined {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    const isSvg = opts!.type === 'svg';
    const groupId = this.group;
    const mathMin = Math.min;
    const mathMax = Math.max;
    const MAX_NUMBER = Infinity;

    if (connectedGroups[groupId]) {
      let left = MAX_NUMBER;
      let top = MAX_NUMBER;
      let right = -MAX_NUMBER;
      let bottom = -MAX_NUMBER;
      const canvasList: { dom: HTMLCanvasElement | string, left: number, top: number }[] = [];
      const dpr = (opts && opts.pixelRatio) || this.getDevicePixelRatio();

      each(instances, (chart, id) => {
        if (chart.group === groupId) {
          // todo canvas renderer
          const canvas = isSvg ? (chart.getZr().painter as SVGPainter).getSvgDom().innerHTML : '';
          const boundingRect = chart.getDom().getBoundingClientRect();
          left = mathMin(boundingRect.left, left);
          top = mathMin(boundingRect.top, top);
          right = mathMax(boundingRect.right, right);
          bottom = mathMax(boundingRect.bottom, bottom);
          canvasList.push({
            dom: canvas,
            left: boundingRect.left,
            top: boundingRect.top
          });
        }
      });

      left *= dpr;
      top *= dpr;
      right *= dpr;
      bottom *= dpr;
      const width = right - left;
      const height = bottom - top;
      const targetCanvas = platformApi.createCanvas();
      const zr = zrenderInit(targetCanvas, {
        renderer: isSvg ? 'svg' : 'canvas'
      });
      zr.resize({
        width: width,
        height: height
      });

      if (isSvg) {
        let content = '';
        each(canvasList, function (item) {
          const x = item.left - left;
          const y = item.top - top;
          content += '<g transform="translate(' + x + ','
            + y + ')">' + item.dom + '</g>';
        });
        (zr.painter as SVGPainter).getSvgRoot().innerHTML = content;

        if (opts!.connectedBackgroundColor) {
          (zr.painter as SVGPainter).setBackgroundColor(opts!.connectedBackgroundColor as string);
        }

        zr.refreshImmediately();
        return (zr.painter as SVGPainter).toDataURL();

      } else {
        // todo canvas renderer
      }
    } else {
      return this.getDataURL(opts);
    }
  }

  convertToPixel(finder: ModelFinder, value: ScaleDataValue): number;
  convertToPixel(finder: ModelFinder, value: ScaleDataValue[]): number[];
  convertToPixel(finder: ModelFinder, value: ScaleDataValue | ScaleDataValue[]): number | number[] | undefined {
    return doConvertPixel(this, 'convertToPixel', finder, value);
  }

  convertFromPixel(finder: ModelFinder, value: number): number;
  convertFromPixel(finder: ModelFinder, value: number[]): number[];
  convertFromPixel(finder: ModelFinder, value: number | number[]): number | number[] | undefined {
    return doConvertPixel(this, 'convertFromPixel', finder, value);
  }

  containPixel(finder: ModelFinder, value: number[]): boolean | undefined {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    const ecModel = this._model;
    let result: boolean = false;

    const findResult = modelUtil.parseFinder(ecModel, finder);

    each(findResult, (models, key) => {
      if (key!.indexOf('Models') >= 0) {
        each(models as ComponentModel[], (model) => {
          const coordSys = (model as CoordinateSystemHostModel).coordinateSystem;

          if (coordSys && coordSys.containPoint) {
            result = result || !!coordSys.containPoint(value);
          } else if (key === 'seriesModels') {
            const view = this._chartsMap[model.__viewId!];
            if (view && view.containPoint) {
              result = result || view.containPoint(value, model as SeriesModel);
            } else {
              if (__DEV__) {
                console.warn(key + ': ' + (view
                  ? 'The found component do not support containPoint.'
                  : 'No view mapping to the found component.'
                ));
              }
            }
          } else {
            if (__DEV__) {
              console.warn(key + ': containPoint is not supported');
            }
          }
        }, this);
      }
    }, this);

    return result;
  }

  getVisual(finder: ModelFinder, visualType: string) {
    const ecModel = this._model;

    const parsedFinder = modelUtil.parseFinder(ecModel, finder, {
      defaultMainType: 'series'
    }) as modelUtil.ParsedModelFinderKnown;

    const seriesModel = parsedFinder.seriesModel;

    if (__DEV__) {
      if (!seriesModel) {
        console.warn('There is no specified seires model');
      }
    }

    const data = seriesModel!.getData();

    const dataIndexInside = parsedFinder.hasOwnProperty('dataIndexInside')
      ? parsedFinder.dataIndexInside
      : parsedFinder.hasOwnProperty('dataIndex')
        ? data.indexOfRawIndex(parsedFinder.dataIndex!)
        : null;

    return dataIndexInside != null ? getItemVisualFromData(data, dataIndexInside, visualType) : getVisualFromData(data, visualType);
  }

  private getViewOfComponentModel(componentModel: ComponentModel): ComponentView {
    return this._componentsMap[componentModel.__viewId!];
  }

  private getViewOfSeriesModel(seriesModel: SeriesModel): ChartView {
    return this._chartsMap[seriesModel.__viewId!];
  }

  private _initEvents(): void {
    each(MOUSE_EVENT_NAMES, (eveName) => {
      const handler = (e: ElementEvent) => {
        const ecModel = this.getModel();
        const el = e.target;
        let params: ECElementEvent;
        const isGlobalOut = eveName === 'globalout';
        if (isGlobalOut) {
          params = {} as ECElementEvent;
        } else {
          if (el) {
            findEventDispatcher(el, (parent) => {
              const ecData = getECData(parent);
              if (ecData && ecData.dataIndex != null) {
                const dataModel = ecData.dataModel || ecModel.getSeriesByIndex(ecData.seriesIndex);
                params = (
                  (dataModel && dataModel.getDataParams(ecData.dataIndex, ecData.dataType)) || {}
                ) as ECElementEvent;
                return true;
              } else if (ecData.eventData) {
                params = extend({}, ecData.eventData) as ECElementEvent;
                return true;
              }
              return false;
            }, true);
          }
        }

        if (params!) {
          let componentType = params.componentType;
          let componentIndex = params.componentIndex;

          if (componentType === 'markLine' || componentType === 'markPoint' || componentType === 'markArea') {
            componentType = 'series';
            componentIndex = params.seriesIndex!;
          }

          const model = componentType && componentIndex != null && ecModel.getComponent(componentType, componentIndex);
          const view = model && this[model.mainType === 'series' ? '_chartsMap' : '_componentsMap'][model.__viewId!];


          if (__DEV__) {
            // `event.componentType` and `event[componentTpype + 'Index']` must not
            // be missed, otherwise there is no way to distinguish source component.
            // See `dataFormat.getDataParams`.
            if (!isGlobalOut && !(model && view)) {
              console.warn('model or view can not be found by params');
            }
          }

          params.event = e;
          params.type = eveName;

          (this._$eventProcessor as ECEventProcessor).eventInfo = {
            targetEl: el,
            packedEvent: params,
            model: model as ComponentModel,
            view: view as ComponentView,
          };

          this.trigger(eveName, params);
        }
      };

      (handler as any).zrEventfulCallAtLast = true;
      this._zr.on(eveName, handler, this);
    });

    each(eventActionMap, (actionType, eventType) => {
      this._messageCenter.on(eventType!, (event: Payload) => {
        (this as any).trigger(eventType, event);
      }, this);
    });

    each(['selectchanged'], (eventType) => {
      this._messageCenter.on(eventType, (event: Payload) => {
        (this as any).trigger(eventType, event);
      }, this);
    });

    handleLegacySelectEvents(this._messageCenter, this, this._api);
  }

  isDisposed(): boolean {
    return this._disposed;
  }

  clear(): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }
    this.setOption({ series: [] } as EChartsOption, true);
  }

  dispose(): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._disposed = true;

    const dom = this.getDom();
    if (dom) {
      modelUtil.setAttribute(this.getDom(), DOM_ATTRIBUTE_KEY, '');
    }

    const chart = this;
    const api = chart._api;
    const ecModel = chart._model;

    each(chart._componentsViews, (component) => {
      component.dispose(ecModel, api);
    });
    each(chart._chartsViews, (chart) => {
      chart.dispose(ecModel, api);
    });

    chart._zr.dispose();

    (chart as any)._dom =
      (chart as any)._model =
      (chart as any)._chartsMap =
      (chart as any)._componentsMap =
      (chart as any)._chartsViews =
      (chart as any)._componentsViews =
      (chart as any)._scheduler =
      (chart as any)._api =
      (chart as any)._zr =
      (chart as any)._throttledZrFlush =
      (chart as any)._theme =
      (chart as any)._coordSysMgr =
      (chart as any)._messageCenter = null;

    delete instances[chart.id];
  }

  resize(opts?: ResizeOpts): void {
    if (this[IN_MAIN_PROCESS_KEY]) {
      if (__DEV__) {
        error('`resize` should not be called during main process.');
      }
      return;
    }

    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._zr.resize(opts);

    const ecModel = this._model;

    this._loadingFX && this._loadingFX.resize();

    if (!ecModel) {
      return;
    }

    let needPrepare = ecModel.resetOption('media');
    let silent = opts && opts.silent;

    if (this[PENDING_UPDATE]) {
      if (silent == null) {
        silent = (this[PENDING_UPDATE] as any).silent;
      }
      needPrepare = true;
      this[PENDING_UPDATE] = null;
    }

    this[IN_MAIN_PROCESS_KEY] = true;

    try {
      needPrepare && prepare(this);
      updateMethods.update.call(this, {
        type: 'resize',
        animation: extend({
          duration: 0
        }, opts?.animation!)
      });
    } catch (e) {
      this[IN_MAIN_PROCESS_KEY] = false;
      throw e;
    }

    this[IN_MAIN_PROCESS_KEY] = false;

    flushPendingActions.call(this, silent!);
    triggerUpdatedEvent.call(this, silent!);
  }

  showLoading(cfg?: object): void;
  showLoading(name?: string, cfg?: object): void;
  showLoading(name?: string | object, cfg?: object): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    if (isObject(name)) {
      cfg = name as object;
      name = '';
    }

    name = name || 'default';

    this.hideLoading();
    if (!loadingEffects[name]) {
      if (__DEV__) {
        console.warn('Loading effects ' + name + ' not exists.');
      }
      return;
    }

    const el = loadingEffects[name](this._api, cfg!);
    const zr = this._zr;
    this._loadingFX = el;

    zr.add(el);
  }

  hideLoading(): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._loadingFX && this._zr.remove(this._loadingFX);
    this._loadingFX = undefined;
  }

  makeActionFromEvent(eventObj: ECActionEvent): Payload {
    const payload = extend({}, eventObj) as Payload;
    payload.type = eventActionMap[eventObj.type];
    return payload;
  }

  dispatchAction(payload: Payload, opt?: boolean | { silent?: boolean, flush?: boolean | undefined }): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    if (!isObject(opt)) {
      opt = { silent: !!opt };
    }

    if (!actions[payload.type]) {
      return;
    }

    if (!this._model) {
      return;
    }

    if (this[IN_MAIN_PROCESS_KEY]) {
      this._pendingActions.push(payload);
      return;
    }

    const silent = opt.silent;
    doDispatchAction.call(this, payload, silent!);

    const flush = opt.flush;
    if (flush) {
      this._zr.flush();
    } else if (flush !== false && env.browser.weChat) {
      this._throttledZrFlush();
    }

    flushPendingActions.call(this, silent!);
    triggerUpdatedEvent.call(this, silent!);
  }

  updateLabelLayout() {
    lifecycle.trigger('series:layoutlabels', this._model, this._api, {
      updatedSeries: [],
    });
  }

  appendData(params: { seriesIndex: number, data: any }): void {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    const seriesIndex = params.seriesIndex;
    const ecModel = this.getModel();
    const seriesModel = ecModel.getSeriesByIndex(seriesIndex) as SeriesModel;

    if (__DEV__) {
      assert(params.data && seriesModel);
    }

    seriesModel.appendData(params);
    this._scheduler.unfinished = true;
    this.getZr().wakeUp();
  }

  private static internalField = (function () {
    prepare = function (ecIns: ECharts): void {
      const scheduler = ecIns._scheduler;

      scheduler.restorePipelines(ecIns._model);
      scheduler.prepareStageTasks();

      prepareView(ecIns, true);
      prepareView(ecIns, false);

      scheduler.plan();
    };

    prepareView = function (ecIns: ECharts, isComponent: boolean): void {
      const ecModel = ecIns._model;
      const scheduler = ecIns._scheduler;
      const viewList = isComponent ? ecIns._componentsViews : ecIns._chartsViews;
      const viewMap = isComponent ? ecIns._componentsMap : ecIns._chartsMap;
      const zr = ecIns._zr;
      const api = ecIns._api;

      for (let i = 0; i < viewList.length; i++) {
        viewList[i].__alive = false;
      }

      if (isComponent) {
        ecModel.eachComponent((componentType, model) => {
          if (componentType === 'series') {
            doPrepare(model);
          }
        });
      } else {
        ecModel.eachSeries(doPrepare);
      }

      function doPrepare(model: ComponentModel): void {
        const requireNewView = model.__requireNewView;
        model.__requireNewView = false;
        const viewId = `_ec_${model.id}_${model.type}`;
        let view = !requireNewView && viewMap[viewId];

        if (!view) {
          const classType = parseClassType(model.type);
          const Clazz = isComponent ? (ComponentView as ComponentViewConstructor).getClass(classType.main, classType.sub) : (ChartView as ChartViewConstructor).getClass(classType.sub);
          if (__DEV__) {
            assert(Clazz, classType.sub + ' does not exist.');
          }

          view = (new Clazz()) as ComponentView | ChartView;
          view.init(ecModel, api);
          viewMap[viewId] = view;
          viewList.push(view as any);
          zr.add(view.group);
        }

        model.__viewId = view.__id = viewId;
        view.__alive = true;
        view.__model = model;
        view.group.__ecComponentInfo = {
          mainType: model.mainType,
          index: model.componentIndex
        };
        if (!isComponent) {
          scheduler.prepareView(view as ChartView, model as SeriesModel, ecModel, api);
        }
      }

      for (let i = 0; i < viewList.length;) {
        const view = viewList[i];
        if (!view.__alive) {
          if (!isComponent) {
            (view as ChartView).renderTask.dispose();
          }
          zr.remove(view.group);
          view.dispose(ecModel, api);
          viewList.splice(i, 1);
          if (viewMap[view.__id!] === view) {
            delete viewMap[view.__id!];
          }
          view.__id = view.group.__ecComponentInfo = undefined;
        } else {
          i++;
        }
      }
    };

    updateDirectly = function (ecIns: ECharts, method: string, payload: Payload, mainType: ComponentMainType, subType?: ComponentSubType): void {
      const ecModel = ecIns._model;
      ecModel.setUpdatePayload(payload);

      if (!mainType) {
        each(([] as (ChartView | ComponentView)[]).concat(ecIns._componentsViews).concat(ecIns._chartsViews), callView);
        return;
      }

      const query: QueryConditionKindA['query'] = {};
      query[`${mainType}Id`] = payload[`${mainType}Id`];
      query[`${mainType}Index`] = payload[`${mainType}Index`];
      query[`${mainType}Name`] = payload[`${mainType}Name`];

      const condition = { mainType, query } as QueryConditionKindA;
      subType && (condition.subType = subType);

      const excludeSeriesId = payload.excludeSeriesId;
      let excludeSeriesIdMap: HashMap<true, string>;
      if (excludeSeriesId != null) {
        excludeSeriesIdMap = createHashMap();
        each(modelUtil.normalizeToArray(excludeSeriesId), id => {
          const modelId = modelUtil.convertOptionIdName(id, '');
          if (modelId != null) {
            excludeSeriesIdMap.set(modelId, true);
          }
        });
      }

      // If dispatchAction before setOption, do nothing.
      ecModel && ecModel.eachComponent(condition, function (model) {
        const isExcluded = excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) !== null;
        if (isExcluded) {
          return;
        };
        if (isHighDownPayload(payload)) {
          if (model instanceof SeriesModel) {
            if (
              payload.type === HIGHLIGHT_ACTION_TYPE
              && !payload.notBlur && !model.get(['emphasis', 'disabled'])
            ) {
              blurSeriesFromHighlightPayload(model, payload, ecIns._api);
            }
          }
          else {
            const { focusSelf, dispatchers } = findComponentHighDownDispatchers(
              model.mainType, model.componentIndex, payload.name, ecIns._api
            );
            if (payload.type === HIGHLIGHT_ACTION_TYPE && focusSelf && !payload.notBlur) {
              blurComponent(model.mainType, model.componentIndex, ecIns._api);
            }
            // PENDING:
            // Whether to put this "enter emphasis" code in `ComponentView`,
            // which will be the same as `ChartView` but might be not necessary
            // and will be far from this logic.
            if (dispatchers) {
              each(dispatchers, dispatcher => {
                payload.type === HIGHLIGHT_ACTION_TYPE
                  ? enterEmphasis(dispatcher)
                  : leaveEmphasis(dispatcher);
              });
            }
          }
        }
        else if (isSelectChangePayload(payload)) {
          // TODO geo
          if (model instanceof SeriesModel) {
            toggleSelectionFromPayload(model, payload, ecIns._api);
            updateSeriesElementSelection(model);
            markStatusToUpdate(ecIns);
          }
        }
      }, ecIns);

      ecModel && ecModel.eachComponent(condition, function (model) {
        const isExcluded = excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) !== null;
        if (isExcluded) {
          return;
        };
        callView(ecIns[
          mainType === 'series' ? '_chartsMap' : '_componentsMap'
        ][model.__viewId!]);
      }, ecIns);

      function callView(view: ComponentView | ChartView) {
        view && view.__alive && (view as any)[method] && (view as any)[method](
          view.__model, ecModel, ecIns._api, payload
        );
      }
    };

    updateMethods = {
      prepareAndUpdate(this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams): void {
        prepare(this);
        updateMethods.update.call(this, payload, {
          // Needs to mark option changed if newOption is given.
          // It's from MagicType.
          // TODO If use a separate flag optionChanged in payload?
          optionChanged: payload!.newOption != null
        });
      },
      update(this: ECharts, payload?: Payload, updateParams?: UpdateLifecycleParams): void {
        const ecModel = this._model;
        const api = this._api;
        const zr = this._zr;
        const coordSysMgr = this._coordSysMgr;
        const scheduler = this._scheduler;

        // update before setOption
        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload!);

        scheduler.restoreData(ecModel, payload!);

        scheduler.performSeriesTasks(ecModel);
        coordSysMgr.create(ecModel, api);

        scheduler.performDataProcessorTasks(ecModel, payload);

        updateStreamModes(this, ecModel);

        coordSysMgr.update(ecModel, api);

        clearColorPalette(ecModel);
        scheduler.performVisualTasks(ecModel, payload);

        render(this, ecModel, api, payload!, updateParams!);
        render(this, ecModel, api, payload!, updateParams!);

        // Set background
        const backgroundColor = ecModel.get('backgroundColor') || 'transparent';
        const darkMode = ecModel.get('darkMode');

        zr.setBackgroundColor(backgroundColor);

        // Force set dark mode.
        if (darkMode != null && darkMode !== 'auto') {
          zr.setDarkMode(darkMode);
        }

        lifecycle.trigger('afterupdate', ecModel, api);
      },
      updateTransform(this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams): void {
        const ecModel = this._model;
        const api = this._api;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload!);
        const componentDirtyList = [];
        ecModel.eachComponent((componentType, componentModel) => {
          if (componentType === 'series') {
            return;
          }

          const componentView = this.getViewOfComponentModel(componentModel);
          if (componentView && componentView.__alive) {
            if (componentView.updateTransform) {
              const result = componentView.updateTransform(componentModel, ecModel, api, payload!);
              result && result.update && componentDirtyList.push(componentView);
            }
            else {
              componentDirtyList.push(componentView);
            }
          }
        });

        const seriesDirtyMap = createHashMap();
        ecModel.eachSeries((seriesModel) => {
          const chartView = this._chartsMap[seriesModel.__viewId!];
          if (chartView.updateTransform) {
            const result = chartView.updateTransform(seriesModel, ecModel, api, payload!);
            result && result.update && seriesDirtyMap.set(seriesModel.uid, 1);
          }
          else {
            seriesDirtyMap.set(seriesModel.uid, 1);
          }
        });

        clearColorPalette(ecModel);
        // Keep pipe to the exist pipeline because it depends on the render task of the full pipeline.
        // this._scheduler.performVisualTasks(ecModel, payload, 'layout', true);
        this._scheduler.performVisualTasks(
          ecModel, payload, { setDirty: true, dirtyMap: seriesDirtyMap }
        );

        // Currently, not call render of components. Geo render cost a lot.
        // renderComponents(ecIns, ecModel, api, payload, componentDirtyList);
        renderSeries(this, ecModel, api, payload!, {}, seriesDirtyMap);

        lifecycle.trigger('afterupdate', ecModel, api);
      },
      updateView(this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams): void {
        const ecModel = this._model;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload!);
        ChartView.markUpdateMethod(payload!, 'updateView');
        clearColorPalette(ecModel);

        this._scheduler.performVisualTasks(ecModel, payload, { setDirty: true });

        render(this, ecModel, this._api, payload!, {});

        lifecycle.trigger('afterupdate', ecModel, this._api);
      },
      updateVisual(this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams): void {
        const ecModel = this._model;

        // update before setOption
        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload!);

        // clear all visual
        ecModel.eachSeries(function (seriesModel) {
          seriesModel.getData().clearAllVisual();
        });

        // Perform visual
        ChartView.markUpdateMethod(payload!, 'updateVisual');

        clearColorPalette(ecModel);

        // Keep pipe to the exist pipeline because it depends on the render task of the full pipeline.
        this._scheduler.performVisualTasks(ecModel, payload, { visualType: 'visual', setDirty: true });

        ecModel.eachComponent((componentType, componentModel) => {  // TODO componentType may be series.
          if (componentType !== 'series') {
            const componentView = this.getViewOfComponentModel(componentModel);
            componentView && componentView.__alive
              && componentView.updateVisual(componentModel, ecModel, this._api, payload!);
          }
        });

        ecModel.eachSeries((seriesModel) => {
          const chartView = this._chartsMap[seriesModel.__viewId!];
          chartView.updateVisual(seriesModel, ecModel, this._api, payload!);
        });

        lifecycle.trigger('afterupdate', ecModel, this._api);
      },
      updateLayout(this: ECharts, payload?: Payload, renderParams?: UpdateLifecycleParams): void {
        updateMethods.update.call(this, payload);
      }
    };

    doConvertPixel = function (
      ecIns: ECharts,
      methodName: 'convertFromPixel' | 'convertToPixel',
      finder: ModelFinder,
      value: (number | number[]) | (ScaleDataValue | ScaleDataValue[])
    ): (number | number[] | undefined) {
      if (ecIns._disposed) {
        disposedWarning(ecIns.id);
        return;
      }
      const ecModel = ecIns._model;
      const coordSysList = ecIns._coordSysMgr.getCoordinateSystems();
      let result;

      const parsedFinder = modelUtil.parseFinder(ecModel, finder);

      for (let i = 0; i < coordSysList.length; i++) {
        const coordSys = coordSysList[i];
        if (coordSys[methodName]
          && (result = coordSys[methodName]!(ecModel, parsedFinder, value as any)) != null
        ) {
          return result;
        }
      }

      if (__DEV__) {
        console.warn(
          'No coordinate system that supports ' + methodName + ' found by the given finder.'
        );
      }
    };

    updateStreamModes = function (ecIns: ECharts, ecModel: GlobalModel): void {
      const chartsMap = ecIns._chartsMap;
      const scheduler = ecIns._scheduler;
      ecModel.eachSeries((seriesModel) => {
        scheduler.updateStreamModes(seriesModel, chartsMap[seriesModel.__viewId!]);
      });
    };

    doDispatchAction = function (this: ECharts, payload: Payload, silent: boolean): void {
      const ecModel = this.getModel();
      const payloadType = payload.type;
      const escapeConnect = payload.escapeConnect;
      const actionWrap = actions[payloadType];
      const actionInfo = actionWrap.actionInfo;

      const cptTypeTmp = (actionInfo.update || 'update').split(':');
      const updateMethod = cptTypeTmp.pop();
      const cptType = cptTypeTmp[0] != null && parseClassType(cptTypeTmp[0]);

      let payloads: Payload[] = [payload];
      let batched = false;
      // Batch action
      if (payload.batch) {
        batched = true;
        payloads = map<NonNullable<Payload['batch']>[0], Payload, unknown>(payload.batch, function (item) {
          item = defaults(extend({}, item), payload);
          item.batch = null;
          return item as Payload;
        });
      }

      const eventObjBatch: ECEventData[] = [];
      let eventObj: ECActionEvent;

      const isSelectChange = isSelectChangePayload(payload);
      const isHighDown = isHighDownPayload(payload);

      // Only leave blur once if there are multiple batches.
      if (isHighDown) {
        allLeaveBlur(this._api);
      }

      each(payloads, (batchItem) => {
        // Action can specify the event by return it.
        eventObj = actionWrap.action(batchItem, this._model, this._api) as ECActionEvent;
        // Emit event outside
        eventObj = eventObj || extend({} as ECActionEvent, batchItem);
        // Convert type to eventType
        eventObj.type = actionInfo.event || eventObj.type;
        eventObjBatch.push(eventObj);

        // light update does not perform data process, layout and visual.
        if (isHighDown) {
          const { queryOptionMap, mainTypeSpecified } = modelUtil.preParseFinder(payload as ModelFinder);
          const componentMainType = mainTypeSpecified ? queryOptionMap.keys()[0] : 'series';
          updateDirectly(this, updateMethod!, batchItem as Payload, componentMainType);
          markStatusToUpdate(this);
        }
        else if (isSelectChange) {
          // At present `dispatchAction({ type: 'select', ... })` is not supported on components.
          // geo still use 'geoselect'.
          updateDirectly(this, updateMethod!, batchItem as Payload, 'series');
          markStatusToUpdate(this);
        }
        else if (cptType) {
          updateDirectly(this, updateMethod!, batchItem as Payload, cptType.main, cptType.sub);
        }

      });

      if (updateMethod !== 'none' && !isHighDown && !isSelectChange && !cptType) {
        try {
          // Still dirty
          if (this[PENDING_UPDATE]) {
            prepare(this);
            updateMethods.update.call(this, payload);
            this[PENDING_UPDATE] = null;
          }
          else {
            updateMethods[updateMethod as keyof typeof updateMethods].call(this, payload);
          }
        }
        catch (e) {
          this[IN_MAIN_PROCESS_KEY] = false;
          throw e;
        }
      }

      // Follow the rule of action batch
      if (batched) {
        eventObj = {
          type: actionInfo.event || payloadType,
          escapeConnect: escapeConnect,
          batch: eventObjBatch
        };
      }
      else {
        eventObj = eventObjBatch[0] as ECActionEvent;
      }

      this[IN_MAIN_PROCESS_KEY] = false;

      if (!silent) {
        const messageCenter = this._messageCenter;
        messageCenter.trigger(eventObj.type, eventObj);
        // Extra triggered 'selectchanged' event
        if (isSelectChange) {
          const newObj: SelectChangedPayload = {
            type: 'selectchanged',
            escapeConnect: escapeConnect!,
            selected: getAllSelectedIndices(ecModel),
            isFromClick: payload.isFromClick || false,
            fromAction: payload.type as 'select' | 'unselect' | 'toggleSelected',
            fromActionPayload: payload
          };
          messageCenter.trigger(newObj.type, newObj);
        }
      }
    };

    flushPendingActions = function (this: ECharts, silent: boolean): void {
      const pendingActions = this._pendingActions;
      while (pendingActions.length) {
        const payload = pendingActions.shift();
        doDispatchAction.call(this, payload!, silent);
      }
    };

    triggerUpdatedEvent = function (this: ECharts, silent): void {
      !silent && this.trigger('updated');
    };

    /**
     * Event `rendered` is triggered when zr
     * rendered. It is useful for realtime
     * snapshot (reflect animation).
     *
     * Event `finished` is triggered when:
     * (1) zrender rendering finished.
     * (2) initial animation finished.
     * (3) progressive rendering finished.
     * (4) no pending action.
     * (5) no delayed setOption needs to be processed.
     */
    bindRenderedEvent = function (zr: ZRenderType, ecIns: ECharts): void {
      zr.on('rendered', function (params: RenderedEventParam) {

        ecIns.trigger('rendered', params);

        // The `finished` event should not be triggered repeatly,
        // so it should only be triggered when rendering indeed happend
        // in zrender. (Consider the case that dipatchAction is keep
        // triggering when mouse move).
        if (
          // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          zr.animation.isFinished()
          && !ecIns[PENDING_UPDATE]
          && !ecIns._scheduler.unfinished
          && !ecIns._pendingActions.length
        ) {
          ecIns.trigger('finished');
        }
      });
    };

    bindMouseEvent = function(zr: ZRenderType, ecIns: ECharts): void {
      zr
        .on('mouseover', function(e) {
          const el = e.target;
          const dispatcher = findEventDispatcher(el, isHighDownDispatcher);
          if (dispatcher) {
            handleGlobalMouseOverForHighDown(dispatcher, e, ecIns._api);
            markStatusToUpdate(ecIns);
          }
        })
        .on('mouseout', function(e) {
          const el = e.target;
          const dispatcher = findEventDispatcher(el, isHighDownDispatcher);
          if (dispatcher) {
            handleGlobalMouseOutForHighDown(dispatcher, e, ecIns._api);
            markStatusToUpdate(ecIns);
          }
        })
        .on('click', function(e) {
          const el = e.target;
          const dispatcher = findEventDispatcher(
            el,
            target => getECData(target).dataIndex != null,
            true
          );
          if (dispatcher) {
            const actionType = (dispatcher as ECElement).selected ? 'unselect' : 'select';
            const ecData = getECData(dispatcher);
            ecIns._api.dispatchAction({
              type: actionType,
              dataType: ecData.dataType,
              dataIndexInside: ecData.dataIndex,
              seriesIndex: ecData.seriesIndex,
              isFromClick: true,
            });
          }
        });
    };

    function clearColorPalette(ecModel: GlobalModel): void {
      ecModel.clearColorPalette();
      ecModel.eachSeries(function (seriesModel) {
        seriesModel.clearColorPalette();
      });
    };

    function allocateZlevels(ecModel: GlobalModel) {
      interface ZLevelItem {
        z: number,
        zlevel: number,
        idx: number,
        type: string,
        key: string,
      };

      const componentZLevels: ZLevelItem[] = [];
      const seriesZLevels: ZLevelItem[] = [];
      let hasSeperateZLevel = false;
      
      ecModel.eachComponent(function(componentType, componentModel) {
        const zlevel = componentModel.get('zlevel') || 0;
        const z = componentModel.get('z') || 0;
        const zlevelKey = componentModel.getZLevelKey();
        hasSeperateZLevel = hasSeperateZLevel || !!zlevelKey;
        (componentType === 'series' ? seriesZLevels : componentZLevels).push({
          zlevel,
          z,
          idx: componentModel.componentIndex,
          type: componentType,
          key: zlevelKey,
        });
      });

      if (hasSeperateZLevel) {
        const zLevels: ZLevelItem[] = componentZLevels.concat(seriesZLevels);
        let lastSeriesZLevel: number;
        let lastSeriesKey: string;

        timsort(zLevels, (a, b) => {
          if (a.zlevel === b.zlevel) {
            return a.z - b.z;
          }
          return a.zlevel - b.zlevel;
        });

        each(zLevels, item => {
          const componentModel = ecModel.getComponent(item.type, item.idx);
          let zlevel = item.zlevel;
          const key = item.key;
          if (lastSeriesZLevel != null) {
            zlevel = Math.max(lastSeriesZLevel, zlevel);
          }

          if (key) {
            if (zlevel === lastSeriesZLevel && key !== lastSeriesKey) {
              zlevel++;
            }
            lastSeriesKey = key;
          } else if (lastSeriesKey) {
            if (zlevel === lastSeriesZLevel) {
              zlevel++;
            }
            lastSeriesKey = '';
          }
          lastSeriesZLevel = zlevel;
          componentModel!.setZLevel(zlevel);
        });
      }
    };

    render = (
      ecIns: ECharts,
      ecModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload,
      updateParams: UpdateLifecycleParams,
    ) => {
      allocateZlevels(ecModel);

      renderComponents(ecIns, ecModel, api, payload, updateParams);

      each(ecIns._chartsViews, (chart: ChartView) => {
        chart.__alive = false;
      });

      renderSeries(ecIns, ecModel, api, payload, updateParams);

      each(ecIns._chartsViews, (chart: ChartView) => {
        if (!chart.__alive) {
          chart.remove(ecModel, api);
        }
      });
    };

    renderComponents = (
      ecIns: ECharts,
      ecModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload,
      updateParams: UpdateLifecycleParams,
      dirtyList?: ComponentView[],
    ) => {
      each(dirtyList || ecIns._componentsViews, function(componentView: ComponentView) {
        const componentModel = componentView.__model;
        clearStates(componentModel!, componentView);
        
        componentView.render(componentModel!, ecModel, api, payload);

        updateZ(componentModel!, componentView);

        updateStates(componentModel!, componentView);
      });
    };

    renderSeries = (
      ecIns: ECharts,
      ecModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload | 'remain',
      updateParams: UpdateLifecycleParams,
      dirtyMap?: { [uid: string]: any },
    ) => {
      const scheduler = ecIns._scheduler;

      updateParams = extend(updateParams || {}, {
        updatedSeries: ecModel.getSeries(),
      });

      lifecycle.trigger('series:beforeupdate', ecModel, api, updateParams);

      let unfinished: boolean = false;
      ecModel.eachSeries(function(seriesModel) {
        const chartView = ecIns._chartsMap[seriesModel.__viewId!];
        chartView.__alive = true;

        const renderTask = chartView.renderTask;
        scheduler.updatePayload(renderTask, payload);

        clearStates(seriesModel, chartView);

        if (dirtyMap && dirtyMap.get(seriesModel.uid)) {
          renderTask.dirty();
        }

        if (renderTask.perform(scheduler.getPerformArgs(renderTask)!)) {
          unfinished = true;
        }

        chartView.group.silent = !!seriesModel.get('silent');

        updateBlend(seriesModel, chartView);

        updateSeriesElementSelection(seriesModel);
      });

      scheduler.unfinished = unfinished || scheduler.unfinished;

      lifecycle.trigger('series:layoutlabels', ecModel, api, updateParams);

      lifecycle.trigger('series:transition', ecModel, api, updateParams);

      ecModel.eachSeries(function(seriesModel) {
        const chartView = ecIns._chartsMap[seriesModel.__viewId!];
        updateZ(seriesModel, chartView);

        updateStates(seriesModel, chartView);
      });

      updateHoverLayerStatus(ecIns, ecModel);

      lifecycle.trigger('series:afterupdate', ecModel, api, updateParams);
    };

    markStatusToUpdate = function(ecIns: ECharts): void {
      ecIns[STATUS_NEEDS_UPDATE_KEY] = true;
      ecIns.getZr().wakeUp();
    };

    applyChangedStates = function(ecIns: ECharts): void {
      if (!ecIns[STATUS_NEEDS_UPDATE_KEY]) {
        return;
      }

      ecIns.getZr().storage.traverse(function(el: ECElement) {
        if (graphic.isElementRemoved(el)) {
          return;
        }
        applyElementStates(el);
      });

      ecIns[STATUS_NEEDS_UPDATE_KEY] = false;
    };

    function applyElementStates(el: ECElement) {
      const newStates = [];

      const oldStates = el.currentStates!;
      for (let i = 0; i < oldStates.length; i++) {
        const stateName = oldStates[i];
        if (!(['emphasis', 'blur', 'select'].includes(stateName))){
          newStates.push(stateName);
        }
      }

      if (el.selected && el.states.select) {
        newStates.push('select');
      }

      if (el.hoverState === HOVER_STATE_EMPHASIS && el.states.emphasis) {
        newStates.push('emphasis');
      } else if (el.hoverState === HOVER_STATE_BLUR && el.states.blur) {
        newStates.push('blur');
      }
      el.useStates(newStates);
    }

    function updateHoverLayerStatus(ecIns: ECharts, ecModel: GlobalModel): void {
      const zr = ecIns._zr;
      const storage = zr.storage;
      let elCount = 0;

      storage.traverse(function(el) {
        if (!el.isGroup) {
          elCount++;
        }
      });

      if (elCount > (ecModel.get('hoverLayerThreshold') as number) && !env.node && !env.worker) {
        ecModel.eachSeries(function (seriesModel) {
          if (seriesModel.preventUsingHoverLayer) {
            return;
          }
          const chartView = ecIns._chartsMap[seriesModel.__viewId!];
          if (chartView.__alive) {
            chartView.eachRendered((el: ECElement) => {
              if (el.states.emphasis) {
                el.states.emphasis.hoverLayer = true;
              }
            });
          }
        });
      }
    }

    function updateBlend(seriesModel: SeriesModel, chartView: ChartView): void {
      const blendMode = seriesModel.get('blendMode') || null;
      chartView.eachRendered((el) => {
        // FIXME marker and other components
        if (!el.isGroup) {
          // DONT mark the element dirty. In case element is incremental and don't wan't to rerender.
          (el as Displayable).style.blend = blendMode;
        }
      });
    };

    function updateZ(model: ComponentModel, view: ComponentView | ChartView): void {
      if (model.preventAutoZ) {
        return;
      }
      const z = model.get('z') || 0;
      const zlevel = model.get('zlevel') || 0;
      // Set z and zlevel
      view.eachRendered((el) => {
        doUpdateZ(el, z, zlevel, -Infinity);
        // Don't traverse the children because it has been traversed in _updateZ.
        return true;
      });
    };

    function doUpdateZ(el: Element, z: number, zlevel: number, maxZ2: number): number {
      // Group may also have textContent
      const label = el.getTextContent();
      const labelLine = el.getTextGuideLine();
      const isGroup = el.isGroup;

      if (isGroup) {
        // set z & zlevel of children elements of Group
        const children = (el as graphic.Group).childrenRef();
        for (let i = 0; i < children.length; i++) {
          maxZ2 = Math.max(doUpdateZ(children[i], z, zlevel, maxZ2), maxZ2);
        }
      }
      else {
        // not Group
        (el as Displayable).z = z;
        (el as Displayable).zlevel = zlevel;

        maxZ2 = Math.max((el as Displayable).z2, maxZ2);
      }

      // always set z and zlevel if label/labelLine exists
      if (label) {
        label.z = z;
        label.zlevel = zlevel;
        // lift z2 of text content
        // TODO if el.emphasis.z2 is spcefied, what about textContent.
        isFinite(maxZ2) && (label.z2 = maxZ2 + 2);
      }
      if (labelLine) {
        const textGuideLineConfig = el.textGuideLineConfig;
        labelLine.z = z;
        labelLine.zlevel = zlevel;
        isFinite(maxZ2)
          && (labelLine.z2 = maxZ2 + (textGuideLineConfig && textGuideLineConfig.showAbove ? 1 : -1));
      }
      return maxZ2;
    }

    function clearStates(model: ComponentModel, view: ComponentView | ChartView): void {
      view.eachRendered(function (rawEl) {
        let el = rawEl as Displayable;
        // Not applied on removed elements, it may still in fading.
        if (graphic.isElementRemoved(el)) {
          return;
        }

        const textContent = el.getTextContent();
        const textGuide = el.getTextGuideLine();
        if (el.stateTransition) {
          el.stateTransition = null;
        }
        if (textContent && textContent.stateTransition) {
          textContent.stateTransition = null;
        }
        if (textGuide && textGuide.stateTransition) {
          textGuide.stateTransition = null;
        }

        // TODO If el is incremental.
        if (el.hasState()) {
          el.prevStates = el.currentStates;
          el.clearStates();
        }
        else if (el.prevStates) {
          el.prevStates = undefined;
        }
      });
    }

    function updateStates(model: ComponentModel, view: ComponentView | ChartView): void {
      const stateAnimationModel = (model as SeriesModel).getModel('stateAnimation') as Model<AnimationOption>;
      const enableAnimation = model.isAnimationEnabled();
      const duration = stateAnimationModel.get('duration');
      const stateTransition = duration! > 0 ? {
        duration,
        delay: stateAnimationModel.get('delay'),
        easing: stateAnimationModel.get('easing')
        // additive: stateAnimationModel.get('additive')
      } : null;
      view.eachRendered(function (rawEl) {
        const el = rawEl as Displayable;
        if (el.states && el.states.emphasis) {
          // Not applied on removed elements, it may still in fading.
          if (graphic.isElementRemoved(el)) {
            return;
          }

          if (el instanceof graphic.Path) {
            savePathStates(el as any);
          }

          // Only updated on changed element. In case element is incremental and don't wan't to rerender.
          // TODO, a more proper way?
          if (el.__dirty) {
            const prevStates = el.prevStates;
            // Restore states without animation
            if (prevStates) {
              el.useStates(prevStates);
            }
          }

          // Update state transition and enable animation again.
          if (enableAnimation) {
            el.stateTransition = stateTransition;
            const textContent = el.getTextContent();
            const textGuide = el.getTextGuideLine();
            // TODO Is it necessary to animate label?
            if (textContent) {
              textContent.stateTransition = stateTransition;
            }
            if (textGuide) {
              textGuide.stateTransition = stateTransition;
            }
          }

          // The use higlighted and selected flag to toggle states.
          if (el.__dirty) {
            applyElementStates(el);
          }
        }
      });
    };


    createExtensionAPI = function (ecIns: ECharts): ExtensionAPI {
      return new (class extends ExtensionAPI {
        getCoordinateSystems(): CoordinateSystemMaster[] {
          return ecIns._coordSysMgr.getCoordinateSystems();
        }
        getComponentByElement(el: Element) {
          while (el) {
            const modelInfo = (el as ViewRootGroup).__ecComponentInfo;
            if (modelInfo != null) {
              return ecIns._model.getComponent(modelInfo.mainType, modelInfo.index);
            }
            el = el.parent;
          }
        }
        enterEmphasis(el: Element, highlightDigit?: number) {
          enterEmphasis(el, highlightDigit);
          markStatusToUpdate(ecIns);
        }
        leaveEmphasis(el: Element, highlightDigit?: number) {
          leaveEmphasis(el, highlightDigit);
          markStatusToUpdate(ecIns);
        }
        enterBlur(el: Element) {
          enterBlur(el);
          markStatusToUpdate(ecIns);
        }
        leaveBlur(el: Element) {
          leaveBlur(el);
          markStatusToUpdate(ecIns);
        }
        enterSelect(el: Element) {
          enterSelect(el);
          markStatusToUpdate(ecIns);
        }
        leaveSelect(el: Element) {
          leaveSelect(el);
          markStatusToUpdate(ecIns);
        }
        getModel(): GlobalModel {
          return ecIns.getModel();
        }
        getViewOfComponentModel(componentModel: ComponentModel): ComponentView {
          return ecIns.getViewOfComponentModel(componentModel);
        }
        getViewOfSeriesModel(seriesModel: SeriesModel): ChartView {
          return ecIns.getViewOfSeriesModel(seriesModel);
        }
      })(ecIns);
    };

    enableConnect = function (chart: ECharts): void {

      function updateConnectedChartsStatus(charts: ECharts[], status: ConnectStatus) {
        for (let i = 0; i < charts.length; i++) {
          const otherChart = charts[i];
          otherChart[CONNECT_STATUS_KEY] = status;
        }
      }

      each(eventActionMap, function (actionType, eventType) {
        chart._messageCenter.on(eventType!, function (event: ECActionEvent) {
          if (connectedGroups[chart.group] && chart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_PENDING) {
            if (event && event.escapeConnect) {
              return;
            }

            const action = chart.makeActionFromEvent(event);
            const otherCharts: ECharts[] = [];

            each(instances, function (otherChart) {
              if (otherChart !== chart && otherChart.group === chart.group) {
                otherCharts.push(otherChart);
              }
            });

            updateConnectedChartsStatus(otherCharts, CONNECT_STATUS_PENDING);
            each(otherCharts, function (otherChart) {
              if (otherChart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_UPDATING) {
                otherChart.dispatchAction(action);
              }
            });
            updateConnectedChartsStatus(otherCharts, CONNECT_STATUS_UPDATED);
          }
        });
      });
    };
  }());
}

const echartsProto = ECharts.prototype;
echartsProto.on = createRegisterEventWithLowercaseECharts('on');
echartsProto.off = createRegisterEventWithLowercaseECharts('off');

const MOUSE_EVENT_NAMES: ZRElementEventName[] = [
  'click', 'dblclick', 'mouseover', 'mouseout', 'mousemove',
  'mousedown', 'mouseup', 'globalout', 'contextmenu'
];

function disposedWarning(id: string): void {
  if (__DEV__) {
    console.warn('Instance ' + id + ' has been disposed');
  }
}

const actions: {
  [actionType: string]: {
    action: ActionHandler,
    actionInfo: ActionInfo
  }
} = {};

const eventActionMap: {[eventType: string]: string} = {};

const dataProcessorFuncs: StageHandlerInternal[] = [];

const optionPreprocessorFuncs: OptionPreprocessor[] = [];

const visualFuncs: StageHandlerInternal[] = [];

const themeStorage: {[themeName: string]: ThemeOption} = {};

const loadingEffects: {[effectName: string]: LoadingEffectCreator} = {};

const instances: {[id: string]: ECharts} = {};
const connectedGroups: {[groupId: string]: boolean} = {};

let idBase: number = +(new Date()) - 0;
let groupIdBase: number = +(new Date()) - 0;
const DOM_ATTRIBUTE_KEY = '_echarts_instance_';

export function init(
  dom: HTMLElement,
  theme?: string | object,
  opts?: EChartsInitOpts,
): EChartsType {
  const isClient = !(opts && opts.ssr);
  if (isClient) {
    if (__DEV__) {
      if (!dom) {
        throw new Error('Initialize failed: invalid dom.');
      }
    }

    const existInstance = getInstanceByDom(dom);
    if (existInstance) {
      if (__DEV__) {
        console.warn('There is a chart instance already initialized on the dom.');
      }
      return existInstance;
    }

    if (__DEV__) {
      if (isDom(dom)
        && dom.nodeName.toUpperCase() !== 'CANVAS'
        && (
          (!dom.clientWidth && (!opts || opts.width == null))
          || (!dom.clientHeight && (!opts || opts.height == null))
        )
      ) {
        console.warn('Can\'t get DOM width or height. Please check '
          + 'dom.clientWidth and dom.clientHeight. They should not be 0.'
          + 'For example, you may need to call this in the callback '
          + 'of window.onload.');
      }
    }
  }

  const chart = new ECharts(dom, theme, opts);
  chart.id = `ec_${idBase++}`;
  instances[chart.id] = chart;

  if (isClient) {
    modelUtil.setAttribute(dom, DOM_ATTRIBUTE_KEY, chart.id);
  }

  enableConnect(chart);

  lifecycle.trigger('afterinit', chart);

  return chart;
}

export function connect(groupId: string | EChartsType[]): string {
  if (isArray(groupId)) {
    const charts = groupId;
    groupId = '';
    each(charts, function(chart) {
      if (chart.group != null) {
        groupId = chart.group;
      }
    });
    groupId = groupId || `g_${groupIdBase++}`;
    each(charts, function(chart) {
      chart.group = groupId as string;
    });
  }
  connectedGroups[groupId as string] = true;
  return groupId as string;
}

export function dispose(chart: EChartsType | HTMLElement | string): void {
  if (isString(chart)) {
    chart = instances[chart];
  } else if (!(chart instanceof ECharts)) {
    chart = getInstanceByDom(chart)!;
  }

  if ((chart instanceof ECharts) && !chart.isDisposed()) {
    chart.dispose();
  }
}

export function getInstanceByDom(dom: HTMLElement): EChartsType | undefined {
  return instances[modelUtil.getAttribute(dom, DOM_ATTRIBUTE_KEY)];
}

export function getInstanceById(key: string): EChartsType | undefined {
  return instances[key];
}

export function registerTheme(name: string, theme: ThemeOption): void {
  themeStorage[name] = theme;
}

export function registerPreprocessor(preprocessorFunc: OptionPreprocessor): void {
  if (indexOf(optionPreprocessorFuncs, preprocessorFunc) < 0) {
    optionPreprocessorFuncs.push(preprocessorFunc);
  }
}

export function registerProcessor(
  priority: number | StageHandler | StageHandlerOverallReset,
  processor?: StageHandler | StageHandlerOverallReset,
): void {
  normalizeRegister(dataProcessorFuncs, priority, processor!, PRIORITY_PROCESSOR_DEFAULT);
}

export function registerPostInit(postInitFunc: PostIniter): void {
  registerUpdateLifecycle('afterinit', postInitFunc);
}

export function registerPostUpdate(postUpdateFunc: PostUpdater): void {
  registerUpdateLifecycle('afterupdate', postUpdateFunc);
}

export function registerUpdateLifecycle<T extends keyof LifecycleEvents>(
  name: T, cb: (...args: LifecycleEvents[T]) => void
): void {
  (lifecycle as any).on(name, cb);
}

export function registerAction(type: string, eventName: string, action: ActionHandler): void;
export function registerAction(type: string, action: ActionHandler): void;
export function registerAction(actionInfo: ActionInfo, action: ActionHandler): void;
export function registerAction(actionInfo: string | ActionInfo, eventName: string | ActionHandler, action?: ActionHandler): void {
  if (isFunction(eventName)) {
    action = eventName;
    eventName = '';
  }

  const actionType = isObject(actionInfo) ? (actionInfo as ActionInfo).type : ([actionInfo, actionInfo = { event: eventName } as ActionInfo])[0];

  (actionInfo as ActionInfo).event = ((actionInfo as ActionInfo).event || actionType as string).toLowerCase();
  eventName = (actionInfo as ActionInfo).event!;

  if (eventActionMap[eventName as string]) {
    return;
  }

  assert(ACTION_REG.test(actionType as string) && ACTION_REG.test(eventName));

  if (!actions[actionType as string]) {
    actions[actionType as string] = { action: action!, actionInfo: actionInfo as ActionInfo };
  }
  eventActionMap[eventName as string] = actionType as string;
}

export function registerCoordinateSystem(
  type: string,
  coordSysCreator: CoordinateSystemCreator
): void {
  CoordinateSystemManager.register(type, coordSysCreator);
}

export function getCoordinateSystemDimensions(type: string): DimensionDefinitionLoose[] | undefined {
  const coordSysCreator = CoordinateSystemManager.get(type);
  if (coordSysCreator) {
    return coordSysCreator.getDimensionsInfo
      ? coordSysCreator.getDimensionsInfo()
      : coordSysCreator.dimensions!.slice();
  }
}

export { registerLocale } from './locale';

function registerLayout(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
function registerLayout(layoutTask: StageHandler | StageHandlerOverallReset): void;
function registerLayout(
  priority: number | StageHandler | StageHandlerOverallReset,
  layoutTask?: StageHandler | StageHandlerOverallReset
): void {
  normalizeRegister(visualFuncs, priority, layoutTask!, PRIORITY_VISUAL_LAYOUT, 'layout');
}

function registerVisual(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
function registerVisual(layoutTask: StageHandler | StageHandlerOverallReset): void;
function registerVisual(
  priority: number | StageHandler | StageHandlerOverallReset,
  visualTask?: StageHandler | StageHandlerOverallReset
): void {
  normalizeRegister(visualFuncs, priority, visualTask!, PRIORITY_VISUAL_CHART, 'visual');
}

export { registerLayout, registerVisual };


const registeredTasks: (StageHandler | StageHandlerOverallReset)[] = [];

function normalizeRegister(
  targetList: StageHandler[],
  priority: number | StageHandler | StageHandlerOverallReset,
  fn: StageHandler | StageHandlerOverallReset,
  defaultPriority: number,
  visualType?: StageHandlerInternal['visualType']
): void {
  if (isFunction(priority) || isObject(priority)) {
    fn = priority as (StageHandler | StageHandlerOverallReset);
    priority = defaultPriority;
  }

  if (__DEV__) {
    if (isNaN(priority) || priority == null) {
      throw new Error('Illegal priority');
    }
    // Check duplicate
    each(targetList, function (wrap) {
      assert((wrap as StageHandlerInternal).__raw !== fn);
    });
  }

  // Already registered
  if (indexOf(registeredTasks, fn) >= 0) {
    return;
  }
  registeredTasks.push(fn);

  const stageHandler = Scheduler.wrapStageHandler(fn, visualType);

  stageHandler.__prio = priority;
  stageHandler.__raw = fn;
  targetList.push(stageHandler);
}

export function registerLoading(
  name: string,
  loadingFx: LoadingEffectCreator
): void {
  loadingEffects[name] = loadingFx;
}

type RegisterMapParams = Parameters<typeof geoSourceManager.registerMap>;
/**
 * The parameters and usage: see `geoSourceManager.registerMap`.
 * Compatible with previous `echarts.registerMap`.
 */
export function registerMap(
  mapName: RegisterMapParams[0],
  geoJson: RegisterMapParams[1],
  specialAreas?: RegisterMapParams[2]
): void {
  const registerMap = getImpl('registerMap');
  registerMap && registerMap(mapName, geoJson, specialAreas);
}

export function getMap(mapName: string) {
  const getMap = getImpl('getMap');
  return getMap && getMap(mapName);
}

export const registerTransform = registerExternalTransform;

/**
 * Globa dispatchAction to a specified chart instance.
 */
// export function dispatchAction(payload: { chartId: string } & Payload, opt?: Parameters<ECharts['dispatchAction']>[1]) {
//     if (!payload || !payload.chartId) {
//         // Must have chartId to find chart
//         return;
//     }
//     const chart = instances[payload.chartId];
//     if (chart) {
//         chart.dispatchAction(payload, opt);
//     }
// }



// Buitlin global visual
registerVisual(PRIORITY_VISUAL_GLOBAL, seriesStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataColorPaletteTask);

registerVisual(PRIORITY_VISUAL_GLOBAL, seriesSymbolTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataSymbolTask);

registerVisual(PRIORITY_VISUAL_DECAL, decal);

registerPreprocessor(backwardCompat);
registerProcessor(PRIORITY_PROCESSOR_DATASTACK, dataStack);
registerLoading('default', loadingDefault);

// Default actions

registerAction({
  type: HIGHLIGHT_ACTION_TYPE,
  event: HIGHLIGHT_ACTION_TYPE,
  update: HIGHLIGHT_ACTION_TYPE
}, noop);

registerAction({
  type: DOWNPLAY_ACTION_TYPE,
  event: DOWNPLAY_ACTION_TYPE,
  update: DOWNPLAY_ACTION_TYPE
}, noop);

registerAction({
  type: SELECT_ACTION_TYPE,
  event: SELECT_ACTION_TYPE,
  update: SELECT_ACTION_TYPE
}, noop);

registerAction({
  type: UNSELECT_ACTION_TYPE,
  event: UNSELECT_ACTION_TYPE,
  update: UNSELECT_ACTION_TYPE
}, noop);

registerAction({
  type: TOGGLE_SELECT_ACTION_TYPE,
  event: TOGGLE_SELECT_ACTION_TYPE,
  update: TOGGLE_SELECT_ACTION_TYPE
}, noop);

// Default theme
registerTheme('light', lightTheme);
registerTheme('dark', darkTheme);

// For backward compatibility, where the namespace `dataTool` will
// be mounted on `echarts` is the extension `dataTool` is imported.
export const dataTool = {};

export interface EChartsType extends ECharts { }