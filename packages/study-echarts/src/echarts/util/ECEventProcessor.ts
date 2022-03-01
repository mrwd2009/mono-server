import { EventProcessor, EventQuery } from 'zrender/src/core/Eventful';
import { ECActionEvent, NormalizedEventQuery, EventQueryItem, ECElementEvent } from './types';
import ComponentModel from '../model/Component';
import ComponentView from '../view/Component';
import ChartView from '../view/Chart';
import * as zrUtil from 'zrender/src/core/util';
import { parseClassType } from './clazz';
import Element from 'zrender/src/Element';


export class ECEventProcessor implements EventProcessor {
  eventInfo?: {
    targetEl: Element;
    packedEvent: ECActionEvent | ECElementEvent;
    model: ComponentModel;
    view: ComponentView | ChartView;
  };

  normalizeQuery(query: EventQuery): NormalizedEventQuery {
    const cptQuery: EventQueryItem = {};
    const dataQuery: EventQueryItem = {};
    const otherQuery: EventQueryItem = {};

    if (zrUtil.isString(query)) {
      const condCptType = parseClassType(query);
      // `.main` and `.sub` may be ''.
      cptQuery.mainType = condCptType.main || null;
      cptQuery.subType = condCptType.sub || null;
    } else {
      // `xxxIndex`, `xxxName`, `xxxId`, `name`, `dataIndex`, `dataType` is reserved,
      // can not be used in `compomentModel.filterForExposedEvent`.
      const suffixes = ['Index', 'Name', 'Id'];
      const dataKeys = { name: 1, dataIndex: 1, dataType: 1 };
      zrUtil.each(query, function (val, key) {
        let reserved = false;
        for (let i = 0; i < suffixes.length; i++) {
          const propSuffix = suffixes[i];
          const suffixPos = key.lastIndexOf(propSuffix);
          if (suffixPos > 0 && suffixPos === key.length - propSuffix.length) {
            const mainType = key.slice(0, suffixPos);
            // Consider `dataIndex`.
            if (mainType !== 'data') {
              cptQuery.mainType = mainType;
              cptQuery[propSuffix.toLowerCase()] = val;
              reserved = true;
            }
          }
        }
        if (dataKeys.hasOwnProperty(key)) {
          dataQuery[key] = val;
          reserved = true;
        }
        if (!reserved) {
          otherQuery[key] = val;
        }
      });
    }

    return {
      cptQuery: cptQuery,
      dataQuery: dataQuery,
      otherQuery: otherQuery
    };
  }

  filter(eventType: string | number, query: NormalizedEventQuery): boolean {
    const eventInfo = this.eventInfo;

    if (!eventInfo) {
      return true;
    }

    const targetEl = eventInfo.targetEl;
    const packedEvent = eventInfo.packedEvent;
    const model = eventInfo.model;
    const view = eventInfo.view;

    // For event like 'globalout'.
    if (!model || !view) {
      return true;
    }

    function check(
      query: EventQueryItem, host: any, prop: string, propOnHost?: string
    ): boolean {
      return query[prop] == null || host[propOnHost || prop] === query[prop];
    }

    const cptQuery = query.cptQuery;
    const dataQuery = query.dataQuery;
    return check(cptQuery, model, 'mainType')
      && check(cptQuery, model, 'subType')
      && check(cptQuery, model, 'index', 'componentIndex')
      && check(cptQuery, model, 'name')
      && check(cptQuery, model, 'id')
      && check(dataQuery, packedEvent, 'name')
      && check(dataQuery, packedEvent, 'dataIndex')
      && check(dataQuery, packedEvent, 'dataType')
      && (!view.filterForExposedEvent || view.filterForExposedEvent(
        eventType as string, query.otherQuery, targetEl, packedEvent
      ));
  }

  afterTrigger() {
    this.eventInfo = undefined;
  }
}