import Animator, * as animator from './Animator';

test('interpolateNumber', () => {
  expect(animator.interpolateNumber(1, 2, 0.5)).toBeCloseTo(1.5);
});

test('step', () => {
  expect(animator.step(1, 2, 0.5)).toBe(1);
  expect(animator.step(1, 2, 0.6)).toBe(2);
});

test('interpolate1DArray', () => {
  const out = [0, 0, 0];
  const p0 = [1, 2, 3];
  const p1 = [2, 3, 4];
  animator.interpolate1DArray(out, p0, p1, 0.5);
  expect(out[0]).toBeCloseTo(1.5);
  expect(out[1]).toBeCloseTo(2.5);
  expect(out[2]).toBeCloseTo(3.5);
});

test('interpolate2DArray', () => {
  const out: Array<Array<number>> = [];
  const p0 = [[0, 1, 2], [3, 4, 5, 6]];
  const p1 = [[1, 2, 3], [4, 5, 6, 7]];
  animator.interpolate2DArray(out, p0, p1, 0.5);
  expect(out[0][0]).toBe(0.5);
  expect(out[0][1]).toBe(1.5);
  expect(out[0][2]).toBe(2.5);
  expect(out[1][0]).toBe(3.5);
  expect(out[1][1]).toBe(4.5);
  expect(out[1][2]).toBe(5.5);
  expect(out[1][3]).toBe(6.5);
});

test('add1DArray', () => {
  const out: Array<number> = [];
  const p0 = [1,2,3];
  const p1 = [2,3,4];
  animator.add1DArray(out, p0, p1, 1);

  expect(out[0]).toBe(3);
  expect(out[1]).toBe(5);
  expect(out[2]).toBe(7);
});

test('add2DArray', () => {
  const out: Array<Array<number>> = [];
  const p0 = [[1,2,3], [4,5,6,7]];
  const p1 = [[2,3,4], [5,6,7,8]];

  animator.add2DArray(out, p0, p1, 1);
  expect(out[0][0]).toBe(3);
  expect(out[0][1]).toBe(5);
  expect(out[0][2]).toBe(7);
  expect(out[1][0]).toBe(9);
  expect(out[1][1]).toBe(11);
  expect(out[1][2]).toBe(13);
  expect(out[1][3]).toBe(15);
});

test('fillArray', () => {
  const out: any = [];
  const p0 = [1,2,3,4];
  animator.fillArray(out, p0, 1);
  expect(out[0]).toBe(1);
  expect(out[1]).toBe(2);
  expect(out[2]).toBe(3);
  expect(out[3]).toBe(4);

  const out1: any = [];
  const p1 = [[2,3,4], [4,5]];
  animator.fillArray(out1, p1, 2);
  expect(out1[0][0]).toBe(2);
  expect(out1[0][1]).toBe(3);
  expect(out1[0][2]).toBe(4);
  expect(out1[1][0]).toBe(4);
  expect(out1[1][1]).toBe(5);
  expect(out1[1][2]).toBeUndefined();
});

test('is1DArraySame', () => {
  const a = [1,2];
  const b = [2,3];
  expect(animator.is1DArraySame(a, b)).toBeFalsy();
  expect(animator.is1DArraySame([1,2], [1,2])).toBeTruthy();
  expect(animator.is1DArraySame([1, 2], [1,2,3])).toBeFalsy();
});

test('cloneVaue', () => {
  const a = [1,3];
  const ret = animator.cloneValue(a) as number[];
  expect(a === ret).toBeFalsy();
  expect(ret[0]).toBe(1);
  expect(ret[1]).toBe(3);
  expect(animator.cloneValue('test')).toBe('test');
});

test('rgba2String', () => {
  expect(animator.rgba2String([244, 2, 3])).toBe('rgba(244,2,3)');
});

test('guessArrayDim', () => {
  expect(animator.guessArrayDim([[1]])).toBe(2);
  expect(animator.guessArrayDim([])).toBe(1);
});

test('catmullRomInterpolate', () => {
  expect(animator.catmullRomInterpolate(0, 1, 3, 5, 0, 0, 0)).toBe(1);
  expect(animator.catmullRomInterpolate(0, 1, 3, 5, 1, 1, 1)).toBe(3);
});

