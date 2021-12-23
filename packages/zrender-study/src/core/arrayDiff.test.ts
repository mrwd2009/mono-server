import arrayDiff from "./arrayDiff";

test('arrayDiff', () => {
  let ar1 = [1, 2, 3, 7, 4];
  let ar2 = [2, 3, 4, 5, 6, 7, 8];

  let result = arrayDiff(ar1, ar2);

  // console.log(result);

  ar1 = [0, 1, 2, 3, 4];
  ar2 = [2, 3];
  result = arrayDiff(ar1, ar2);
  // console.log(result);
  expect(result[0].count).toBe(2);
  expect(result[1].count).toBe(2);
  expect(result[2].count).toBe(1);
});