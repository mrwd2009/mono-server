import { ArrayLike, Dictionary, KeyOfDistributive } from './types';

export function isArrayLike(data: any): boolean {
  if (!data) {
    return false;
  }
  if (typeof data === 'string') {
    return false;
  }
  return typeof data.length === 'number';
}

export function keys<T extends object>(obj: T): (KeyOfDistributive<T> & string)[] {
  if (!obj) {
    return [];
  }

  type TKeys = KeyOfDistributive<T> & string;
  if (Object.keys) {
    return Object.keys(obj) as TKeys[];
  }

  let keyList: TKeys[] = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyList.push(key as any);
    }
  }
  return keyList;
}

export function logError(...args: any[]) {
  if (typeof console !== 'undefined') {
    console.error.apply(console, args);
  }
}

export function extend<T extends Dictionary<any>, S extends Dictionary<any>>(target: T, source: S): T & S {
  if (Object.assign) {
    Object.assign(target, source);
  } else {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        (target as S & T)[key] = (source as T & S)[key];
      }
    }
  }
  return target as T & S;
}

export function isObject<T = unknown>(value: T): value is (object & T) {
  const type = typeof value;
  return type === 'function' || (!!value && type === 'object');
}

export function indexOf<T>(array: T[] | readonly T[] | ArrayLike<T>, value: T): number {
  if (array) {
    if ((array as T[]).indexOf) {
      return (array as T[]).indexOf(value);
    }
    for (let i = 0, len = array.length; i < len; i++) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
}

export function defaults<T extends Dictionary<any>, S extends Dictionary<any>>(target: T, source: S, overlay?: boolean): T & S {
  const keysArr = keys(source);
  for (let i = 0; i < keysArr.length; i++) {
    let key = keysArr[i];
    if ((overlay ? source[key] != null : (target as T & S)[key] == null)) {
      (target as T & S)[key] = (source as T & S)[key];
    }
  }
  return target as T & S;
}

export function mixin<T, S>(target: T | Function, source: S | Function, override?: boolean) {
  target = 'prototype' in target ? target.prototype : target;
  source = 'prototype' in source ? source.prototype : source;

  // prototype of es6 class is not enumerable
  if (Object.getOwnPropertyNames) {
    const keyList = Object.getOwnPropertyNames(source);
    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      if (key !== 'constructor') {
        if ((override ? (source as any)[key] !=  null : (target as any)[key] == null)) {
          (target as any)[key] = (source as any)[key];
        }
      }
    }
  } else {
    defaults(target, source, override);
  }
}

const BUILTIN_OBJECT: {[key: string]: boolean} = {
  '[object Function]': true,
  '[object RegExp]': true,
  '[object Date]': true,
  '[object Error]': true,
  '[object CanvasGradient]': true,
  '[object CanvasPattern]': true,
  // For node-canvas
  '[object Image]': true,
  '[object Canvas]': true
};

const TYPED_ARRAY: {[key: string]: boolean} = {
  '[object Int8Array]': true,
  '[object Uint8Array]': true,
  '[object Uint8ClampedArray]': true,
  '[object Int16Array]': true,
  '[object Uint16Array]': true,
  '[object Int32Array]': true,
  '[object Uint32Array]': true,
  '[object Float32Array]': true,
  '[object Float64Array]': true
};
const objToString = Object.prototype.toString;
const protoKey = '__proto__';

export function isTypedArray(value: any): boolean {
  return !!TYPED_ARRAY[objToString.call(value)];
}

let idStart = 0;
export function guid(): number {
  return idStart++;
}

export function createObject<T>(proto?: object, properties?: T): T {
  let obj: T;

  if (Object.create) {
    obj = Object.create(proto);
  } else {
    const Ctor = function() {};
    Ctor.prototype = proto;
    obj = new (Ctor as any)();
  }
  if (properties) {
    extend(obj, properties);
  }

  return obj;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

const primitiveKey = '__ec_primitive__';

export function setAsPrimitive(obj: any) {
  obj[primitiveKey] = true;
}

export function isPrimitive(obj: any): boolean {
  return obj[primitiveKey];
}

export function isDom(value: any): value is HTMLElement {
  return typeof value === 'object' && typeof value.nodeType === 'number' && typeof value.ownerDocument === 'object';
}

export function clone<T extends any>(source: T): T {
  if (source == null || typeof source !== 'object') {
    return source;
  }

  let result = source as any;
  const typeStr = objToString.call(source);

  if (typeStr === '[object Array]') {
    if (!isPrimitive(source)) {
      result = [] as any;
      for (let i = 0, len = (source as any[]).length; i < len; i++) {
        result[i] = clone((source as any[])[i]);
      }
    }
  } else if (TYPED_ARRAY[typeStr]) {
    if (!isPrimitive(source)) {
      const Ctor = source.constructor as typeof Float32Array;
      if (Ctor.from) {
        result = Ctor.from(source as Float32Array);
      } else {
        result = new Ctor((source as Float32Array).length);
        for (let i = 0, len = (source as Float32Array).length; i < len; i++) {
          result[i] = clone((source as Float32Array)[i]);
        }
      }
    }
  } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
    result = {} as any;
    for (let key in source) {
      if (source.hasOwnProperty(key) && key !== protoKey) {
        result[key] = clone(source[key]);
      }
    }
  }

  return result;
}

