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