test('catmullRomInterpolate1DArray', () => {
  let out: number[] = [];
  animator.catmullRomInterpolate1DArray(out, [1, 2], [3, 4], [5, 6], [7, 8], 0, 0, 0);
  expect(out[0]).toBe(3);
  expect(out[1]).toBe(4);
  out = [];
  animator.catmullRomInterpolate1DArray(out, [1, 2], [3, 4], [5, 6], [7, 8], 1, 1, 1);
  expect(out[0]).toBe(5);
  expect(out[1]).toBe(6);
});

test('catmullRomInterpolate2DArray', () => {
  let out: number[][] = [[]];
  animator.catmullRomInterpolate2DArray(out, [[1, 2], [3,4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]], 0, 0, 0);
  expect(out[0][0]).toBe(5);
  expect(out[0][1]).toBe(6);
  expect(out[1][0]).toBe(7);
  expect(out[1][1]).toBe(8);
  out = [[]];
  animator.catmullRomInterpolate2DArray(out, [[1, 2], [3,4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]], 1, 1, 1);
  expect(out[0][0]).toBe(9);
  expect(out[0][1]).toBe(10);
  expect(out[1][0]).toBe(11);
  expect(out[1][1]).toBe(12);
});

test('Basic track', () => {
  const track = new animator.Track('color');
  expect(track.needsAnimate()).toBeFalsy();
  expect(track.isFinished()).toBeUndefined();
  expect(track.getAdditiveTrack()).toBeUndefined();
  track.setFinished();
  expect(track.isFinished()).toBeTruthy();
});

test('Track#addKeyframe without interpolate', () => {
  const track = new animator.Track('color');
  track.interpolable = false;
  track.addKeyframe(0, [1, 2, 3]);
  track.addKeyframe(200, [2, 3, 4]);
  expect(track.keyframes[0].value).toEqual([1, 2, 3]);
  expect(track.keyframes[0].time).toEqual(0);
  expect(track.keyframes[1].value).toEqual([2, 3, 4]);
  expect(track.keyframes[1].time).toEqual(200);
});

test('Track#addKeyframe with interpolable', () => {
  const track = new animator.Track('color');
  track.addKeyframe(0, [1, 2, 3]);
  track.addKeyframe(100, [2, 3, 4]);
  expect(track.arrDim).toBe(1);
  expect(track.keyframes[0].value).toEqual([1, 2, 3]);
  expect(track.keyframes[0].time).toEqual(0);
  expect(track.keyframes[1].value).toEqual([2, 3, 4]);
  expect(track.keyframes[1].time).toEqual(100);

  const track2 = new animator.Track('color');
  track2.addKeyframe(0, [[1,2,3], [4,5,6]]);
  track2.addKeyframe(100, [[2,3,5], [5,6,7]]);
  expect(track2.arrDim).toBe(2);
  expect(track2.keyframes[0].value).toEqual([[1,2,3], [4,5,6]]);
  expect(track2.keyframes[0].time).toEqual(0);
  expect(track2.keyframes[1].value).toEqual([[2,3,5], [5,6,7]]);
  expect(track2.keyframes[1].time).toEqual(100);

  const track3 = new animator.Track('color');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(100, 'rgb(2,3,4)');
  expect(track3.arrDim).toBe(0);
  expect(track3.isValueColor).toBe(true);
  expect(track3.keyframes[0].value).toEqual([1, 2, 3, 1]);
  expect(track3.keyframes[0].time).toEqual(0);
  expect(track3.keyframes[1].value).toEqual([2, 3, 4, 1]);
  expect(track3.keyframes[1].time).toEqual(100);

  const track4 = new animator.Track('size');
  track4.addKeyframe(0, 2);
  track4.addKeyframe(100, 4);
  expect(track4.arrDim).toBe(0);
  expect(track4.isValueColor).toBeUndefined();
  expect(track4.keyframes[0].value).toEqual(2);
  expect(track4.keyframes[0].time).toEqual(0);
  expect(track4.keyframes[1].value).toEqual(4);
  expect(track4.keyframes[1].time).toEqual(100);
});

