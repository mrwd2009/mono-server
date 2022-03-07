import { DatasetModel } from '../../component/dataset/install';
import SeriesModel from '../../model/Series';
import {
  setAsPrimitive,
  map,
  isTypedArray,
  assert,
  each,
  retrieve2,
} from 'zrender/src/core/util';
import {
  SourceMetaRawOption,
  Source,
  createSource,
  cloneSourceShallow,
} from '../Source';
import {
  SeriesEncodableModel,
  OptionSourceData,
  SOURCE_FORMAT_TYPED_ARRAY,
  SOURCE_FORMAT_ORIGINAL,
  SourceFormat,
  SeriesLayoutBy,
  OptionSourceHeader,
  DimensionDefinitionLoose,
  Dictionary,
} from '../../util/types';
import {
  querySeriesUpstreamDatasetModel,
  queryDatasetUpstreamDatasetModels,
} from './sourceHelper';
import { applyDataTransform } from './transform';
import DataStore, { DataStoreDimensionDefine } from '../DataStore';
import { DefaultDataProvider } from './dataProvider';
import { SeriesDataSchema } from './SeriesDataSchema';

type DataStoreMap = Dictionary<DataStore>;

export class SourceManager {

  // Currently only datasetModel can host `transform`
  private _sourceHost: DatasetModel | SeriesModel;

  // Cached source. Do not repeat calculating if not dirty.
  private _sourceList: Source[] = [];

  private _storeList: DataStoreMap[] = [];

  // version sign of each upstream source manager.
  private _upstreamSignList: string[] = [];

  private _versionSignBase = 0;

  private _dirty = true;

  constructor(sourceHost: DatasetModel | SeriesModel) {
    this._sourceHost = sourceHost;
  }

  /**
   * Mark dirty.
   */
  dirty() {
    this._setLocalSource([], []);
    this._storeList = [];
    this._dirty = true;
  }

  private _setLocalSource(
    sourceList: Source[],
    upstreamSignList: string[]
  ): void {
    this._sourceList = sourceList;
    this._upstreamSignList = upstreamSignList;
    this._versionSignBase++;
    if (this._versionSignBase > 9e10) {
      this._versionSignBase = 0;
    }
  }

  /**
   * For detecting whether the upstream source is dirty, so that
   * the local cached source (in `_sourceList`) should be discarded.
   */
  private _getVersionSign(): string {
    return this._sourceHost.uid + '_' + this._versionSignBase;
  }

  /**
   * Always return a source instance. Otherwise throw error.
   */
  prepareSource(): void {
    // For the case that call `setOption` multiple time but no data changed,
    // cache the result source to prevent from repeating transform.
    if (this._isDirty()) {
      this._createSource();
      this._dirty = false;
    }
  }

