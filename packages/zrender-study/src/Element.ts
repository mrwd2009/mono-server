import Transformable, { TRANSFORMABLE_PROPS, TransformProp } from './core/Transformable';
import { AnimationEasing } from './animation/easing';
import Animator, { cloneValue } from './animation/Animator';
import {
  Dictionary,
  BuiltinTextPosition,
  ElementEventName,
  ZRRawEvent,
  TextAlign,
  TextVerticalAlign,
  AllPropTypes,
  MapToType,
} from './core/types';
import Path from './graphic/Path';
import { ZRenderType } from './zrender';
import BoundingRect, {
  RectLike,
} from './core/BoundingRect';
import Eventful from './core/Eventful';
import Point from './core/Point';
import {
  isArrayLike,
  logError,
  extend,
  isObject,
  keys,
  indexOf,
  mixin,
  isTypedArray,
  guid,
  isGradientObject,
  filter,
  reduce
} from './core/util';
import { parse, stringify } from './tool/color';
import ZRText, { DefaultTextStyle } from './graphic/Text';
import { REDRAW_BIT } from './graphic/constants';
import { calculateTextPosition, TextPositionCalculationResult, parsePercent } from './contain/text';
import Polyline from './graphic/shape/Polyline';
import Group from './graphic/Group';
import { LIGHT_LABEL_COLOR, DARK_LABEL_COLOR } from './config';


export interface ElementAnimateConfig {
  duration?: number;
  delay?: number;
  easing?: AnimationEasing;
  during?: (percent: number) => void;

  done?: Function;
  aborted?: Function;

  scope?: string; // label to filter out animations
  force?: boolean; // at least one frame
  additive?: boolean;// if existing animation, just apply additive value
  setToFinal?: boolean; // clone a new source value instead of current element
}

export interface ElementTextConfig {
  position?: BuiltinTextPosition | (number | string)[]; // position in layout rect
  
  rotation?: number;

  layoutRect?: RectLike; // layout rect used to calculate text position

  offset?: number[];

  origin?: (number | string)[] | 'center';

  distance?: number; // change x value

  local?: boolean; // local coordinate

  insideFill?: string; // style for different position related to layout rect

  insideStroke?: string;

  outsideFill?: string;

  outsideStroke?: string;

  inside?: boolean;
}

export interface ElementTextGuideLineConfig {
  anchor?: Point;

  showAbove?: boolean;

  candidates?: ('left' | 'top' | 'right' | 'bottom')[];
}

export interface ElementEvent {
  type: ElementEventName;
  event: ZRRawEvent;

  target: Element;
  topTarget: Element;
  cancelBubble: boolean;
  offsetX: number;
  offsetY: number;
  gestureEvent: string;
  pinchX: number;
  pinchY: number;
  pinchScale: number;
  wheelDelta: number;
  zrByTouch: boolean;
  which: number;
  stop: (this: ElementEvent) => void
}

type CbThis<Ctx, Impl> = unknown extends Ctx ? Impl : Ctx;

export type ElementEventCallback<Ctx, Impl> = (this: CbThis<Ctx, Impl>, e: ElementEvent) => boolean | void;

interface ElementEventHandlerProps {
  onclick: ElementEventCallback<unknown, unknown>;
  ondblclick: ElementEventCallback<unknown, unknown>;
  onmouseover: ElementEventCallback<unknown, unknown>;
  onmouseout: ElementEventCallback<unknown, unknown>;
  onmousemove: ElementEventCallback<unknown, unknown>;
  onmousewheel: ElementEventCallback<unknown, unknown>;
  onmousedown: ElementEventCallback<unknown, unknown>;
  onmouseup: ElementEventCallback<unknown, unknown>;
  oncontextmenu: ElementEventCallback<unknown, unknown>;

  ondrag: ElementEventCallback<unknown, unknown>;
  ondragstart: ElementEventCallback<unknown, unknown>;
  ondragend: ElementEventCallback<unknown, unknown>;
  ondragenter: ElementEventCallback<unknown, unknown>;
  ondragleave: ElementEventCallback<unknown, unknown>;
  ondragover: ElementEventCallback<unknown, unknown>;
  ondrop: ElementEventCallback<unknown, unknown>;
}

export interface ElementProps extends Partial<ElementEventHandlerProps>, Partial<Pick<Transformable, TransformProp>> {
  name?: string;
  ignore?: boolean;
  isGroup?: boolean;
  draggable?: boolean | 'horizontal' | 'vertical';

  silent?: boolean;

  ignoreClip?: boolean;

  globalScaleRatio?: number;

  textConfig?: ElementTextConfig;
  textContent?: ZRText;

  clipPath?: Path;
  drift?: (dx: number, dy: number, e?: ElementEvent) => void;
  
  extra?: Dictionary<unknown>;
  anid?: string;
}

export const PRESERVED_NORMAL_STATE = '__zr_normal__';

