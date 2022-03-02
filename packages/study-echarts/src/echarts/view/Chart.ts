import { each } from 'zrender/src/core/util';
import Group from 'zrender/src/graphic/Group';
import * as componentUtil from '../util/component';
import * as clazzUtil from '../util/clazz';
import * as modelUtil from '../util/model';
import { enterEmphasis, leaveEmphasis, getHighlightDigit, isHighDownDispatcher } from '../util/states';
import { createTask, TaskResetCallbackReturn } from '../core/task';
import createRenderPlanner from '../chart/helper/createRenderPlanner';
import SeriesModel from '../model/Series';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../core/ExtensionAPI';
import Element from 'zrender/src/Element';
import {
  Payload,
  ViewRootGroup,
  ECActionEvent,
  EventQueryItem,
  StageHandlerPlanReturn,
  DisplayState,
  StageHandlerProgressParams,
  ECElementEvent,
} from '../util/types';
import {
  SeriesTaskContext, SeriesTask
} from '../core/Scheduler';
import SeriesData from '../data/SeriesData';
import { traverseElements } from '../util/graphic';
import { error } from '../util/log';

const inner = modelUtil.makeInner<{
  updateMethod: keyof ChartView,
}, Payload>();
const renderPlanner = createRenderPlanner();

interface ChartView {
  incrementalPrepareRender(
    seriesModel: SeriesModel,
    ecModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload,
  ): void;

  incrementalRender(
    params: StageHandlerProgressParams,
    seriesModel: SeriesModel,
    ecModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void;

  updateTransform(
    seriesModel: SeriesModel,
    ecModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void | {update: true}; 

  containPoint(
    point: number[], seriesModel: SeriesModel
  ): boolean;

  filterForExposedEvent(
    eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECActionEvent | ECElementEvent
  ): boolean;
}
class ChartView {
  type: string;

  readonly group: ViewRootGroup;

  readonly uid: string;

  readonly renderTask: SeriesTask;

  ignoreLabelLineUpdate?: boolean;

  __alive?: boolean;
  __model?: SeriesModel;
  __id?: string;

  static protoInitialize = (function () {
    const proto = ChartView.prototype;
    proto.type = 'chart';
  })();

  constructor() {
    this.type = 'chart';
    this.group = new Group();
    this.uid = componentUtil.getUID('viewChart');

    this.renderTask = createTask<SeriesTaskContext>({
      plan: renderTaskPlan,
      reset: renderTaskReset,
    });

    this.renderTask.context = { view: this } as SeriesTaskContext;
  }

  init(ecModel: GlobalModel, api: ExtensionAPI): void {}

  render(seriesModel: SeriesModel, ecMdoel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    if (__DEV__) {
      throw new Error('render method must been implemented');
    }
  }

  highlight(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    const data = seriesModel.getData(payload && payload.dataType);
    if (!data) {
      if (__DEV__) {
        error(`Unknown dataType ${payload.dataType}`);
      }
      return;
    }
    toggleHighlight(data, payload, 'emphasis');
  }

  downplay(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    const data = seriesModel.getData(payload && payload.dataType);
    if (!data) {
      if (__DEV__) {
        error(`Unknown dataType ${payload.dataType}`);
      }
      return;
    }
    toggleHighlight(data, payload, 'normal');
  }

  remove(ecModel: GlobalModel, api: ExtensionAPI): void {
    this.group.removeAll();
  }

  dispose(ecModel: GlobalModel, api: ExtensionAPI): void {}

  updateView(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    this.render(seriesModel, ecModel, api, payload);
  }

  updateLayout(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    this.render(seriesModel, ecModel, api, payload);
  }

  updateVisual(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    this.render(seriesModel, ecModel, api, payload);
  }

  eachRendered(cb: (el: Element) => boolean | void) {
    traverseElements(this.group, cb);
  }

  static markUpdateMethod(payload: Payload, methodName: keyof ChartView): void {
    inner(payload).updateMethod = methodName;
  }

  static registerClass: clazzUtil.ClassManager['registerClass'];
}

function elSetState(el: Element, state: DisplayState, highlightDigit: number) {
  if (el && isHighDownDispatcher(el)) {
    (state === 'emphasis' ? enterEmphasis : leaveEmphasis)(el, highlightDigit);
  }
}

function toggleHighlight(data: SeriesData, payload: Payload, state: DisplayState) {
  const dataIndex = modelUtil.queryDataIndex(data, payload);

  const highlightDigit = (payload && payload.highlightKey != null)
    ? getHighlightDigit(payload.highlightKey)
    : null;

  if (dataIndex != null) {
    each(modelUtil.normalizeToArray(dataIndex), function (dataIdx) {
      elSetState(data.getItemGraphicEl(dataIdx), state, highlightDigit);
    });
  }
  else {
    data.eachItemGraphicEl(function (el) {
      elSetState(el, state, highlightDigit);
    });
  }
}

export type ChartViewConstructor = typeof ChartView
    & clazzUtil.ExtendableConstructor
    & clazzUtil.ClassManager;

clazzUtil.enableClassExtend(ChartView as ChartViewConstructor, ['dispose']);
clazzUtil.enableClassManagement(ChartView as ChartViewConstructor);

function renderTaskPlan(context: SeriesTaskContext): StageHandlerPlanReturn {
  return renderPlanner(context.model);
}

function renderTaskReset(context: SeriesTaskContext): TaskResetCallbackReturn<SeriesTaskContext> {
  const seriesModel = context.model;
  const ecModel = context.ecModel;
  const api = context.api;
  const payload = context.payload;
  // FIXME: remove updateView updateVisual
  const progressiveRender = seriesModel.pipelineContext.progressiveRender;
  const view = context.view;

  const updateMethod = payload && inner(payload).updateMethod;
  const methodName: keyof ChartView = progressiveRender
    ? 'incrementalPrepareRender'
    : (updateMethod && view[updateMethod])
      ? updateMethod
      // `appendData` is also supported when data amount
      // is less than progressive threshold.
      : 'render';

  if (methodName !== 'render') {
    (view[methodName] as any)(seriesModel, ecModel, api, payload);
  }

  return progressMethodMap[methodName];
}

const progressMethodMap: { [method: string]: TaskResetCallbackReturn<SeriesTaskContext> } = {
  incrementalPrepareRender: {
    progress: function (params: StageHandlerProgressParams, context: SeriesTaskContext): void {
      context.view.incrementalRender(
        params, context.model, context.ecModel, context.api, context.payload
      );
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: true,
    progress: function (params: StageHandlerProgressParams, context: SeriesTaskContext): void {
      context.view.render(
        context.model, context.ecModel, context.api, context.payload
      );
    }
  }
};

export default ChartView;