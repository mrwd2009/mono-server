import {
  each,
  filter,
  isArray,
  isObject,
  isString,
  createHashMap,
  assert,
  clone,
  merge,
  mixin,
  HashMap,
  isFunction,
} from 'zrender/src/core/util';
import * as modelUtil from '../util/model';
import Model from './Model';
import ComponentModel, { ComponentModelConstructor } from './Component';
import globalDefault from './globalDefault';
import { resetSourceDefaulter } from '../data/helper/sourceHelper';
import SeriesModel from './Series';
import {
  Payload,
  OptionPreprocessor,
  ECBasicOption,
  ECUnitOption,
  ThemeOption,
  ComponentOption,
  ComponentMainType,
  ComponentSubType,
  OptionId,
  OptionName,
  AriaOptionMixin,
} from '../util/types';
import OptionManager from './OptionManager';
import Scheduler from '../core/Scheduler';
import { concatInternalOptions } from './internalComponentCreator';
import { LocaleOption } from '../core/locale';
import { PaletteMixin } from './mixin/palette';
import { error, warn } from '../util/log';

const __DEV__ = process.env.NODE_ENV === 'development';

export interface GlobalModelSetOptionOpts {
  replaceMerge: ComponentMainType | ComponentMainType[];
}
export interface InnerSetOptionOpts {
  replaceMergeMainTypeMap: HashMap<boolean, string>;
}

let reCreateSeriesIndices: (ecModel: GlobalModel) => void;
let assertSeriesInitialized: (ecModel: GlobalModel) => void;
let initBase: (ecModel: GlobalModel, baseOption: ECUnitOption) => void;

const OPTION_INNER_KEY = '\0_ec_inner';
const OPTION_INNER_VALUE = 1;

const BUILTIN_COMPONENTS_MAP = {
  grid: 'GridComponent',
  polar: 'PolarComponent',
  geo: 'GeoComponent',
  singleAxis: 'SingleAxisComponent',
  parallel: 'ParallelComponent',
  calendar: 'CalendarComponent',
  graphic: 'GraphicComponent',
  toolbox: 'ToolboxComponent',
  tooltip: 'TooltipComponent',
  axisPointer: 'AxisPointerComponent',
  brush: 'BrushComponent',
  title: 'TitleComponent',
  timeline: 'TimelineComponent',
  markPoint: 'MarkPointComponent',
  markLine: 'MarkLineComponent',
  markArea: 'MarkAreaComponent',
  legend: 'LegendComponent',
  dataZoom: 'DataZoomComponent',
  visualMap: 'VisualMapComoponent',
  xAxis: 'GridComponent',
  yAxis: 'GridComponent',
  angleAxis: 'PolarComponent',
  radiusAxis: 'PolarComponent',
} as const;

const BUILTIN_CHARTS_MAP = {
  line: 'LineChart',
  bar: 'BarChart',
  pie: 'PieChart',
  scatter: 'ScatterChart',
  radar: 'RadarChart',
  map: 'MapChart',
  tree: 'TreeChart',
  treemap: 'TreemapChart',
  graph: 'GraphChart',
  gauge: 'GaugeChart',
  funnel: 'FunnelChart',
  parallel: 'ParallelChart',
  sankey: 'SankeyChart',
  boxplot: 'BoxplotChart',
  candlestick: 'CandlestickChart',
  effectScatter: 'EffectScatterChart',
  lines: 'LinesChart',
  heatmap: 'HeatmapChart',
  pictorialBar: 'PictorialBarChart',
  themeRiver: 'ThemeRiverChart',
  sunburst: 'SunburstChart',
  custom: 'CustomChart',
} as const;

const componetsMissingLogPrinted: Record<string, boolean> = {};