const PRIMARY_STATES_KEYS = (TRANSFORMABLE_PROPS as any).concat(['ignore']) as [TransformProp, 'ignore'];
const DEFAULT_ANIMATABLE_MAP = reduce(TRANSFORMABLE_PROPS, (obj, key) => {
    obj[key] = true;
    return obj;
}, {ignore: false} as Partial<Record<ElementStatePropNames, boolean>>);

export type ElementStatePropNames = (typeof PRIMARY_STATES_KEYS)[number] | 'textConfig';

export type ElementCommonState = {
  hoverLayer?: boolean;
}
export type ElementState = Pick<ElementProps, ElementStatePropNames> & ElementCommonState;

export type ElementCalculateTextPosition = (out: TextPositionCalculationResult, style: ElementTextConfig, rect: RectLike) => TextPositionCalculationResult;

let tmpTextPosCalcRes = {} as TextPositionCalculationResult;
let tmpBoundingRect = new BoundingRect(0, 0, 0, 0);

interface Element<Props extends ElementProps = ElementProps> extends Transformable, Eventful<{
  [key in ElementEventName]: (e: ElementEvent) => void | boolean
} & {
  [key in string]: (...args: any) => void | boolean
}>,
ElementEventHandlerProps {

}

class Element<Props extends ElementProps = ElementProps> {
  id: number = guid();

  type: string;

  name: string;

  ignore: boolean;

  silent: boolean;

  isGroup: boolean;

  draggable: boolean | 'horizontal' | 'vertical';

  dragging: boolean;

  parent: Group;

  animators: Animator<any>[] = [];

  ignoreClip: boolean;

  __hostTarget: Element;

  __zr: ZRenderType;

  __dirty: number;

  __isRendered: boolean;

  __inHover: boolean;

  private _clipPath?: Path;

  private _textContent?: ZRText;

  private _textGuide?: Polyline;

  textConfig?: ElementTextConfig;

  textGuideLineConfig?: ElementTextGuideLineConfig;

  anid: string;

  extra: Dictionary<unknown>;

  currentStates?: string[] = [];

  prevStates?: string[];

  states: Dictionary<ElementState> = {};

  stateTransition: ElementAnimateConfig | null;

  stateProxy?: (stateName: string, targetStates?: string[]) => ElementState;

  protected _normalState: ElementState;

  private _innerTextDefaultStyle: DefaultTextStyle;

  constructor(props?: Props, skipInit: boolean = false) {
    this.type = 'element';
    this.name = '';
    this.ignore = false;
    this.silent = false;
    this.isGroup = false;
    this.draggable = false;
    this.dragging = false;
    this.ignoreClip = false;
    this.__inHover = false;
    this.__dirty = REDRAW_BIT;
    if (!skipInit) {
      this._init(props);
    }
  }

  // can't initialize sub class property in overridden method 
  // because in ts v4.5 all properties will be assigned to 'void 0' in constructor
  protected _init(props?: Props) {
    this.attr(props);
  }

  drift(dx: number, dy: number, e?: ElementEvent) {
    switch (this.draggable) {
      case 'horizontal': {
        dy = 0;
        break;
      }
      case 'vertical': {
        dx = 0;
        break;
      }
    }

    let m = this.transform;
    if (!m) {
      m = this.transform = [1, 0, 0, 1, 0, 0];
    }
    m[4] += dx;
    m[5] += dy;

    this.decomposeTransform();
    this.markRedraw();
  }

  beforeUpdate() {}

  afterUpdate() {}

  update() {
    this.updateTransform();

    if (this.__dirty) {
      this.updateInnerText();
    }
  }

  updateInnerText(forceUpdate?: boolean) {
    const textEl = this._textContent;
    if (textEl && (!textEl.ignore || forceUpdate)) {
      if (!this.textConfig) {
        this.textConfig = {};
      }
      const textConfig = this.textConfig;
      const isLocal = textConfig.local;
      const innerTransformable = textEl.innerTransformable;

      let textAlign: TextAlign;
      let textVerticalAlign: TextVerticalAlign;

      let textStyleChanged = false;

      innerTransformable.parent = isLocal ? this as unknown as Group : null;

      let innerOrigin = false;

      innerTransformable.copyTransform(textEl);

      if (textConfig.position != null) {
        let layoutRect = tmpBoundingRect;
        if (textConfig.layoutRect) {
          layoutRect.copy(textConfig.layoutRect);
        } else {
          layoutRect.copy(this.getBoundingRect());
        }
        if (!isLocal) {
          layoutRect.applyTransform(this.transform);
        }

        if (this.calculateTextPosition) {
          this.calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        } else {
          calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        }

        innerTransformable.x = tmpTextPosCalcRes.x;
        innerTransformable.y = tmpTextPosCalcRes.y;

        textAlign = tmpTextPosCalcRes.align;
        textVerticalAlign = tmpTextPosCalcRes.verticalAlign;

        const textOrigin = textConfig.origin;
        if (textOrigin && textConfig.rotation != null) {
          let relOriginX, relOriginY;
          if (textOrigin === 'center') {
            relOriginX = layoutRect.width * 0.5;
            relOriginY = layoutRect.height * 0.5;
          } else {
            relOriginX = parsePercent(textOrigin[0], layoutRect.width);
            relOriginY = parsePercent(textOrigin[1], layoutRect.height);
          }

          innerOrigin = true;
          innerTransformable.originX = -innerTransformable.x + relOriginX + (isLocal ? 0 : layoutRect.x);
          innerTransformable.originY = -innerTransformable.y + relOriginY + (isLocal ? 0 : layoutRect.y);
        }
      }

      if (textConfig.rotation != null) {
        innerTransformable.rotation = textConfig.rotation;
      }

      const textOffset = textConfig.offset;
      if (textOffset) {
        innerTransformable.x += textOffset[0];
        innerTransformable.y += textOffset[1];

        if (!innerOrigin) {
          innerTransformable.originX = -textOffset[0];
          innerTransformable.originY = -textOffset[1];
        }
      }

      const isInside = textConfig.inside == null
        ? (typeof textConfig.position === 'string' && textConfig.position.indexOf('inside') >= 0)
        : textConfig.inside;

      const innerTextDefaultStyle = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});

