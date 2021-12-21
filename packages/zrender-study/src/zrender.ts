
import env from './core/env';
import Handler from './Handler';
import Storage from './Storage';
import { PainterBase } from './PainterBase';
import Animation from './animation/Animation';
import HandlerProxy from './dom/HandlerProxy';
import Element, { ElementEventCallback } from './Element';
import { Dictionary, ElementEventName, RenderedEvent, WithThisType } from './core/types';
import { LayerConfig } from './canvas/Layer';
import { GradientObject } from './graphic/Gradient';
import { PatternObject } from './graphic/Pattern';
import { EventCallback } from './core/Eventful';
import TSpan from './graphic/TSpan';
import ZRImage from './graphic/Image';
import Displayable from './graphic/Displayable';
import { lum } from './tool/color';
import { DARK_MODE_THRESHOLD } from './config';
import Path from './graphic/Path';
import Group from './graphic/Group';
import { keys, guid } from './core/util';

// deprecated
const useVML = !env.canvasSupported;

type PainterBaseCtor = {
  new(dom: HTMLElement, storage: Storage, ...args: any[]): PainterBase
}

const painterCtors: Dictionary<PainterBaseCtor> = {};

let instances: { [key: number]: ZRender } = {};

function delInstance(id: number) {
  delete instances[id];
}

function isDarkmode(backgroundColor: string | GradientObject | PatternObject): boolean {
  if (!backgroundColor) {
    return false;
  }
  if (typeof backgroundColor === 'string') {
    return lum(backgroundColor, 1) < DARK_MODE_THRESHOLD;
  } else if ((backgroundColor as GradientObject).colorStops) {
    const colorStops = (backgroundColor as GradientObject).colorStops;
    let totalLum = 0;
    const len = colorStops.length;

    for (let i = 0; i < len; i++) {
      totalLum += lum(colorStops[i].color, 1);
    }
    totalLum /= len;

    return totalLum < DARK_MODE_THRESHOLD;
  }

  return false;
}

class ZRender {
  dom: HTMLElement;

  id: number;

  storage: Storage;
  painter: PainterBase;
  handler: Handler;
  animation: Animation;

  private _sleepAfterStill = 10;

  private _stillFrameAccum = 0;

  private _needsRefresh = true;
  private _needsRefreshHover = true;

  private _darkMode = false;

  private _backgroundColor: string | GradientObject | PatternObject;

  constructor(id: number, dom: HTMLElement, opts?: ZRenderInitOpt) {
    opts = opts || {};

    this.dom = dom;
    this.id = id;
    
    const storage = new Storage();

    let rendererType = opts.renderer || 'canvas';

    if (useVML) {
      // already deprecated
      throw new Error('IE8 support has been dropped since 5.0');
    }

    if (!painterCtors[rendererType]) {
      rendererType = keys(painterCtors)[0];
    }

    if (!painterCtors[rendererType]) {
      throw new Error(`Renderer '${rendererType}' is not imported. Please import it first.`);
    }

    opts.useDirtyRect = opts.useDirtyRect == null ? false : opts.useDirtyRect;

    const painter = new painterCtors[rendererType](dom, storage, opts, id);

    this.storage = storage;
    this.painter = painter;

    let handlerProxy = null;
    if (!env.node && !env.worker) {
      handlerProxy = new HandlerProxy(painter.getViewportRoot(), painter.root);
    }

    this.handler = new Handler(storage, painter, handlerProxy, painter.root);

    this.animation = new Animation({
      stage: {
        update: () => this._flush(true)
      }
    });

    this.animation.start();
  }

  add(el: Element) {
    if (!el) {
      return;
    }

    this.storage.addRoot(el);
    el.addSelfToZr(this);
    this.refresh();
  }

  remove(el: Element) {
    if (!el) {
      return;
    }
    this.storage.delRoot(el);
    el.removeSelfFromZr(this);
    this.refresh();
  }

  configLayer(zLevel: number, config: LayerConfig) {
    if (this.painter.configLayer) {
      this.painter.configLayer(zLevel, config);
    }
    this.refresh();
  }

  setBackgroundColor(backgroundColor: string | GradientObject | PatternObject) {
    if (this.painter.setBackgroundColor) {
      this.painter.setBackgroundColor(backgroundColor);
    }
    this.refresh();
    this._backgroundColor = backgroundColor;
    this._darkMode = isDarkmode(backgroundColor);
  }

  getBackgroundColor() {
    return this._backgroundColor;
  }

  setDarkMode(darkMode: boolean) {
    this._darkMode = darkMode;
  }

  isDarkMode() {
    return this._darkMode;
  }

