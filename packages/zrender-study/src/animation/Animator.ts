import Clip from './Clip';
import { ArrayLike, Dictionary } from '../core/types';
import { AnimationEasing } from './easing';
import type Animation from './Animation';
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

type KeyFrame = {
  time: number;
  value: unknown;
  percent: number;
  additiveValue?: unknown;
}

let tmpRgba = [0, 0, 0, 0];

class Track {
  keyframes: KeyFrame[];
  maxTime: number = 0;

  propName: string;

  useSpline: boolean;

  arrDim = 0;
  isValueColor: boolean;

  interpolable: boolean = true;

  private _finished: boolean;

  private _needsSort = false;

  private _isAllValueEqual = true;

  private _additiveTrack: Track;
  private _additiveValue: unknown;

  private _lastFrame = 0;
  private _lastFramePercent = 0;

  constructor(propName: string) {
    this.propName = propName;
  }

  isFinished() {
    return this._finished;
  }

  setFinished() {
    this._finished = true;
    if (this._additiveTrack) {
      this._additiveTrack.setFinished();
    }
  }

  needsAnimate() {
    return !this._isAllValueEqual && this.keyframes.length >= 2 && this.interpolable && this.maxTime > 0;
  }

  getAdditiveTrack() {
    return this._additiveTrack;
  }

  addKeyframe(time: number, value: unknown) {
    if (time >= this.maxTime) {
      this.maxTime = time;
    } else {
      this._needsSort = true;
    }

    let keyframes = this.keyframes;
    let len = keyframes.length;

    if (this.interpolable) {
      if (isArrayLike(value)) {
        let arrayDim = guessArrayDim(value as unknown[]);
        if (len > 0 && this.arrDim !== arrayDim) {
          this.interpolable = false;
          return;
        }

        if ((arrayDim === 1 && typeof (value as unknown[])[0] !== 'number') || (arrayDim === 2 && typeof (value as unknown[][])[0][0] !== 'number')) {
          this.interpolable = false;
          return;
        }

        if (len > 0) {
          let lastFrame = keyframes[len - 1];

          if (this._isAllValueEqual) {
            if (arrayDim === 1) {
              if (!is1DArraySame(value as number[], lastFrame.value as number [])) {
                this._isAllValueEqual = false;
              }
            } else {
              this._isAllValueEqual = false;
            }
          }
        }
        this.arrDim = arrayDim;
      } else {
        if (this.arrDim > 0) {
          this.interpolable = false;
          return;
        }

        if (typeof value === 'string') {
          const colorArray = color.parse(value);
          if (colorArray) {
            value = colorArray;
            this.isValueColor = true;
          } else {
            this.interpolable = false;
          }
        } else if (typeof value !== 'number' || isNaN(value)) {
          this.interpolable = false;
          return;
        }

        if (this._isAllValueEqual && len > 0) {
          let lastFrame = keyframes[len -1];
          if (this.isValueColor && !is1DArraySame(lastFrame.value as number[], value as number[])) {
            this._isAllValueEqual = false;
          } else if (lastFrame.value !== value) {
            this._isAllValueEqual = false;
          }
        }
      }
    }

    const kf = {
      time,
      value,
      percent: 0,
    };
    this.keyframes.push(kf);
    return kf;
  }

  prepare(additiveTrack?: Track) {
    let kfs = this.keyframes;
    if (this._needsSort) {
      kfs.sort((a, b) => {
        return a.time - b.time;
      });
    }

    const arrDim = this.arrDim;
    const kfsLen = kfs.length;
    const lastIndex = kfsLen - 1;
    const lastKf = kfs[lastIndex];

    for (let i =0; i < kfsLen; i++) {
      kfs[i].percent = kfs[i].time / this.maxTime;

      if (arrDim > 0 && i !== lastIndex) {
        fillArray(kfs[i].value as NumberArray, lastKf.value as NumberArray, arrDim);
      }
    }
    
    if (additiveTrack
      && this.needsAnimate()
      && additiveTrack.needsAnimate()
      && arrDim === additiveTrack.arrDim
      && this.isValueColor === additiveTrack.isValueColor
      && !additiveTrack._finished
      ) {
        this._additiveTrack = additiveTrack;

        const startValue = kfs[0].value;
        for (let i = 0; i < kfsLen; i++) {
          if (arrDim === 0) {
            if (this.isValueColor) {
              kfs[i].additiveValue = add1DArray([], kfs[i].value as NumberArray, startValue as NumberArray, -1);
            } else {
              kfs[i].additiveValue = kfs[i].value as number - (startValue as number);
            }
          } else if (arrDim === 1) {
            kfs[i].additiveValue = add1DArray([], kfs[i].value as NumberArray, startValue as NumberArray, -1);
          } else if (arrDim === 2) {
            kfs[i].additiveValue = add2DArray([], kfs[i].value as NumberArray[], startValue as NumberArray[], -1);
          }
        }
      }
  }

