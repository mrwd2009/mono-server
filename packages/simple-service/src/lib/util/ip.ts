import os from 'os';
import forEach from 'lodash/forEach';

export function getLocalIPs(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];
  forEach(interfaces, (items) => {
    forEach(items, (item) => {
      if (!item.internal && item.family === 'IPv4') {
        ips.push(item.address);
      }
    });
  });
  return ips;
}

export function getLocalHostName(): string {
  return os.hostname();
}
