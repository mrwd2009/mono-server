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