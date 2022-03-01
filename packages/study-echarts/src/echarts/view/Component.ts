import Group from 'zrender/src/graphic/Group';
import * as componentUtil from '../util/component';
import * as clazzUtil from '../util/clazz';
import ComponentModel from '../model/Component';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../core/ExtensionAPI';
import { Payload, ViewRootGroup, ECActionEvent, EventQueryItem, ECElementEvent } from '../util/types';
import Element from 'zrender/src/Element';
import SeriesModel from '../model/Series';

interface ComponentView {
  updateTransform?(
    model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload
  ): void | {update: true};

  filterForExposedEvent(
    eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECActionEvent | ECElementEvent
  ): boolean;

  findHighDownDispatchers?(
    name: string
  ): Element[];

  findHighDownDispatchers?(
    name: string
  ): Element[];

  focusBlurEnabled?: boolean;
}
class ComponentView {
  readonly group: ViewRootGroup;

  readonly uid: string;

  __model: ComponentModel;
  __alive: boolean;
  __id: string;

  constructor() {
    this.group = new Group();
    this.uid = componentUtil.getUID('viewComponent');
  }

  init(ecModel: GlobalModel, api: ExtensionAPI): void {}

  render(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {}

  dispose(ecModel: GlobalModel, api: ExtensionAPI): void {}

  updateView(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    // Do nothing;
  }

  updateLayout(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    // Do nothing;
  }

  updateVisual(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void {
    // Do nothing;
  }

  blurSeries(seriesModels: SeriesModel[], ecModel: GlobalModel): void {
    // Do nothing;
  }

  eachRendered(cb: (el: Element) => boolean | void) {
    const group = this.group;
    if (group) {
        group.traverse(cb);
    }
  }

  static registerClass: clazzUtil.ClassManager['registerClass'];
}

export type ComponentViewConstructor = typeof ComponentView
    & clazzUtil.ExtendableConstructor
    & clazzUtil.ClassManager;

clazzUtil.enableClassExtend(ComponentView as ComponentViewConstructor);
clazzUtil.enableClassManagement(ComponentView as ComponentViewConstructor);

export default ComponentView;