/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import net from 'net';
import Transport, { TransportStreamOptions } from 'winston-transport';
import { isWorker, worker } from 'cluster';
import { noop } from 'lodash';
import { Colorizer } from 'logform';
import { LEVEL } from 'triple-beam';

import config from '../../config/config';

const {
  isDev,
  logger: {
    ipc,
    rotateOptions: { fileDir, maxSize, maxFiles, logInfoFileName, logErrorFileName, logExceptionFileName },
  },
} = config;
const { DailyRotateFile } = transports;

const { colorize } = format;

export class WorkerTransport extends Transport {
  private ipcClient?: net.Socket;
  private ipcReady = false;
  private ipcQueue: Array<any> = [];

  constructor(opt?: TransportStreamOptions) {
    super(opt);
    if (!isWorker) {
      throw new Error('WorkerTransport must be used in a cluster worker.');
    }
    if (ipc.enabled) {
      this.ipcClient = net.createConnection(ipc.path);
      this.ipcClient.setNoDelay();
      this.ipcClient
        .on('ready', () => {
          this.ipcReady = true;
          if (this.ipcQueue.length) {
            this.ipcQueue.forEach((item: any) => {
              this.ipcClient?.write(`${JSON.stringify(item.message)}\n`, () => {
                item.done();
              });
            });
          }
        })
        .on('error', (error) => {
          console.error(error);
          throw error;
        });
    }
  }

  log(info: any, callback: () => void = noop): void {
    const postMsg = {
      type: 'log',
      payload: info,
    };
    const done = (error: Error | null): void => {
      if (error) {
        console.error(error);
        return;
      }
      callback();
      setImmediate(() => {
        this.emit('logged', info);
      });
    };

    if (ipc.enabled) {
      if (!this.ipcReady) {
        this.ipcQueue.push({
          message: postMsg,
          done,
        });
        return;
      }
      this.ipcClient?.write(`${JSON.stringify(postMsg)}\n`, () => {
        done(null);
      });
      return;
    }
    worker.send(postMsg, undefined, done);
  }
}

export class EnhancedConsole extends Transport {
  private colorFormat: Colorizer = colorize();

  constructor(opt: TransportStreamOptions = {}) {
    super(opt);
  }

  log(info: any, callback: () => void = noop): void {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const print = (type: 'error' | 'log'): void => {
      const color = (str: string) => (process.stdout.isTTY ? this.colorFormat.colorize(info[LEVEL], str) : str);
      let msg = `level: ${color(info.level)}`;
      if (info.timestamp) {
        msg = `${msg}\ntimestamp: ${color(info.timestamp)}`;
      }
      if (info.durationMs) {
        msg = `${msg}\ndurationMs: ${color(info.durationMs)}`;
      }
      if (info.user) {
        msg = `${msg}\nuser: ${color(info.user)}`;
      }
      msg = `${msg}\nmessage: ${color(info.message)}`;
      if (info.response) {
        const { message, stack, ...rest } = JSON.parse(info.response);
        // it's an error object
        if (message && stack) {
          msg = `${msg}\nresponse.message: ${color(message)}\nresponse.stack: ${color(stack)}\nresponse(rest): ${color(
            JSON.stringify(rest, null, 2),
          )}`;
        } else {
          msg = `${msg}\nresponse: ${color(JSON.stringify(JSON.parse(info.response), null, 2))}`;
        }
      }
      console[type](`${msg}\n`);
    };
    // level may contain special color character
    if (info.level.includes('error')) {
      print('error');
    } else {
      print('log');
    }
    callback();
  }
}

// this is constant transport, please don't change this
let workerTransports: Array<Transport> = [];
export const getWorkerTransports = () => {
  if (!workerTransports.length) {
    workerTransports = [new WorkerTransport()];
  }
  return workerTransports;
};

// the following transports are for exceptions and logs, you can change them as you like.
let exceptionTransports: Array<Transport> = [];
export const getExceptionTransports = (): Array<Transport> => {
  if (!exceptionTransports.length) {
    exceptionTransports = [
      new DailyRotateFile({
        level: 'error',
        filename: path.join(fileDir, 'exception', logExceptionFileName),
        maxSize,
        maxFiles,
      }),
    ];
    if (isDev) {
      exceptionTransports.push(
        new EnhancedConsole({
          level: 'debug',
        }),
      );
    }
  }
  return exceptionTransports;
};

let primaryTransports: Array<Transport> = [];
export const getPrimaryTransports = (): Array<Transport> => {
  if (!primaryTransports.length) {
    primaryTransports = [
      new DailyRotateFile({
        level: 'info',
        filename: path.join(fileDir, 'info', logInfoFileName),
        maxSize,
        maxFiles,
      }),
      new DailyRotateFile({
        level: 'error',
        filename: path.join(fileDir, 'error', logErrorFileName),
        maxSize,
        maxFiles,
      }),
    ];
    if (isDev) {
      primaryTransports.push(
        new EnhancedConsole({
          level: 'debug',
        }),
      );
    }
  }
  return primaryTransports;
};
