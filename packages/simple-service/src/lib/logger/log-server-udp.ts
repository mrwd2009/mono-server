import { createSocket } from 'dgram';
import config from '../../config/config';
import { pureLogger } from './primary'
const {
  logger: {
    server: {
      host,
      port,
    },
  },
} = config;

const server = createSocket('udp4');

server
  .on('error', (error) => {
    console.error(error);
    server.close(() => {
      // allow console.error to complete
      throw error;
    });
  })
  .on('message', (msg) => {
    const {
      type,
      payload,
    } = JSON.parse(msg.toString());
    if (type === 'log') {
      pureLogger.log(payload);
    }
  })
  .on('listening', () => {
    console.log(`Logger server started successfully on ${host}:${port}.`);
  })
  .bind(port, host);