test('prepare without additiveTrack', () => {
  const track = new animator.Track('color');
  track.addKeyframe(0, [1, 2, 3]);
  track.addKeyframe(100, [4, 5, 6]);
  track.addKeyframe(50, [2, 3]);

  track.prepare();
  expect(track.keyframes[0].time).toBe(0);
  expect(track.keyframes[0].percent).toBe(0);
  expect(track.keyframes[0].value).toEqual([1, 2, 3]);
  expect(track.keyframes[1].time).toBe(50);
  expect(track.keyframes[1].percent).toBeCloseTo(0.5);
  expect(track.keyframes[1].value).toEqual([2, 3, 6]);
  expect(track.keyframes[2].time).toBe(100);
  expect(track.keyframes[2].value).toEqual([4, 5, 6]);
  expect(track.keyframes[2].percent).toBe(1);
});

test('prepare with additiveTrack', () => {
  let add = new animator.Track('color');
  add.addKeyframe(0, [1, 2, 3]);
  add.addKeyframe(100, [2, 3, 4]);
  const track = new animator.Track('color');
  track.addKeyframe(0, [1, 2, 3]);
  track.addKeyframe(100, [2, 3, 4]);
  track.prepare(add);
  expect(track.arrDim).toBe(1);
  expect(track.keyframes[0].value).toEqual([1, 2, 3]);
  expect(track.keyframes[0].time).toEqual(0);
  expect(track.keyframes[0].additiveValue).toEqual([0, 0, 0]);
  expect(track.keyframes[1].value).toEqual([2, 3, 4]);
  expect(track.keyframes[1].additiveValue).toEqual([1, 1, 1]);
  expect(track.keyframes[1].time).toEqual(100);

  const track2 = new animator.Track('color');
  add = new animator.Track('color');
  add.addKeyframe(0, [[1,2,3], [4,5,6]]);
  add.addKeyframe(100, [[2,3,5], [5,6,7]]);
  track2.addKeyframe(0, [[1,2,3], [4,5,6]]);
  track2.addKeyframe(100, [[2,3,5], [5,6,7]]);
  track2.prepare(add);
  expect(track2.arrDim).toBe(2);
  expect(track2.keyframes[0].value).toEqual([[1,2,3], [4,5,6]]);
  expect(track2.keyframes[0].time).toEqual(0);
  expect(track2.keyframes[0].additiveValue).toEqual([[0,0,0], [0,0,0]]);
  expect(track2.keyframes[1].value).toEqual([[2,3,5], [5,6,7]]);
  expect(track2.keyframes[1].time).toEqual(100);
  expect(track2.keyframes[1].additiveValue).toEqual([[1,1,2], [1,1,1]]);

  const track3 = new animator.Track('color');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(100, 'rgb(2,3,4)');
  track3.prepare(track3);
  expect(track3.arrDim).toBe(0);
  expect(track3.isValueColor).toBe(true);
  expect(track3.keyframes[0].value).toEqual([1, 2, 3, 1]);
  expect(track3.keyframes[0].additiveValue).toEqual([0, 0, 0, 0]);
  expect(track3.keyframes[0].time).toEqual(0);
  expect(track3.keyframes[1].value).toEqual([2, 3, 4, 1]);
  expect(track3.keyframes[1].time).toEqual(100);
  expect(track3.keyframes[1].additiveValue).toEqual([1, 1, 1, 0]);

  const track4 = new animator.Track('size');
  track4.addKeyframe(0, 2);
  track4.addKeyframe(100, 4);
  track4.prepare(track4);
  expect(track4.arrDim).toBe(0);
  expect(track4.isValueColor).toBeUndefined();
  expect(track4.keyframes[0].value).toEqual(2);
  expect(track4.keyframes[0].time).toEqual(0);
  expect(track4.keyframes[0].additiveValue).toEqual(0);
  expect(track4.keyframes[1].value).toEqual(4);
  expect(track4.keyframes[1].time).toEqual(100);
  expect(track4.keyframes[1].additiveValue).toEqual(2);
});