  step(target: any, percent: number) {
    if (this._finished) {
      return;
    }

    if (this._additiveTrack?._finished) {
      this._additiveTrack = null;
    }

    const isAdditive = this._additiveTrack != null;
    const valueKey = isAdditive ? 'additiveValue' : 'value';

    const kfs = this.keyframes;
    const len = kfs.length;
    const propName = this.propName;
    const arrDim = this.arrDim;
    const isValueColor = this.isValueColor;

    let frameIndex = 0;
    if (percent < 0) {
      frameIndex = 0;
    } else if (percent < this._lastFramePercent) {
      frameIndex = 0;
      for (let i = this._lastFrame; i >=0; i--) {
        if (kfs[i].percent <= percent) {
          frameIndex = i;
          break;
        }
      }
    } else {
      frameIndex = len - 2;
      for (let i = this._lastFrame; i < len; i++) {
        if (kfs[i].percent > percent) {
          frameIndex = i - 1;
          break;
        }
      }
    }

    let nextFrame = kfs[frameIndex + 1];
    let frame = kfs[frameIndex];

    if (!(frame && nextFrame)) {
      return;
    }

    this._lastFrame = frameIndex;
    this._lastFramePercent = percent;

    const range = (nextFrame.percent - frame.percent);
    if (range === 0) {
      return;
    }

    const w = (percent - frame.percent) / range;
    let targetArr = isAdditive ? this._additiveValue : (isValueColor ? tmpRgba : target[propName]);
    if ((arrDim > 0 || isValueColor) && !targetArr) {
      targetArr = this._additiveValue = [];
    }

    if (this.useSpline) {
      const p1 = kfs[frameIndex][valueKey];
      const p0 = kfs[frameIndex === 0 ? frameIndex : frameIndex - 1][valueKey];
      const p2 = kfs[frameIndex > len - 2 ? len - 1 : frameIndex + 1][valueKey];
      const p3 = kfs[frameIndex > len - 3 ? len - 1 : frameIndex + 2][valueKey];

      if (arrDim > 0) {
        if (arrDim === 1) {
          catmullRomInterpolate1DArray(
            targetArr as NumberArray,
            p0 as NumberArray,
            p1 as NumberArray,
            p2 as NumberArray,
            p3 as NumberArray,
            w,
            w * w,
            w * w * w
          );
        } else {
          catmullRomInterpolate2DArray(
            targetArr as NumberArray[],
            p0 as NumberArray[],
            p1 as NumberArray[],
            p2 as NumberArray[],
            p3 as NumberArray[],
            w,
            w * w,
            w * w * w
          );
        }
      } else if (isValueColor) {
        catmullRomInterpolate1DArray(
          targetArr,
          p0 as NumberArray,
          p1 as NumberArray,
          p2 as NumberArray,
          p3 as NumberArray,
          w,
          w * w,
          w * w *w
        );
        if (!isAdditive) {
          target[propName] = rgba2String(targetArr);
        }
      } else {
        let value;

        if (!this.interpolable) {
          value = p2;
        } else {
          value = catmullRomInterpolate(p0 as number, p1 as number, p2 as number, p3 as number, w, w * w, w * w * w);
        }

        if (isAdditive) {
          this._additiveValue = value;
        } else {
          target[propName] = value;
        }
      }
    } else {
      if (arrDim > 0) {
        if (arrDim === 1) {
          interpolate1DArray(targetArr as NumberArray, frame[valueKey] as NumberArray, nextFrame[valueKey] as NumberArray, w);
        } else {
          interpolate2DArray(targetArr as NumberArray[], frame[valueKey] as NumberArray[], nextFrame[valueKey] as NumberArray[], w);
        }
      } else if (isValueColor) {
        interpolate1DArray(targetArr, frame[valueKey] as NumberArray, nextFrame[valueKey] as NumberArray, w);
        if (!isAdditive) {
          target[propName] = rgba2String(targetArr);
        }
      } else {
        let value;
        if (!this.interpolable) {
          value = step(frame[valueKey], nextFrame[valueKey], w);
        } else {
          value = interpolateNumber(frame[valueKey] as number, nextFrame[valueKey] as number, w);
        }

        if (isAdditive) {
          this._additiveValue = value;
        } else {
          target[propName] = value;
        }
      }
    }

    if (isAdditive) {
      this._addToTarget(target);
    }
  }

