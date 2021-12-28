import Element, { ElementProps, ElementStatePropNames, ElementAnimateConfig, ElementCommonState } from '../Element';
import BoundingRect from '../core/BoundingRect';
import Path from './Path';
import { PropType, Dictionary, MapToType } from '../core/types';
import { keys, extend, createObject } from '../core/util';
import Animator from '../animation/Animator';
import { REDRAW_BIT, STYLE_CHANGED_BIT } from './constants';

const STYLE_MATIC_KEY = `__zr_style_${Math.round(Math.random() * 100)}`;

export interface CommonStyleProps {
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowColor?: string;

  opacity?: number;
  blend?: string; // not used in svg painter
}

export const DEFAULT_COMMON_STYLE: CommonStyleProps = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: '#000',
  opacity: 1,
  blend: 'source-over',
};

(DEFAULT_COMMON_STYLE as any)[STYLE_MATIC_KEY] = true;

export interface DisplayableProps extends ElementProps {
  style?: Dictionary<any>;

  zlevel?: number;
  z?: number;
  z2?: number;

  culling?: boolean;

  cursor?: string;

  rectHover?: boolean;

  progressive?: boolean;

  incremental?: boolean;

  batch?: boolean;
  invisible?: boolean;
}

export const DEFAULT_COMMON_ANIMATION_PROPS: MapToType<DisplayableProps, boolean> = {
  style: {
    shadowBlur: true,
    shadowOffsetX: true,
    shadowOffsetY: true,
    shadowColor: true,
    opacity: true,
  },
};

type DisplayableKey = keyof DisplayableProps;
type DisplayablePropertyType = PropType<DisplayableProps, DisplayableKey>;

export type DisplayableStatePropNames = ElementStatePropNames | 'style' | 'z' | 'z2' | 'invisible';
export type DisplayableState = Pick<DisplayableProps, DisplayableStatePropNames> & ElementCommonState;

const PRIMARY_STATES_KEYS = ['z', 'z2', 'invisible'] as const;
const PRIMARY_STATES_KEYS_IN_HOVER_LAYER = ['invisible'] as const;

interface Displayable<Props extends DisplayableProps = DisplayableProps> {
  animate(key?: '', loop?: boolean): Animator<this>;
  animate(key: 'style', loop?: boolean): Animator<Props['style']>;

  getState(stateName: string): DisplayableState;
  ensureState(stateName: string): DisplayableState;

  states: Dictionary<DisplayableState>;
  stateProxy: (stateName: string) => DisplayableState;
}

class Displayable<Props extends DisplayableProps = DisplayableProps> extends Element<Props> {
  invisible: boolean;

  z: number;

  z2: number;

  zlevel: number;

  culling: boolean; // if not visible in viewport

  cursor: string;

  rectHover: boolean;

  incremental: boolean;

  style: Dictionary<any>;

  protected _normalState: DisplayableState;

  protected _rect: BoundingRect; // to store bounding rect
  protected _paintRect: BoundingRect;
  protected _prevPaintRect: BoundingRect;

  dirtyRectTolerance: number;

  useHoverLayer?: boolean;

  __hoverStyle?: CommonStyleProps;

  __clipPaths?: Path[];

  __canvasFillGradient: CanvasGradient;
  __canvasStrokeGradient: CanvasGradient;
  __canvasFillPattern: CanvasPattern;
  __canvasStrokePattern: CanvasPattern;

  __svgEl: SVGElement; // corresponding svg element

  constructor(props?: Props, skipInit: boolean = false) {
    super(props, true);
    this.type = 'displayable';
    this.invisible = false;
    this.z = 0;
    this.z2 = 0;
    this.zlevel = 0;
    this.culling = false;
    this.cursor = 'pointer';
    this.rectHover = false;
    this.incremental = false;
    this._rect = null;
    this.dirtyRectTolerance = 0;
    this.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT;
    if (!skipInit) {
      this._init(props);
    }
  }

  protected _init(props?: Props) {
    const keysArr = keys(props);
    for (let i = 0; i < keysArr.length; i++) {
      const key = keysArr[i];
      if (key === 'style') {
        this.useStyle(props[key] as Props['style']);
      } else {
        super.attrKV(key as any, props[key]);
      }
    }

    if (!this.style) {
      this.useStyle({});
    }
  }

  beforeBrush() {}
  afterBrush() {}

  innerBeforeBrush() {}
  innerAfterBrush() {}