      let textFill;
      let textStroke;
      let autoStroke;
      if (isInside && this.canBeInsideText()) {
        textFill = textConfig.insideFill;
        textStroke = textConfig.insideStroke;

        if (textFill == null || textFill === 'auto') {
          textFill = this.getInsideTextFill();
        }
        if (textStroke == null || textStroke === 'auto') {
          textStroke = this.getInsideTextStroke(textFill);
          autoStroke = true;
        }
      } else {
        textFill = textConfig.outsideFill;
        textStroke = textConfig.outsideStroke;

        if (textFill == null || textFill === 'auto') {
          textFill = this.getOutsideFill();
        }

        if (textStroke == null || textStroke === 'auto') {
          textStroke = this.getOutsideStroke(textFill);
          autoStroke = true;
        }
      }

      textFill = textFill || '#000';

      if (textFill !== innerTextDefaultStyle.fill
        || textStroke !== innerTextDefaultStyle.stroke
        || autoStroke !== innerTextDefaultStyle.autoStroke
        || textAlign !== innerTextDefaultStyle.align
        || textVerticalAlign !== innerTextDefaultStyle.verticalAlign
      ) {
        textStyleChanged = true;

        innerTextDefaultStyle.fill = textFill;
        innerTextDefaultStyle.stroke = textStroke;
        innerTextDefaultStyle.autoStroke = autoStroke;
        innerTextDefaultStyle.align = textAlign;
        innerTextDefaultStyle.verticalAlign = textVerticalAlign;

        textEl.setDefaultTextStyle(innerTextDefaultStyle);
      }

      textEl.__dirty |= REDRAW_BIT;

