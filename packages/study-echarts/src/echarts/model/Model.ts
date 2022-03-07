import env from 'zrender/src/core/env';
import {
  enableClassExtend,
  ExtendableConstructor,
  enableClassCheck,
  CheckableConstructor,
} from '../util/clazz';

import { AreaStyleMixin } from './mixin/areaStyle';
import TextStyleMixin from './mixin/textStyle';
import { LineStyleMixin } from './mixin/lineStyle';
import { ItemStyleMixin } from './mixin/itemStyle';
import GlobalModel from './Global';
import { AnimationOptionMixin, ModelOption } from '../util/types';
import { Dictionary } from 'zrender/src/core/types';
import { mixin, clone, merge } from 'zrender/src/core/util';

interface Model<Opt = ModelOption> extends LineStyleMixin, ItemStyleMixin, TextStyleMixin, AreaStyleMixin {}
class Model<Opt = ModelOption> {

  parentModel!: Model;

  ecModel!: GlobalModel;

  option!: Opt;

  constructor(option?: Opt, parentModel?: Model, ecModel?: GlobalModel) {
    this.parentModel = parentModel!;
    this.ecModel = ecModel!;
    this.option = option!;
  }

  init(option: Opt, parentModel?: Model, ecModel?: GlobalModel, ...rest: any): void {}

  mergeOption(option: Opt, ecModel?: GlobalModel): void {
    merge(this.option, option, true);
  }

  get<R extends keyof Opt>(
    path: R, ignoreParent?: boolean
  ): Opt[R];
  get<R extends keyof Opt>(
    path: readonly [R], ignoreParent?: boolean
  ): Opt[R];
  get<R extends keyof Opt, S extends keyof Opt[R]>(
    path: readonly [R, S], ignoreParent?: boolean
  ): Opt[R][S];
  get<R extends keyof Opt, S extends keyof Opt[R], T extends keyof Opt[R][S]>(
    path: readonly [R, S, T], ignoreParent?: boolean
  ): Opt[R][S][T];
  // `path` can be 'xxx.yyy.zzz', so the return value type have to be `ModelOption`
  // TODO: TYPE strict key check?
  // get(path: string | string[], ignoreParent?: boolean): ModelOption;
  get(path: string | readonly string[], ignoreParent?: boolean): ModelOption {
    if (path == null) {
      return this.option;
    }

    return this._doGet(
      this.parsePath(path),
      (!ignoreParent && this.parentModel) as any
    );
  }

  getShallow<R extends keyof Opt>(
    key: R, ignoreParent?: boolean
  ): Opt[R] {
    const option = this.option;

    let val = option == null ? option : option[key];
    if (val == null && !ignoreParent) {
      const parentModel = this.parentModel;
      if (parentModel) {
        // FIXME:TS do not know how to make it works
        val = parentModel.getShallow(key);
      }
    }
    return val as Opt[R];
  }


  getModel<R extends keyof Opt>(
    path: R, parentModel?: Model
  ): Model<Opt[R]>;
  getModel<R extends keyof Opt>(
    path: readonly [R], parentModel?: Model
  ): Model<Opt[R]>;
  getModel<R extends keyof Opt, S extends keyof Opt[R]>(
    path: readonly [R, S], parentModel?: Model
  ): Model<Opt[R][S]>;
  getModel<Ra extends keyof Opt, Rb extends keyof Opt, S extends keyof Opt[Rb]>(
    path: readonly [Ra] | readonly [Rb, S], parentModel?: Model
  ): Model<Opt[Ra]> | Model<Opt[Rb][S]>;
  getModel<R extends keyof Opt, S extends keyof Opt[R], T extends keyof Opt[R][S]>(
    path: readonly [R, S, T], parentModel?: Model
  ): Model<Opt[R][S][T]>;
  // `path` can be 'xxx.yyy.zzz', so the return value type have to be `Model<ModelOption>`
  // getModel(path: string | string[], parentModel?: Model): Model;
  // TODO 'xxx.yyy.zzz' is deprecated
  getModel(path: string | readonly string[], parentModel?: Model): Model<any> {
    const hasPath = path != null;
    const pathFinal = hasPath ? this.parsePath(path) : null;
    const obj = hasPath
      ? this._doGet(pathFinal as any)
      : this.option;

    parentModel = parentModel || (
      this.parentModel
      && this.parentModel.getModel(this.resolveParentPath(pathFinal as any) as [string])
    );

    return new Model(obj, parentModel, this.ecModel);
  }

  isEmpty(): boolean {
    return this.option == null;
  }

  restoreData(): void { }

  // Pending
  clone(): Model<Opt> {
    const Ctor = this.constructor;
    return new (Ctor as any)(clone(this.option));
  }

  parsePath(path: string | readonly string[]): readonly string[] {
    if (typeof path === 'string') {
      return path.split('.');
    }
    return path;
  }

  resolveParentPath(path: readonly string[]): string[] {
    return path as string[];
  }

  isAnimationEnabled(): boolean | undefined {
    if (!env.node && this.option) {
      if ((this.option as AnimationOptionMixin).animation != null) {
        return !!(this.option as AnimationOptionMixin).animation;
      }
      else if (this.parentModel) {
        return this.parentModel.isAnimationEnabled();
      }
    }
  }

  private _doGet(pathArr: readonly string[], parentModel?: Model<Dictionary<any>>) {
    let obj = this.option;
    if (!pathArr) {
      return obj;
    }

    for (let i = 0; i < pathArr.length; i++) {
      // Ignore empty
      if (!pathArr[i]) {
        continue;
      }
      // obj could be number/string/... (like 0)
      obj = (obj && typeof obj === 'object')
        ? (obj as ModelOption)[pathArr[i] as keyof ModelOption] : null;
      if (obj == null) {
        break;
      }
    }
    if (obj == null && parentModel) {
      obj = parentModel._doGet(
        this.resolveParentPath(pathArr) as [string],
        parentModel.parentModel
      ) as any;
    }

    return obj;
  }
}

type ModelConstructor = typeof Model & ExtendableConstructor & CheckableConstructor;

enableClassExtend(Model as ModelConstructor);
enableClassCheck(Model as ModelConstructor);

mixin(Model, LineStyleMixin);
mixin(Model, ItemStyleMixin);
mixin(Model, AreaStyleMixin);
mixin(Model, TextStyleMixin);

export default Model;