  private _createSource(): void {
    this._setLocalSource([], []);

    const sourceHost = this._sourceHost;

    const upSourceMgrList = this._getUpstreamSourceManagers();
    const hasUpstream = !!upSourceMgrList.length;
    let resultSourceList: Source[];
    let upstreamSignList: string[];

    if (isSeries(sourceHost)) {
      const seriesModel = sourceHost as SeriesEncodableModel;
      let data;
      let sourceFormat: SourceFormat;
      let upSource: Source;

      // Has upstream dataset
      if (hasUpstream) {
        const upSourceMgr = upSourceMgrList[0];
        upSourceMgr.prepareSource();
        upSource = upSourceMgr.getSource();
        data = upSource.data;
        sourceFormat = upSource.sourceFormat;
        upstreamSignList = [upSourceMgr._getVersionSign()];
      }
      // Series data is from own.
      else {
        data = seriesModel.get('data', true) as OptionSourceData;
        sourceFormat = isTypedArray(data)
          ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL;
        upstreamSignList = [];
      }

      // See [REQUIREMENT_MEMO], merge settings on series and parent dataset if it is root.
      const newMetaRawOption = this._getSourceMetaRawOption() || {} as SourceMetaRawOption;
      const upMetaRawOption = upSource && upSource.metaRawOption || {} as SourceMetaRawOption;
      const seriesLayoutBy = retrieve2(newMetaRawOption.seriesLayoutBy, upMetaRawOption.seriesLayoutBy) || null;
      const sourceHeader = retrieve2(newMetaRawOption.sourceHeader, upMetaRawOption.sourceHeader);
      // Note here we should not use `upSource.dimensionsDefine`. Consider the case:
      // `upSource.dimensionsDefine` is detected by `seriesLayoutBy: 'column'`,
      // but series need `seriesLayoutBy: 'row'`.
      const dimensions = retrieve2(newMetaRawOption.dimensions, upMetaRawOption.dimensions);

      // We share source with dataset as much as possible
      // to avoid extra memroy cost of high dimensional data.
      const needsCreateSource = seriesLayoutBy !== upMetaRawOption.seriesLayoutBy
        || !!sourceHeader !== !!upMetaRawOption.sourceHeader
        || dimensions;
      resultSourceList = needsCreateSource ? [createSource(
        data,
        { seriesLayoutBy, sourceHeader, dimensions },
        sourceFormat
      )] : [];
    }
    else {
      const datasetModel = sourceHost as DatasetModel;

      // Has upstream dataset.
      if (hasUpstream) {
        const result = this._applyTransform(upSourceMgrList);
        resultSourceList = result.sourceList;
        upstreamSignList = result.upstreamSignList;
      }
      // Is root dataset.
      else {
        const sourceData = datasetModel.get('source', true);
        resultSourceList = [createSource(
          sourceData,
          this._getSourceMetaRawOption(),
          null
        )];
        upstreamSignList = [];
      }
    }

    if (__DEV__) {
      assert(resultSourceList && upstreamSignList);
    }

    this._setLocalSource(resultSourceList, upstreamSignList);
  }

  private _applyTransform(
    upMgrList: SourceManager[]
  ): {
    sourceList: Source[],
    upstreamSignList: string[]
  } {
    const datasetModel = this._sourceHost as DatasetModel;
    const transformOption = datasetModel.get('transform', true);
    const fromTransformResult = datasetModel.get('fromTransformResult', true);

    if (__DEV__) {
      assert(fromTransformResult != null || transformOption != null);
    }

    if (fromTransformResult != null) {
      let errMsg = '';
      if (upMgrList.length !== 1) {
        if (__DEV__) {
          errMsg = 'When using `fromTransformResult`, there should be only one upstream dataset';
        }
        doThrow(errMsg);
      }
    }

    let sourceList: Source[];
    const upSourceList: Source[] = [];
    const upstreamSignList: string[] = [];
    each(upMgrList, upMgr => {
      upMgr.prepareSource();
      const upSource = upMgr.getSource(fromTransformResult || 0);
      let errMsg = '';
      if (fromTransformResult != null && !upSource) {
        if (__DEV__) {
          errMsg = 'Can not retrieve result by `fromTransformResult`: ' + fromTransformResult;
        }
        doThrow(errMsg);
      }
      upSourceList.push(upSource);
      upstreamSignList.push(upMgr._getVersionSign());
    });

    if (transformOption) {
      sourceList = applyDataTransform(
        transformOption,
        upSourceList,
        { datasetIndex: datasetModel.componentIndex }
      );
    }
    else if (fromTransformResult != null) {
      sourceList = [cloneSourceShallow(upSourceList[0])];
    }

    return { sourceList, upstreamSignList };
  }

  private _isDirty(): boolean {
    if (this._dirty) {
      return true;
    }

    // All sourceList is from the some upsteam.
    const upSourceMgrList = this._getUpstreamSourceManagers();
    for (let i = 0; i < upSourceMgrList.length; i++) {
      const upSrcMgr = upSourceMgrList[i];
      if (
        // Consider the case that there is ancestor diry, call it recursively.
        // The performance is probably not an issue because usually the chain is not long.
        upSrcMgr._isDirty()
        || this._upstreamSignList[i] !== upSrcMgr._getVersionSign()
      ) {
        return true;
      }
    }
  }

  /**
   * @param sourceIndex By defualt 0, means "main source".
   *                    Most cases there is only one source.
   */
  getSource(sourceIndex?: number): Source {
    sourceIndex = sourceIndex || 0;
    const source = this._sourceList[sourceIndex];
    if (!source) {
      // Series may share source instance with dataset.
      const upSourceMgrList = this._getUpstreamSourceManagers();
      return upSourceMgrList[0]
        && upSourceMgrList[0].getSource(sourceIndex);
    }
    return source;
  }

