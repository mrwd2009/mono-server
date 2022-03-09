import Displayable, { DisplayableProps, CommonStyleProps, DEFAULT_COMMON_STYLE, DEFAULT_COMMON_ANIMATION_PROPS, DisplayableStatePropNames, } from './Displayable';
import Element, { ElementAnimateConfig } from '../Element';
import PathProxy from '../core/PathProxy';
import * as pathContain from '../contain/path';
import type { PatternObject } from './Pattern';
import { Dictionary, PropType, MapToType } from '../core/types';
import BoundingRect from '../core/BoundingRect';
import type { LinearGradientObject } from './LinearGradient';
import type { RadialGradientObject } from './RadialGradient';
import { defaults, keys, extend, clone, isString, createObject} from '../core/util';
import Animator from '../animation/Animator';
import { lum } from '../tool/color';
import { DARK_LABEL_COLOR, LIGHT_LABEL_COLOR, DARK_MODE_THRESHOLD, LIGHTER_LABEL_COLOR } from '../config';
import { REDRAW_BIT, SHAPE_CHANGED_BIT, STYLE_CHANGED_BIT } from './constants';
import { TRANSFORMABLE_PROPS } from '../core/Transformable';

export interface PathStyleProps extends CommonStyleProps {
  fill?: string | PatternObject | LinearGradientObject | RadialGradientObject;
  stroke?: string | PatternObject | LinearGradientObject | RadialGradientObject;
  decal?: PatternObject;

  strokePercent?: number;
  strokeNoScale?: boolean;
  fillOpacity?: number;
  strokeOpacity?: number;

  lineDash?: false | number[] | 'solid' | 'dashed' | 'dotted';
  lineDashOffset?: number;

  lineWidth?: number;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;

  miterLimit?: number;

  strokeFirst?: boolean;
}

export const DEFAULT_PATH_STYLE: PathStyleProps = defaults({
  fill: '#000',
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,

  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: 'butt',
  miterLimit: 10,

  strokeNoScale: false,
  strokeFirst: false,
} as PathStyleProps, DEFAULT_COMMON_STYLE);

export interface PathProps extends DisplayableProps {
  strokeContainThreshold?: number;
  segmentIgnoreThreshold?: number;
  subPixelOptimize?: boolean;

  style?: PathStyleProps;
  shape?: Dictionary<any>;

  autoBatch?: boolean;

  __value?: (string | number)[] | (string | number);

  buildPath?: (ctx: PathProxy | CanvasRenderingContext2D, shapeCfg: Dictionary<any>, inBatch?: boolean) => void
}

