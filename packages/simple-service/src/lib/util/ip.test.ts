import { getLocalIPs } from './ip';

test('get local ip list', async () => {
  const ips = getLocalIPs();
  expect(ips.length > 1).toBeTruthy();
});