function checkMissingComponents(option: ECUnitOption) {
  each(option, function (componentOption, mainType: ComponentMainType) {
    if (!ComponentModel.hasClass(mainType)) {
      const componentImportName = BUILTIN_COMPONENTS_MAP[mainType as keyof typeof BUILTIN_COMPONENTS_MAP];
      if (componentImportName && !componetsMissingLogPrinted[componentImportName]) {
        error(`Component ${mainType} is used but not imported.
import { ${componentImportName} } from 'echarts/components';
echarts.use([${componentImportName}]);`);
        componetsMissingLogPrinted[componentImportName] = true;
      }
    }
  });
}

class GlobalModel extends Model<ECUnitOption> {
  option: ECUnitOption;

  private _theme: Model;
  private _locale: Model;
  private _optionManager: OptionManager;
  private _componentsMap: HashMap<ComponentModel[], ComponentMainType>;

  private _componentsCount: HashMap<number>;

  private _seriesIndices: number[];

  private _seriesIndicesMap: HashMap<any>;

  private _payload: Payload;

  scheduler: Scheduler;

  ssr: boolean;

  init(
    option: ECBasicOption,
    parentModel: Model,
    ecModel: GlobalModel,
    theme: object,
    locale: object,
    optionManager: OptionManager,
  ): void {
    theme = theme || {};
    this.option = null;
    this._theme = new Model(theme);
    this._locale = new Model(locale);
    this._optionManager = optionManager;
  }

  setOption(option: ECBasicOption, opts: GlobalModelSetOptionOpts, optionPreprocessorFuncs: OptionPreprocessor[]): void {
    if (__DEV__) {
      assert(option != null, 'option is null/undefined');
      assert(
        option[OPTION_INNER_KEY] !== OPTION_INNER_VALUE,
        'please use chart.getOption()'
      );
    }

    const innerOpt = normalizeSetOptionInput(opts);

    this._optionManager.setOption(option, optionPreprocessorFuncs, innerOpt);

    this._resetOption(null, innerOpt);
  }

  resetOption(
    type: 'recreate' | 'timeline' | 'media',
    opt?: Pick<GlobalModelSetOptionOpts, 'replaceMerge'>
  ): boolean {
    return this._resetOption(type, normalizeSetOptionInput(opt));
  }

  private _resetOption(
    type: 'recreate' | 'timeline' | 'media',
    opt: InnerSetOptionOpts,
  ): boolean {
    let optionChanged = false;
    const optionManager = this._optionManager;

    if (!type || type === 'recreate') {
      const baseOption = optionManager.mountOption(type === 'recreate');
      if (__DEV__) {
        checkMissingComponents(baseOption);
      }

      if (!this.option || type === 'recreate') {
        initBase(this, baseOption);
      } else {
        this.restoreData();
        this._mergeOption(baseOption, opt);
      }

      optionChanged = true;
    }
    
    if (type === 'timeline' || type === 'media') {
      this.restoreData();
    }

    if (!type || type === 'recreate' || type === 'timeline') {
      const timelineOption = optionManager.getTimelineOption(this);
      if (timelineOption) {
        optionChanged = true;
        this._mergeOption(timelineOption, opt);
      }
    }

    if (!type || type === 'recreate' || type === 'media') {
      const mediaOptions = optionManager.getMediaOption(this);
      if (mediaOptions.length) {
        each(mediaOptions, function (mediaOption) {
          optionChanged = true;
          this._mergeOption(mediaOption, opt);
        }, this);
      }
    }

    return optionChanged;
  }

  public mergeOption(option: ECUnitOption): void {
    this._mergeOption(option, null);
  }

