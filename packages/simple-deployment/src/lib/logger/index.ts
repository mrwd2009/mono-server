import { isWorker } from 'cluster';
import { Logger } from 'winston';
let logger: Logger;

if (isWorker) {
  logger = require('./worker').default;
} else {
  logger = require('./primary').default;
}

export default logger;