  private _addToTarget(target: any) {
    const arrDim = this.arrDim;
    const propName = this.propName;
    const additiveValue = this._additiveValue;

    if (arrDim === 0) {
      if (this.isValueColor) {
        color.parse(target[propName], tmpRgba);
        add1DArray(tmpRgba, tmpRgba, additiveValue as NumberArray, 1);
        target[propName] = rgba2String(tmpRgba);
      } else {
        target[propName] = target[propName] + additiveValue;
      }
    } else if (arrDim === 1) {
      add1DArray(target[propName], target[propName], additiveValue as NumberArray, 1);
    } else if (arrDim === 2) {
      add2DArray(target[propName], target[propName], additiveValue as NumberArray[], 1);
    }
  }
}

type DoneCallback = () => void;
type AbortCallback = () => void;
export type OnFrameCallback<T> = (target: T, percent: number) => void;

export type AnimationPropGetter<T> = (target: T, key: string) => InterpolatableType;
export type AnimationPropSetter<T> = (target: T, key: string, value: InterpolatableType) => void;

export default class Animator<T> {
  animation?: Animation;

  targetName?: string;

  scope?: string;

  __fromStateTransition?: string;

  private _tracks: Dictionary<Track> = {};
  private _trackKeys: string[] = [];

  private _target: T;

  private _loop: boolean;
  private _delay = 0;
  private _maxTime = 0;

  private _paused = false;

  private _started = 0;

  private _additiveAnimators: Animator<any>[];

  private _doneCbs: DoneCallback[];
  private _onFrameCbs: OnFrameCallback<T>[];
  private _abortedCbs: AbortCallback[];

  private _clip: Clip = null;

  constructor(target: T, loop: boolean, additiveTo?: Animator<any>[]) {
    this._target = target;
    this._loop = loop;
    if (loop && additiveTo) {
      logError("Can't use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = additiveTo;
  }

  getTarget() {
    return this._target;
  }

  changeTarget(target: T) {
    this._target = target;
  }

  when(time: number, props: Dictionary<any>) {
    return this.whenWithKeys(time, props, keys(props) as string[]);
  }

  whenWithKeys(time: number, props: Dictionary<any>, propNames: string[]) {
    const tracks = this._tracks;
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];

      let track = tracks[propName];
      if (!track) {
        track = tracks[propName] = new Track(propName);

        let initialValue;
        const additiveTrack = this._getAdditiveTrack(propName);
        if (additiveTrack) {
          const lastFinalKf = additiveTrack.keyframes[additiveTrack.keyframes.length - 1];
          initialValue = lastFinalKf && lastFinalKf.value;
          if (additiveTrack.isValueColor && initialValue) {
            initialValue = rgba2String(initialValue as number []);
          }
        } else {
          initialValue = (this._target as any)[propName];
        }

        if (initialValue == null) {
          continue;
        }

        if (time !== 0) {
          track.addKeyframe(0, cloneValue(initialValue));
        }

        this._trackKeys.push(propName);
      }
      track.addKeyframe(time, cloneValue(props[propName]));
    }
    this._maxTime = Math.max(this._maxTime, time);
    return this;
  }

  pause() {
    this._clip.pause();
    this._paused = true;
  }

  resume() {
    this._clip.resume();
    this._paused = false;
  }

  isPaused(): boolean {
    return !!this._paused;
  }

  private _doneCallback() {
    this._setTracksFinished();
    this._clip = null;

    const doneList = this._doneCbs;
    if (doneList) {
      const len = doneList.length;
      for (let i = 0; i < len; i++) {
        doneList[i].call(this);
      }
    }
  }

  private _abortedCallback() {
    this._setTracksFinished();

    const animation = this.animation;
    const abortedList = this._abortedCbs;

    if (animation) {
      animation.removeClip(this._clip);
    }
    this._clip = null;

    if (abortedList) {
      const len = abortedList.length;
      for (let i = 0; i < len; i++) {
        abortedList[i].call(this);
      }
    }
  }

  private _setTracksFinished() {
    const tracks = this._tracks;
    const tracksKeys = this._trackKeys;
    for (let i = 0; i < tracksKeys.length; i++) {
      tracks[tracksKeys[i]].setFinished();
    }
  }

  private _getAdditiveTrack(trackName: string): Track {
    let additiveTrack;
    const additiveAnimators = this._additiveAnimators;
    if (additiveAnimators) {
      for (let i = 0; i < additiveAnimators.length; i++) {
        const track = additiveAnimators[i].getTrack(trackName);
        if (track) {
          // Use latest 
          additiveTrack = track;
        }
      }
    }
    return additiveTrack;
  }