  private _mergeOption(
    newOption: ECUnitOption,
    opt: InnerSetOptionOpts,
  ): void {
    const option = this.option;
    const componentsMap = this._componentsMap;
    const componentsCount = this._componentsCount;
    const newCmptTypes: ComponentMainType[] = [];
    const newCmptTypeMap = createHashMap<boolean, string>();
    const replaceMergeMainTypeMap = opt && opt.replaceMergeMainTypeMap;

    resetSourceDefaulter(this);

    each(newOption, function (componentOption, mainType: ComponentMainType) {
      if (componentOption === null) {
        return;
      }

      if (!ComponentModel.hasClass(mainType)) {
        option[mainType] = option[mainType] == null ? clone(componentOption) : merge(option[mainType], componentOption, true);
      } else if (mainType) {
        newCmptTypes.push(mainType);
        newCmptTypeMap.set(mainType, true);
      }
    });

    if (replaceMergeMainTypeMap) {
      replaceMergeMainTypeMap.each(function(val, mainTypeInReplaceMerge) {
        if (ComponentModel.hasClass(mainTypeInReplaceMerge) && !newCmptTypeMap.get(mainTypeInReplaceMerge!)) {
          newCmptTypes.push(mainTypeInReplaceMerge);
          newCmptTypeMap.set(mainTypeInReplaceMerge!, true);
        }
      });
    }

    function visitComponent(this: GlobalModel, mainType: ComponentMainType): void {
      const newCmptOptionList = concatInternalOptions(
        this,
        mainType,
        modelUtil.normalizeToArray(newOption[mainType])
      );
      const oldCmptList = componentsMap.get(mainType);

      const mergeMode = !oldCmptList ? 'replaceAll' : ((replaceMergeMainTypeMap && replaceMergeMainTypeMap.get(mainType)) ? 'replaceMerge' : 'normalMerge');
      const mappingResult = modelUtil.mappingToExists(oldCmptList, newCmptOptionList, mergeMode);

      modelUtil.setComponentTypeToKeyInfo(mappingResult, mainType, ComponentModel as ComponentModelConstructor);

      option[mainType] = null;
      componentsMap.set(mainType, null as any);
      componentsCount.set(mainType, 0);

      const optionsByMainType = [] as ComponentOption[];
      const cmptsByMainType = [] as ComponentModel[];
      let cmptsCountByMainType = 0;

      let tooltipExists: boolean;
      let tooltipWarningLogged: boolean;

      each(mappingResult, function (resultItem, index) {
        let componentModel = resultItem.existing;
        const newCmptOption = resultItem.newOption;

        if (!newCmptOption) {
          if (componentModel) {
            // Consider where is no new option and should be merged using {},
            // see removeEdgeAndAdd in topologicalTravel and
            // ComponentModel.getAllClassMainTypes.
            componentModel.mergeOption({}, this);
            componentModel.optionUpdated({}, false);
          }
          // If no both `resultItem.exist` and `resultItem.option`,
          // either it is in `replaceMerge` and not matched by any id,
          // or it has been removed in previous `replaceMerge` and left a "hole" in this component index.
        }
        else {
          const isSeriesType = mainType === 'series';
          const ComponentModelClass = (ComponentModel as ComponentModelConstructor).getClass(
            mainType, resultItem.keyInfo.subType,
            !isSeriesType // Give a more detailed warn later if series don't exists
          );

          if (!ComponentModelClass) {
            if (__DEV__) {
              const subType = resultItem.keyInfo.subType;
              const seriesImportName = BUILTIN_CHARTS_MAP[subType as keyof typeof BUILTIN_CHARTS_MAP];
              if (!componetsMissingLogPrinted[subType]) {
                componetsMissingLogPrinted[subType] = true;
                if (seriesImportName) {
                  error(`Series ${subType} is used but not imported.
import { ${seriesImportName} } from 'echarts/charts';
echarts.use([${seriesImportName}]);`);
                }
                else {
                  error(`Unkown series ${subType}`);
                }
              }
            }
            return;
          }

          // TODO Before multiple tooltips get supported, we do this check to avoid unexpected exception.
          if (mainType === 'tooltip') {
            if (tooltipExists) {
              if (__DEV__) {
                if (!tooltipWarningLogged) {
                  warn('Currently only one tooltip component is allowed.');
                  tooltipWarningLogged = true;
                }
              }
              return;
            }
            tooltipExists = true;
          }

          if (componentModel && componentModel.constructor === ComponentModelClass) {
            componentModel.name = resultItem.keyInfo.name;
            // componentModel.settingTask && componentModel.settingTask.dirty();
            componentModel.mergeOption(newCmptOption, this);
            componentModel.optionUpdated(newCmptOption, false);
          }
          else {
            // PENDING Global as parent ?
            const extraOpt = extend(
              {
                componentIndex: index
              },
              resultItem.keyInfo
            );
            componentModel = new ComponentModelClass(
              newCmptOption, this, this, extraOpt
            );
            // Assign `keyInfo`
            extend(componentModel, extraOpt);
            if (resultItem.brandNew) {
              componentModel.__requireNewView = true;
            }
            componentModel.init(newCmptOption, this, this);

            // Call optionUpdated after init.
            // newCmptOption has been used as componentModel.option
            // and may be merged with theme and default, so pass null
            // to avoid confusion.
            componentModel.optionUpdated(null, true);
          }
        }

        if (componentModel) {
          optionsByMainType.push(componentModel.option);
          cmptsByMainType.push(componentModel);
          cmptsCountByMainType++;
        }
        else {
          // Always do assign to avoid elided item in array.
          optionsByMainType.push(void 0);
          cmptsByMainType.push(void 0);
        }
      }, this);

      option[mainType] = optionsByMainType;
      componentsMap.set(mainType, cmptsByMainType);
      componentsCount.set(mainType, cmptsCountByMainType);

      // Backup series for filtering.
      if (mainType === 'series') {
        reCreateSeriesIndices(this);
      }
    }

    (ComponentModel as ComponentModelConstructor).topologicalTravel(
      newCmptTypes,
      (ComponentModel as ComponentModelConstructor).getAllClassMainTypes(),
      visitComponent,
      this,
    );

    if (!this._seriesIndices) {
      reCreateSeriesIndices(this);
    }
  }