  /**
   *
   * Get a data store which can be shared across series.
   * Only available for series.
   *
   * @param seriesDimRequest Dimensions that are generated in series.
   *        Should have been sorted by `storeDimIndex` asc.
   */
  getSharedDataStore(seriesDimRequest: SeriesDataSchema): DataStore {
    if (__DEV__) {
      assert(isSeries(this._sourceHost), 'Can only call getDataStore on series source manager.');
    }
    const schema = seriesDimRequest.makeStoreSchema();
    return this._innerGetDataStore(
      schema.dimensions, seriesDimRequest.source, schema.hash
    );
  }

  private _innerGetDataStore(
    storeDims: DataStoreDimensionDefine[],
    seriesSource: Source,
    sourceReadKey: string
  ): DataStore | undefined {
    // TODO Can use other sourceIndex?
    const sourceIndex = 0;

    const storeList = this._storeList;

    let cachedStoreMap = storeList[sourceIndex];

    if (!cachedStoreMap) {
      cachedStoreMap = storeList[sourceIndex] = {};
    }

    let cachedStore = cachedStoreMap[sourceReadKey];
    if (!cachedStore) {
      const upSourceMgr = this._getUpstreamSourceManagers()[0];

      if (isSeries(this._sourceHost) && upSourceMgr) {
        cachedStore = upSourceMgr._innerGetDataStore(
          storeDims, seriesSource, sourceReadKey
        );
      }
      else {
        cachedStore = new DataStore();
        // Always create store from source of series.
        cachedStore.initData(
          new DefaultDataProvider(seriesSource, storeDims.length),
          storeDims
        );
      }
      cachedStoreMap[sourceReadKey] = cachedStore;
    }

    return cachedStore;
  }

  /**
   * PEDING: Is it fast enough?
   * If no upstream, return empty array.
   */
  private _getUpstreamSourceManagers(): SourceManager[] {
    // Always get the relationship from the raw option.
    // Do not cache the link of the dependency graph, so that
    // no need to update them when change happen.
    const sourceHost = this._sourceHost;

    if (isSeries(sourceHost)) {
      const datasetModel = querySeriesUpstreamDatasetModel(sourceHost);
      return !datasetModel ? [] : [datasetModel.getSourceManager()];
    }
    else {
      return map(
        queryDatasetUpstreamDatasetModels(sourceHost as DatasetModel),
        datasetModel => datasetModel.getSourceManager()
      );
    }
  }

  private _getSourceMetaRawOption(): SourceMetaRawOption {
    const sourceHost = this._sourceHost;
    let seriesLayoutBy: SeriesLayoutBy;
    let sourceHeader: OptionSourceHeader;
    let dimensions: DimensionDefinitionLoose[];
    if (isSeries(sourceHost)) {
      seriesLayoutBy = sourceHost.get('seriesLayoutBy', true);
      sourceHeader = sourceHost.get('sourceHeader', true);
      dimensions = sourceHost.get('dimensions', true);
    }
    // See [REQUIREMENT_MEMO], `non-root-dataset` do not support them.
    else if (!this._getUpstreamSourceManagers().length) {
      const model = sourceHost as DatasetModel;
      seriesLayoutBy = model.get('seriesLayoutBy', true);
      sourceHeader = model.get('sourceHeader', true);
      dimensions = model.get('dimensions', true);
    }
    return { seriesLayoutBy, sourceHeader, dimensions };
  }

}

// Call this method after `super.init` and `super.mergeOption` to
// disable the transform merge, but do not disable transfrom clone from rawOption.
export function disableTransformOptionMerge(datasetModel: DatasetModel): void {
  const transformOption = datasetModel.option.transform;
  transformOption && setAsPrimitive(datasetModel.option.transform);
}

function isSeries(sourceHost: SourceManager['_sourceHost']): sourceHost is SeriesEncodableModel {
  // Avoid circular dependency with Series.ts
  return (sourceHost as SeriesModel).mainType === 'series';
}

function doThrow(errMsg: string): void {
  throw new Error(errMsg);
}