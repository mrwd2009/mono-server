import Eventful, { EventCallback } from 'zrender/src/core/Eventful';
import SeriesModel from '../model/Series';
import GlobalModel from '../model/Global';
import { EChartsType } from './echarts';
import ExtensionAPI from './ExtensionAPI';
import { ModelFinderIdQuery, ModelFinderIndexQuery } from '../util/model';
import { DimensionLoose } from '../util/types';

export interface UpdateLifecycleTransitionSeriesFinder {
  seriesIndex?: ModelFinderIndexQuery;
  seriesId?: ModelFinderIdQuery;
  dimension: DimensionLoose;
}

export interface UpdateLifecycleTransitionItem {
  from?: UpdateLifecycleTransitionSeriesFinder | UpdateLifecycleTransitionSeriesFinder[];
  to: UpdateLifecycleTransitionSeriesFinder | UpdateLifecycleTransitionSeriesFinder[];
};

export type UpdateLifecycleTransitionOpt = UpdateLifecycleTransitionItem | UpdateLifecycleTransitionItem[];

export interface UpdateLifecycleParams {
  updatedSeries?: SeriesModel[];

  optionChanged?: boolean;

  seriesTransition?: UpdateLifecycleTransitionOpt;
}
interface LifecycleEvents {
  'afterinit': [EChartsType];
  'series:beforeupdate': [GlobalModel, ExtensionAPI, UpdateLifecycleParams];
  'series:layoutlabels': [GlobalModel, ExtensionAPI, UpdateLifecycleParams];
  'series:transition': [GlobalModel, ExtensionAPI, UpdateLifecycleParams];
  'series:afterupdate': [GlobalModel, ExtensionAPI, UpdateLifecycleParams];
  'afterupdate': [GlobalModel, ExtensionAPI];
}

const lifecyle = new Eventful<{
  [key in keyof LifecycleEvents]: EventCallback<LifecycleEvents[key]>
}>();

export default lifecyle;

export type {
  LifecycleEvents,
};