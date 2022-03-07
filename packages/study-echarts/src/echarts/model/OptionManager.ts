import ExtensionAPI from '../core/ExtensionAPI';
import {
  OptionPreprocessor,
  MediaQuery,
  ECUnitOption,
  MediaUnit,
  ECBasicOption,
  SeriesOption,
} from '../util/types';
import GlobalModel, { InnerSetOptionOpts } from './Global';
import {
  normalizeToArray,
} from '../util/model';
import {
  each, clone, map, isTypedArray, setAsPrimitive, isArray, isObject
} from 'zrender/src/core/util';
import { DatasetOption } from '../component/dataset/install';
import { error } from '../util/log';

const __DEV__ = process.env.NODE_ENV === 'development';

const QUERY_REG = /^(min|max)?(.+)$/;

interface ParsedRawOption {
  baseOption: ECUnitOption;
  timelineOptions: ECUnitOption[];
  mediaDefault: MediaUnit;
  mediaList: MediaUnit[];
}

class OptionManager {
  private _api: ExtensionAPI;

  private _timelineOptions: ECUnitOption[] = [];

  private _mediaList: MediaUnit[] = [];

  private _mediaDefault!: MediaUnit;

  private _currentMediaIndices: number[] = [];

  private _optionBackup!: ParsedRawOption;

  private _newBaseOption!: ECUnitOption;

  constructor(api: ExtensionAPI) {
    this._api = api;
  }

  setOption(rawOption: ECBasicOption, optionPreprocessorFuncs: OptionPreprocessor[], opt: InnerSetOptionOpts): void {
    if (rawOption) {
      // That set dat primitive is dangerous if user reuse the data when setOption again.
      each(normalizeToArray((rawOption as ECUnitOption).series), function (series: SeriesOption) {
        series && series.data && isTypedArray(series.data) && setAsPrimitive(series.data);
      } as any);
      each(normalizeToArray((rawOption as ECUnitOption).dataset), function (dataset: DatasetOption) {
        dataset && dataset.source && isTypedArray(dataset.source) && setAsPrimitive(dataset.source);
      } as any);
    }

    rawOption = clone(rawOption);

    const optionBackup = this._optionBackup;
    const newParsedOption = parseRawOption(
      rawOption, optionPreprocessorFuncs, !optionBackup
    );
    this._newBaseOption = newParsedOption.baseOption;

    if (optionBackup) {
      if (newParsedOption.timelineOptions.length) {
        optionBackup.timelineOptions = newParsedOption.timelineOptions;
      }
      if (newParsedOption.mediaList.length) {
        optionBackup.mediaList = newParsedOption.mediaList;
      }
      if (newParsedOption.mediaDefault) {
        optionBackup.mediaDefault = newParsedOption.mediaDefault;
      }
    } else {
      this._optionBackup = newParsedOption;
    }
  }

  mountOption(isRecreate: boolean): ECUnitOption {
    const optionBackup = this._optionBackup;

    this._timelineOptions = optionBackup.timelineOptions;
    this._mediaList = optionBackup.mediaList;
    this._mediaDefault = optionBackup.mediaDefault;
    this._currentMediaIndices = [];

    return clone(isRecreate
      // this._optionBackup.baseOption, which is created at the first `setOption`
      // called, and is merged into every new option by inner method `mergeToBackupOption`
      // each time `setOption` called, can be only used in `isRecreate`, because
      // its reliability is under suspicion. In other cases option merge is
      // performed by `model.mergeOption`.
      ? optionBackup.baseOption : this._newBaseOption
    );
  }

  getTimelineOption(ecModel: GlobalModel): ECUnitOption {
    let option;
    const timelineOptions = this._timelineOptions;

    if (timelineOptions.length) {
      // getTimelineOption can only be called after ecModel inited,
      // so we can get currentIndex from timelineModel.
      const timelineModel = ecModel.getComponent('timeline');
      if (timelineModel) {
        option = clone(
          // FIXME:TS as TimelineModel or quivlant interface
          timelineOptions[(timelineModel as any).getCurrentIndex()]
        );
      }
    }

    return option as ECUnitOption;
  }

