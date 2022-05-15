import fs from 'fs';
import net, { Socket } from 'net';
import depsInit from '../../config/initializer';
import config from '../../config/config';
import { initialize as initMonitor } from '../../lib/monitor/prometheus';
import { pureLogger } from './primary';
import { registerCleanupHandler } from '../signal/handler';

const {
  logger: { ipc },
} = config;

const initialize = async () => {
  if (!ipc.enabled) {
    return;
  }
  await depsInit();

  await initMonitor('log');

  if (fs.existsSync(ipc.path)) {
    fs.unlinkSync(ipc.path);
  }
  const ipcServer = net.createServer();
  const ipcOptions = {
    path: ipc.path,
    readableAll: true,
    writableAll: true,
  };

  const handleConnection = (socket: Socket) => {
    let cacheBuf = Buffer.from([]);
    socket
      .on('data', (buf) => {
        cacheBuf = Buffer.concat([cacheBuf, buf]);
        let splitIndex = cacheBuf.indexOf('\n');
        while (splitIndex !== -1) {
          const { type, payload } = JSON.parse(cacheBuf.slice(0, splitIndex).toString());
          if (type === 'log') {
            pureLogger.log(payload);
          }
          cacheBuf = cacheBuf.slice(splitIndex + 1);
          splitIndex = cacheBuf.indexOf('\n');
        }
      })
      .on('error', (error) => {
        pureLogger.error(error.message, { response: error });
      });
  };

  ipcServer
    .on('listening', () => {
      pureLogger.info(`Listening succesffully on ${ipcServer.address()}.`);
    })
    .on('connection', (socket) => {
      handleConnection(socket);
    })
    .on('error', (error) => {
      pureLogger.error(error.message, { response: error });
      throw error;
    })
    .on('close', () => {
      pureLogger.info('IPC server has been closed.');
    });

  ipcServer.listen(ipcOptions);

  // gracefully close server
  registerCleanupHandler(async () => {
    await new Promise((resolve, reject) => {
      ipcServer.close((error) => {
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
    });
  });
};

initialize();