      if (textStyleChanged) {
        textEl.dirtyStyle(true);
      }
    }
  }

  protected canBeInsideText() {
    return true;
  }

  protected getInsideTextFill(): string | undefined {
    return '#fff';
  }

  protected getInsideTextStroke(textFill: string): string | undefined {
    return '#000';
  }

  protected getOutsideFill(): string | undefined {
    return this.__zr && this.__zr.isDarkMode() ? LIGHT_LABEL_COLOR : DARK_LABEL_COLOR;
  }

  protected getOutsideStroke(textFill: string): string {
    const backgroundColor = this.__zr && this.__zr.getBackgroundColor();
    let colorArr = typeof backgroundColor === 'string' && parse(backgroundColor as string);
    if (!colorArr) {
      colorArr = [255, 255, 255, 1];
    }
    const alpha = colorArr[3];
    const isDark = this.__zr.isDarkMode();
    for (let i = 0; i < 3; i++) {
      colorArr[i] = colorArr[i] * alpha + (isDark ? 0 : 255) * (1 - alpha);
    }
    colorArr[3] = 1;
    return stringify(colorArr, 'rgba');
  }

  traverse<Context>(cb: (this: Context, el: Element<Props>) => void, context?: Context) {

  }

  protected attrKV(key: string, value: unknown) {
    if (key === 'textConfig') {
      this.setTextConfig(value as ElementTextConfig);
    } else if (key === 'textContent') {
      this.setTextContent(value as ZRText);
    } else if (key === 'clipPath') {
      this.setClipPath(value as Path);
    } else if (key === 'extra') {
      this.extra = this.extra || {};
      extend(this.extra, value);
    } else {
      (this as any)[key] = value;
    }
  }

  hide() {
    this.ignore = true;
    this.markRedraw();
  }

  show() {
    this.ignore = false;
    this.markRedraw();
  }

  attr(keyOrObj: Props): this
  attr<T extends keyof Props>(keyOrObj: T, value: Props[T]): this
  attr(keyOrObj: keyof Props | Props, value?: unknown): this {
    if (typeof keyOrObj === 'string') {
      this.attrKV(keyOrObj as keyof ElementProps, value as AllPropTypes<ElementProps>);
    } else if (isObject(keyOrObj)) {
      const obj = keyOrObj as object;
      const keysArr = keys(obj);
      for (let i = 0; i < keysArr.length; i++) {
        const key = keysArr[i];
        this.attrKV(key as keyof ElementProps, keyOrObj[key]);
      }
    }
    this.markRedraw();
    return this;
  }

  saveCurrentToNormalState(toState: ElementState) {
    this._innerSaveToNormal(toState);

    const normalState = this._normalState;
    for (let i = 0; i < this.animators.length; i++) {
      const animator = this.animators[i];
      const fromStateTransition = animator.__fromStateTransition;
      if (animator.getLoop() || fromStateTransition && fromStateTransition !== PRESERVED_NORMAL_STATE) {
        continue;
      }

      const targetName = animator.targetName;
      const target = targetName ? (normalState as any)[targetName] : normalState;
      animator.saveTo(target);
    }
  }

  protected _innerSaveToNormal(toState: ElementState) {
    let normalState = this._normalState;
    if (!normalState) {
      normalState = this._normalState = {};
    }
    if (toState.textConfig && !normalState.textConfig) {
      normalState.textConfig = this.textConfig;
    }
    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
  }

  protected _savePrimaryToNormal(toState: Dictionary<any>, normalState: Dictionary<any>, primaryKeys: readonly string[]) {
    for (let i = 0; i < primaryKeys.length; i++) {
      let key = primaryKeys[i];
      if (toState[key] != null && !(key in normalState)) {
        (normalState as any)[key] = (this as any)[key];
      }
    }
  }

  hasState() {
    return this.currentStates.length > 0;
  }

  getState(name: string) {
    return this.states[name];
  }

  ensureState(name: string) {
    const states = this.states;
    if (!states[name]) {
      states[name] = {};
    }
    return states[name];
  }

  clearStates(noAnimation?: boolean) {
    this.useState(PRESERVED_NORMAL_STATE, false, noAnimation);
  }

  useState(stateName: string, keepCurrentStates?: boolean, noAnimation?: boolean, forceUseHoverLayer?: boolean) {
    const toNormalState = stateName === PRESERVED_NORMAL_STATE;
    const hasStates = this.hasState();
    
    if (!hasStates && toNormalState) {
      return;
    }

    const currentStates = this.currentStates;
    const animationCfg = this.stateTransition;

    if (indexOf(currentStates, stateName) >= 0 && (keepCurrentStates || currentStates.length === 1)) {
      return;
    }

    let state;
    if (this.stateProxy && !toNormalState) {
      state = this.stateProxy(stateName);
    }
    if (!state) {
      state = (this.states && this.states[stateName]);
    }
    
    if (!state && !toNormalState) {
      logError(`State ${stateName} not exists.`);
      return;
    }

    if (!toNormalState) {
      this.saveCurrentToNormalState(state);
    }

    const useHoverLayer = !!((state && state.hoverLayer) || forceUseHoverLayer);

    if (useHoverLayer) {
      this._toggleHoverLayerFlag(true);
    }

    this._applyStateObj(
      stateName,
      state,
      this._normalState,
      keepCurrentStates,
      !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0,
      animationCfg
    );

    const textContent = this._textContent;
    const textGuide = this._textGuide;
    if (textContent) {
      textContent.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }
    if (textGuide) {
      textGuide.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }

    if (toNormalState) {
      this.currentStates = [];
      this._normalState = {};
    } else {
      if (!keepCurrentStates) {
        this.currentStates = [stateName];
      } else {
        this.currentStates.push(stateName);
      }
    }

    this._updateAnimationTargets();
    this.markRedraw();

    if (!useHoverLayer && this.__inHover) {
      this._toggleHoverLayerFlag(false);
      this.__dirty &= ~REDRAW_BIT;
    }
    return state;
  }

  useStates(states: string[], noAnimation?: boolean, forceUseHoverLayer?: boolean) {
    if (!states.length) {
      this.clearStates();
    } else {
      const stateObjects: ElementState[] = [];
      const currentStates = this.currentStates;
      const len = states.length;
      let notChange = len === currentStates.length;

      if (notChange) {
        for (let i = 0; i < len; i++) {
          if (states[i] !== currentStates[i]) {
            notChange = false;
            break;
          }
        }
      }

      if (notChange) {
        return;
      }

      for (let i = 0; i < len; i++) {
        const stateName = states[i];
        let stateObj: ElementState;
        if (this.stateProxy) {
          stateObj = this.stateProxy(stateName, states);
        }
        if (!stateObj) {
          stateObj = this.states[stateName];
        }
        if (stateObj) {
          stateObjects.push(stateObj);
        }
      }

      const lastStateObj = stateObjects[len - 1];
      const useHoverLayer = !!((lastStateObj && lastStateObj.hoverLayer) || forceUseHoverLayer);
      if (useHoverLayer) {
        this._toggleHoverLayerFlag(true);
      }

      const mergedState = this._mergeStates(stateObjects);
      const animationCfg = this.stateTransition;

      this.saveCurrentToNormalState(mergedState);

      this._applyStateObj(
        states.join(','),
        mergedState,
        this._normalState,
        false,
        !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0,
        animationCfg,
      );

      const textContent = this._textContent;
      const textGuide = this._textGuide;
      if (textContent) {
        textContent.useStates(states, noAnimation, useHoverLayer);
      }

      if (textGuide) {
        textGuide.useStates(states, noAnimation, useHoverLayer);
      }

      this._updateAnimationTargets();

      this.currentStates = states.slice();
      this.markRedraw();

      if (!useHoverLayer && this.__inHover) {
        this._toggleHoverLayerFlag(false);
        this.__dirty &= ~REDRAW_BIT;
      }
    }
  }

  private _updateAnimationTargets() {
    for (let i = 0; i < this.animators.length; i++) {
      const animator = this.animators[i];
      if (animator.targetName) {
        animator.changeTarget((this as any)[animator.targetName]);
      }
    }
  }

  removeState(state: string) {
    const idx = indexOf(this.currentStates, state);
    if (idx >= 0) {
      const currentStates = this.currentStates.slice();
      currentStates.splice(idx, 1);
      this.useStates(currentStates);
    }
  }

  replaceState(oldState: string, newState: string, forceAdd: boolean) {
    const currentStates = this.currentStates.slice();
    const idx = indexOf(currentStates, oldState);
    const newStateExists = indexOf(currentStates, newState) >= 0;

    if (idx >= 0) {
      if (!newStateExists) {
        currentStates[idx] = newState;
      } else {
        currentStates.splice(idx, 1);
      }
    } else if (forceAdd && !newStateExists) {
      currentStates.push(newState);
    }
    this.useStates(currentStates);
  }

  toggleState(state: string, enable: boolean) {
    if (enable) {
      this.useState(state, true);
    } else {
      this.removeState(state);
    }
  }

  protected _mergeStates(states: ElementState[]) {
    const mergedState: ElementState = {};
    let mergedTextConfig: ElementTextConfig;

    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      extend(mergedState, state);

      if (state.textConfig) {
        mergedTextConfig = mergedTextConfig || {};
        extend(mergedTextConfig, state.textConfig);
      }
    }

    if (mergedTextConfig) {
      mergedState.textConfig = mergedTextConfig;
    }

    return mergedTextConfig;
  }

  protected _applyStateObj(stateName: string, state: ElementState, normalState: ElementState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig) {
    const needsRestoreToNormal = !(state && keepCurrentStates);

    if (state && state.textConfig) {
      this.textConfig = extend({}, keepCurrentStates ? this.textConfig : normalState.textConfig);
      extend(this.textConfig, state.textConfig);
    } else if (needsRestoreToNormal) {
      if (normalState.textConfig) {
        this.textConfig = normalState.textConfig;
      }
    }

    const transitionTarget: Dictionary<any> = {};
    let hasTransition = false;

    for (let i = 0; i < PRIMARY_STATES_KEYS.length; i++) {
      const key = PRIMARY_STATES_KEYS[i];
      const propNeedsTransition = transition && DEFAULT_ANIMATABLE_MAP[key];

      if (state && state[key] != null) {
        if (propNeedsTransition) {
          hasTransition = true;
          transitionTarget[key] = state[key];
        } else {
          (this as any)[key] = state[key];
        }
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          if (propNeedsTransition) {
            hasTransition = true;
            transitionTarget[key] = normalState[key];
          } else {
            (this as any)[key] = normalState[key];
          }
        }
      }
    }

    if (!transition) {
      for (let i = 0; i < this.animators.length; i++) {
        const animator = this.animators[i];
        const targetName = animator.targetName;
        if (!animator.getLoop()) {
          animator.__changeFinalValue(targetName ? ((state || normalState) as any)[targetName] : (state || normalState));
        }
      }
    }

    if (hasTransition) {
      this._transitionState(stateName, transitionTarget as Props, animationCfg);
    }
  }

  private _attachComponent(componentEl: Element) {
    if (componentEl.__zr && !componentEl.__hostTarget) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Text element has been added to zrender.');
      }
      return;
    }

    if (componentEl === this) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Recursive component attachment.');
      }
      return;
    }

    const zr = this.__zr;
    if (zr) {
      componentEl.addSelfToZr(zr);
    }

    componentEl.__zr = zr;
    componentEl.__hostTarget = this as unknown as Element;
  }

  private _detachComponent(componentEle: Element) {
    if (componentEle.__zr) {
      componentEle.removeSelfFromZr(componentEle.__zr);
    }

    componentEle.__zr = null;
    componentEle.__hostTarget = null;
  }

  getClipPath() {
    return this._clipPath;
  }
  
  setClipPath(clipPath: Path) {
    if (this._clipPath && this._clipPath !== clipPath) {
      this.removeClipPath();
    }

    this._attachComponent(clipPath);
    this._clipPath = clipPath;
    this.markRedraw();
  }

  removeClipPath() {
    const clipPath = this._clipPath;
    if (clipPath) {
      this._detachComponent(clipPath);
      this._clipPath = null;
      this.markRedraw();
    }
  }

  getTextContent(): ZRText {
    return this._textContent;
  }

  setTextContent(textEl: ZRText) {
    const previousTextContent = this._textContent;
    if(previousTextContent === textEl) {
      return;
    }

    if (previousTextContent && previousTextContent !== textEl) {
      this.removeTextContent();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (textEl.__zr && !textEl.__hostTarget) {
        throw new Error('Text element has been added to zrender.');
      }
    }

    textEl.innerTransformable = new Transformable();
    this._attachComponent(textEl);
    this._textContent = textEl;
    this.markRedraw();
  }

  setTextConfig(cfg: ElementTextConfig) {
    if (!this.textConfig) {
      this.textConfig = {};
    }
    extend(this.textConfig, cfg);
    this.markRedraw();
  }

  removeTextConfig() {
    this.textConfig = null;
    this.markRedraw();
  }

  removeTextContent() {
    const textEl = this._textContent;
    if (textEl) {
      textEl.innerTransformable = null;
      this._detachComponent(textEl);
      this._textContent = null;
      this._innerTextDefaultStyle = null;
      this.markRedraw();
    }
  }

  getTextGuideLine(): Polyline {
    return this._textGuide;
  }

  setTextGuideLine(guideLine: Polyline) {
    if (this._textGuide && this._textGuide !== guideLine) {
      this.removeTextGuideLine();
    }

    this._attachComponent(guideLine);

    this._textGuide = guideLine;

    this.markRedraw();
  }

  removeTextGuideLine() {
    const textGuide = this._textGuide;
    if (textGuide) {
      this._detachComponent(textGuide);
      this._textGuide = null;
      this.markRedraw();
    }
  }

  markRedraw() {
    this.__dirty |= REDRAW_BIT;
    const zr = this.__zr;
    if (zr) {
      if (this.__inHover) {
        zr.refreshHover();
      } else {
        zr.refresh();
      }
    }

    if (this.__hostTarget) {
      this.__hostTarget.markRedraw();
    }
  }

  dirty() {
    this.markRedraw();
  }

  private _toggleHoverLayerFlag(inHover: boolean) {
    this.__inHover = inHover;
    const textContent = this._textContent;
    const textGuide = this._textGuide;
    if (textContent) {
      textContent.__inHover = inHover;
    }
    if (textGuide) {
      textGuide.__inHover = inHover;
    }
  }

  addSelfToZr(zr: ZRenderType) {
    if (this.__zr === zr) {
      return;
    }

    this.__zr = zr;

    const animators = this.animators;
    if (animators) {
      for (let i = 0; i < animators.length; i++) {
        zr.animation.addAnimator(animators[i]);
      }
    }

    if (this._clipPath) {
      this._clipPath.addSelfToZr(zr);
    }

    if (this._textContent) {
      this._textContent.addSelfToZr(zr);
    }

    if (this._textGuide) {
      this._textGuide.addSelfToZr(zr);
    }
  }

  removeSelfFromZr(zr: ZRenderType) {
    if (!this.__zr) {
      return;
    }

    this.__zr = null;
    const animators = this.animators;
    if (animators) {
      for (let i = 0; i < animators.length; i++) {
        zr.animation.removeAnimator(animators[i]);
      }
    }

    if (this._clipPath) {
      this._clipPath.removeSelfFromZr(zr);
    }

    if (this._textContent) {
      this._textContent.removeSelfFromZr(zr);
    }

    if (this._textGuide) {
      this._textGuide.removeSelfFromZr(zr);
    }
  }

  animate(key?: string, loop?: boolean, allowDiscreteAnimation?: boolean) {
    let target = key ? (this as any)[key] : this;

    if (process.env.NODE_ENV !== 'production') {
      if (!target) {
        logError(
          'Property "'
          + key
          + '" is not existed in element '
          + this.id
        );
        return;
      }
    }

    const animator = new Animator(target, loop, allowDiscreteAnimation);
    key && (animator.targetName = key);
    this.addAnimator(animator, key);
    return animator;
  }

  addAnimator(animator: Animator<any>, key: string): void {
    const zr = this.__zr;

    animator
    .during(() => {
      this.updateDuringAnimation(key as string);
    })
    .done(() => {
      const animators = this.animators;
      const idx = indexOf(animators, animator);
      if (idx >= 0) {
        animators.splice(idx, 1);
      }
    });

    this.animators.push(animator);

    if (zr) {
      zr.animation.addAnimator(animator);
    }

    zr && zr.wakeUp();
  }

  updateDuringAnimation(key: string) {
    this.markRedraw();
  }

  stopAnimation(scope?: string | null, forwardToLast?: boolean) {
    const animators = this.animators;
    const len = animators.length;
    const leftAnimators: Animator<any>[] = [];

    for (let i = 0; i < len; i++) {
      const animator = animators[i];
      if (!scope || scope === animator.scope) {
        animator.stop(forwardToLast);
      } else {
        leftAnimators.push(animator);
      }
    }

    this.animators = leftAnimators;
    return this;
  }

  animateTo(target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>) {
    animateTo(this, target, cfg, animationProps);
  }

  animateFrom(target: Props, cfg: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>) {
    animateTo(this, target, cfg, animationProps, true);
  }

  protected _transitionState(stateName: string, target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>) {
    const animators = animateTo(this, target, cfg, animationProps);
    for (let i = 0; i < animators.length; i++) {
      animators[i].__fromStateTransition = stateName;
    }
  }

  getBoundingRect(): BoundingRect {
    return null;
  }

  getPaintRect(): BoundingRect {
    return null;
  }

  calculateTextPosition: ElementCalculateTextPosition;
}

