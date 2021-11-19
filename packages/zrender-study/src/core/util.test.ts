import * as util from './util';

test('isArrayLike', () => {
  const a: any = [];
  const b = { length: 1};
  const c = 2;
  const d: any = null;
  const f: any = undefined;

  expect(util.isArrayLike(a)).toBeTruthy();
  expect(util.isArrayLike(b)).toBeTruthy();
  expect(util.isArrayLike(c)).toBeFalsy();
  expect(util.isArrayLike(d)).toBeFalsy();
  expect(util.isArrayLike(f)).toBeFalsy();
});

test('keys', () => {
  const a = {
    a: 1,
    b: 2,
  };
  expect(util.keys(a)).toEqual(['a', 'b']);
});

test('logError', () => {
  let m = '';
  const log = jest.spyOn(console, 'error').mockImplementation(msg => m = msg);
  util.logError('test');
  expect(m).toBe('test');
  log.mockRestore();
});