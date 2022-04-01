import locale from './locale';

test('test cached locale', async () => {
  const result1 = await locale();
  const result2 = await locale();

  expect(result2 === result1).toBeTruthy();
});