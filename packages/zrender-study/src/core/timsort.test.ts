import sort from './timsort';

test('sort', () => {
  let arr = [2, 3, 5, 7, 4, 8, 0];
  sort(arr, (a, b) => a - b, 3, 5);
  expect(arr[3]).toBe(4);
  expect(arr[4]).toBe(7);
});