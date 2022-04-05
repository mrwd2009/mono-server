import { createLogger, LoggerOptions } from 'winston';
import Transport from 'winston-transport';
import { getWorkerTransports } from './log-transport';
import { fullFormats } from './log-format';
import { registerCleanupHandler } from '../signal/handler';

const opts: LoggerOptions & { rejectionHandlers?: Array<Transport> } = {
  format: fullFormats,
  transports: getWorkerTransports(),
  exceptionHandlers: getWorkerTransports(),
  // rejectionHandlers: getWorkerTransports(),
  exitOnError: true,
};
const logger = createLogger(opts);

// gracefully close
registerCleanupHandler(async () => {
  logger.close();
});

export default logger;
