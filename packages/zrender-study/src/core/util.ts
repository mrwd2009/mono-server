import { ArrayLike, KeyOfDistributive } from './types';

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