export const DEFAULT_PATH_ANIMATION_PROPS: MapToType<PathProps, boolean> = {
  style: defaults<MapToType<PathStyleProps, boolean>, MapToType<PathStyleProps, boolean>>({
    fill: true,
    stroke: true,
    strokePercent: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineDashOffset: true,
    lineWidth: true,
    miterLimit: true,
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};

type PathKey = keyof PathProps;
type PathPropertyType = PropType<PathProps, PathKey>;

export type PathStatePropNames = DisplayableStatePropNames | 'shape';
export type PathState = Pick<PathProps, PathStatePropNames> & {
  hoverLayer?: boolean
};

const pathCopyParams = (TRANSFORMABLE_PROPS as readonly string[]).concat(['invisible',
    'culling', 'z', 'z2', 'zlevel', 'parent'
]) as (keyof Path)[];

interface Path<Props extends PathProps = PathProps> {
  animate(key?: '', loop?: boolean): Animator<this>;
  animate(key: 'style', loop?: boolean): Animator<Props['style']>;
  animate(key: 'shape', loop?: boolean): Animator<Props['shape']>;

  getState(stateName: string): PathState;
  ensureState(stateName: string): PathState;

  states: Dictionary<PathState>;
  stateProxy: (stateName: string) => PathState;
}

class Path<Props extends PathProps = PathProps> extends Displayable<Props> {

  path: PathProxy;

  strokeContainThreshold: number;

  segmentIgnoreThreshold: number;

  subPixelOptimize: boolean;

  style: PathStyleProps;

  autoBatch: boolean;

  private _rectStroke: BoundingRect;

  protected _normalState: PathState;

  protected _decalEl: Path;

  shape: Dictionary<any>;

  constructor(opts?: Props, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'path';
    this.strokeContainThreshold = 5;
    this.segmentIgnoreThreshold = 0;
    this.subPixelOptimize = false;
    this.autoBatch = false;
    this.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT | SHAPE_CHANGED_BIT;

    if (!skipInit) {
      this._init(opts);
    }
  }

  update() {
    super.update();

    const style = this.style;
    if (style.decal) {
      const decalEl: Path = this._decalEl = this._decalEl || new Path();
      if (decalEl.buildPath === Path.prototype.buildPath) {
        decalEl.buildPath = ctx => {
          this.buildPath(ctx, this.shape);
        }
      }

      decalEl.silent = true;
      const decalElStyle = decalEl.style;

      for (let key in style) {
        if ((decalElStyle as any)[key] !== (style as any)[key]) {
          (decalElStyle as any)[key] = (style as any)[key];
        }
      }

      decalElStyle.fill = style.fill ? style.decal : null;
      decalElStyle.decal = null;
      decalElStyle.shadowColor = null;
      style.strokeFirst && (decalElStyle.stroke = null);

      for (let i = 0; i < pathCopyParams.length; i++) {
        (decalEl as any)[pathCopyParams[i]] = this[pathCopyParams[i]];
      }

      decalEl.__dirty |= REDRAW_BIT;
    } else if (this._decalEl) {
      this._decalEl = null;
    }
  }

  getDecalElement() {
    return this._decalEl;
  }

  protected _init(props?: Props) {
    const keysArr = keys(props);

    this.shape = this.getDefaultShape();
    const defaultStyle = this.getDefaultStyle();
    if (defaultStyle) {
      this.useStyle(defaultStyle);
    }

    for (let i = 0; i < keysArr.length; i++) {
      const key = keysArr[i];
      const value = props[key];
      if (key === 'style') {
        if (!this.style) {
          this.useStyle(value as Props['style']);
        } else {
          extend(this.style, value as Props['style']);
        }
      } else if (key === 'shape') {
        extend(this.shape, value as Props['shape']);
      } else {
        super.attrKV(key as any, value);
      }
    }

    if (!this.style) {
      this.useStyle({});
    }
  }

  protected getDefaultStyle(): Props['style'] {
    return null;
  }

  protected getDefaultShape() {
    return {};
  }

  protected canBeInsideText() {
    return this.hasFill();
  }

  protected getInsideTextFill() {
    const pathFill = this.style.fill;
    if (pathFill !== 'none') {
      if (isString(pathFill)) {
        const fillLum = lum(pathFill, 0);
        if (fillLum > 0.5) {
          return DARK_LABEL_COLOR;
        } else if (fillLum > 0.2) {
          return LIGHTER_LABEL_COLOR;
        }
        return LIGHT_LABEL_COLOR;
      } else if (pathFill) {
        return LIGHT_LABEL_COLOR;
      }
    } 

    return DARK_LABEL_COLOR;
  }

  protected getInsideTextStroke(textFill?: string) {
    const pathFill = this.style.fill;
    if (isString(pathFill)) {
      const zr = this.__zr;
      const isDarkMode = !!(zr && zr.isDarkMode());
      const isDarkLabel = lum(textFill, 0) < DARK_MODE_THRESHOLD;
      if (isDarkMode === isDarkLabel) {
        return pathFill;
      }
    }
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shapeCfg: Dictionary<any>, inBatch?: boolean) {}

  pathUpdated() {
    this.__dirty &= ~SHAPE_CHANGED_BIT;
  }

  getUpdatedPathProxy(inBatch?: boolean) {
    !this.path && this.createPathProxy();
    this.path.beginPath();
    this.buildPath(this.path, this.shape, inBatch);
    return this.path;
  }

  createPathProxy() {
    this.path = new PathProxy(false);
  }

  hasStroke() {
    const style = this.style;
    const stroke = style.stroke;
    return !(stroke == null || stroke === 'none' || !(style.lineWidth > 0));
  }
  
  hasFill() {
    const style = this.style;
    const fill = style.fill;
    return fill != null && fill !== 'none';
  }

  getBoundingRect(): BoundingRect {
    let rect = this._rect;
    const style = this.style;
    const needsUpdateRect = !rect;
    if (needsUpdateRect) {
      let firstInvoke = false;
      if (!this.path) {
        firstInvoke = true;
        this.createPathProxy();
      }
      let path = this.path;
      if (firstInvoke || (this.__dirty & SHAPE_CHANGED_BIT)) {
        path.beginPath();
        this.buildPath(path, this.shape, false);
        this.pathUpdated();
      }
      rect = path.getBoundingRect();
    }
    this._rect = rect;

    if (this.hasStroke() && this.path && this.path.len() > 0) {
      const rectWithStroke = this._rectStroke || (this._rectStroke = rect.clone());
      if (this.__dirty || needsUpdateRect) {
        rectWithStroke.copy(rect);
        const lineScale = style.strokeNoScale ? this.getLineScale() : 1;
        let w = style.lineWidth;

        if (!this.hasFill()) {
          const strokeContainThreshold = this.strokeContainThreshold;
          w = Math.max(w, strokeContainThreshold == null ? 4 : strokeContainThreshold);
        }

        if (lineScale > 1e-10) {
          rectWithStroke.width += w / lineScale;
          rectWithStroke.height += w / lineScale;
          rectWithStroke.x -= w / lineScale / 2;
          rectWithStroke.y -= w / lineScale / 2;
        }
      }

      return rectWithStroke;
    }
    
    return rect;
  }

  contain(x: number, y: number): boolean {
    const localPos = this.transformCoordToLocal(x, y);
    const rect = this.getBoundingRect();
    const style = this.style;
    x = localPos[0];
    y = localPos[1];

    if (rect.contain(x, y)) {
      const pathProxy = this.path;
      if (this.hasStroke()) {
        let lineWidth = style.lineWidth;
        let lineScale = style.strokeNoScale ? this.getLineScale() : 1;

        if (lineScale > 1e-10) {
          if (!this.hasFill()) {
            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
          }
          if (pathContain.containStroke(pathProxy, lineWidth / lineScale, x, y)) {
            return true;
          }
        }
      }
      if (this.hasFill()) {
        return pathContain.contain(pathProxy, x, y);
      }
    }
    return false;
  }

  dirtyShape() {
    this.__dirty |= SHAPE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
    if (this._decalEl) {
      this._decalEl.dirtyShape();
    }
    this.markRedraw();
  }

  dirty() {
    this.dirtyStyle();
    this.dirtyShape();
  }

  animateShape(loop: boolean) {
    return this.animate('shape', loop);
  }

  updateDuringAnimation(targetKey: string) {
    if (targetKey === 'style') {
      this.dirtyStyle();
    } else if (targetKey === 'shape') {
      this.dirtyShape();
    } else {
      this.markRedraw();
    }
  }

  attrKV(key: PathKey, value: PathPropertyType) {
    if (key === 'shape') {
      this.setShape(value as Props['shape']);
    } else {
      super.attrKV(key as keyof DisplayableProps, value);
    }
  }

  setShape(obj: Props['shape']): this
  setShape<T extends keyof Props['shape']>(obj: T, value: Props['shape'][T]): this
  setShape(keyOrObj: keyof Props['shape'] | Props['shape'], value?: unknown): this {
    let shape = this.shape;
    if (!shape) {
      shape = this.shape = {};
    }

    if (typeof keyOrObj === 'string') {
      shape[keyOrObj] = value;
    } else {
      extend(shape, keyOrObj as Props['shape']);
    }
    this.dirtyShape();
    return this;
  }

  shapeChanged() {
    return !!(this.__dirty & SHAPE_CHANGED_BIT);
  }

  createStyle(obj?: Props['style']) {
    return createObject(DEFAULT_PATH_STYLE, obj);
  }

  protected _innerSaveToNormal(toState: PathState) {
    super._innerSaveToNormal(toState);

    const normalState = this._normalState;
    if (toState.shape && !normalState.shape) {
      normalState.shape = extend({}, this.shape);
    }
  }

  protected _applyStateObj(stateName: string, state: PathState, normalState: PathState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig) {
    super._applyStateObj(stateName, state, normalState, keepCurrentStates, transition, animationCfg);
    const needsRestoreToNormal = !(state && keepCurrentStates);
    let targetShape: Props['shape'];

    if (state && state.shape) {
      if (transition) {
        if (keepCurrentStates) {
          targetShape = state.shape;
        } else {
          targetShape = extend({}, normalState.shape);
          extend(targetShape, state.shape);
        }
      } else {
        targetShape = extend({}, keepCurrentStates ? this.shape : normalState.shape)
        extend(targetShape, state.shape);
      }
    } else if (needsRestoreToNormal) {
      targetShape = normalState.shape;
    }

    if (targetShape) {
      if (transition) {
        this.shape = extend({}, this.shape);
        const targetShapePrimaryProps: Props['shape'] = {};
        const shapeKeys = keys(targetShape);
        for (let i = 0; i < shapeKeys.length; i++) {
          const key = shapeKeys[i];
          if (typeof targetShape[key] === 'object') {
            (this.shape as Props['shape'])[key] = targetShape[key];
          } else {
            targetShapePrimaryProps[key] = targetShape[key];
          }
        }

        this._transitionState(stateName, {
          shape: targetShapePrimaryProps
        } as Props, animationCfg);
      } else {
        this.shape = targetShape;
        this.dirtyShape();
      }
    }
  }

  protected _mergeStates(states: PathState[]) {
    const mergedState = super._mergeStates(states) as PathState;
    let mergedShape: Props['shape'];
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      if (state.shape) {
        mergedShape = mergedState || {};
        this._mergeStyle(mergedShape, state.shape);
      }
    }
    if (mergedShape) {
      mergedState.shape = mergedShape;
    }
    return mergedState;
  }

  getAnimationStyleProps() {
    return DEFAULT_PATH_ANIMATION_PROPS;
  }

  isZeroArea(): boolean {
    return false;
  }

  static extend<Shape extends Dictionary<any>>(defaultProps: {
    type?: string,
    shape?: Shape,
    style?: PathStyleProps,
    beforeBrush?: Displayable['beforeBrush'],
    afterBrush?: Displayable['afterBrush'],
    getBoundingRect?: Displayable['getBoundingRect'],
    calculateTextPosition?: Element['calculateTextPosition'],
    buildPath(this: Path, ctx: CanvasRenderingContext2D | PathProxy, shape: Shape, inBatch?: boolean): void,
    init?(this: Path, opts: PathProps): void
  }): {
    new(opts?: PathProps & { shape: Shape }): Path
  } {
    interface SubPathOption extends PathProps {
      shape: Shape
    }

    class Sub extends Path {
      shape: Shape;

      getDefaultStyle() {
        return clone(defaultProps.style);
      }

      getDefaultShape() {
        return clone(defaultProps.shape);
      }

      constructor(opts?: SubPathOption) {
        super(opts);
        defaultProps.init?.call(this, opts);
      }
    }

    for (let key in defaultProps) {
      if (typeof (defaultProps as any)[key] === 'function') {
        (Sub.prototype as any)[key] = (defaultProps as any)[key];
      }
    }

    return Sub;
  }

  protected static initDefaultProps = (() => {
    // This only works for mixin. We must initialize them in constructor, otherwise they will be undefined.
    const proto = Path.prototype;
    proto.type = 'path';
    proto.strokeContainThreshold = 5;
    proto.segmentIgnoreThreshold = 0;
    proto.subPixelOptimize = false;
    proto.autoBatch = false;
    proto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT | SHAPE_CHANGED_BIT;
  })();
}

export default Path;

