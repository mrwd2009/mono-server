import Element from 'zrender/src/Element';
import {
  DataModel,
  ECEventData,
  BlurScope,
  InnerFocus,
  SeriesDataType,
  ComponentMainType,
  ComponentItemTooltipOption,
} from './types';
import { makeInner } from './model';

export interface ECData {
  dataIndex?: number;
  dataModel?: DataModel;
  eventData?: ECEventData;
  seriesIndex?: number;
  dataType?: SeriesDataType;
  focus?: InnerFocus;
  blurScope?: BlurScope;

  componentMainType?: ComponentMainType;
  componentIndex?: number;
  componentHighDownName?: string;

  tooltipConfig?: {
    name: string;
    option: ComponentItemTooltipOption<unknown>;
  }
}

export const getECData = makeInner<ECEventData, Element>();

export const setCommonECData = (seriesIndex: number, dataType: SeriesDataType, dataIdx: number, el: Element) => {
  if (el) {
    const ecData = getECData(el);
    // Add data index and series index for indexing the data by element
    // Useful in tooltip
    ecData.dataIndex = dataIdx;
    ecData.dataType = dataType;
    ecData.seriesIndex = seriesIndex;

    // TODO: not store dataIndex on children.
    if (el.type === 'group') {
      el.traverse(function (child: Element): void {
        const childECData = getECData(child);
        childECData.seriesIndex = seriesIndex;
        childECData.dataIndex = dataIdx;
        childECData.dataType = dataType;
      });
    }
  }
};
