import Animation from './Animation';
import Clip from './Clip';
import Animator from './Animator';

test('stage and onframe callback', () => {
  return new Promise((resolve, reject) => {
    const animation = new Animation({
      stage: {
        update: () => {
          animation.stop();
          resolve(true);
        }
      },
      onframe: (delta) => {
        try {
          expect(delta).toBeGreaterThanOrEqual(16);
        } catch (error) {
          reject(error);
        }
      }
    });
    animation.start();
  });
});

test('pause and resume', () => {
  return new Promise((resolve, reject) => {
    const animation = new Animation({
      stage: {
        update: () => {
          animation.stop();
          resolve(true);
        }
      },
      onframe: (delta) => {
        try {
          // expect(delta).toBeGreaterThanOrEqual(16);
          expect(delta).toBeLessThan(20);
        } catch (error) {
          reject(error);
        }
      }
    });
    animation.start();
    animation.pause();
    setTimeout(() => {
      animation.resume();
    }, 16 * 15);
  });
});

test('addClip and removeClip', () => {
  const animation = new Animation();
  const clip1 = new Clip({ life: 2000 });
  const clip2 = new Clip({ life: 2000 });
  expect(animation.isFinished()).toBeTruthy();
  animation.addClip(clip1);
  expect(animation.isFinished()).toBeFalsy();
  animation.addClip(clip2);
  animation.addClip(clip1);
  expect(animation.isFinished()).toBeFalsy();
  animation.removeClip(clip1);
  expect(animation.isFinished()).toBeFalsy();
  animation.removeClip(clip2);
  expect(animation.isFinished()).toBeTruthy();
  animation.addClip(clip2);
  animation.removeClip(clip1);
  animation.clear();
  expect(animation.isFinished()).toBeTruthy();
});

test('clip lifetime', () => {
  const animation = new Animation();
  let resolve: (e: unknown) => void, reject: (e: unknown) => void;
  let restared1 = false;
  let destroyed1 = false;
  const clip1 = new Clip({
    life: 500,
    loop: false,
    onframe: (percent) => {
      try {
        expect(percent).toBeLessThanOrEqual(1);
      } catch (error) {
        reject(error);
      }
    },
    ondestroy: () => {
      destroyed1 = true;
    },
    onrestart: () => {
      restared1 = true;
    }
  });
  let restared2 = false;
  let destroyed2 = false;
  const clip2 = new Clip({
    life: 600,
    loop: true,
    onframe: (percent) => {
      try {
        expect(percent).toBeLessThanOrEqual(1);
      } catch (error) {
        reject(error);
      }
    },
    ondestroy: () => {
      destroyed2 = true;
    },
    onrestart: () => {
      restared2 = true;
      resolve(1);
    }
  });
  animation.addClip(clip1);
  animation.addClip(clip2);
  animation.start();
  return new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  })
    .then(() => {
      expect(destroyed1).toBeTruthy();
      expect(restared1).toBeFalsy();
      expect(restared2).toBeTruthy();
      expect(destroyed2).toBeFalsy();
      animation.stop();
    });
});

test('add and remove animator', () => {
  const animation = new Animation();
  const animator = new Animator({}, false);
  expect(animator.animation).toBeUndefined();
  animation.addAnimator(animator);
  expect(animator.animation).toBeTruthy();
  animation.removeAnimator(animator);
  expect(animator.animation).toBeNull();
  const tor = animation.animate({});
  expect(tor.animation === animation).toBeTruthy();
  animation.stop();
});