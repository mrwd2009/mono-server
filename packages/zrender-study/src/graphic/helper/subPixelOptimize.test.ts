import * as opt from './subPixelOptimize';

test('subPixelOptimizeLine', () => {
  let line1 = {
    x1: 3,
    y1: 5,
    x2: 3.2,
    y2: 5.1,
  };
  let line2 = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  }
  opt.subPixelOptimizeLine(line2, line1, { lineWidth: 3 });
  expect(line2.x1).toBeCloseTo(3.5);
  expect(line2.x2).toBeCloseTo(3.5);
  expect(line2.y1).toBeCloseTo(5.5);
  expect(line2.y2).toBeCloseTo(5.5);
});

test('subPixelOptimizeRect', () => {
  const r1 = {
    x: 4.6,
    y: 5.5,
    width: 8.2,
    height: 9.7
  };
  const r2 = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  opt.subPixelOptimizeRect(r2, r1, { lineWidth: 3 });

  expect(r2.width).toBe(8);
})