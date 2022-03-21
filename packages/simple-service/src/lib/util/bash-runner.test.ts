import { BashRunner } from './bash-runner';

test('simple bash runner', async () => {
  const runner = new BashRunner();
  let result = await runner.exec('echo test1');
  expect(result).toBe('test1');
  result = await runner.exec('echo test2');
  expect(result).toBe('test2');
  runner.close();
});
