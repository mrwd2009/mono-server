import * as zrUtil from 'zrender/src/core/util';
import env from 'zrender/src/core/env';
import * as modelUtil from '../util/model';
import {
  DataHost,
  DimensionName,
  StageHandlerProgressParams,
  SeriesOption,
  ZRColor,
  BoxLayoutOptionMixin,
  ScaleDataValue,
  Dictionary,
  OptionDataItemObject,
  SeriesDataType,
  SeriesEncodeOptionMixin,
  OptionEncodeValue,
  ColorBy,
  StatesOptionMixin
} from '../util/types';
import ComponentModel, { ComponentModelConstructor } from './Component';
import { PaletteMixin } from './mixin/palette';
import { DataFormatMixin } from '../model/mixin/dataFormat';
import Model from '../model/Model';
import {
  getLayoutParams,
  mergeLayoutParam,
  fetchLayoutMode,
} from '../util/layout';
import { createTask } from '../core/task';
import GlobalModel from './Global';
import { CoordinateSystem } from '../coord/CoordinateSystem';
import { ExtendableConstructor, mountExtend, Constructor } from '../util/clazz';
import { PiplineContext, SeriesTaskContext, GeneralTask, OverallTask, SeriesTask } from '../core/Scheduler';
import LegendVisualProvider from '../visual/LegendVisualProvider';
import SeriesData from '../data/SeriesData';
import Axis from '../coord/Axis';
import type { BrushCommonSelectorsForSeries, BrushSelectableArea } from '../component/brush/selector';
import makeStyleMapper from './mixin/makeStyleMapper';
import { SourceManager } from '../data/helper/sourceManager';
import { Source } from '../data/Source';
import { defaultSeriesFormatTooltip } from '../component/tooltip/seriesFormatTooltip';
import { ECSymbol } from '../util/symbol';
import { Group } from '../util/graphic';
import { LegendIconParams } from '../component/legend/LegendModel';

const inner = modelUtil.makeInner<{
  data: SeriesData,
  dataBeforeProcessed: SeriesData,
  sourceManager: SourceManager,
}, SeriesModel>();

function getSelectionKey(data: SeriesData, dataIndex: number): string {
  return data.getName(dataIndex) || data.getId(dataIndex);
}


export const SERIES_UNIVERSAL_TRANSITION_PROP = '__universalTransitionEnabled';

interface SeriesModel {
  preventIncremental(): boolean;
  getTooltipPosition(dataIndex: number): number[];
  getAxisTooltipData(dim: DimensionName[], value: ScaleDataValue, baseAxis: Axis): { dataIndices: number[], nestestValue: any };
  getMarkerPosition(value: ScaleDataValue[]): number[];
  getLegendIcon(opt: LegendIconParams): ECSymbol | Group;
  brushSelector(
    dataIndex: number,
    data: SeriesData,
    selectors: BrushCommonSelectorsForSeries,
    area: BrushSelectableArea
  ): boolean;
  enableAriaDecal(): void;
}
class SeriesModel<Opt extends SeriesOption = SeriesOption> extends ComponentModel<Opt> {
  type: string = 'series.__base__';

  defaultOption: SeriesOption;

  seriesIndex: number = 0;

  coordinateSystem: CoordinateSystem;

  dataTask: SeriesTask;

  pipelineContext: PipelineContext;

  legendVsiualProvider: LegendVisualProvider;

  visualStyleAccessPath: string = 'itemStyle';

  visualDrawType: 'fill' | 'stroke' = 'fill';
  visualStyleMapper: ReturnType<typeof makeStyleMapper>;

  ignoreStyleOnData: boolean = false;
  hasSymbolVisual: boolean = false;
  defaultSymbol: string = 'circle';
  legendIcon!: string;

  [SERIES_UNIVERSAL_TRANSITION_PROP]: boolean;

  private _selectedDataIndicesMap: Dictionary<number> = {};
  readonly preventUsingHoverLayer!: boolean;