  getOption(): ECUnitOption {
    const option = clone(this.option);
    each(option, function (optInMainType, mainType) {
      if (ComponentModel.hasClass(mainType)) {
        const opts = modelUtil.normalizeToArray(optInMainType);
        // Inner cmpts need to be removed.
        // Inner cmpts might not be at last since ec5.0, but still
        // compatible for users: if inner cmpt at last, splice the returned array.
        let realLen = opts.length;
        let metNonInner = false;
        for (let i = realLen - 1; i >= 0; i--) {
          // Remove options with inner id.
          if (opts[i] && !modelUtil.isComponentIdInternal(opts[i])) {
            metNonInner = true;
          }
          else {
            opts[i] = null;
            !metNonInner && realLen--;
          }
        }
        opts.length = realLen;
        option[mainType] = opts;
      }
    });

    delete option[OPTION_INNER_KEY];

    return option;
  }

  getTheme(): Model {
    return this._theme;
  }

  getLocaleModel(): Model<LocaleOption> {
    return this._locale;
  }

  setUpdatePayload(payload: Payload) {
    this._payload = payload;
  }

  getUpdatePayload(): Payload {
    return this._payload;
  }

  getComponent(mainType: ComponentMainType, idx?: number): ComponentModel {
    const list = this._componentsMap.get(mainType);
    if (list) {
      const cmpt = list[idx || 0];
      if (cmpt) {
        return cmpt;
      }
      else if (idx == null) {
        for (let i = 0; i < list.length; i++) {
          if (list[i]) {
            return list[i];
          }
        }
      }
    }
  }

  queryComponents(condition: QueryConditionKindB): ComponentModel[] {
    const mainType = condition.mainType;
    if (!mainType) {
      return [];
    }

    const index = condition.index;
    const id = condition.id;
    const name = condition.name;
    const cmpts = this._componentsMap.get(mainType);

    if (!cmpts || !cmpts.length) {
      return [];
    }

    let result: ComponentModel[];

    if (index != null) {
      result = [];
      each(modelUtil.normalizeToArray(index), function(idx) {
        if (cmpts[idx]) {
          result.push(cmpts[idx]);
        }
      });
    } else if (id != null) {
      result = queryByIdOrName('id', id, cmpts);
    }
    else if (name != null) {
      result = queryByIdOrName('name', name, cmpts);
    }
    else {
      // Return all non-empty components in that mainType
      result = filter(cmpts, cmpt => !!cmpt);
    }

    return filterBySubType(result, condition);
  }

