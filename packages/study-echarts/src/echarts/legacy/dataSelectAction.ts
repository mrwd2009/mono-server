import { Payload, SelectChangedPayload } from '../util/types';
import SeriesModel from '../model/Series';
import { extend, each, isArray, isString } from 'zrender/src/core/util';
import GlobalModel from '../model/Global';
import { deprecateReplaceLog, deprecateLog } from '../util/log';
import Eventful from 'zrender/src/core/Eventful';
import type { EChartsType, registerAction } from '../core/echarts';
import { queryDataIndex } from '../util/model';
import ExtensionAPI from '../core/ExtensionAPI';

// Legacy data selection action.
// Inlucdes: pieSelect, pieUnSelect, pieToggleSelect, mapSelect, mapUnSelect, mapToggleSelect
export function createLegacyDataSelectAction(seriesType: string, ecRegisterAction: typeof registerAction) {

  function getSeriesIndices(ecModel: GlobalModel, payload: Payload) {
    const seriesIndices: number[] = [];
    ecModel.eachComponent({
      mainType: 'series', subType: seriesType, query: payload
    }, function (seriesModel: SeriesModel) {
      seriesIndices.push(seriesModel.seriesIndex);
    });
    return seriesIndices;
  }

  each([
    [seriesType + 'ToggleSelect', 'toggleSelect'],
    [seriesType + 'Select', 'select'],
    [seriesType + 'UnSelect', 'unselect']
  ], function (eventsMap) {
    ecRegisterAction(eventsMap[0], function (payload, ecModel, api) {
      payload = extend({}, payload);

      if (__DEV__) {
        deprecateReplaceLog(payload.type, eventsMap[1]);
      }

      api.dispatchAction(extend(payload, {
        type: eventsMap[1],
        seriesIndex: getSeriesIndices(ecModel, payload)
      }));
    });
  });
}

function handleSeriesLegacySelectEvents(
  type: 'map' | 'pie',
  eventPostfix: 'selectchanged' | 'selected' | 'unselected',
  ecIns: EChartsType,
  ecModel: GlobalModel,
  payload: SelectChangedPayload
) {
  const legacyEventName = type + eventPostfix;
  if (!ecIns.isSilent(legacyEventName)) {
    if (__DEV__) {
      deprecateLog(`event ${legacyEventName} is deprecated.`);
    }
    ecModel.eachComponent({
      mainType: 'series', subType: 'pie'
    }, function (seriesModel: SeriesModel) {
      const seriesIndex = seriesModel.seriesIndex;
      const selectedMap = seriesModel.option.selectedMap;
      const selected = payload.selected;
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].seriesIndex === seriesIndex) {
          const data = seriesModel.getData();
          const dataIndex = queryDataIndex(data, payload.fromActionPayload);
          ecIns.trigger(legacyEventName, {
            type: legacyEventName,
            seriesId: seriesModel.id,
            name: isArray(dataIndex) ? data.getName(dataIndex[0]) : data.getName(dataIndex),
            selected: isString(selectedMap) ? selectedMap : extend({}, selectedMap)
          });
        }
      }
    });
  }
}

export function handleLegacySelectEvents(messageCenter: Eventful, ecIns: EChartsType, api: ExtensionAPI) {
  messageCenter.on('selectchanged', function (params: SelectChangedPayload) {
    const ecModel = api.getModel();
    if (params.isFromClick) {
      handleSeriesLegacySelectEvents('map', 'selectchanged', ecIns, ecModel, params);
      handleSeriesLegacySelectEvents('pie', 'selectchanged', ecIns, ecModel, params);
    }
    else if (params.fromAction === 'select') {
      handleSeriesLegacySelectEvents('map', 'selected', ecIns, ecModel, params);
      handleSeriesLegacySelectEvents('pie', 'selected', ecIns, ecModel, params);
    }
    else if (params.fromAction === 'unselect') {
      handleSeriesLegacySelectEvents('map', 'unselected', ecIns, ecModel, params);
      handleSeriesLegacySelectEvents('pie', 'unselected', ecIns, ecModel, params);
    }
  });
}