  refreshImmediately(fromInside?: boolean) {
    if (!fromInside) {
      this.animation.update(true);
    }
    // todo check
    this._needsRefresh = false;
    this.painter.refresh();
    this._needsRefresh = false;
  }

  refresh() {
    this._needsRefresh = true;
    this.animation.start();
  }

  flush() {
    this._flush(false);
  }

  private _flush(fromInside?: boolean) {
    let triggeredRendered;

    const start = new Date().getTime();
    if (this._needsRefresh) {
      triggeredRendered = true;
      this.refreshImmediately(fromInside);
    }

    if (this._needsRefreshHover) {
      triggeredRendered = true;
      this.refreshHoverImmediately();
    }

    const end = new Date().getTime();

    if (triggeredRendered) {
      this._stillFrameAccum = 0;
      this.trigger('rendered', {
        elapsedTime: end - start,
      } as RenderedEvent);
    } else if (this._sleepAfterStill > 0) {
      this._stillFrameAccum++;
      // stop animation
      if (this._stillFrameAccum > this._sleepAfterStill) {
        this.animation.stop();
      }
    }
  }

  setSleepAfterStill(stillFramesCount: number) {
    this._sleepAfterStill = stillFramesCount;
  }

  wakeUp() {
    this.animation.start();
    this._stillFrameAccum = 0;
  }

  addHover(el: Displayable) {
    // deprecated
  }

  removeHover(el: Path | TSpan | ZRImage) {
    // deprecated
  }

  clearHover() {
    // deprecated
  }

  refreshHover() {
    this._needsRefreshHover = true;
  }

  refreshHoverImmediately() {
    this._needsRefreshHover = false;
    if (this.painter.refreshHover && this.painter.getType() === 'canvas') {
      this.painter.refreshHover();
    }
  }

  resize(opts?: {
    width?: number | string,
    height?: number | string,
  }) {
    opts = opts || {};
    this.painter.resize(opts.width, opts.height);
    this.handler.resize();
  }

  clearAnimation() {
    this.animation.clear();
  }

  getWidth(): number {
    return this.painter.getWidth();
  }

  getHeight(): number {
    return this.painter.getHeight();
  }

  pathToImage(e: Path, dpr: number) {
    if (this.painter.pathToImage) {
      return this.painter.pathToImage(e, dpr);
    }
  }

  setCursorStyle(cursorStyle: string) {
    this.handler.setCursorStyle(cursorStyle);
  }

  findHover(x: number, y: number): {
    target: Displayable,
    topTarget: Displayable
  } {
    return this.handler.findHover(x, y);
  }

  on<Ctx>(eventName: ElementEventName, eventHandler: ElementEventCallback<Ctx, ZRenderType>, context?: Ctx): this
  on<Ctx>(eventName: string, eventHandler: WithThisType<EventCallback<any[]>, unknown extends unknown ? ZRenderType : Ctx>, context?: Ctx): this
  on<Ctx>(eventName: string, eventHandler: (...args: any) => any, context?: Ctx): this {
    this.handler.on(eventName, eventHandler, context);
    return this;
  }

  off(eventName?: string, eventHandler?: EventCallback) {
    this.handler.off(eventName, eventHandler);
  }

  trigger(eventName: string, event?: unknown) {
    this.handler.trigger(eventName, event);
  }

  clear() {
    const roots = this.storage.getRoots();
    for (let i = 0; i < roots.length; i++) {
      // todo why
      if (roots[i] instanceof Group) {
        roots[i].removeSelfFromZr(this);
      }
    }
    this.storage.delAllRoots();
    this.painter.clear();
  }

  dispose() {
    this.animation.stop();

    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();

    this.animation = null;
    this.storage = null;
    this.painter = null;
    this.handler = null;
    
    delInstance(this.id);
  }
}

export interface ZRenderInitOpt {
  renderer?: string; // 'canvas' or 'svg'
  devicePixelRatio?: number;
  width?: number | string;
  height?: number | string;
  useDirtyRect?: boolean;
}

export function init(dom: HTMLElement, opts: ZRenderInitOpt) {
  const zr = new ZRender(guid(), dom, opts);
  instances[zr.id] = zr;
  return zr;
}

export function dispose(zr: ZRender) {
  zr.dispose();
}

export function disposeAll() {
  for (let key in instances) {
    if (instances.hasOwnProperty(key)) {
      instances[key].dispose();
    }
  }
  instances = {};
}

export function getInstance(id: number): ZRender {
  return instances[id];
}

export function registerPainter(name: string, Ctor: PainterBaseCtor) {
  painterCtors[name] = Ctor;
}

export const version = '5.2.1';

export interface ZRenderType extends ZRender {};