  static protoInitialize = (function () {
    const proto = SeriesModel.prototype;
    proto.type = 'series.__base__';
    proto.seriesIndex = 0;
    proto.ignoreStyleOnData = false;
    proto.hasSymbolVisual = false;
    proto.defaultSymbol = 'circle';
    // Make sure the values can be accessed!
    proto.visualStyleAccessPath = 'itemStyle';
    proto.visualDrawType = 'fill';
  })();

  init(option: Opt, parentModel: Model, ecModel: GlobalModel) {
    this.seriesIndex = this.componentIndex;
    this.dataTask = createTask<SeriesTaskContext>({
      count: dataTaskCount,
      reset: dataTaskReset,
    });
    this.dataTask.context = { model: this };
    this.mergeDefaultAndTheme(option, ecModel);

    const sourceManager = inner(this).sourceManager = new SourceManager(this);
    sourceManager.prepareSource();


    const data = this.getInitialData(option, ecModel);
    wrapData(data, this);
    this.dataTask.context.data = data;

    if (__DEV__) {
      zrUtil.assert(data, 'getInitialData returned invalid data.');
    }

    inner(this).dataBeforeProcessed = data;

    autoSeriesName(this);
    
    this._initSelectedMapFromData(data);
  }

  mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void {
    const layoutMode = fetchLayoutMode(this);
    const inputPositionParams = layoutMode ? getLayoutParams(option as  BoxLayoutOptionMixin) : {};

    let themeSubType = this.subType;
    if ((ComponentModel as ComponentModelConstructor).hasClass(themeSubType)) {
      themeSubType += 'Series';
    }

    zrUtil.merge(option, ecModel.getTheme().get(this.subType));
    zrUtil.merge(option, this.getDefaultOption());

    modelUtil.defaultEmphasis(option, 'label', ['show']);

    this.fillDataTextStyle(option.data as ArrayLike<any>);

    if (layoutMode) {
      mergeLayoutParam(option as BoxLayoutOptionMixin, inputPositionParams, layoutMode);
    }
  }

  mergeOption(newSeriesOption: Opt, ecModel: GlobalModel) {
    newSeriesOption = zrUtil.merge(this.option, newSeriesOption, true);
    this.fillDataTextStyle(newSeriesOption.data as ArrayLike<any>);

    const layoutMode = fetchLayoutMode(this);
    if (layoutMode) {
      mergeLayoutParam(
        this.option as BoxLayoutOptionMixin,
        newSeriesOption as BoxLayoutOptionMixin,
        layoutMode,
      );
    }

    const sourceManager = inner(this).sourceManager;
    sourceManager.dirty();
    sourceManager.prepareSource();

    const data = this.getInitialData(newSeriesOption, ecModel);
    wrapData(data, this);
    this.dataTask.dirty();
    this.dataTask.context.data = data;

    inner(this).dataBeforeProcessed = data;

    autoSeriesNae(this);

    this._initSelectedMapFromData(data);
  }

