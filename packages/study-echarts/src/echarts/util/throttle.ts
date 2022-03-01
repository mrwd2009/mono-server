const ORIGIN_METHOD = '\0__throttleOriginMethod' as const;
const RATE = '\0__throttleRate' as const;
const THROTTLE_TYPE = '\0__throttleType' as const;

type ThrottleFunction = (this: unknown, ...args: unknown[]) => void;
export type ThrottleType = 'fixRate' | 'debounce';

export interface ThrottleController {
  clear(): void;
  debounceNextCall(debounceDelay: number): void;
};


export function throttle<T extends ThrottleFunction>(
  fn: T,
  delay?: number,
  debounce?: boolean
): T & ThrottleController {

  let currCall;
  let lastCall = 0;
  let lastExec = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let diff;
  let scope: unknown;
  let args: unknown[];
  let debounceNextCall: number | null;

  delay = delay || 0;

  function exec(): void {
    lastExec = (new Date()).getTime();
    timer = null;
    fn.apply(scope, args || []);
  }

  const cb = function (this: unknown, ...cbArgs: unknown[]): void {
    currCall = (new Date()).getTime();
    scope = this;
    args = cbArgs;
    const thisDelay = debounceNextCall || delay;
    const thisDebounce = debounceNextCall || debounce;
    debounceNextCall = null;
    diff = currCall - (thisDebounce ? lastCall : lastExec) - thisDelay!;

    if (timer) {
      clearTimeout(timer);
    }

    // Here we should make sure that: the `exec` SHOULD NOT be called later
    // than a new call of `cb`, that is, preserving the command order. Consider
    // calculating "scale rate" when roaming as an example. When a call of `cb`
    // happens, either the `exec` is called dierectly, or the call is delayed.
    // But the delayed call should never be later than next call of `cb`. Under
    // this assurance, we can simply update view state each time `dispatchAction`
    // triggered by user roaming, but not need to add extra code to avoid the
    // state being "rolled-back".
    if (thisDebounce) {
      timer = setTimeout(exec, thisDelay);
    }
    else {
      if (diff >= 0) {
        exec();
      }
      else {
        timer = setTimeout(exec, -diff);
      }
    }

    lastCall = currCall;
  } as T & ThrottleController;

  /**
   * Clear throttle.
   * @public
   */
  cb.clear = function (): void {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  /**
   * Enable debounce once.
   */
  cb.debounceNextCall = function (debounceDelay: number): void {
    debounceNextCall = debounceDelay;
  };

  return cb;
}

export function createOrUpdate<T, S extends keyof T, P = T[S]>(
  obj: T,
  fnAttr: S,
  rate: number,
  throttleType: ThrottleType
): P extends ThrottleFunction ? P & ThrottleController : never {
  let fn = obj[fnAttr];

  if (!fn) {
    return undefined as any;
  }

  const originFn = (fn as any)[ORIGIN_METHOD] || fn;
  const lastThrottleType = (fn as any)[THROTTLE_TYPE];
  const lastRate = (fn as any)[RATE];

  if (lastRate !== rate || lastThrottleType !== throttleType) {
    if (rate == null || !throttleType) {
      return (obj[fnAttr] = originFn);
    }

    fn = obj[fnAttr] = throttle(
      originFn, rate, throttleType === 'debounce'
    );
    (fn as any)[ORIGIN_METHOD] = originFn;
    (fn as any)[THROTTLE_TYPE] = throttleType;
    (fn as any)[RATE] = rate;
  }

  return fn as ReturnType<typeof createOrUpdate>;
}

/**
* Clear throttle. Example see throttle.createOrUpdate.
*/
export function clear<T, S extends keyof T>(obj: T, fnAttr: S): void {
  const fn = obj[fnAttr];
  if (fn && (fn as any)[ORIGIN_METHOD]) {
    // Clear throttle
    (fn as any).clear && (fn as any).clear();
    obj[fnAttr] = (fn as any)[ORIGIN_METHOD];
  }
}