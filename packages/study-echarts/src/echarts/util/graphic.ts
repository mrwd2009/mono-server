import * as pathTool from 'zrender/src/tool/path';
import * as matrix from 'zrender/src/core/matrix';
import * as vector from 'zrender/src/core/vector';
import Path, { PathProps } from 'zrender/src/graphic/Path';
import Transformable from 'zrender/src/core/Transformable';
import ZRImage, { ImageStyleProps } from 'zrender/src/graphic/Image';
import Group from 'zrender/src/graphic/Group';
import ZRText from 'zrender/src/graphic/Text';
import Circle from 'zrender/src/graphic/shape/Circle';
import Ellipse from 'zrender/src/graphic/shape/Ellipse';
import Sector from 'zrender/src/graphic/shape/Sector';
import Ring from 'zrender/src/graphic/shape/Ring';
import Polygon from 'zrender/src/graphic/shape/Polygon';
import Polyline from 'zrender/src/graphic/shape/Polyline';
import Rect from 'zrender/src/graphic/shape/Rect';
import Line from 'zrender/src/graphic/shape/Line';
import BezierCurve from 'zrender/src/graphic/shape/BezierCurve';
import Arc from 'zrender/src/graphic/shape/Arc';
import CompoundPath from 'zrender/src/graphic/CompoundPath';
import LinearGradient from 'zrender/src/graphic/LinearGradient';
import RadialGradient from 'zrender/src/graphic/RadialGradient';
import BoundingRect from 'zrender/src/core/BoundingRect';
// import OrientedBoundingRect from 'zrender/src/core/OrientedBoundingRect';
import Point from 'zrender/src/core/Point';
// import IncrementalDisplayable from 'zrender/src/graphic/IncrementalDisplayable';
import * as subPixelOptimizeUtil from 'zrender/src/graphic/helper/subPixelOptimize';
import { Dictionary } from 'zrender/src/core/types';
import Displayable, { DisplayableProps } from 'zrender/src/graphic/Displayable';
import Element from 'zrender/src/Element';
import Model from '../model/Model';
import {
  AnimationOptionMixin,
  ZRRectLike,
  ZRStyleProps,
  CommonTooltipOption,
  ComponentItemTooltipLabelFormatterParams
} from './types';
import {
  extend,
  isArrayLike,
  map,
  defaults,
  isString,
  keys,
  each,
  hasOwn,
  isArray
} from 'zrender/src/core/util';
import { getECData } from './innerStore';
import ComponentModel from '../model/Component';


import {
  updateProps,
  initProps,
  removeElement,
  removeElementWithFadeOut,
  isElementRemoved
} from '../animation/basicTrasition';

export { updateProps, initProps, removeElement, removeElementWithFadeOut, isElementRemoved };

const mathMax = Math.max;
const mathMin = Math.min;

const _customShapeMap: Dictionary<{ new(): Path }> = {};

type ExtendShapeOpt = Parameters<typeof Path.extend>[0];
type ExtendShapeReturn = ReturnType<typeof Path.extend>;

export function extendShape(opts: ExtendShapeOpt): ExtendShapeReturn {
  return Path.extend(opts);
}

const extendPathFromString = pathTool.extendFromString;
type SVGPathOption = Parameters<typeof extendPathFromString>[1];
type SVGPathCtor = ReturnType<typeof extendPathFromString>;
type SVGPath = InstanceType<SVGPathCtor>;

export function extendPath(pathData: string, opts: SVGPathOption): SVGPathCtor {
  return extendPathFromString(pathData, opts);
}

export function registerShape(name: string, ShapeClass: { new(): Path }) {
  _customShapeMap[name] = ShapeClass;
}

export function getShapeClass(name: string): { new(): Path } | undefined {
  if (_customShapeMap.hasOwnProperty(name)) {
    return _customShapeMap[name];
  }
}

/**
 * Create a path element from path data string
 * @param pathData
 * @param opts
 * @param rect
 * @param layout 'center' or 'cover' default to be cover
 */