mixin(Element, Eventful);
mixin(Element, Transformable);

function animateTo<T>(animatable: Element<T>, target: Dictionary<any>, cfg: ElementAnimateConfig, animationProps: Dictionary<any>, reverse?: boolean) {
  cfg = cfg || {};
  const animators: Animator<any>[] = [];
  animateToShallow(
    animatable,
    '',
    animatable,
    target,
    cfg,
    animationProps,
    animators,
    reverse
  );

  let finishCount = animators.length;
  let doneHappened = false;
  const cfgDone = cfg.done;
  const cfgAborted = cfg.aborted;

  const doneCb = () => {
    doneHappened = true;
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? (cfgDone && cfgDone()) : (cfgAborted && cfgAborted());
    }
  };

  const abortedCb = () => {
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? (cfgDone && cfgDone()) : (cfgAborted && cfgAborted());
    }
  };

  if (!finishCount) {
    cfgDone && cfgDone();
  }

  if (animators.length > 0 && cfg.during) {
    animators[0].during((target, percent) => {
      cfg.during(percent);
    });
  }

  for (let i = 0; i < animators.length; i++) {
    const animator = animators[i];
    if (doneCb) {
      animator.done(doneCb);
    }
    if (abortedCb) {
      animator.aborted(abortedCb);
    }
    if (cfg.force) {
      animator.duration(cfg.duration);
    }
    animator.start(cfg.easing);
  }

  return animators;
}

