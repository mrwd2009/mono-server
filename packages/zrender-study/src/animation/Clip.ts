import easingFuncs, { AnimationEasing } from './easing';
import type Animation from './Animation';

type OnFrameCallback = (percent: number) => void;
type OnDestroyCallback = () => void;
type OnRestartCalblack = () => void;

export type DeferredEventTypes = 'destroy' | 'restart';

export interface ClipProps {
  life?: number;
  delay?: number;
  loop?: boolean;
  gap?: number;
  easing?: AnimationEasing;

  onframe?: OnFrameCallback;
  ondestroy?: OnDestroyCallback;
  onrestart?: OnRestartCalblack;
}

export default class Clip {
  private _life: number;
  private _delay: number;
  private _initialized = false;
  private _startTime = 0;
  private _pausedTime = 0;
  private _paused = false;

  animation: Animation;

  loop: boolean;
  gap: number;
  easing: AnimationEasing;

  next: Clip;
  prev: Clip;

  onframe: OnFrameCallback;
  ondestroy: OnDestroyCallback;
  onrestart: OnRestartCalblack;

  constructor(opts: ClipProps) {
    this._life = opts.life || 1000;
    this._delay = opts.delay || 0;
    this.loop = opts.loop == null ? false : opts.loop;
    this.gap = opts.gap || 0;
    this.easing = opts.easing || 'linear';
    this.onframe = opts.onframe;
    this.ondestroy = opts.ondestroy;
    this.onrestart = opts.onrestart;
  }

  private _restart(globalTime: number) {
    const remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
    this._startTime = globalTime - remainder + this.gap;
    this._pausedTime = 0;
  }

  step(globalTime: number, deltaTime: number): boolean | null {
    if (!this._initialized) {
      this._startTime = globalTime + this._delay;
      this._initialized = true;
    }

    if (this._paused) {
      this._pausedTime += deltaTime;
      return null;
    }

    let percent = (globalTime - this._startTime - this._pausedTime) / this._life;
    if (percent < 0) {
      percent = 0;
    }

    percent = Math.min(percent, 1);

    const easing = this.easing;
    const easingFunc = typeof easing === 'string' ? easingFuncs[easing as keyof typeof easingFuncs] : easing;
    const schedule = typeof easingFunc === 'function' ? easingFunc(percent) : percent;
    this.onframe?.(schedule);

    if (percent === 1) {
      if (this.loop) {
        this._restart(globalTime);
        this.onrestart?.();
      } else {
        return true;
      }
    }
    return false;
  }

  pause() {
    this._paused = true;
  }

  resume() {
    this._paused = false;
  }
}