test('Track#step without spline and additive', () => {
  const track1 = new animator.Track('value2');
  track1.addKeyframe(0, [1, 2, 3]);
  track1.addKeyframe(50, [2, 3, 4]);
  track1.addKeyframe(100, [3, 4, 5]);
  let target: any = { value2: [] };
  track1.prepare();
  track1.step(target, 0.25);
  expect(target.value2).toEqual([1.5, 2.5, 3.5]);

  const track2 = new animator.Track('value2');
  track2.addKeyframe(0, [[1, 2], [3, 4]]);
  track2.addKeyframe(50, [[2, 3], [4, 5]]);
  track2.addKeyframe(100, [[3, 4], [5, 6]]);
  let target2: any = { value2: [] };
  track2.prepare();
  track2.step(target2, 0.25);
  expect(target2.value2).toEqual([[1.5, 2.5], [3.5, 4.5]]);

  const track3 = new animator.Track('value2');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(50, 'rgb(2,3,4)');
  track3.addKeyframe(100, 'rgb(3,4,5)');
  let target3: any = { value2: [] };
  track3.prepare();
  track3.step(target3, 0.25);
  expect(target3.value2).toEqual('rgba(1,2,3,1)');

  const track4 = new animator.Track('value2');
  track4.addKeyframe(0, 1);
  track4.addKeyframe(50, 2);
  track4.addKeyframe(100, 3);
  let target4: any = { };
  track4.prepare();
  track4.step(target4, 0.25);
  expect(target4.value2).toEqual(1.5);

  const track5 = new animator.Track('value2');
  track5.addKeyframe(0, 1);
  track5.addKeyframe(50, 2);
  track5.addKeyframe(100, 3);
  let target5: any = { };
  track5.prepare();
  track5.interpolable = false;
  track5.step(target5, 0.26);
  expect(target5.value2).toEqual(2);
});

test('Track#step without spline but having additive', () => {
  const track1 = new animator.Track('value2');
  track1.addKeyframe(0, [1, 2, 3]);
  track1.addKeyframe(50, [2, 3, 4]);
  track1.addKeyframe(100, [3, 4, 5]);
  let target: any = { value2: [0, 0, 0] };
  track1.prepare(track1);
  track1.step(target, 0.25);
  expect(target.value2).toEqual([0.5, 0.5, 0.5]);

  const track2 = new animator.Track('value2');
  track2.addKeyframe(0, [[1, 2], [3, 4]]);
  track2.addKeyframe(50, [[2, 3], [4, 5]]);
  track2.addKeyframe(100, [[3, 4], [5, 6]]);
  let target2: any = { value2: [[0, 0], [0, 0]] };
  track2.prepare(track2);
  track2.step(target2, 0.25);
  expect(target2.value2).toEqual([[0.5, 0.5], [0.5, 0.5]]);

  const track3 = new animator.Track('value2');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(50, 'rgb(2,3,4)');
  track3.addKeyframe(100, 'rgb(3,4,5)');
  let target3: any = { value2: 'rgb(2,3,4)' };
  track3.prepare(track3);
  track3.step(target3, 0.25);
  expect(target3.value2).toEqual('rgba(2,3,4,1)');

  const track4 = new animator.Track('value2');
  track4.addKeyframe(0, 1);
  track4.addKeyframe(50, 2);
  track4.addKeyframe(100, 3);
  let target4: any = { value2: 0 };
  track4.prepare(track4);
  track4.step(target4, 0.25);
  expect(target4.value2).toEqual(0.5);

  const track5 = new animator.Track('value2');
  track5.addKeyframe(0, 1);
  track5.addKeyframe(50, 2);
  track5.addKeyframe(100, 3);
  let target5: any = { value2: 5 };
  track5.prepare(track5);
  track5.interpolable = false;
  track5.step(target5, 0.26);
  expect(target5.value2).toEqual(6);
});

test('Track#step with spline but without additive', () => {
  const track1 = new animator.Track('value2');
  track1.addKeyframe(0, [1, 2, 3]);
  track1.addKeyframe(50, [2, 3, 4]);
  track1.addKeyframe(100, [3, 4, 5]);
  let target: any = { value2: [0, 0, 0] };
  track1.prepare();
  track1.useSpline = true;
  track1.step(target, 1);
  expect(target.value2).toEqual([3, 4, 5]);

  const track2 = new animator.Track('value2');
  track2.addKeyframe(0, [[1, 2], [3, 4]]);
  track2.addKeyframe(50, [[2, 3], [4, 5]]);
  track2.addKeyframe(100, [[3, 4], [5, 6]]);
  let target2: any = { value2: [[0, 0], [0, 0]] };
  track2.prepare();
  track2.useSpline = true;
  track2.step(target2, 1);
  expect(target2.value2).toEqual([[3, 4], [5, 6]]);

  const track3 = new animator.Track('value2');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(50, 'rgb(2,3,4)');
  track3.addKeyframe(100, 'rgb(3,4,5)');
  let target3: any = { value2: 'rgb(2,3,4)' };
  track3.prepare();
  track3.useSpline = true;
  track3.step(target3, 1);
  expect(target3.value2).toEqual('rgba(3,4,5,1)');

  const track4 = new animator.Track('value2');
  track4.addKeyframe(0, 1);
  track4.addKeyframe(50, 2);
  track4.addKeyframe(100, 3);
  let target4: any = { value2: 0 };
  track4.prepare();
  track4.useSpline = true;
  track4.step(target4, 1);
  expect(target4.value2).toEqual(3);

  const track5 = new animator.Track('value2');
  track5.addKeyframe(0, 1);
  track5.addKeyframe(50, 2);
  track5.addKeyframe(100, 3);
  let target5: any = { value2: 5 };
  track5.prepare();
  track5.useSpline = true;
  track5.interpolable = false;
  track5.step(target5, 1);
  expect(target5.value2).toEqual(3);
});

