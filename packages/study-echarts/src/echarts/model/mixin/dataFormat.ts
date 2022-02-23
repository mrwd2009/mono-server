import * as zrUtil from 'zrender/src/core/util';
import { retrieveRawValue } from '../../data/helper/dataProvider';
import { formatTpl } from '../../util/format';
import {
  DataHost,
  DisplayState,
  CallbackDataParams,
  ColorString,
  ZRColor,
  OptionDataValue,
  SeriesDataType,
  ComponentMainType,
  ComponentSubType,
  DimensionLoose,
  InterpolatableValue,
} from '../../util/types';
import GlobalModel from '../Global';
import { TooltipMarkupBlockFragment } from '../../component/tooltip/tooltipMarkup';
import { error, makePrintable } from '../../util/log';

const DIMENSION_LABEL_REG = /\{@(.+?)\}/g;

export interface DataFormatMixin extends DataHost {
  ecModel: GlobalModel,
  mainType: ComponentMainType,
  subType: ComponentSubType,
  componentIndex: number;
  id: string,
  name: string,
  animatedValue: OptionDataValue[],
}

export class DataFormatMixin {
  getDataParams(
    dataIndex: number,
    dataType?: SeriesDataType
  ): CallbackDataParams {

    const data = this.getData(dataType);
    const rawValue = this.getRawValue(dataIndex, dataType);
    const rawDataIndex = data.getRawIndex(dataIndex);
    const name = data.getName(dataIndex);
    const itemOpt = data.getRawDataItem(dataIndex);
    const style = data.getItemVisual(dataIndex, 'style');
    const color = style && style[data.getItemVisual(dataIndex, 'drawType') || 'fill'] as ZRColor;
    const borderColor = style && style.stroke as ColorString;
    const mainType = this.mainType;
    const isSeries = mainType === 'series';
    const userOutput = data.userOutput && data.userOutput.get();

    return {
      componentType: mainType,
      componentSubType: this.subType,
      componentIndex: this.componentIndex,
      seriesType: isSeries ? this.subType : null,
      seriesIndex: (this as any).seriesIndex,
      seriesId: isSeries ? this.id : null,
      seriesName: isSeries ? this.name : null,
      name: name,
      dataIndex: rawDataIndex,
      data: itemOpt,
      dataType: dataType,
      value: rawValue,
      color: color,
      borderColor: borderColor,
      dimensionNames: userOutput ? userOutput.fullDimensions : null,
      encode: userOutput ? userOutput.encode : null,

      // Param name list for mapping `a`, `b`, `c`, `d`, `e`
      $vars: ['seriesName', 'name', 'value']
    };
  }

  getFormattedLabel(
    dataIndex: number,
    status?: DisplayState,
    dataType?: SeriesDataType,
    labelDimIndex?: number,
    formatter?: string | ((params: object) => string),
    extendParams?: {
      interpolatedValue: InterpolatableValue
    }
  ): string {
    status = status || 'normal';
    const data = this.getData(dataType);

    const params = this.getDataParams(dataIndex, dataType);

    if (extendParams) {
      params.value = extendParams.interpolatedValue;
    }

    if (labelDimIndex != null && zrUtil.isArray(params.value)) {
      params.value = params.value[labelDimIndex];
    }

    if (!formatter) {
      const itemModel = data.getItemModel(dataIndex);
      // @ts-ignore
      formatter = itemModel.get(status === 'normal'
        ? ['label', 'formatter']
        : [status, 'label', 'formatter']
      );
    }

    if (zrUtil.isFunction(formatter)) {
      params.status = status;
      params.dimensionIndex = labelDimIndex;
      return formatter(params);
    }
    else if (zrUtil.isString(formatter)) {
      const str = formatTpl(formatter, params);

      // Support 'aaa{@[3]}bbb{@product}ccc'.
      // Do not support '}' in dim name util have to.
      return str.replace(DIMENSION_LABEL_REG, function (origin, dimStr: string) {
        const len = dimStr.length;

        let dimLoose: DimensionLoose = dimStr;
        if (dimLoose.charAt(0) === '[' && dimLoose.charAt(len - 1) === ']') {
          dimLoose = +dimLoose.slice(1, len - 1); // Also support: '[]' => 0
          if (__DEV__) {
            if (isNaN(dimLoose)) {
              error(`Invalide label formatter: @${dimStr}, only support @[0], @[1], @[2], ...`);
            }
          }
        }

        let val = retrieveRawValue(data, dataIndex, dimLoose) as OptionDataValue;

        if (extendParams && zrUtil.isArray(extendParams.interpolatedValue)) {
          const dimIndex = data.getDimensionIndex(dimLoose);
          if (dimIndex >= 0) {
            val = extendParams.interpolatedValue[dimIndex];
          }
        }

        return val != null ? val + '' : '';
      });
    }
  }

  getRawValue(
    idx: number,
    dataType?: SeriesDataType
  ): unknown {
    return retrieveRawValue(this.getData(dataType), idx);
  }

  formatTooltip(
    dataIndex: number,
    multipleSeries?: boolean,
    dataType?: string
  ): TooltipFormatResult {
    // Empty function
    return;
  }
}

type TooltipFormatResult = string | TooltipMarkupBlockFragment;

export function normalizeTooltipFormatResult(result: TooltipFormatResult): {
  // If `markupFragment` exists, `markupText` should be ignored.
  frag: TooltipMarkupBlockFragment;
  // Can be `null`/`undefined`, means no tooltip.
  text: string;
  // Merged with `markersExisting`.
  // markers: Dictionary<ColorString>;
} {
  let markupText;
  // let markers: Dictionary<ColorString>;
  let markupFragment: TooltipMarkupBlockFragment;
  if (zrUtil.isObject(result)) {
    if ((result as TooltipMarkupBlockFragment).type) {
      markupFragment = result as TooltipMarkupBlockFragment;
    }
    else {
      if (__DEV__) {
        console.warn('The return type of `formatTooltip` is not supported: ' + makePrintable(result));
      }
    }
    // else {
    //     markupText = (result as TooltipFormatResultLegacyObject).html;
    //     markers = (result as TooltipFormatResultLegacyObject).markers;
    //     if (markersExisting) {
    //         markers = zrUtil.merge(markersExisting, markers);
    //     }
    // }
  }
  else {
    markupText = result;
  }

  return {
    text: markupText,
    // markers: markers || markersExisting,
    frag: markupFragment
  };
}