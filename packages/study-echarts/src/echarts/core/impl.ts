import { error } from '../util/log';

const __DEV__ = process.env.NODE_ENV === 'development';

const implsStore: Record<string, any> = {};

// TODO Type
export function registerImpl(name: string, impl: any) {
  if (__DEV__) {
    if (implsStore[name]) {
      error(`Already has an implementation of ${name}.`);
    }
  }
  implsStore[name] = impl;
}

export function getImpl(name: string) {
  if (__DEV__) {
    if (!implsStore[name]) {
      error(`Implementation of ${name} doesn't exists.`);
    }
  }
  return implsStore[name];
}