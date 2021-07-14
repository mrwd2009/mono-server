/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'winston';
import Transport, { TransportStreamOptions } from 'winston-transport';
import { isWorker, worker } from 'cluster';
import { noop } from 'lodash';
import { Colorizer } from 'logform';
import { LEVEL } from 'triple-beam';

const { colorize } = format;

export class WorkerTransport extends Transport {
  constructor(opt?: TransportStreamOptions) {
    super(opt);
    if (!isWorker) {
      throw new Error("WorkerTransport must be used in a cluster worker.");
    }
  }

  log(info: any, callback: () => void = noop): void {
    worker.send({
      type: 'log',
      payload: info,
    }, undefined, (error: Error | null): void => {
      if (error) {
        console.error(error);
        return;
      }
      callback();
      setImmediate(() => {
        this.emit('logged', info);
      });
    });
  }
}

export class EnhancedConsole extends Transport {
  private colorFormat: Colorizer;

  constructor(opt: TransportStreamOptions = {}) {
    const format = colorize({ all: true });
    super({
      ...opt,
      format,
    });
    this.colorFormat = format;
  }

  log(info: any, callback: () => void = noop): void {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const print = (type: 'error' | 'log'): void => {
      let msg = `level: ${info.level}`;
      const color = (str: string) => this.colorFormat.colorize(info[LEVEL], str);
      if (info.timestamp) {
        msg = `${msg}\ntimestamp: ${color(info.timestamp)}`;
      }
      msg = `${msg}\nmessage: ${info.message}`;
      if (info.response) {
        const {
          message,
          stack,
          ...rest
        } = JSON.parse(info.response);
        // it's an error object
        if (message && stack) {
          msg = `${msg}\nresponse.message: ${color(message)}\nresponse.stack: ${color(stack)}\nresponse(rest): ${color(JSON.stringify(rest, null, 2))}`;
        } else {
          msg = `${msg}\nresponse: ${color(JSON.stringify(JSON.parse(info.response), null, 2))}`;
        }
      }
      console[type](`${msg}\n`);
    }
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
    workerTransports = [
      new WorkerTransport(),
    ];
  }
  return workerTransports;
};

// the following transports are for exceptions and logs, you can change them as you like.
let exceptionTransports: Array<Transport> = [];
export const getExceptionTransports = (): Array<Transport> => {
  if (!exceptionTransports.length) {
    exceptionTransports = [
      new EnhancedConsole(),
    ];
  }
  return exceptionTransports;
};

let primaryTransports: Array<Transport> = [];
export const getPrimaryTransports = (): Array<Transport> => {
  if (!primaryTransports.length) {
    primaryTransports = [
      new EnhancedConsole(),
    ];
  }
  return primaryTransports;
};
