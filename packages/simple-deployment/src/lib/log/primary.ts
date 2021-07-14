/* eslint-disable @typescript-eslint/no-explicit-any */
import cluster from 'cluster';
import { createLogger, LoggerOptions } from 'winston';
import Transport from 'winston-transport';
import { getPrimaryTransports, getExceptionTransports } from './log-transport';
import { fullFormats } from './log-format';

const baseOpts: LoggerOptions & { rejectionHandlers: Array<Transport> } = {
  transports: getPrimaryTransports(),
  exceptionHandlers: getExceptionTransports(),
  rejectionHandlers: getExceptionTransports(),
  exitOnError: true,
};
const logger = createLogger({
  ...baseOpts,
  format: fullFormats,
});
const pureLogger = createLogger(baseOpts);

cluster.on('message', (worker, event) => {
  // redirect worker log into primary log
  if (event && event.type === 'log') {
    pureLogger.log(event.payload);
  }
});

export default logger;