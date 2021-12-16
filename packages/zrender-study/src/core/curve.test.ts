import * as curve from './curve';
// bezier chart https://www.desmos.com/calculator/d1ofwre0fr

test('cubicAt', () => {
  // use t to get value
  expect(curve.cubicAt(0, 0.25, 0.75, 1, 0.5)).toBeCloseTo(0.5);
});

test('cubicDerivativeAt', () => {
  expect(curve.cubicDerivativeAt(0, 0.25, 0.75, 1, 0.5)).toBeGreaterThan(0);
  expect(curve.cubicDerivativeAt(0, 0.5, -0.5, 0, 0.5)).toBeLessThan(0);
});

test('cubicRootAt', () => {
  // use value to get t
  let roots: number[] = [];
  let result = curve.cubicRootAt(0, 0.25, 0.75, 1, 0.5, roots);
  expect(roots[0]).toBeCloseTo(0.5);
  result = curve.cubicRootAt(0, 0.25, 0.75, 1, curve.cubicAt(0, 0.25, 0.75, 1, 0.3), roots);
  expect(roots[0]).toBeCloseTo(0.3);
});

test('cubicExtrema', () => {
  // get t value for turnaround point
  let nodes: number[] = [];
  let result = curve.cubicExtrema(0, 0.5, -0.5, 0, nodes);
  expect(result).toBe(2);
});

test('cubicSubdivide', () => {
  let out: number[] = [];
  curve.cubicSubdivide(0, 0.25, 0.75, 1, 0.5, out);
  expect(out[3]).toBeCloseTo(0.5);
});

test('cubicProjectPoint', () => {
  let out: number[] = [];
  const len = curve.cubicProjectPoint(0, 0, 0.25, 0.5, 0.75, -0.5, 1, 0, 0.8, 0, out);
  expect(len).toBeLessThan(0.15);
});

test('cubicLength', () => {
  const len = curve.cubicLength(0, 0, 0.25, 0.5, 0.75, -0.5, 1, 0, 20);
  expect(len).toBeGreaterThan(1);
});

test('quadraticDerivativeAt', () => {
  const result = curve.quadraticDerivativeAt(0, 0.5, 1, 0.5);
  expect(result).toBeCloseTo(1);
});

test('quadraticRootAt', () => {
  let roots: number[] = [];
  const result = curve.quadraticRootAt(0, 0.5, 1, 0.5, roots);
  expect(roots[0]).toBeCloseTo(0.5);
});