  start(easing?: AnimationEasing, forceAnimate?: boolean) {
    if (this._started > 0) {
      return;
    }

    this._started = 1;

    let tracks: Track[] = [];
    const len = this._trackKeys.length;
    for (let i = 0; i < len; i++) {
      const propName = this._trackKeys[i];
      const track = this._tracks[propName];
      const additiveTrack = this._getAdditiveTrack(propName);
      const kfs = track.keyframes;
      track.prepare(additiveTrack);
      if (track.needsAnimate()) {
        tracks.push(track);
      } else if (!track.interpolable) {
        const lastKf = kfs[kfs.length - 1];
        if (lastKf) {
          (this._target as any)[track.propName] = lastKf.value;
        }
      }
    }

    if (tracks.length || forceAnimate) {
      const clip = new Clip({
        life: this._maxTime,
        loop: this._loop,
        delay: this._delay,
        onframe: (percent: number) => {
          this._started = 2;
          const additiveAnimators = this._additiveAnimators;
          if (additiveAnimators) {
            let stillHasAdditiveAnimator = false;
            for (let i = 0; i < additiveAnimators.length; i++) {
              if (additiveAnimators[i]._clip) {
                stillHasAdditiveAnimator = true;
                break;
              }
            }
            if (!stillHasAdditiveAnimator) {
              this._additiveAnimators = null;
            }
          }

          for (let i = 0; i < tracks.length; i++) {
            tracks[i].step(this._target, percent);
          }

          const onFrameList = this._onFrameCbs;
          if (onFrameList) {
            for (let i = 0; i < onFrameList.length; i++) {
              onFrameList[i](this._target, percent);
            }
          }
        },
        ondestroy: () => {
          this._doneCallback();
        },
      });
      this._clip = clip;

      if (this.animation) {
        this.animation.addClip(clip);
      }

      if (easing && easing !== 'spline') {
        clip.easing = easing;
      }
    } else {
      this._doneCallback();
    }

    return this;
  }

  stop(forwardToLast?: boolean) {
    if (!this._clip) {
      return;
    }

    const clip = this._clip;
    if (forwardToLast) {
      clip.onframe(1);
    }

    this._abortedCallback();
  }

  delay(time: number) {
    this._delay = time;
    return this;
  }

  during(cb: OnFrameCallback<T>) {
    if (cb) {
      if (!this._onFrameCbs) {
        this._onFrameCbs = [];
      }
      this._onFrameCbs.push(cb);
    }
    return this;
  }

  done(cb: DoneCallback) {
    if (cb) {
      if (!this._doneCbs) {
        this._doneCbs = [];
      }
      this._doneCbs.push(cb);
    }
    return this;
  }

  aborted(cb: AbortCallback) {
    if (cb) {
      if (!this._abortedCbs) {
        this._abortedCbs = [];
      }
      this._abortedCbs.push(cb);
    }
    return this;
  }

  getClip() {
    return this._clip;
  }

  getTrack(propName: string) {
    return this._tracks[propName];
  }

  stopTracks(propNames: string[], forwardToLast?: boolean): boolean {
    if (!propNames.length || !this._clip) {
      return true;
    }
    const tracks = this._tracks;
    const trackKeys = this._trackKeys;

    for (let i = 0; i < propNames.length; i++) {
      const track = tracks[propNames[i]];
      if (track) {
        if (forwardToLast) {
          track.step(this._target, 1);
        } else if (this._started === 1) {
          track.step(this._target, 0);
        }
        track.setFinished();
      }
    }

    let allAborted = true;
    for (let i = 0; i < trackKeys.length; i++) {
      if (!tracks[trackKeys[i]].isFinished()) {
        allAborted = false;
        break;
      }
    }

    if (allAborted) {
      this._abortedCallback();
    }

    return allAborted;
  }

  saveFinalToTarget(target: T, trackKeys?: readonly string[]) {
    if (!target) {
      return;
    }

    trackKeys = trackKeys || this._trackKeys;

    for (let i = 0; i < trackKeys.length; i++) {
      const propName = trackKeys[i];
      const track = this._tracks[propName];
      if (!track || track.isFinished()) {
        continue;
      }

      const kfs = track.keyframes;
      const lastKf = kfs[kfs.length - 1];
      if (lastKf) {
        let val = cloneValue(lastKf.value as any);
        if (track.isValueColor) {
          val = rgba2String(val as number[]);
        }
        (target as any)[propName] = val;
      }
    }
  }

  __changeFinalValue(finalProps: Dictionary<any>, trackKeys?: readonly string[]) {
    trackKeys = trackKeys || keys(finalProps);

    for (let i = 0; i < trackKeys.length; i++) {
      const propName = trackKeys[i];

      const track = this._tracks[propName];
      if (!track) {
        continue;
      }

      const kfs = track.keyframes;
      if (kfs.length > 1) {
        const lastKf = kfs.pop();
        track.addKeyframe(lastKf.time, finalProps[propName]);
        track.prepare(track.getAdditiveTrack());
      }
    }
  }
}