  findComponents(condition: QueryConditionKindA): ComponentModel[] {
    const query = condition.query;
    const mainType = condition.mainType;

    const queryCond = getQueryCond(query);
    const result = queryCond
      ? this.queryComponents(queryCond)
      // Retrieve all non-empty components.
      : filter(this._componentsMap.get(mainType), cmpt => !!cmpt);

    return doFilter(filterBySubType(result, condition));

    function getQueryCond(q: QueryConditionKindA['query']): QueryConditionKindB | null {
      const indexAttr = mainType + 'Index';
      const idAttr = mainType + 'Id';
      const nameAttr = mainType + 'Name';
      return q && (
        q[indexAttr] != null
        || q[idAttr] != null
        || q[nameAttr] != null
      )
        ? {
          mainType: mainType,
          // subType will be filtered finally.
          index: q[indexAttr] as (number | number[]),
          id: q[idAttr] as (OptionId | OptionId[]),
          name: q[nameAttr] as (OptionName | OptionName[])
        }
        : null;
    }

    function doFilter(res: ComponentModel[]) {
      return condition.filter
        ? filter(res, condition.filter)
        : res;
    }
  }

  eachComponent<T>(
    cb: EachComponentAllCallback,
    context?: T
  ): void
  eachComponent<T>(
    mainType: string,
    cb: EachComponentInMainTypeCallback,
    context?: T
  ): void
  eachComponent<T>(
    mainType: QueryConditionKindA,
    cb: EachComponentInMainTypeCallback,
    context?: T
  ): void
  eachComponent<T>(
    mainType: string | QueryConditionKindA | EachComponentAllCallback,
    cb?: EachComponentInMainTypeCallback | T,
    context?: T
  ) {
    const componentsMap = this._componentsMap;

    if (isFunction(mainType)) {
      const ctxForAll = cb as T;
      const cbForAll = mainType as EachComponentAllCallback;
      componentsMap.each(function (cmpts, componentType) {
        for (let i = 0; cmpts && i < cmpts.length; i++) {
          const cmpt = cmpts[i];
          cmpt && cbForAll.call(ctxForAll, componentType, cmpt, cmpt.componentIndex);
        }
      });
    }
    else {
      const cmpts = isString(mainType)
        ? componentsMap.get(mainType)
        : isObject(mainType)
          ? this.findComponents(mainType)
          : null;
      for (let i = 0; cmpts && i < cmpts.length; i++) {
        const cmpt = cmpts[i];
        cmpt && (cb as EachComponentInMainTypeCallback).call(
          context, cmpt, cmpt.componentIndex
        );
      }
    }
  }

  getSeriesByName(name: OptionName): SeriesModel[] {
    const nameStr = modelUtil.convertOptionIdName(name, null);
    return filter(
      this._componentsMap.get('series') as SeriesModel[],
      oneSeries => !!oneSeries && nameStr != null && oneSeries.name === nameStr
    );
  }

  getSeriesByIndex(seriesIndex: number): SeriesModel {
    return this._componentsMap.get('series')[seriesIndex] as SeriesModel;
  }

  getSeriesByType(subType: ComponentSubType): SeriesModel[] {
    return filter(
      this._componentsMap.get('series') as SeriesModel[],
      oneSeries => !!oneSeries && oneSeries.subType === subType
    );
  }

  getSeries(): SeriesModel[] {
    return filter(
      this._componentsMap.get('series') as SeriesModel[],
      oneSeries => !!oneSeries
    );
  }

  getSeriesCount(): number {
    return this._componentsCount.get('series');
  }

  eachSeries<T>(
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    assertSeriesInitialized(this);
    each(this._seriesIndices, function (rawSeriesIndex) {
      const series = this._componentsMap.get('series')[rawSeriesIndex] as SeriesModel;
      cb.call(context, series, rawSeriesIndex);
    }, this);
  }

