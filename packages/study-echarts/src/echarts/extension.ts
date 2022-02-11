import {
  registerPreprocessor,
  registerProcessor,
  registerPostInit,
  registerPostUpdate,
  registerAction,
  registerCoordinateSystem,
  registerLayout,
  registerVisual,
  registerTransform,
  registerLoading,
  registerMap,
  registerUpdateLifecyle,
  PRIORITY,
} from './core/echarts';

import ComponentView from './view/Component';
import ChartView from './view/Chart';
import ComponentModel from './model/Component';
import SeriesModel from './model/Series';
import { isFunction, indexOf, isArray, each } from 'zrender/src/core/util';
import { Constructor } from './util/clazz';
import { SubTypeDefaulter } from './util/component';
import { registerImpl } from './core/impl';
import { registerPainter } from 'zrender/src/zrender';

const extensions: (EChartsExtensionInstaller | EChartsExtension)[] = [];

const extensionRegisters = {
  registerPreprocessor,
  registerProcessor,
  registerPostInit,
  registerPostUpdate,
  registerUpdateLifecyle,
  registerAction,
  registerCoordinateSystem,
  registerLayout,
  registerVisual,
  registerTransform,
  registerLoading,
  registerMap,
  registerImpl,

  PRIORITY,

  ComponentModel,
  ComponentView,
  SeriesModel,
  ChartView,

  registerComponentModel(ComponentModelClass: Constructor) {
    ComponentModel.registerClass(ComponentModelClass);
  },
  registerComponentView(ComponentViewClass: Constructor) {
    ComponentView.registerClass(ComponentViewClass);
  },
  registerSeriesModel(SeriesModelClass: Constructor) {
    SeriesModel.registerClass(SeriesModelClass);
  },
  registerChartView(ChartViewClass: typeof ChartView) {
    ChartView.registerClass(ChartViewClass);
  },
  registerSubTypeDefaulter(componentType: string, defaulter: SubTypeDefaulter) {
    ComponentModel.registerSubTypeDefaulter(componentType, defaulter);
  },
  registerPainter(painterType: string, PainterCtor: Parameters<typeof registerPainter>[1]) {
    registerPainter(painterType, PainterCtor);
  },
};

export type EChartsExtensionInstallRegisters = typeof extensionRegisters;

export type EChartsExtensionInstaller = (ec: EChartsExtensionInstallRegisters) => void;
export interface EChartsExtension {
  install: EChartsExtensionInstaller;
}

export function use(
  ext: EChartsExtensionInstaller | EChartsExtension | (EChartsExtensionInstaller | EChartsExtension)[]
) {
  if (isArray(ext)) {
    each(ext, (singleExt) => {
      use(singleExt);
    });
    return;
  }

  if (indexOf(extensions, ext) >= 0) {
    return;
  }

  extensions.push(ext);

  if (isFunction(ext)) {
    ext = {
      install: ext,
    };
  }

  ext.install(extensionRegisters);
}

export type EChartsExtensionInstallerSimple = (registers: any) => void;
type SimpleEChartsExtensionType = EChartsExtensionInstallerSimple | { install: EChartsExtensionInstallerSimple };
export declare function useSimple(ext: SimpleEChartsExtensionType | (SimpleEChartsExtensionType)[]): void;