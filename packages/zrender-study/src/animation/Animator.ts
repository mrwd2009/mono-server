import Clip from './Clip';
import { ArrayLike, Dictionary } from '../core/types';
import { AnimationEasing } from './easing';
// import type Animation from './Animation';
import { isArrayLike, keys, logError } from '../core/util';
import * as color from '../tool/color';

type NumberArray = ArrayLike<number>;
type InterpolatableType = string | number | NumberArray | NumberArray[];

const slice = Array.prototype.slice;

export function interpolateNumber(p0: number, p1: number, percent: number): number {
  return (p1 - p0) * percent + p0;
}

export function step(p0: any, p1: any, percent: number): any {
  return percent > 0.5 ? p1 : p0;
}

export function interpolate1DArray(out: NumberArray, p0: NumberArray, p1: NumberArray, percent: number) {
  const len = p0.length;
  for (let i = 0; i < len; i++) {
    out[i] = interpolateNumber(p0[i], p1[i], percent);
  }
}

export function interpolate2DArray(out: NumberArray[], p0: NumberArray[], p1: NumberArray[], percent: number) {
  const len = p0.length;
  for (let i = 0; i < len; i++) {
    if (!out[i]) {
      out[i] = [];
    }
    const len2 = p0[i].length;
    for (let j = 0; j < len2; j++) {
      out[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent);
    }
  }
}

export function add1DArray(out: NumberArray, p0: NumberArray, p1: NumberArray, sign: 1 | -1) {
  const len = p0.length;
  for (let i = 0; i < len; i++) {
    out[i] = p0[i] + p1[i] * sign;
  }
  return out;
}

export function add2DArray(out: NumberArray[], p0: NumberArray[], p1: NumberArray[], sign: 1 | -1) {
  const len = p0.length;
  for (let i = 0; i < len; i++) {
    if (!out[i]) {
      out[i] = [];
    }
    const len2 = p0[i].length;
    for (let j = 0; j < len2; j++) {
      out[i][j] = p0[i][j] + p1[i][j] * sign;
    }
  }
  return out;
}

export function fillArray(val0: NumberArray | NumberArray[], val1: NumberArray | NumberArray[], arrDim: number) {
  let arr0 = val0 as (number | number[])[];
  let arr1 = val1 as (number | number[])[];
  if (!arr0.push || !arr1.push) {
    return;
  }

  const arr0Len = arr0.length;
  const arr1Len = arr1.length;
  if (arr0Len !== arr1Len) {
    const prevL = arr0Len > arr1Len;
    if (prevL) {
      arr0.length = arr1Len;
    } else {
      for (let i = arr0Len; i < arr1Len; i++) {
        arr0.push(arrDim === 1 ? arr1[i] : slice.call(arr1[i]))
      }
    }
  }

  const len2 = arr0[0] && (arr0[0] as number[]).length;
  for (let i = 0; i < arr0.length; i++) {
    if (arrDim === 1) {
      if (isNaN(arr0[i] as number)) {
        arr0[i] = arr1[i];
      }
    } else {
      for (let j = 0; j < len2; j++) {
        if (isNaN((arr0 as number[][])[i][j])) {
          (arr0 as number[][])[i][j] = (arr1 as number[][])[i][j];
        }
      }
    }
  }
}

export function is1DArraySame(arr0: NumberArray, arr1: NumberArray) {
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

export function catmullRomInterpolate(p0: number, p1: number, p2: number, p3: number, t: number, t2: number, t3: number) {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

export function catmullRomInterpolate1DArray(out: NumberArray, p0: NumberArray, p1: NumberArray, p2: NumberArray, p3: NumberArray, t: number, t2: number, t3: number) {
  const len = p0.length;
  for (let i = 0; i < len; i++) {
    out[i] = catmullRomInterpolate(p0[i], p1[i], p2[i], p3[i], t, t2, t3);
  }
}

export function catmullRomInterpolate2DArray(out: NumberArray[], p0:  NumberArray[], p1: NumberArray[], p2: NumberArray[], p3: NumberArray[], t: number, t2: number, t3: number) {
  const len = p0.length;
  for (let i = 0; i < len; i ++) {
    if (!out[i]) {
      out[1] = [];
    }
    const len2 = p0[i].length;
    for (let j = 0; j < len2; j++) {
      out[i][j] = catmullRomInterpolate(p0[i][j], p1[i][j], p2[i][j], p3[i][j], t, t2, t3);
    }
  }
}

export function cloneValue(value: InterpolatableType) {
  if (isArrayLike(value)) {
    value = value as number [];
    const len = value.length;
    if (isArrayLike(value[0])) {
      const ret = [];
      for (let i = 0; i < len; i++) {
        ret.push(slice.call(value[i]))
      }
    }
    return slice.call(value);
  }
  return value;
}

export function rgba2String(rgba: number[]): string {
  rgba[0] = Math.floor(rgba[0]);
  rgba[1] = Math.floor(rgba[1]);
  rgba[2] = Math.floor(rgba[2]);
  return `rgba(${rgba.join(',')})`;
}

export function guessArrayDim(value: ArrayLike<unknown>): number {
  return isArrayLike(value && (value as ArrayLike<unknown>)[0]) ? 2 : 1;
}