  fillDataTextStyle(data: ArrayLike<any>): void {
    // Default data label emphasis `show`
    // FIXME Tree structure data ?
    // FIXME Performance ?
    if (data && !zrUtil.isTypedArray(data)) {
      const props = ['show'];
      for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].label) {
          modelUtil.defaultEmphasis(data[i], 'label', props);
        }
      }
    }
  }

  getInitialData(option: Opt, ecModel: GlobalModel): SeriesData {
    return;
  }

  appendData(params: { data: ArrayLike<any> }): void {
    // FIXME ???
    // (1) If data from dataset, forbidden append.
    // (2) support append data of dataset.
    const data = this.getRawData();
    data.appendData(params.data);
  }

  getData(dataType?: SeriesDataType): SeriesData<this> {
    const task = getCurrentTask(this);
    if (task) {
      const data = task.context.data;
      return (dataType == null ? data : data.getLinkedData(dataType)) as SeriesData<this>;
    }
    else {
      // When series is not alive (that may happen when click toolbox
      // restore or setOption with not merge mode), series data may
      // be still need to judge animation or something when graphic
      // elements want to know whether fade out.
      return inner(this).data as SeriesData<this>;
    }
  }

  getAllData(): ({
    data: SeriesData,
    type?: SeriesDataType
  })[] {
    const mainData = this.getData();
    return (mainData && mainData.getLinkedDataAll)
      ? mainData.getLinkedDataAll()
      : [{ data: mainData }];
  }

  setData(data: SeriesData): void {
    const task = getCurrentTask(this);
    if (task) {
      const context = task.context;
      // Consider case: filter, data sample.
      // FIXME:TS never used, so comment it
      // if (context.data !== data && task.modifyOutputEnd) {
      //     task.setOutputEnd(data.count());
      // }
      context.outputData = data;
      // Caution: setData should update context.data,
      // Because getData may be called multiply in a
      // single stage and expect to get the data just
      // set. (For example, AxisProxy, x y both call
      // getData and setDate sequentially).
      // So the context.data should be fetched from
      // upstream each time when a stage starts to be
      // performed.
      if (task !== this.dataTask) {
        context.data = data;
      }
    }
    inner(this).data = data;
  }

  getEncode() {
    const encode = (this as Model<SeriesEncodeOptionMixin>).get('encode', true);
    if (encode) {
      return zrUtil.createHashMap<OptionEncodeValue, DimensionName>(encode);
    }
  }

  getSourceManager(): SourceManager {
    return inner(this).sourceManager;
  }

  getSource(): Source {
    return this.getSourceManager().getSource();
  }

  getRawData(): SeriesData {
    return inner(this).dataBeforeProcessed;
  }

  getColorBy(): ColorBy {
    const colorBy = this.get('colorBy');
    return colorBy || 'series';
  }

  isColorBySeries(): boolean {
    return this.getColorBy() === 'series';
  }

  getBaseAxis(): Axis {
    const coordSys = this.coordinateSystem;
    // @ts-ignore
    return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
  }

  formatTooltip(
    dataIndex: number,
    multipleSeries?: boolean,
    dataType?: SeriesDataType
  ): ReturnType<DataFormatMixin['formatTooltip']> {
    return defaultSeriesFormatTooltip({
      series: this,
      dataIndex: dataIndex,
      multipleSeries: multipleSeries
    });
  }

  isAnimationEnabled(): boolean {
    const ecModel = this.ecModel;
    // Disable animation if using echarts in node but not give ssr flag.
    // In ssr mode, renderToString will generate svg with css animation.
    if (env.node && !(ecModel && ecModel.ssr)) {
      return false;
    }
    let animationEnabled = this.getShallow('animation');
    if (animationEnabled) {
      if (this.getData().count() > this.getShallow('animationThreshold')) {
        animationEnabled = false;
      }
    }
    return !!animationEnabled;
  }

  restoreData() {
    this.dataTask.dirty();
  }

  getColorFromPalette(name: string, scope: any, requestColorNum?: number): ZRColor {
    const ecModel = this.ecModel;
    // PENDING
    let color = PaletteMixin.prototype.getColorFromPalette.call(this, name, scope, requestColorNum);
    if (!color) {
      color = ecModel.getColorFromPalette(name, scope, requestColorNum);
    }
    return color;
  }

  coordDimToDataDim(coordDim: DimensionName): DimensionName[] {
    return this.getRawData().mapDimensionsAll(coordDim);
  }

  getProgressive(): number | false {
    return this.get('progressive');
  }

  getProgressiveThreshold(): number {
    return this.get('progressiveThreshold');
  }

  select(innerDataIndices: number[], dataType?: SeriesDataType): void {
    this._innerSelect(this.getData(dataType), innerDataIndices);
  }

  unselect(innerDataIndices: number[], dataType?: SeriesDataType): void {
    const selectedMap = this.option.selectedMap;
    if (!selectedMap) {
      return;
    }
    const selectedMode = this.option.selectedMode;

    const data = this.getData(dataType);
    if (selectedMode === 'series' || selectedMap === 'all') {
      this.option.selectedMap = {};
      this._selectedDataIndicesMap = {};
      return;
    }

    for (let i = 0; i < innerDataIndices.length; i++) {
      const dataIndex = innerDataIndices[i];
      const nameOrId = getSelectionKey(data, dataIndex);
      selectedMap[nameOrId] = false;
      this._selectedDataIndicesMap[nameOrId] = -1;
    }
  }

  toggleSelect(innerDataIndices: number[], dataType?: SeriesDataType): void {
    const tmpArr: number[] = [];
    for (let i = 0; i < innerDataIndices.length; i++) {
      tmpArr[0] = innerDataIndices[i];
      this.isSelected(innerDataIndices[i], dataType)
        ? this.unselect(tmpArr, dataType)
        : this.select(tmpArr, dataType);
    }
  }

  getSelectedDataIndices(): number[] {
    if (this.option!.selectedMap === 'all') {
      return [].slice.call(this.getData().getIndices());
    }
    const selectedDataIndicesMap = this._selectedDataIndicesMap;
    const nameOrIds = zrUtil.keys(selectedDataIndicesMap);
    const dataIndices = [];
    for (let i = 0; i < nameOrIds.length; i++) {
      const dataIndex = selectedDataIndicesMap[nameOrIds[i]];
      if (dataIndex >= 0) {
        dataIndices.push(dataIndex);
      }
    }
    return dataIndices;
  }

  isSelected(dataIndex: number, dataType?: SeriesDataType): boolean {
    const selectedMap = this.option!.selectedMap;
    if (!selectedMap) {
      return false;
    }

    const data = this.getData(dataType);

    return (selectedMap === 'all' || selectedMap[getSelectionKey(data, dataIndex)])
      && !data.getItemModel<StatesOptionMixin<unknown, unknown>>(dataIndex).get(['select', 'disabled']);
  }

  isUniversalTransitionEnabled(): boolean {
    if (this[SERIES_UNIVERSAL_TRANSITION_PROP]) {
      return true;
    }

    const universalTransitionOpt = this.option!.universalTransition;
    // Quick reject
    if (!universalTransitionOpt) {
      return false;
    }

    if (universalTransitionOpt === true) {
      return true;
    }

    // Can be simply 'universalTransition: true'
    return universalTransitionOpt && universalTransitionOpt.enabled;
  }

  private _innerSelect(data: SeriesData, innerDataIndices: number[]) {
    const option = this.option;
    const selectedMode = option!.selectedMode;
    const len = innerDataIndices.length;
    if (!selectedMode || !len) {
      return;
    }

    if (selectedMode === 'series') {
      option!.selectedMap = 'all';
    }
    else if (selectedMode === 'multiple') {
      if (!zrUtil.isObject(option!.selectedMap)) {
        option!.selectedMap = {};
      }
      const selectedMap = option!.selectedMap;
      for (let i = 0; i < len; i++) {
        const dataIndex = innerDataIndices[i];
        // TODO diffrent types of data share same object.
        const nameOrId = getSelectionKey(data, dataIndex);
        selectedMap[nameOrId] = true;
        this._selectedDataIndicesMap[nameOrId] = data.getRawIndex(dataIndex);
      }
    }
    else if (selectedMode === 'single' || selectedMode === true) {
      const lastDataIndex = innerDataIndices[len - 1];
      const nameOrId = getSelectionKey(data, lastDataIndex);
      option!.selectedMap = {
        [nameOrId]: true
      };
      this._selectedDataIndicesMap = {
        [nameOrId]: data.getRawIndex(lastDataIndex)
      };
    }
  }

  private _initSelectedMapFromData(data: SeriesData) {
    // Ignore select info in data if selectedMap exists.
    // NOTE It's only for legacy usage. edge data is not supported.
    if (this.option!.selectedMap) {
      return;
    }

    const dataIndices: number[] = [];
    if (data.hasItemOption) {
      data.each(function (idx) {
        const rawItem = data.getRawDataItem(idx);
        if (rawItem && (rawItem as OptionDataItemObject<unknown>).selected) {
          dataIndices.push(idx);
        }
      });
    }

    if (dataIndices.length > 0) {
      this._innerSelect(data, dataIndices);
    }
  }

  // /**
  //  * @see {module:echarts/stream/Scheduler}
  //  */
  // abstract pipeTask: null

  static registerClass(clz: Constructor): Constructor {
    return ComponentModel.registerClass(clz);
  }
}