export function retrieve2<T, R>(value0: T, value1: R): T | R {
  return value0 != null ? value0 : value1;
}

export function retrieve3<T, R, W>(value0: T, value1: R, value2: W): T | R | W {
  return value0 != null ? value0 : (value1 != null ? value1 : value2);
}

const arrayProto = Array.prototype;
const nativeForEach = arrayProto.forEach;
const nativeFilter = arrayProto.filter;
const nativeSlice = arrayProto.slice;
const nativeMap = arrayProto.map;

export function each<I extends Dictionary<any> | any[] | readonly any[] | ArrayLike<any>, Context>(
  arr: I,
  cb: (this: Context, value: I extends (infer T)[] | readonly (infer T)[] | ArrayLike<infer T> ? T : I extends Dictionary<any> ? I extends Record<infer K, infer T> ? T : unknown : unknown, index?: I extends any[] | readonly any[] | ArrayLike<any> ? number : keyof I & string, arr?: I) => void,
  context?: Context
) {
  if (!(arr && cb)) {
    return;
  }
  if ((arr as any).forEach && (arr as any).forEach === nativeForEach) {
    (arr as any).forEach(cb, context);
  } else if (arr.length === +arr.length) {
    for (let i = 0, len = arr.length; i < len; i++) {
      cb.call(context, (arr as any[])[i], i as any, arr);
    }
  } else {
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        cb.call(context, (arr as Dictionary<any>)[key], key as any, arr);
      }
    }
  }
}

export const forEach = each;

export function normalizeCssArray(val: number | number []) {
  if (typeof val === 'number') {
    return [val, val, val, val];
  }
  const len = val.length;
  if (len === 2) {
    return [val[0], val[1], val[0], val[1]];
  } else if (len === 3) {
    return [val[0], val[1], val[2], val[1]];
  }
  return val;
}

export function trim(str: string): string {
  if (str == null) {
    return null;
  } else if (typeof str.trim === 'function') {
    return str.trim();
  } else {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
}

const methods: { [key: string]: Function } = {};
export function $override(name: string, fn: Function) {
  methods[name] = fn;
}

methods.createCanvas = (): HTMLCanvasElement => {
  return document.createElement('canvas');
}

export const createCanvas = (): HTMLCanvasElement => {
  return methods.createCanvas();
}


type SliceParams = Parameters<typeof nativeSlice>;
export function slice<T>(arr: ArrayLike<T>, ...args: SliceParams): T[] {
    return nativeSlice.apply(arr, args as any[]);
}

export function map<T, R, Context>(
  arr: readonly T[],
  cb: (this: Context, val: T, index?: number, arr?: readonly T[]) => R,
  context?: Context
): R[] {
  // Take the same behavior with lodash when !arr and !cb,
  // which might be some common sense.
  if (!arr) {
      return [];
  }
  if (!cb) {
      return slice(arr) as unknown[] as R[];
  }
  if (arr.map && arr.map === nativeMap) {
      return arr.map(cb, context);
  }
  else {
      const result = [];
      for (let i = 0, len = arr.length; i < len; i++) {
          // FIXME: should the elided item be travelled, like `[33,,55]`.
          result.push(cb.call(context, arr[i], i, arr));
      }
      return result;
  }
}

export function reduce<T, S, Context>(
  arr: readonly T[],
  cb: (this: Context, previousValue: S, currentValue: T, currentIndex?: number, arr?: readonly T[]) => S,
  memo?: S,
  context?: Context,
): S {
  if (!(arr && cb)) {
    return;
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    memo = cb.call(context, memo, arr[i], i, arr);
  }
  return memo;
}

export function noop() {}

export function isArray(value: any): value is any[] {
  if (Array.isArray) {
      return Array.isArray(value);
  }
  return objToString.call(value) === '[object Array]';
}

export function isNumber(value: any): value is number {
  // Faster than `objToString.call` several times in chromium and webkit.
  // And `new Number()` is rarely used.
  return typeof value === 'number';
}