test('Track#step with spline and additive', () => {
  const track1 = new animator.Track('value2');
  track1.addKeyframe(0, [1, 2, 3]);
  track1.addKeyframe(50, [2, 3, 4]);
  track1.addKeyframe(100, [3, 4, 5]);
  let target: any = { value2: [0, 0, 0] };
  track1.prepare(track1);
  track1.useSpline = true;
  track1.step(target, 1);
  expect(target.value2).toEqual([2, 2, 2]);

  const track2 = new animator.Track('value2');
  track2.addKeyframe(0, [[1, 2], [3, 4]]);
  track2.addKeyframe(50, [[2, 3], [4, 5]]);
  track2.addKeyframe(100, [[3, 4], [5, 6]]);
  let target2: any = { value2: [[0, 0], [0, 0]] };
  track2.prepare(track2);
  track2.useSpline = true;
  track2.step(target2, 1);
  expect(target2.value2).toEqual([[2, 2], [2, 2]]);

  const track3 = new animator.Track('value2');
  track3.addKeyframe(0, 'rgb(1,2,3)');
  track3.addKeyframe(50, 'rgb(2,3,4)');
  track3.addKeyframe(100, 'rgb(3,4,5)');
  let target3: any = { value2: 'rgb(2,3,4)' };
  track3.prepare(track3);
  track3.useSpline = true;
  track3.step(target3, 1);
  expect(target3.value2).toEqual('rgba(4,5,6,1)');

  const track4 = new animator.Track('value2');
  track4.addKeyframe(0, 1);
  track4.addKeyframe(50, 2);
  track4.addKeyframe(100, 3);
  let target4: any = { value2: 0 };
  track4.prepare(track4);
  track4.useSpline = true;
  track4.step(target4, 1);
  expect(target4.value2).toEqual(2);

  const track5 = new animator.Track('value2');
  track5.addKeyframe(0, 1);
  track5.addKeyframe(50, 2);
  track5.addKeyframe(100, 3);
  let target5: any = { value2: 5 };
  track5.prepare(track5);
  track5.useSpline = true;
  track5.interpolable = false;
  track5.step(target5, 1);
  expect(target5.value2).toEqual(7);
});

test('Track#step with percent -0.25 and 1.25', () => {
  const track1 = new animator.Track('value2');
  track1.addKeyframe(0, [1, 2, 3]);
  track1.addKeyframe(50, [2, 3, 4]);
  track1.addKeyframe(100, [3, 4, 5]);
  let target: any = { value2: [] };
  track1.prepare();
  track1.step(target, -0.25);
  expect(target.value2).toEqual([0.5, 1.5, 2.5]);
  track1.step(target, 0.25);
  expect(target.value2).toEqual([1.5, 2.5, 3.5]);
  track1.step(target, -0.25);
  expect(target.value2).toEqual([0.5, 1.5, 2.5]);
  track1.step(target, 1.25);
  expect(target.value2).toEqual([3.5, 4.5, 5.5]);
});

test('Animator basic usages', () => {
  const target1 = {};
  const target2 = {};
  const anim = new Animator(target1, false);
  expect(anim.getTarget()).toBe(target1);
  anim.changeTarget(target2);
  expect(anim.getTarget()).toBe(target2);
  anim.pause();
  expect(anim.isPaused()).toBe(true);
  anim.resume();
  expect(anim.isPaused()).toBe(false);
  expect(anim.delay(200)).toBe(anim);
  expect(anim.during(() => {})).toBe(anim);
  expect(anim.done(() => {})).toBe(anim);
  expect(anim.aborted(() => {})).toBe(anim);
  expect(anim.getClip()).toBe(null);
  expect(anim.getTrack('color')).toBeUndefined();
});