export function makePath(
  pathData: string,
  opts: SVGPathOption,
  rect: ZRRectLike,
  layout?: 'center' | 'cover'
): SVGPath {
  const path = pathTool.createFromString(pathData, opts);
  if (rect) {
    if (layout === 'center') {
      rect = centerGraphic(rect, path.getBoundingRect());
    }
    resizePath(path, rect);
  }
  return path;
}

export function makeImage(
  imageUrl: string,
  rect: ZRRectLike,
  layout?: 'center' | 'cover'
) {
  const zrImg = new ZRImage({
    style: {
      image: imageUrl,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    onload(img) {
      if (layout === 'center') {
        const boundingRect = {
          width: img.width,
          height: img.height
        };
        zrImg.setStyle(centerGraphic(rect, boundingRect));
      }
    }
  });
  return zrImg;
}

function centerGraphic(rect: ZRRectLike, boundingRect: {
  width: number
  height: number
}): ZRRectLike {
  // Set rect to center, keep width / height ratio.
  const aspect = boundingRect.width / boundingRect.height;
  let width = rect.height * aspect;
  let height;
  if (width <= rect.width) {
    height = rect.height;
  }
  else {
    width = rect.width;
    height = width / aspect;
  }
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;

  return {
    x: cx - width / 2,
    y: cy - height / 2,
    width: width,
    height: height
  };
}

export const mergePath = pathTool.mergePath;

export function resizePath(path: SVGPath, rect: ZRRectLike): void {
  if (!path.applyTransform) {
    return;
  }

  const pathRect = path.getBoundingRect();

  const m = pathRect.calculateTransform(rect);

  path.applyTransform(m);
}

export function subPixelOptimizeLine(param: {
  shape: {
    x1: number, y1: number, x2: number, y2: number
  },
  style: {
    lineWidth: number
  }
}) {
  subPixelOptimizeUtil.subPixelOptimizeLine(param.shape, param.shape, param.style);
  return param;
}

export function subPixelOptimizeRect(param: {
  shape: {
    x: number, y: number, width: number, height: number
  },
  style: {
    lineWidth: number
  }
}) {
  subPixelOptimizeUtil.subPixelOptimizeRect(param.shape, param.shape, param.style);
  return param;
}

export const subPixelOptimize = subPixelOptimizeUtil.subPixelOptimize;

export function getTransform(target: Transformable, ancestor?: Transformable): matrix.MatrixArray {
  const mat = matrix.identity([]);

  while (target && target !== ancestor) {
    matrix.mul(mat, target.getLocalTransform(), mat);
    target = target.parent;
  }

  return mat;
}

export function applyTransform(
  target: vector.VectorArray,
  transform: Transformable | matrix.MatrixArray,
  invert?: boolean
): number[] {
  if (transform && !isArrayLike(transform)) {
    transform = Transformable.getLocalTransform(transform);
  }

  if (invert) {
    transform = matrix.invert([], transform as matrix.MatrixArray);
  }
  return vector.applyTransform([], target, transform as matrix.MatrixArray);
}

export function transformDirection(
  direction: 'left' | 'right' | 'top' | 'bottom',
  transform: matrix.MatrixArray,
  invert?: boolean
): 'left' | 'right' | 'top' | 'bottom' {

  // Pick a base, ensure that transform result will not be (0, 0).
  const hBase = (transform[4] === 0 || transform[5] === 0 || transform[0] === 0)
    ? 1 : Math.abs(2 * transform[4] / transform[0]);
  const vBase = (transform[4] === 0 || transform[5] === 0 || transform[2] === 0)
    ? 1 : Math.abs(2 * transform[4] / transform[2]);

  let vertex: vector.VectorArray = [
    direction === 'left' ? -hBase : direction === 'right' ? hBase : 0,
    direction === 'top' ? -vBase : direction === 'bottom' ? vBase : 0
  ];

  vertex = applyTransform(vertex, transform, invert);

  return Math.abs(vertex[0]) > Math.abs(vertex[1])
    ? (vertex[0] > 0 ? 'right' : 'left')
    : (vertex[1] > 0 ? 'bottom' : 'top');
}


function isNotGroup(el: Element): el is Displayable {
  return !el.isGroup;
}
function isPath(el: Displayable): el is Path {
  return (el as Path).shape != null;
}

export function groupTransition(
  g1: Group,
  g2: Group,
  animatableModel: Model<AnimationOptionMixin>
) {
  if (!g1 || !g2) {
      return;
  }

  function getElMap(g: Group) {
      const elMap: Dictionary<Displayable> = {};
      g.traverse(function (el: Element) {
          if (isNotGroup(el) && el.anid) {
              elMap[el.anid] = el;
          }
      });
      return elMap;
  }
  function getAnimatableProps(el: Displayable) {
      const obj: PathProps = {
          x: el.x,
          y: el.y,
          rotation: el.rotation
      };
      if (isPath(el)) {
          obj.shape = extend({}, el.shape);
      }
      return obj;
  }
  const elMap1 = getElMap(g1);

  g2.traverse(function (el) {
      if (isNotGroup(el) && el.anid) {
          const oldEl = elMap1[el.anid];
          if (oldEl) {
              const newProp = getAnimatableProps(el);
              el.attr(getAnimatableProps(oldEl));
              updateProps(el, newProp, animatableModel, getECData(el).dataIndex);
          }
      }
  });
}

export function clipPointsByRect(points: vector.VectorArray[], rect: ZRRectLike): number[][] {
  // FIXME: this way migth be incorrect when grpahic clipped by a corner.
  // and when element have border.
  return map(points, function (point) {
      let x = point[0];
      x = mathMax(x, rect.x);
      x = mathMin(x, rect.x + rect.width);
      let y = point[1];
      y = mathMax(y, rect.y);
      y = mathMin(y, rect.y + rect.height);
      return [x, y];
  });
}

export function clipRectByRect(targetRect: ZRRectLike, rect: ZRRectLike): ZRRectLike {
  const x = mathMax(targetRect.x, rect.x);
  const x2 = mathMin(targetRect.x + targetRect.width, rect.x + rect.width);
  const y = mathMax(targetRect.y, rect.y);
  const y2 = mathMin(targetRect.y + targetRect.height, rect.y + rect.height);

  // If the total rect is cliped, nothing, including the border,
  // should be painted. So return undefined.
  if (x2 >= x && y2 >= y) {
      return {
          x: x,
          y: y,
          width: x2 - x,
          height: y2 - y
      };
  }
}

export function createIcon(
  iconStr: string,    // Support 'image://' or 'path://' or direct svg path.
  opt?: Omit<DisplayableProps, 'style'>,
  rect?: ZRRectLike
): SVGPath | ZRImage {
  const innerOpts: DisplayableProps = extend({rectHover: true}, opt);
  const style: ZRStyleProps = innerOpts.style = {strokeNoScale: true};
  rect = rect || {x: -1, y: -1, width: 2, height: 2};

  if (iconStr) {
      return iconStr.indexOf('image://') === 0
          ? (
              (style as ImageStyleProps).image = iconStr.slice(8),
              defaults(style, rect),
              new ZRImage(innerOpts)
          )
          : (
              makePath(
                  iconStr.replace('path://', ''),
                  innerOpts,
                  rect,
                  'center'
              )
          );
  }
}

export function linePolygonIntersect(
  a1x: number, a1y: number, a2x: number, a2y: number,
  points: vector.VectorArray[]
): boolean {
  for (let i = 0, p2 = points[points.length - 1]; i < points.length; i++) {
      const p = points[i];
      if (lineLineIntersect(a1x, a1y, a2x, a2y, p[0], p[1], p2[0], p2[1])) {
          return true;
      }
      p2 = p;
  }
}

export function lineLineIntersect(
  a1x: number, a1y: number, a2x: number, a2y: number,
  b1x: number, b1y: number, b2x: number, b2y: number
): boolean {
  // let `vec_m` to be `vec_a2 - vec_a1` and `vec_n` to be `vec_b2 - vec_b1`.
  const mx = a2x - a1x;
  const my = a2y - a1y;
  const nx = b2x - b1x;
  const ny = b2y - b1y;

  // `vec_m` and `vec_n` are parallel iff
  //     exising `k` such that `vec_m = k · vec_n`, equivalent to `vec_m X vec_n = 0`.
  const nmCrossProduct = crossProduct2d(nx, ny, mx, my);
  if (nearZero(nmCrossProduct)) {
      return false;
  }

  // `vec_m` and `vec_n` are intersect iff
  //     existing `p` and `q` in [0, 1] such that `vec_a1 + p * vec_m = vec_b1 + q * vec_n`,
  //     such that `q = ((vec_a1 - vec_b1) X vec_m) / (vec_n X vec_m)`
  //           and `p = ((vec_a1 - vec_b1) X vec_n) / (vec_n X vec_m)`.
  const b1a1x = a1x - b1x;
  const b1a1y = a1y - b1y;
  const q = crossProduct2d(b1a1x, b1a1y, mx, my) / nmCrossProduct;
  if (q < 0 || q > 1) {
      return false;
  }
  const p = crossProduct2d(b1a1x, b1a1y, nx, ny) / nmCrossProduct;
  if (p < 0 || p > 1) {
      return false;
  }

  return true;
}


function crossProduct2d(x1: number, y1: number, x2: number, y2: number) {
  return x1 * y2 - x2 * y1;
}

function nearZero(val: number) {
  return val <= (1e-6) && val >= -(1e-6);
}

export function setTooltipConfig(opt: {
  el: Element,
  componentModel: ComponentModel,
  itemName: string,
  itemTooltipOption?: string | CommonTooltipOption<unknown>
  formatterParamsExtra?: Dictionary<unknown>
}): void {
  const itemTooltipOption = opt.itemTooltipOption;
  const componentModel = opt.componentModel;
  const itemName = opt.itemName;

  const itemTooltipOptionObj = isString(itemTooltipOption)
      ? { formatter: itemTooltipOption }
      : itemTooltipOption;
  const mainType = componentModel.mainType;
  const componentIndex = componentModel.componentIndex;

  const formatterParams = {
      componentType: mainType,
      name: itemName,
      $vars: ['name']
  } as ComponentItemTooltipLabelFormatterParams;
  (formatterParams as any)[mainType + 'Index'] = componentIndex;

  const formatterParamsExtra = opt.formatterParamsExtra;
  if (formatterParamsExtra) {
      each(keys(formatterParamsExtra), key => {
          if (!hasOwn(formatterParams, key)) {
              formatterParams[key] = formatterParamsExtra[key];
              formatterParams.$vars.push(key);
          }
      });
  }

  const ecData = getECData(opt.el);
  ecData.componentMainType = mainType;
  ecData.componentIndex = componentIndex;
  ecData.tooltipConfig = {
      name: itemName,
      option: defaults({
          content: itemName,
          formatterParams: formatterParams
      }, itemTooltipOptionObj)
  };
}

function traverseElement(el: Element, cb: (el: Element) => boolean | void) {
  let stopped;
  // TODO
  // Polyfill for fixing zrender group traverse don't visit it's root issue.
  if (el.isGroup) {
      stopped = cb(el);
  }
  if (!stopped) {
      el.traverse(cb);
  }
}

export function traverseElements(els: Element | Element[] | undefined | null, cb: (el: Element) => boolean | void) {
  if (els) {
      if (isArray(els)) {
          for (let i = 0; i < els.length; i++) {
              traverseElement(els[i], cb);
          }
      }
      else {
          traverseElement(els, cb);
      }
  }
}

registerShape('circle', Circle as any);
registerShape('ellipse', Ellipse as any);
registerShape('sector', Sector as any);
registerShape('ring', Ring as any);
registerShape('polygon', Polygon as any);
registerShape('polyline', Polyline as any);
registerShape('rect', Rect as any);
registerShape('line', Line as any);
registerShape('bezierCurve', BezierCurve as any);
registerShape('arc', Arc as any);

export {
  Group,
  ZRImage as Image,
  ZRText as Text,
  Circle,
  Ellipse,
  Sector,
  Ring,
  Polygon,
  Polyline,
  Rect,
  Line,
  BezierCurve,
  Arc,
  // IncrementalDisplayable,
  // CompoundPath,
  LinearGradient,
  RadialGradient,
  BoundingRect,
  // OrientedBoundingRect,
  Point,
  Path
};