  shouldBePainted(viewWidth: number, viewHeight: number, considerClipPath: boolean, considerAncestors: boolean) {
    const m = this.transform;

    if (this.ignore || this.invisible || this.style.opacity === 0 || (this.culling && isDisplayableCulled(this, viewWidth, viewHeight)) || (m && !m[0] && !m[3])) {
      return false;
    }

    if (considerClipPath && this.__clipPaths) {
      for (let i = 0; i < this.__clipPaths.length; i++) {
        if (this.__clipPaths[i].isZeroArea()) {
          return false;
        }
      }
    }

    if (considerAncestors && this.parent) {
      let parent = this.parent;
      while (parent) {
        if (parent.ignore) {
          return false;
        }
        parent = parent.parent;
      }
    }

    return true;
  }

  contain(x: number, y: number) {
    return this.rectContain(x, y);
  }

  traverse<Context>(cb: (this: Context, el: this) => void, context?: Context) {
    cb.call(context, this);
  }

  rectContain(x: number, y: number) {
    const coord = this.transformCoordToLocal(x, y);
    const rect = this.getBoundingRect();
    return rect.contain(coord[0], coord[1]);
  }

  getPaintRect(): BoundingRect {
    let rect = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      const transform = this.transform;
      const elRect = this.getBoundingRect();

      const style = this.style;
      const shadowSize = style.shadowBlur || 0;
      const shadowOffsetX = style.shadowOffsetX || 0;
      const shadowOffsetY = style.shadowOffsetY || 0;

      rect = this._paintRect || (this._paintRect = new BoundingRect(0, 0, 0, 0));

      if (transform) {
        BoundingRect.applyTransform(rect, elRect, transform);
      } else {
        rect.copy(elRect);
      }

      if (shadowSize || shadowOffsetX || shadowOffsetY) {
        rect.width += shadowSize * 2 + Math.abs(shadowOffsetX);
        rect.height += shadowSize * 2 + Math.abs(shadowOffsetY);
        rect.x = Math.min(rect.x, rect.x + shadowOffsetX - shadowSize);
        rect.y = Math.min(rect.y, rect.y + shadowOffsetY - shadowSize);
      }

      const tolerance = this.dirtyRectTolerance;
      if (!rect.isZero()) {
        rect.x = Math.floor(rect.x - tolerance);
        rect.y = Math.floor(rect.y - tolerance);
        rect.width = Math.ceil(rect.width + 1 + tolerance * 2);
        rect.height = Math.ceil(rect.height + 1 + tolerance * 2);
      }
    }

