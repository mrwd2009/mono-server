import * as zrUtil from 'zrender/src/core/util';
import Model from './Model';
import * as componentUtil from '../util/component';
import {
  enableClassManagement,
  parseClassType,
  isExtendedClass,
  ExtendableConstructor,
  ClassManager,
  mountExtend
} from '../util/clazz';
import {
  makeInner,
  ModelFinderIndexQuery,
  queryReferringComponents,
  ModelFinderIdQuery,
  QueryReferringOpt,
} from '../util/model';
import * as layout from '../util/layout';
import GlobalModel from './Global';
import {
  ComponentOption,
  ComponentMainType,
  ComponentSubType,
  ComponentFullType,
  ComponentLayoutMode,
  BoxLayoutOptionMixin,
} from '../util/types';

const inner = makeInner<{
  defaultOption: ComponentOption,
}, ComponentModel>();

class ComponentModel<Opt extends ComponentOption = ComponentOption> extends Model<Opt> {
  type: ComponentFullType;

  id: string;

  name: string;

  mainType: ComponentMainType;

  subType: ComponentSubType;

  componentIndex: number;

  protected defaultOption: ComponentOption;

  static dependencies: string[];

  readonly uid: string;

  static layoutMode: ComponentLayoutMode | ComponentLayoutMode['type'];

  preventAutoZ?: boolean;

  __viewId?: string;
  __requireNewView?: boolean;

  static protoInitialize = (function () {
    const proto = ComponentModel.prototype;
    proto.type = 'component';
    proto.id = '';
    proto.name = '';
    proto.mainType = '';
    proto.subType = '';
    proto.componentIndex = 0;
  })();

  constructor(option: Opt, parentModel: Model, ecModel: GlobalModel) {
    super(option, parentModel, ecModel);
    this.uid = componentUtil.getUID('ec_cpt_model');
    this.type = 'component';
    this.id = '';
    this.name = '';
    this.mainType = '';
    this.subType = '';
    this.componentIndex = 0;
  }

  init(option: Opt, parentModel: Model, ecModel: GlobalModel): void {
    this.mergeDefaultAndTheme(option, ecModel);
  }

  mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void {
    const layoutMode = layout.fetchLayoutMode(this);
    const inputPositionParams = layoutMode
      ? layout.getLayoutParams(option as BoxLayoutOptionMixin) : {};

    const themeModel = ecModel.getTheme();
    zrUtil.merge(option, themeModel.get(this.mainType));
    zrUtil.merge(option, this.getDefaultOption());

    if (layoutMode) {
      layout.mergeLayoutParam(option as BoxLayoutOptionMixin, inputPositionParams, layoutMode);
    }
  }

  mergeOption(option: Opt, ecModel: GlobalModel): void {
    zrUtil.merge(this.option, option, true);

    const layoutMode = layout.fetchLayoutMode(this);
    if (layoutMode) {
      layout.mergeLayoutParam(
        this.option as BoxLayoutOptionMixin,
        option as BoxLayoutOptionMixin,
        layoutMode
      );
    }
  }

  optionUpdated(newCptOption: Opt, isInit: boolean): void {}

  getDefaultOption(): Opt {
    const ctor = this.constructor;

    // If using class declaration, it is different to travel super class
    // in legacy env and auto merge defaultOption. So if using class
    // declaration, defaultOption should be merged manually.
    if (!isExtendedClass(ctor)) {
      // When using ts class, defaultOption must be declared as static.
      return (ctor as any).defaultOption;
    }

    // FIXME: remove this approach?
    const fields = inner(this);
    if (!fields.defaultOption) {
      const optList = [];
      let clz = ctor as ExtendableConstructor;
      while (clz) {
        const opt = clz.prototype.defaultOption;
        opt && optList.push(opt);
        clz = clz.superClass;
      }

      let defaultOption = {};
      for (let i = optList.length - 1; i >= 0; i--) {
        defaultOption = zrUtil.merge(defaultOption, optList[i], true);
      }
      fields.defaultOption = defaultOption;
    }
    return fields.defaultOption as Opt;
  }

  getReferringComponents(mainType: ComponentMainType, opt: QueryReferringOpt): {
    // Always be array rather than null/undefined, which is convenient to use.
    models: ComponentModel[];
    // Whether target compoent specified
    specified: boolean;
  } {
    const indexKey = (mainType + 'Index') as keyof Opt;
    const idKey = (mainType + 'Id') as keyof Opt;

    return queryReferringComponents(
      this.ecModel,
      mainType,
      {
        index: this.get(indexKey, true) as unknown as ModelFinderIndexQuery,
        id: this.get(idKey, true) as unknown as ModelFinderIdQuery
      },
      opt
    );
  }

  getBoxLayoutParams() {
    // Consider itself having box layout configs.
    const boxLayoutModel = this as Model<ComponentOption & BoxLayoutOptionMixin>;
    return {
      left: boxLayoutModel.get('left'),
      top: boxLayoutModel.get('top'),
      right: boxLayoutModel.get('right'),
      bottom: boxLayoutModel.get('bottom'),
      width: boxLayoutModel.get('width'),
      height: boxLayoutModel.get('height')
    };
  }

  getZLevelKey(): string {
    return '';
  }

  setZLevel(zlevel: number) {
    this.option!.zlevel = zlevel;
  }

  static registerClass: ClassManager['registerClass'];

  static hasClass: ClassManager['hasClass'];

  static registerSubTypeDefaulter: componentUtil.SubTypeDefaulterManager['registerSubTypeDefaulter'];
}

export type ComponentModelConstructor = typeof ComponentModel &
  ClassManager &
  componentUtil.SubTypeDefaulterManager &
  ExtendableConstructor &
  componentUtil.TopologicalTravelable<object>;

mountExtend(ComponentModel, Model);
enableClassManagement(ComponentModel as ComponentModelConstructor);
componentUtil.enableSubTypeDefaulter(ComponentModel as ComponentModelConstructor);
componentUtil.enableTopologicalTravel(ComponentModel as ComponentModelConstructor, getDependencies);

function getDependencies(componentType: string): string[] {
  let deps: string[] = [];
  zrUtil.each((ComponentModel as ComponentModelConstructor).getClassesByMainType(componentType), function (clz) {
    deps = deps.concat((clz as any).dependencies || (clz as any).prototype.dependencies || []);
  });

  // Ensure main type.
  deps = zrUtil.map(deps, function (type) {
    return parseClassType(type).main;
  });

  // Hack dataset for convenience.
  if (componentType !== 'dataset' && zrUtil.indexOf(deps, 'dataset') <= 0) {
    deps.unshift('dataset');
  }

  return deps;
}

export default ComponentModel;