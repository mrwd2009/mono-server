import os from 'os';
import forEach from 'lodash/forEach';

export function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  forEach(interfaces, (items) => {
    forEach(items, (item) => {
      if (!item.internal && item.family === 'IPv4') {
        ips.push(item.address);
      }
    });
  });
  return ips;
}