interface SeriesModel<Opt extends SeriesOption = SeriesOption> extends DataFormatMixin, PaletteMixin<Opt>, DataHost {
  getShadowDim?(): string;
}
zrUtil.mixin(SeriesModel, DataFormatMixin);
zrUtil.mixin(SeriesModel, PaletteMixin);

export type SeriesModelConstructor = typeof SeriesModel & ExtendableConstructor;
mountExtend(SeriesModel, ComponentModel as SeriesModelConstructor);

function autoSeriesName(seriesModel: SeriesModel): void {
  // User specified name has higher priority, otherwise it may cause
  // series can not be queried unexpectedly.
  const name = seriesModel.name;
  if (!modelUtil.isNameSpecified(seriesModel)) {
    seriesModel.name = getSeriesAutoName(seriesModel) || name;
  }
}

function getSeriesAutoName(seriesModel: SeriesModel): string {
  const data = seriesModel.getRawData();
  const dataDims = data.mapDimensionsAll('seriesName');
  const nameArr: string[] = [];
  zrUtil.each(dataDims, function (dataDim) {
    const dimInfo = data.getDimensionInfo(dataDim);
    dimInfo.displayName && nameArr.push(dimInfo.displayName);
  });
  return nameArr.join(' ');
}

function dataTaskCount(context: SeriesTaskContext): number {
  return context.model.getRawData().count();
}

