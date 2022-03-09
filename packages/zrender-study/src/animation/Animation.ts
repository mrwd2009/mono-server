import Eventful from '../core/Eventful';
import requestAnimationFrame from './requestAnimationFrame';
import Clip from './Clip';
import Animator from './Animator';

export function getTime() {
  return new Date().getTime();
}

interface Stage {
  update?: () => void;
}

interface AnimationOption {
  stage?: Stage;
}

export default class Animation extends Eventful {
  stage: Stage;

  private _head: Clip;
  private _tail: Clip;

  private _running = false;

  private _time = 0;
  private _pausedTime = 0;
  private _pausedStart = 0;

  private _paused = false;

  constructor(opts?: AnimationOption) {
    super();
    opts = opts || {};
    this.stage = opts.stage || {};
  }

  addClip(clip: Clip) {
    if (clip.animation) {
      this.removeClip(clip);
    }

    if (!this._head) {
      this._head = this._tail = clip;
    } else {
      this._tail.next = clip;
      clip.prev = this._tail;
      clip.next = null;
      this._tail = clip;
    }
    clip.animation = this;
  }

  addAnimator(animator: Animator<any>) {
    animator.animation = this;
    const clip = animator.getClip();
    if (clip) {
      this.addClip(clip);
    }
  }

  removeClip(clip: Clip) {
    if (!clip.animation) {
      return;
    }
    const prev = clip.prev;
    const next = clip.next;
    if (prev) {
      prev.next = next;
    } else {
      this._head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this._tail = prev;
    }
    clip.next = clip.prev = clip.animation = null;
  }

  removeAnimator(animator: Animator<any>) {
    const clip = animator.getClip();
    if (clip) {
      this.removeClip(clip);
    }
    animator.animation = null;
  }

  update(notTriggerFrameAndStageUpdate?: boolean) {
    const time = getTime() - this._pausedTime;
    const delta = time - this._time;
    let clip = this._head;

    while(clip) {
      const nextClip = clip.next;
      let finished = clip.step(time, delta);
      if (finished) {
        clip.ondestroy?.();
        this.removeClip(clip);
        clip = nextClip;
      } else {
        clip = nextClip;
      }
    }

    this._time = time;
    if (!notTriggerFrameAndStageUpdate) {
      this.trigger('frame', delta);

      this.stage.update?.();
    }
  }

  _startLoop() {
    this._running = true;

    const step = () => {
      if (this._running) {
        requestAnimationFrame(step);
        !this._paused && this.update();
      }
    };
    requestAnimationFrame(step);
  }

  start() {
    if (this._running) {
      return;
    }
    this._time = getTime();
    this._pausedTime = 0;
    this._startLoop();
  }

  stop() {
    this._running = false;
  }

  pause() {
    if (!this._paused) {
      this._pausedStart = getTime();
      this._paused = true;
    }
  }

  resume() {
    if (this._paused) {
      this._pausedTime += getTime() - this._pausedStart;
      this._paused = false;
    }
  }

  clear() {
    let clip = this._head;

    while (clip) {
      let nextClip = clip.next;
      clip.prev = clip.next = clip.animation = null;
      clip = nextClip;
    }

    this._head = this._tail = null;
  }

  isFinished() {
    return this._head == null;
  }

  animate<T>(target: T, options?: { loop?: boolean }) {
    options = options || {};

    this.start();
    const animator = new Animator(target, options.loop);
    this.addAnimator(animator);
    return animator;
  }
}