function copyArrShallow(source: number[], target: number[], len: number) {
  for (let i = 0; i < len; i++) {
    source[i] = target[i];
  }
}

function is2DArray(value: any[]): boolean {
  return isArrayLike(value[0]);
}

function copyValue(target: Dictionary<any>, source: Dictionary<any>, key: string) {
  if (isArrayLike(source[key])) {
    if (!isArrayLike(target[key])) {
      target[key] = [];
    }

    if (isTypedArray(source[key])) {
      const len = source[key].length;
      if (target[key].length !== len) {
        target[key] = new (source[key].constructor)(len);
        copyArrShallow(target[key], source[key], len);
      }
    } else {
      const sourceArr = source[key] as any[];
      const targetArr = target[key] as any[];

      const len0 = sourceArr.length;
      if (is2DArray(sourceArr)) {
        const len1 = sourceArr[0].length;
        for (let i = 0; i < len0; i++) {
          if (!targetArr[i]) {
            targetArr[i] = Array.prototype.slice.call(sourceArr[i]);
          } else {
            copyArrShallow(targetArr[i], sourceArr[i], len1);
          }
        }
      } else {
        copyArrShallow(targetArr, sourceArr, len0);
      }

      targetArr.length = sourceArr.length;
    }
  } else {
    target[key] = source[key];
  }
}

