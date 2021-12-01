export type Dictionary<T> = {
  [key: string]: T;
}

export type ArrayLike<T> = {
  [key: number]: T;
  length: number;
}

export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export type TextVerticalAlign = 'top' | 'middle' | 'bottom';

export type TextAlign = 'left' | 'center' | 'right';

export type WithThisType<Func extends (...args: any) => any, This> = (this: This, ...args: Parameters<Func>) => ReturnType<Func>;

export type KeyOfDistributive<T> = T extends unknown ? keyof T : never;

export type BuiltinTextPosition = 'left' | 'right' | 'top' | 'bottom' | 'inside'
    | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom'
    | 'insideTopLeft' | 'insideTopRight'| 'insideBottomLeft' | 'insideBottomRight';

export type ElementEventName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' |
'mouseover' | 'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu' |
'drag' | 'dragstart' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop' | 'globalout';


export type ZREventProperties = {
  zrX: number,
  zrY: number,
  zrDelta: number,

  zrEventControl: 'no_globalout' | 'only_globalout',

  zrByTouch: boolean,
}

export type ZRRawMounseEvent = MouseEvent & ZREventProperties;
export type ZRRawTouchEvent = TouchEvent & ZREventProperties;
export type ZRRawPointerEvent = TouchEvent & ZREventProperties;

export type ZRRawEvent = ZRRawMounseEvent | ZRRawTouchEvent | ZRRawPointerEvent;

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type AllPropTypes<T> = PropType<T, keyof T>;

export type MapToType<T extends Dictionary<any>, S> = {
  [P in keyof T]: T[P] extends Dictionary<any> ? MapToType<T[P], S> : S
}
