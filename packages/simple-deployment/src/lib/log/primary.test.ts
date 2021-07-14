import logger from './primary';

test('test console log transport', async () => {
  const spy = jest.spyOn(console, 'log');
  logger.info('with error response', { response: new Error('error')});
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0][0].includes('response.message')).toBe(true);
  logger.info('without error response');
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy.mock.calls[1][0].includes('response.message')).toBe(false);
  spy.mockRestore();
});

test('test console error transport', async () => {
  const spy = jest.spyOn(console, 'error');
  logger.error('with error response', { response: new Error('error')});
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0][0].includes('response.message')).toBe(true);
  logger.error('without error response');
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy.mock.calls[1][0].includes('response.message')).toBe(false);
  spy.mockRestore();
});