  eachRawSeries<T>(
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    each(this._componentsMap.get('series'), function (series) {
      series && cb.call(context, series, series.componentIndex);
    });
  }

  eachSeriesByType<T>(
    subType: ComponentSubType,
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    assertSeriesInitialized(this);
    each(this._seriesIndices, function (rawSeriesIndex) {
      const series = this._componentsMap.get('series')[rawSeriesIndex] as SeriesModel;
      if (series.subType === subType) {
        cb.call(context, series, rawSeriesIndex);
      }
    }, this);
  }

  eachRawSeriesByType<T>(
    subType: ComponentSubType,
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    return each(this.getSeriesByType(subType), cb, context);
  }

  isSeriesFiltered(seriesModel: SeriesModel): boolean {
    assertSeriesInitialized(this);
    return this._seriesIndicesMap.get(seriesModel.componentIndex) == null;
  }

  getCurrentSeriesIndices(): number[] {
    return (this._seriesIndices || []).slice();
  }

  filterSeries<T>(
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => boolean,
    context?: T
  ): void {
    assertSeriesInitialized(this);

    const newSeriesIndices: number[] = [];
    each(this._seriesIndices, function (seriesRawIdx) {
      const series = this._componentsMap.get('series')[seriesRawIdx] as SeriesModel;
      cb.call(context, series, seriesRawIdx) && newSeriesIndices.push(seriesRawIdx);
    }, this);

    this._seriesIndices = newSeriesIndices;
    this._seriesIndicesMap = createHashMap(newSeriesIndices);
  }

  restoreData(payload?: Payload): void {

    reCreateSeriesIndices(this);

    const componentsMap = this._componentsMap;
    const componentTypes: string[] = [];
    componentsMap.each(function (components, componentType) {
      if (ComponentModel.hasClass(componentType)) {
        componentTypes.push(componentType);
      }
    });

    (ComponentModel as ComponentModelConstructor).topologicalTravel(
      componentTypes,
      (ComponentModel as ComponentModelConstructor).getAllClassMainTypes(),
      function (componentType) {
        each(componentsMap.get(componentType), function (component) {
          if (component
            && (
              componentType !== 'series'
              || !isNotTargetSeries(component as SeriesModel, payload)
            )
          ) {
            component.restoreData();
          }
        });
      }
    );
  }

  private static internalField = (function () {

    reCreateSeriesIndices = function (ecModel: GlobalModel): void {
      const seriesIndices: number[] = ecModel._seriesIndices = [];
      each(ecModel._componentsMap.get('series'), function (series) {
        // series may have been removed by `replaceMerge`.
        series && seriesIndices.push(series.componentIndex);
      });
      ecModel._seriesIndicesMap = createHashMap(seriesIndices);
    };

    assertSeriesInitialized = function (ecModel: GlobalModel): void {
      // Components that use _seriesIndices should depends on series component,
      // which make sure that their initialization is after series.
      if (__DEV__) {
        if (!ecModel._seriesIndices) {
          throw new Error('Option should contains series.');
        }
      }
    };

    initBase = function (ecModel: GlobalModel, baseOption: ECUnitOption & AriaOptionMixin): void {
      // Using OPTION_INNER_KEY to mark that this option can not be used outside,
      // i.e. `chart.setOption(chart.getModel().option);` is forbiden.
      ecModel.option = {} as ECUnitOption;
      ecModel.option[OPTION_INNER_KEY] = OPTION_INNER_VALUE;

      // Init with series: [], in case of calling findSeries method
      // before series initialized.
      ecModel._componentsMap = createHashMap({ series: [] });
      ecModel._componentsCount = createHashMap();

      // If user spefied `option.aria`, aria will be enable. This detection should be
      // performed before theme and globalDefault merge.
      const airaOption = baseOption.aria;
      if (isObject(airaOption) && airaOption.enabled == null) {
        airaOption.enabled = true;
      }

      mergeTheme(baseOption, ecModel._theme.option);

      // TODO Needs clone when merging to the unexisted property
      merge(baseOption, globalDefault, false);

      ecModel._mergeOption(baseOption, null as any);
    };

  })();
}