test('Animator#when', () => {
  const target: any = { color: '', arr1: [], arr2: [], val1: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    color: 'rgb(1,2,3)',
    arr1: [1,2],
    arr2: [[3,4], [5,6]],
    val1: 1
  });
  anim.when(50, {
    color: 'rgb(2,3,4)',
    arr1: [2,3],
    arr2: [[4,5], [6,7]],
    val1: 2
  });
  anim.when(100, {
    color: 'rgb(3,4,5)',
    arr1: [3,4],
    arr2: [[5,6], [7,8]],
    val1: 3
  });
  const track = anim.getTrack('color');
  expect(track.keyframes[2].value).toEqual([3,4,5,1]);

  const anim2 = new Animator(target, false, [anim]);
  anim2.when(150, {
    val1: 4,
  });
 const track2 = anim2.getTrack('val1');
 expect(track2.keyframes[0].value).toBe(3);
 expect(track2.keyframes[1].value).toBe(4);
});

test('Animator#start', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  const val2Track = anim.getTrack('val2');
  val2Track.interpolable = false;
  anim.start();
  expect(target.val2).toBe(3);
  expect(anim.getClip()).not.toBeUndefined();
  expect(anim.start()).toBeUndefined();

  const anim2 = new Animator(target, false);
  let done = false;
  anim2.done(() => {
    done = true;
  });
  anim2.start();
  expect(done).toBe(true);

  let result3 = '';
  const anim3 = new Animator(target, false);
  anim3.during(() => {
    result3 += 'during';
  });
  anim3.done(() => {
    result3 += 'done';
  });
  anim3.when(0, {
    val1: 1,
    val2: 1,
  });
  anim3.when(50, {
    val1: 2,
    val2: 2,
  });
  anim3.when(100, {
    val1: 3,
    val2: 3,
  });
  anim3.start();
  const clip3 = anim3.getClip();
  clip3.step(200, 0);
  expect(result3).toBe('during');
  expect(target.val1).toBe(1);
  clip3.step(300, 100);
  clip3.ondestroy();
  expect(result3).toBe('duringduringdone');
  expect(target.val1).toBe(3);
});

test('Animator#stop(false)', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  let abor = false;
  anim.aborted(() => {
    abor = true;
  });
  anim.start();
  anim.stop();
  expect(target.val2).toBe(0);
  expect(abor).toBe(true);
  expect(anim.getClip()).not.toBeUndefined();
});

test('Animator#stop(true)', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  let abor = false;
  anim.aborted(() => {
    abor = true;
  });
  anim.start();
  anim.stop(true);
  expect(target.val2).toBe(3);
  expect(abor).toBe(true);
  expect(anim.getClip()).not.toBeUndefined();
});

test('Animator#stopTracks without forward', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  let abor = false;
  anim.aborted(() => {
    abor = true;
  });
  anim.start();
  anim.stopTracks(['val1', 'val2'])
  expect(target.val2).toBe(1);
  expect(abor).toBe(true);
  expect(anim.getClip()).toBe(null);
});

test('Animator#stopTracks with forward', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  let abor = false;
  anim.aborted(() => {
    abor = true;
  });
  anim.start();
  anim.stopTracks(['val1', 'val2'], true)
  expect(target.val2).toBe(3);
  expect(abor).toBe(true);
  expect(anim.getClip()).toBe(null);
});

test('Animator#saveFinalToTarget', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  let target2: any = {};
  anim.saveFinalToTarget(target2, ['val1'])
  expect(target2.val1).toBe(3);
});

test('Animator#__changeFinalValue', () => {
  const target: any = { val1: 0, val2: 0};
  const anim = new Animator(target, false);
  anim.when(0, {
    val1: 1,
    val2: 1,
  });
  anim.when(50, {
    val1: 2,
    val2: 2,
  });
  anim.when(100, {
    val1: 3,
    val2: 3,
  });
  anim.__changeFinalValue({ val1: 4 });
  const track = anim.getTrack('val1');
  expect(track.keyframes[2].value).toBe(4);
});