  getMediaOption(ecModel: GlobalModel): ECUnitOption[] {
    const ecWidth = this._api.getWidth();
    const ecHeight = this._api.getHeight();
    const mediaList = this._mediaList;
    const mediaDefault = this._mediaDefault;
    let indices = [];
    let result: ECUnitOption[] = [];

    // No media defined.
    if (!mediaList.length && !mediaDefault) {
      return result;
    }

    // Multi media may be applied, the latter defined media has higher priority.
    for (let i = 0, len = mediaList.length; i < len; i++) {
      if (applyMediaQuery(mediaList[i].query!, ecWidth, ecHeight)) {
        indices.push(i);
      }
    }

    // FIXME
    // Whether mediaDefault should force users to provide? Otherwise
    // the change by media query can not be recorvered.
    if (!indices.length && mediaDefault) {
      indices = [-1];
    }

    if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
      result = map(indices, function (index) {
        return clone(
          index === -1 ? mediaDefault.option : mediaList[index].option
        );
      });
    }
    // Otherwise return nothing.

    this._currentMediaIndices = indices;

    return result;
  }
}

function parseRawOption(
  // `rawOption` May be modified
  rawOption: ECBasicOption,
  optionPreprocessorFuncs: OptionPreprocessor[],
  isNew: boolean
): ParsedRawOption {
  const mediaList: MediaUnit[] = [];
  let mediaDefault: MediaUnit;
  let baseOption: ECUnitOption;

  const declaredBaseOption = rawOption.baseOption;
  // Compatible with ec2, [RAW_OPTION_PATTERNS] above.
  const timelineOnRoot = rawOption.timeline;
  const timelineOptionsOnRoot = rawOption.options;
  const mediaOnRoot = rawOption.media;
  const hasMedia = !!rawOption.media;
  const hasTimeline = !!(
    timelineOptionsOnRoot || timelineOnRoot || (declaredBaseOption && declaredBaseOption.timeline)
  );

  if (declaredBaseOption) {
    baseOption = declaredBaseOption;
    // For merge option.
    if (!baseOption.timeline) {
      baseOption.timeline = timelineOnRoot;
    }
  }
  // For convenience, enable to use the root option as the `baseOption`:
  // `{ ...normalOptionProps, media: [{ ... }, { ... }] }`
  else {
    if (hasTimeline || hasMedia) {
      rawOption.options = rawOption.media = null as any;
    }
    baseOption = rawOption;
  }

  if (hasMedia) {
    if (isArray(mediaOnRoot)) {
      each(mediaOnRoot, function (singleMedia) {
        if (__DEV__) {
          // Real case of wrong config.
          if (singleMedia
            && !singleMedia.option
            && isObject(singleMedia.query)
            && isObject((singleMedia.query as any).option)
          ) {
            error('Illegal media option. Must be like { media: [ { query: {}, option: {} } ] }');
          }
        }
        if (singleMedia && singleMedia.option) {
          if (singleMedia.query) {
            mediaList.push(singleMedia);
          }
          else if (!mediaDefault) {
            // Use the first media default.
            mediaDefault = singleMedia;
          }
        }
      });
    }
    else {
      if (__DEV__) {
        // Real case of wrong config.
        error('Illegal media option. Must be an array. Like { media: [ {...}, {...} ] }');
      }
    }
  }

  doPreprocess(baseOption);
  each(timelineOptionsOnRoot!, option => doPreprocess(option));
  each(mediaList, media => doPreprocess(media.option));

  function doPreprocess(option: ECUnitOption) {
    each(optionPreprocessorFuncs, function (preProcess) {
      preProcess(option, isNew);
    });
  }

  return {
    baseOption: baseOption,
    timelineOptions: timelineOptionsOnRoot || [],
    mediaDefault: mediaDefault!,
    mediaList: mediaList
  };
}

function applyMediaQuery(query: MediaQuery, ecWidth: number, ecHeight: number): boolean {
  const realMap = {
    width: ecWidth,
    height: ecHeight,
    aspectratio: ecWidth / ecHeight // lowser case for convenientce.
  };

  let applicatable = true;

  each(query, function (value: number, attr: string) {
    const matched = attr.match(QUERY_REG);

    if (!matched || !matched[1] || !matched[2]) {
      return;
    }

    const operator = matched[1];
    const realAttr = matched[2].toLowerCase();

    if (!compare(realMap[realAttr as keyof typeof realMap], value, operator)) {
      applicatable = false;
    }
  } as any);

  return applicatable;
}

function compare(real: number, expect: number, operator: string): boolean {
  if (operator === 'min') {
    return real >= expect;
  }
  else if (operator === 'max') {
    return real <= expect;
  }
  else { // Equals
    return real === expect;
  }
}

function indicesEquals(indices1: number[], indices2: number[]): boolean {
  // indices is always order by asc and has only finite number.
  return indices1.join(',') === indices2.join(',');
}

export default OptionManager;