export interface QueryConditionKindA {
  mainType: ComponentMainType;
  subType?: ComponentSubType;
  query?: {
    [k: string]: number | number[] | string | string[]
  };
  filter?: (cmpt: ComponentModel) => boolean;
}

export interface QueryConditionKindB {
  mainType: ComponentMainType;
  subType?: ComponentSubType;
  index?: number | number[];
  id?: OptionId | OptionId[];
  name?: OptionName | OptionName[];
}

export interface EachComponentAllCallback {
  (mainType: string, model: ComponentModel, componentIndex: number): void;
}
interface EachComponentInMainTypeCallback {
  (model: ComponentModel, componentIndex: number): void;
}


function isNotTargetSeries(seriesModel: SeriesModel, payload: Payload): boolean | undefined {
  if (payload) {
    const index = payload.seriesIndex;
    const id = payload.seriesId;
    const name = payload.seriesName;
    return (index != null && seriesModel.componentIndex !== index)
      || (id != null && seriesModel.id !== id)
      || (name != null && seriesModel.name !== name);
  }
}

function mergeTheme(option: ECUnitOption, theme: ThemeOption): void {
  // PENDING
  // NOT use `colorLayer` in theme if option has `color`
  const notMergeColorLayer = option.color && !option.colorLayer;

  each(theme, function (themeItem, name) {
    if (name === 'colorLayer' && notMergeColorLayer) {
      return;
    }

    // If it is component model mainType, the model handles that merge later.
    // otherwise, merge them here.
    if (!ComponentModel.hasClass(name)) {
      if (typeof themeItem === 'object') {
        option[name] = !option[name]
          ? clone(themeItem)
          : merge(option[name], themeItem, false);
      }
      else {
        if (option[name] == null) {
          option[name] = themeItem;
        }
      }
    }
  });
}

function queryByIdOrName<T extends { id?: string, name?: string }>(
  attr: 'id' | 'name',
  idOrName: string | number | (string | number)[],
  cmpts: T[]
): T[] {
  // Here is a break from echarts4: string and number are
  // treated as equal.
  if (isArray(idOrName)) {
    const keyMap = createHashMap<boolean>();
    each(idOrName, function (idOrNameItem) {
      if (idOrNameItem != null) {
        const idName = modelUtil.convertOptionIdName(idOrNameItem, null);
        idName != null && keyMap.set(idOrNameItem, true);
      }
    });
    return filter(cmpts, cmpt => cmpt && keyMap.get(cmpt[attr]!));
  }
  else {
    const idName = modelUtil.convertOptionIdName(idOrName, null);
    return filter(cmpts, cmpt => cmpt && idName != null && cmpt[attr] === idName);
  }
}

function filterBySubType(
  components: ComponentModel[],
  condition: QueryConditionKindA | QueryConditionKindB
): ComponentModel[] {
  // Using hasOwnProperty for restrict. Consider
  // subType is undefined in user payload.
  return condition.hasOwnProperty('subType')
    ? filter(components, cmpt => cmpt && cmpt.subType === condition.subType)
    : components;
}

function normalizeSetOptionInput(opts: GlobalModelSetOptionOpts): InnerSetOptionOpts {
  const replaceMergeMainTypeMap = createHashMap<boolean, string>();
  opts && each(modelUtil.normalizeToArray(opts.replaceMerge), function (mainType) {
    if (__DEV__) {
      assert(
        ComponentModel.hasClass(mainType),
        '"' + mainType + '" is not valid component main type in "replaceMerge"'
      );
    }
    replaceMergeMainTypeMap.set(mainType as string, true);
  });
  return {
    replaceMergeMainTypeMap: replaceMergeMainTypeMap
  };
}

interface GlobalModel extends PaletteMixin<ECUnitOption> {}
mixin(GlobalModel, PaletteMixin);

export default GlobalModel;