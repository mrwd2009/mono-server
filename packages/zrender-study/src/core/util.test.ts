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

test('createObject', () => {
  let obj1: any = util.createObject({ x: 2, y: 3}, { name: 'name' });
  expect(obj1.x).toBe(2);
  expect(obj1.y).toBe(3);
  expect(obj1.name).toBe('name');
  const rawCreate = Object.create;
  Object.create = null;
  obj1 = util.createObject({ x: 2, y: 3}, { name: 'name' });
  expect(obj1.x).toBe(2);
  expect(obj1.y).toBe(3);
  expect(obj1.name).toBe('name');
  Object.create = rawCreate;
});

test('isString', () => {
  expect(util.isString('12')).toBe(true);
  expect(util.isString(true)).toBe(false);
});

test('setAsPrimitive and isPrimitive', () => {
  const obj1 = {};
  util.setAsPrimitive(obj1);
  expect(util.isPrimitive(obj1)).toBe(true);
});

test('isDom', () => {
  const node = {
    nodeType: 1,
    ownerDocument: {},
  };
  expect(util.isDom(node)).toBe(true);
});

test('clone', () => {
  let a: any = {
    name: 'name',
    label: 'label',
    re: {
      reLabel: 'reLabel',
    }
  };
  let b: any = util.clone(a);
  expect(b === a).toBe(false);
  expect(b.name).toBe('name');
  expect(b.label).toBe('label');
  expect(b.re.reLabel).toBe('reLabel');

  a = [1, 2, 3];
  b = util.clone(a);
  expect(b === a).toBe(false);
  expect(b[0]).toBe(1);
  expect(b[1]).toBe(2);
  expect(b[2]).toBe(3);

  a = new Float32Array([2,3,5]);
  b = util.clone(a);
  expect(b === a).toBe(false);
  expect(b[0]).toBe(2);
  expect(b[1]).toBe(3);
  expect(b[2]).toBe(5);

  a = {};
  util.setAsPrimitive(a);
  b = util.clone(a);
  expect(b === a).toBe(true);
});

test('retrieve2', () => {
  expect(util.retrieve2(2, 3)).toBe(2);
  expect(util.retrieve2(null, 3)).toBe(3);
});

test('retrieve3', () => {
  expect(util.retrieve3(2, 3, 4)).toBe(2);
  expect(util.retrieve3(null, 3, 5)).toBe(3);
  expect(util.retrieve3(null, null, 5)).toBe(5);
});

test('each', () => {
  let keys: any = [];
  let values: any = [];
  util.each([1, 2, 3], (val, key) => {
    keys.push(key);
    values.push(val);
  });

  expect(keys).toEqual([0, 1, 2]);
  expect(values).toEqual([1, 2, 3]);
  
  const list = [1, 2, 3];
  list.forEach = null;
  keys = [];
  values = [];
  util.each(list, (val, key) => {
    keys.push(key);
    values.push(val);
  });

  expect(keys).toEqual([0, 1, 2]);
  expect(values).toEqual([1, 2, 3]);

  keys = [];
  values = [];
  util.each({ a: 1, b: 2, c: 3}, (val, key) => {
    keys.push(key);
    values.push(val);
  });
  expect(keys).toEqual(['a', 'b', 'c']);
  expect(values).toEqual([1, 2, 3]);
});

test('normalizeCssArray', () => {
  expect(util.normalizeCssArray(1)).toEqual([1, 1, 1, 1]);
  expect(util.normalizeCssArray([1, 2])).toEqual([1, 2, 1, 2]);
  expect(util.normalizeCssArray([1, 2, 3])).toEqual([1, 2, 3, 2]);
  expect(util.normalizeCssArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
});

test('trim', () => {
  expect(util.trim('    a ')).toBe('a');
  const str = '    b     ';
  expect(util.trim(str)).toBe('b');
  expect(util.trim(null)).toBe(null);
});