    return rect;
  }

  setPrevPaintRect(paintRect: BoundingRect) {
    if (paintRect) {
      this._prevPaintRect = this._prevPaintRect || new BoundingRect(0, 0, 0, 0);
      this._prevPaintRect.copy(paintRect);
    } else {
      this._prevPaintRect = null;
    }
  }

  getPrevPaintRect(): BoundingRect {
    return this._prevPaintRect;
  }

  animateStyle(loop: boolean) {
    return this.animate('style', loop);
  }

  updateDuringAnimation(targetKey: string) {
    if (targetKey === 'style') {
      this.dirtyStyle();
    } else {
      this.markRedraw();
    }
  }

  attrKV(key: DisplayableKey, value: DisplayablePropertyType) {
    if (key !== 'style') {
      super.attrKV(key as keyof DisplayableProps, value);
    } else {
      if (!this.style) {
        this.useStyle(value as Dictionary<any>);
      } else {
        this.setStyle(value as Dictionary<any>);
      }
    }
  }

  setStyle(obj: Props['style']): this
  setStyle<T extends keyof Props['style']>(obj: T, value: Props['style'][T]): this
  setStyle(keyOrObj: keyof Props['style'] | Props['style'], value?: unknown): this {
    if (typeof keyOrObj === 'string') {
      this.style[keyOrObj] = value;
    } else {
      extend(this.style, keyOrObj as Props['style']);
    }
    this.dirtyStyle();
    return this;
  }

  dirtyStyle(notRedraw?: boolean) {
    if (!notRedraw) {
      this.markRedraw();
    }
    this.__dirty |= STYLE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
  }

  dirty() {
    this.dirtyStyle();
  }

  styleChanged() {
    return !!(this.__dirty & STYLE_CHANGED_BIT);
  }

  styleUpdated() {
    this.__dirty &= ~STYLE_CHANGED_BIT;
  }

  createStyle(obj?: Props['style']) {
    return createObject(DEFAULT_COMMON_STYLE, obj);
  }

  useStyle(obj: Props['style']) {
    if (!obj[STYLE_MATIC_KEY]) {
      obj = this.createStyle(obj);
    }
    if (this.__inHover) {
      this.__hoverStyle = obj;
    } else {
      this.style = obj;
    }
    this.dirtyStyle();
  }

  isStyleObject(obj: Props['style']) {
    return obj[STYLE_MATIC_KEY];
  }

  protected _innerSaveToNormal(toState: DisplayableState) {
    super._innerSaveToNormal(toState);

    const normalState = this._normalState;
    if (toState.style && !normalState.style) {
      normalState.style = this._mergeStyle(this.createStyle(), this.style);
    }

    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
  }

  protected _applyStateObj(stateName: string, state: DisplayableState, normalState: DisplayableState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig) {
    super._applyStateObj(stateName, state, normalState, keepCurrentStates, transition, animationCfg);

    const needsRestoreToNormal = !(state && keepCurrentStates);
    let targetStyle: Props['style'];
    if (state && state.style) {
      if (transition) {
        if (keepCurrentStates) {
          targetStyle = state.style;
        } else {
          targetStyle = this._mergeStyle(this.createStyle(), normalState.style);
          this._mergeStyle(targetStyle, state.style);
        }
      } else {
        targetStyle = this._mergeStyle(this.createStyle(), keepCurrentStates ? this.style : normalState.style);
        this._mergeStyle(targetStyle, state.style);
      }
    } else if (needsRestoreToNormal) {
      targetStyle = normalState.style;
    }

    if (targetStyle) {
      if (transition) {
        const sourceStyle = this.style;
        this.style = this.createStyle(needsRestoreToNormal ? {} : sourceStyle);

        if (needsRestoreToNormal) {
          const changedKeys = keys(sourceStyle);
          for (let i = 0; i < changedKeys.length; i++) {
            const key = changedKeys[i];
            if (key in targetStyle) {
              // remove field from prototype to current obj
              (targetStyle as any)[key] = targetStyle[key];
              (this.style as any)[key] = sourceStyle[key];
            }
          }
        }

        const targetKeys = keys(targetStyle);
        for (let i = 0; i < targetKeys.length; i++) {
          const key = targetKeys[i];
          this.style[key] = this.style[key];
        }

        this._transitionState(stateName, { style: targetStyle } as Props, animationCfg, this.getAnimationStyleProps() as MapToType<Props, boolean>);
      } else {
        this.useStyle(targetStyle);
      }
    }

    const statesKeys = this.__inHover ? PRIMARY_STATES_KEYS_IN_HOVER_LAYER : PRIMARY_STATES_KEYS;
    for (let i = 0; i < statesKeys.length; i++) {
      let key = statesKeys[i];
      if (state && state[key] != null) {
        (this as any)[key] = state[key];
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          (this as any)[key] = normalState[key];
        }
      }
    }
  }

  protected _mergeStates(states: DisplayableState[]) {
    const mergedState = super._mergeStates(states) as DisplayableState;
    let mergedStyle: Props['style'];

    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      if (state.style) {
        mergedStyle = mergedStyle || {};
        this._mergeStyle(mergedStyle, state.style);
      }
    }
    if (mergedStyle) {
      mergedState.style = mergedStyle;
    }
    return mergedState;
  }

  protected _mergeStyle(targetStyle: CommonStyleProps, sourceStyle: CommonStyleProps) {
    extend(targetStyle, sourceStyle);
    return targetStyle;
  }

  getAnimationStyleProps() {
    return DEFAULT_COMMON_ANIMATION_PROPS;
  }

  protected static initDefaultProps = (() => {
    // This only works for mixin. We must initialize them in constructor, otherwise they will be undefined.
    const proto = Displayable.prototype;
    proto.type = 'displayable';
    proto.invisible = false;
    proto.z = 0;
    proto.z2 = 0;
    proto.zlevel = 0;
    proto.culling = false;
    proto.cursor = 'pointer';
    proto.rectHover = false;
    proto.incremental = false;
    proto._rect = null;
    proto.dirtyRectTolerance = 0;
    proto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT;
  })();
}

const tmpRect = new BoundingRect(0, 0, 0, 0);
const viewRect = new BoundingRect(0, 0, 0, 0);
function isDisplayableCulled(el: Displayable, width: number, height: number) {
  tmpRect.copy(el.getBoundingRect());
  if (el.transform) {
    tmpRect.applyTransform(el.transform);
  }
  viewRect.width = width;
  viewRect.height = height;
  return !tmpRect.intersect(viewRect);
}

export default Displayable;

