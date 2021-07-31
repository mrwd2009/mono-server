import memoizeOne from 'memoize-one';

test('without any arguments', async () => {
  const getEmptyObj = memoizeOne(() =>({}));
  const result1 = getEmptyObj();
  const result2 = getEmptyObj();
  expect(result1 === result2).toBeTruthy();
})