import Clip from './Clip';

test('test basic clip without loop', () => {
  let percent = 0;
  let restarted = false;
  let destroyed = false;
  const clip = new Clip({
    life: 2000,
    delay: 100,
    gap: 50,
    onframe: (p) => {
      percent = p;
    },
    ondestroy: () => {
      destroyed = true;
    },
    onrestart: () => {
      restarted = true;
    },
  });
  expect(clip.step(0, 0)).toBeFalsy();
  expect(percent).toBe(0);
  clip.step(300, 300);
  expect(percent).toBeCloseTo(0.1);
  expect(clip.step(2100, 1800)).toBeTruthy();
  expect(percent).toBeCloseTo(1);
});

test('test basic clip with lopp', () => {
  let percent = 0;
  let restarted = false;
  let destroyed = false;
  const clip = new Clip({
    life: 2000,
    delay: 100,
    gap: 50,
    loop: true,
    onframe: (p) => {
      percent = p;
    },
    ondestroy: () => {
      destroyed = true;
    },
    onrestart: () => {
      restarted = true;
    },
  });
  expect(clip.step(0, 0)).toBeFalsy();
  expect(percent).toBe(0);
  clip.step(300, 300);
  expect(percent).toBeCloseTo(0.1);
  expect(clip.step(2100, 1800)).toBeFalsy();
  expect(restarted).toBeTruthy();
  expect(percent).toBeCloseTo(1);

  clip.step(2125, 25);
  expect(percent).toBe(0);
});

test('test basic clip with pause', () => {
  let percent = 0;
  let restarted = false;
  let destroyed = false;
  const clip = new Clip({
    life: 2000,
    delay: 100,
    gap: 50,
    loop: true,
    onframe: (p) => {
      percent = p;
    },
    ondestroy: () => {
      destroyed = true;
    },
    onrestart: () => {
      restarted = true;
    },
  });
  expect(clip.step(0, 0)).toBeFalsy();
  expect(percent).toBe(0);
  clip.pause();
  expect(clip.step(300, 300)).toBeNull();
  clip.resume();
  clip.step(600, 300);
  expect(percent).toBeCloseTo(0.1);
});