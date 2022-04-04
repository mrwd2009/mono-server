/* eslint-disable @typescript-eslint/no-explicit-any */
import cluster from 'cluster';
import { createLogger, LoggerOptions } from 'winston';
import Transport from 'winston-transport';
import { getPrimaryTransports, getExceptionTransports } from './log-transport';
import { fullFormats } from './log-format';
import { registerSignalHandler } from '../signal/handler';

const baseOpts: LoggerOptions & { rejectionHandlers?: Array<Transport> } = {
  transports: getPrimaryTransports(),
};
// only set exception log for main logger to avoid duplicated error information.
const logger = createLogger({
  ...baseOpts,
  format: fullFormats,
  exceptionHandlers: getExceptionTransports(),
  // rejectionHandlers: getExceptionTransports(),
  exitOnError: true,
});
// used by primary process or log server
export const pureLogger = createLogger(baseOpts);

// gracefully close
registerSignalHandler('SIGINT', async () => {
  logger.close();
  pureLogger.close();
});

cluster.on('message', (worker, event) => {
  // redirect worker log into primary log
  if (event && event.type === 'log') {
    pureLogger.log(event.payload);
  }
});

export default logger;
