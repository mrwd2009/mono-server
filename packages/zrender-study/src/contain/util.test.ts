import * as util from './util';

test('normalizeRadian', () => {
  expect(util.normalizeRadian(Math.PI * 5)).toBeCloseTo(Math.PI);
})