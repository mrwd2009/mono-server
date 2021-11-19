import LRU from './LRU';

test('lru basic usage', () => {
  const cache = new LRU<number>(2);
  cache.put('n1', 1);
  expect(cache.get('n1')).toBe(1);
  expect(cache.len()).toBe(1);
  cache.put('n2', 2);
  expect(cache.get('n2')).toBe(2);
  expect(cache.len()).toBe(2);
  cache.put('n3', 3);
  expect(cache.get('n1')).toBeUndefined();
  expect(cache.get('n2')).toBe(2);
  expect(cache.get('n3')).toBe(3);
  expect(cache.len()).toBe(2);
});