function isValueSame(val1: any, val2: any) {
  return val1 === val2
    // Only check 1 dimension array
    || isArrayLike(val1) && isArrayLike(val2) && is1DArraySame(val1, val2);
}

function is1DArraySame(arr0: ArrayLike<number>, arr1: ArrayLike<number>) {
  const len = arr0.length;
  if (len !== arr1.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (arr0[i] !== arr1[i]) {
      return false;
    }
  }
  return true;
}

function animateToShallow<T>(
  animatable: Element<T>,
  topKey: string,
  animateObj: Dictionary<any>,
  target: Dictionary<any>,
  cfg: ElementAnimateConfig,
  animationProps: Dictionary<any> | true,
  animators: Animator<any>[],
  reverse: boolean    // If `true`, animate from the `target` to current state.
) {
  const targetKeys = keys(target);
  const duration = cfg.duration;
  const delay = cfg.delay;
  const additive = cfg.additive;
  const setToFinal = cfg.setToFinal;
  const animateAll = !isObject(animationProps);
  // Find last animator animating same prop.
  const existsAnimators = animatable.animators;

  let animationKeys: string[] = [];
  for (let k = 0; k < targetKeys.length; k++) {
    const innerKey = targetKeys[k] as string;
    const targetVal = target[innerKey];

    if (
      targetVal != null && animateObj[innerKey] != null
      && (animateAll || (animationProps as Dictionary<any>)[innerKey])
    ) {
      if (isObject(targetVal)
        && !isArrayLike(targetVal)
        && !isGradientObject(targetVal)
      ) {
        if (topKey) {
          // logError('Only support 1 depth nest object animation.');
          // Assign directly.
          // TODO richText?
          if (!reverse) {
            animateObj[innerKey] = targetVal;
            animatable.updateDuringAnimation(topKey);
          }
          continue;
        }
        animateToShallow(
          animatable,
          innerKey,
          animateObj[innerKey],
          targetVal,
          cfg,
          animationProps && (animationProps as Dictionary<any>)[innerKey],
          animators,
          reverse
        );
      }
      else {
        animationKeys.push(innerKey);
      }
    }
    else if (!reverse) {
      // Assign target value directly.
      animateObj[innerKey] = targetVal;
      animatable.updateDuringAnimation(topKey);
      // Previous animation will be stopped on the changed keys.
      // So direct assign is also included.
      animationKeys.push(innerKey);
    }
  }

  let keyLen = animationKeys.length;
  // Stop previous animations on the same property.
  if (!additive && keyLen) {
    // Stop exists animation on specific tracks. Only one animator available for each property.
    // TODO Should invoke previous animation callback?
    for (let i = 0; i < existsAnimators.length; i++) {
      const animator = existsAnimators[i];
      if (animator.targetName === topKey) {
        const allAborted = animator.stopTracks(animationKeys);
        if (allAborted) {   // This animator can't be used.
          const idx = indexOf(existsAnimators, animator);
          existsAnimators.splice(idx, 1);
        }
      }
    }
  }

  // Ignore values not changed.
  // NOTE: Must filter it after previous animation stopped
  // and make sure the value to compare is using initial frame if animation is not started yet when setToFinal is used.
  if (!cfg.force) {
    animationKeys = filter(animationKeys, key => !isValueSame(target[key], animateObj[key]));
    keyLen = animationKeys.length;
  }

  if (keyLen > 0
    // cfg.force is mainly for keep invoking onframe and ondone callback even if animation is not necessary.
    // So if there is already has animators. There is no need to create another animator if not necessary.
    // Or it will always add one more with empty target.
    || (cfg.force && !animators.length)
  ) {
    let revertedSource: Dictionary<any>;
    let reversedTarget: Dictionary<any>;
    let sourceClone: Dictionary<any>;
    if (reverse) {
      reversedTarget = {};
      if (setToFinal) {
        revertedSource = {};
      }
      for (let i = 0; i < keyLen; i++) {
        const innerKey = animationKeys[i];
        reversedTarget[innerKey] = animateObj[innerKey];
        if (setToFinal) {
          revertedSource[innerKey] = target[innerKey];
        }
        else {
          // The usage of "animateFrom" expects that the element props has been updated dirctly to
          // "final" values outside, and input the "from" values here (i.e., in variable `target` here).
          // So here we assign the "from" values directly to element here (rather that in the next frame)
          // to prevent the "final" values from being read in any other places (like other running
          // animator during callbacks).
          // But if `setToFinal: true` this feature can not be satisfied.
          animateObj[innerKey] = target[innerKey];
        }
      }
    }
    else if (setToFinal) {
      sourceClone = {};
      for (let i = 0; i < keyLen; i++) {
        const innerKey = animationKeys[i];
        // NOTE: Must clone source after the stopTracks. The property may be modified in stopTracks.
        sourceClone[innerKey] = cloneValue(animateObj[innerKey]);
        // Use copy, not change the original reference
        // Copy from target to source.
        copyValue(animateObj, target, innerKey);
      }
    }

    const animator = new Animator(animateObj, false, false, additive ? filter(
      // Use key string instead object reference because ref may be changed.
      existsAnimators, animator => animator.targetName === topKey
    ) : null);

    animator.targetName = topKey;
    if (cfg.scope) {
      animator.scope = cfg.scope;
    }

    if (setToFinal && revertedSource) {
      animator.whenWithKeys(0, revertedSource, animationKeys);
    }
    if (sourceClone) {
      animator.whenWithKeys(0, sourceClone, animationKeys);
    }

    animator.whenWithKeys(
      duration == null ? 500 : duration,
      reverse ? reversedTarget : target,
      animationKeys
    ).delay(delay || 0);

    animatable.addAnimator(animator, topKey);
    animators.push(animator);
  }
}

export default Element;