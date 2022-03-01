import * as zrUtil from 'zrender/src/core/util';
import { EChartsType } from './echarts';

import type { CoordinateSystemMaster } from '../coord/CoordinateSystem';
import type Element from 'zrender/src/Element';
import type ComponentModel from '../model/Component';
import type ComponentView from '../view/Component';
import type ChartView from '../view/Chart';
import type SeriesModel from '../model/Series';
import type GlobalModel from '../model/Global';

const availableMethods: (keyof EChartsType)[] = [
  'getDom',
  'getZr',
  'getWidth',
  'getHeight',
  'getDevicePixelRatio',
  'dispatchAction',
  'isSSR',
  'isDisposed',
  'on',
  'off',
  'getDataURL',
  'getConnectedDataURL',
  'getOption',
  'getId',
  'updateLabelLayout',
];

interface ExtensionAPI extends Pick<EChartsType, (typeof availableMethods)[number]>{}
abstract class ExtensionAPI {
  constructor(ecInstance: EChartsType) {
    zrUtil.each(availableMethods, function(methodName: string) {
      (this as any)[methodName] = zrUtil.bind((ecInstance as any)[methodName], ecInstance);
    }, this);
  }

  abstract getCoordinateSystems(): CoordinateSystemMaster[];
  abstract getComponentByElement(el: Element): ComponentModel;
  abstract enterEmphasis(el: Element, highlightDigit?: number): void;
  abstract leaveEmphasis(el: Element, highlightDigit?: number): void;
  abstract enterSelect(el: Element): void;
  abstract leaveSelect(el: Element): void;
  abstract enterBlur(el: Element): void;
  abstract leaveBlur(el: Element): void;
  abstract getViewOfComponentModel(componentModel: ComponentModel): ComponentView;
  abstract getViewOfSeriesModel(seriesModel: SeriesModel): ChartView;
  abstract getModel(): GlobalModel;
}

export default ExtensionAPI;