function dataTaskReset(context: SeriesTaskContext) {
  const seriesModel = context.model;
  seriesModel.setData(seriesModel.getRawData().cloneShallow());
  return dataTaskProgress;
}

function dataTaskProgress(param: StageHandlerProgressParams, context: SeriesTaskContext): void {
  // Avoid repead cloneShallow when data just created in reset.
  if (context.outputData && param.end > context.outputData.count()) {
    context.model.getRawData().cloneShallow(context.outputData);
  }
}

// TODO refactor
function wrapData(data: SeriesData, seriesModel: SeriesModel): void {
  zrUtil.each(zrUtil.concatArray(data.CHANGABLE_METHODS, data.DOWNSAMPLE_METHODS), function (methodName) {
    data.wrapMethod(methodName as any, zrUtil.curry(onDataChange, seriesModel));
  });
}

function onDataChange(this: SeriesData, seriesModel: SeriesModel, newList: SeriesData): SeriesData {
  const task = getCurrentTask(seriesModel);
  if (task) {
    // Consider case: filter, selectRange
    task.setOutputEnd((newList || this).count());
  }
  return newList;
}

function getCurrentTask(seriesModel: SeriesModel): GeneralTask {
  const scheduler = (seriesModel.ecModel || {}).scheduler;
  const pipeline = scheduler && scheduler.getPipeline(seriesModel.uid);

  if (pipeline) {
    // When pipline finished, the currrentTask keep the last
    // task (renderTask).
    let task = pipeline.currentTask;
    if (task) {
      const agentStubMap = (task as OverallTask).agentStubMap;
      if (agentStubMap) {
        task = agentStubMap.get(seriesModel.uid);
      }
    }
    return task;
  }
}

export default SeriesModel;