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

test('extend', () => {
  const a = {b: 1};
  const b = {a: 2};
  util.extend(a, b);
  expect((a as any).a).toBe(2);
});

test('isObject', () => {
  expect(util.isObject({})).toBe(true);
  expect(util.isObject([])).toBe(true);
  expect(util.isObject(1)).toBe(false);
});

test('defaults', () => {
  const a = { attr1: 1, attr2: 2};
  const b = { attr1: 3, attr4: 4};
  util.defaults(a, b);
  expect(a.attr1).toBe(1);
  expect((a as any).attr4).toBe(4);

  util.defaults(a, b, true);
  expect(a.attr1).toBe(3);
});

test('mixin', () => {
  class A {
    test1() {
      return 'test1';
    }
  }

  class B {
    val1 = 1;
    val2 = 3;
    test2() {
      return 'test2';
    }
  }
  B.prototype.val2 = 2;

  class C {

  }
  util.mixin(C, A);
  util.mixin(C, B);

  const c = new C();
  expect((c as any).test1()).toBe('test1');
  expect((c as any).test2()).toBe('test2');
  expect((c as any).val1).toBeUndefined();
  expect((c as any).val2).toBe(2);
});

test('isTypedArray', () => {
  const a = new Int8Array(2);
  expect(util.isTypedArray(a)).toBe(true);
  expect(util.isTypedArray([])).toBe(false);
});

test('guid', () => {
  expect(util.guid()).toBe(0);
});