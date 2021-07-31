import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export type GatewayENV = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
  MAIN_REDIS_URL?: string,
  APP_LOG_SEVER_PORT?: string,
  ENABLE_APP_LOG_SERVER?: string,
  ENABLE_APP_LOG_IPC?: string,
  WINSTON_LOG_DIR?: string,
  WINSTON_LOG_FILENAME?: string,
  WINSTON_LOG_ERROR_FILENAME?: string,
  WINSTON_LOG_EXCEPTION_FILENAME?: string,
  APP_ENV?: string,
  MAIN_DB_USER?: string,
  MAIN_DB_PASS?: string,
  MAIN_DB_HOST?: string,
  QUEUE_REDIS_URL?: string,
  QUEUE_ENABLE_DASHBOARD?: string,
}

export interface GatewayConfig {
  address: string,
}

const envObj: GatewayENV = process.env;
const nodeEnv = envObj.NODE_ENV || 'development';
const appEnv = envObj.APP_ENV || 'dev';
const isDev = nodeEnv === 'development';

const appConfigFiles = fs.readdirSync(path.join(__dirname, 'env'));
let appConfig: GatewayConfig;
if (_.find(appConfigFiles, item => item.includes(appEnv))) {
  appConfig = require(path.join(__dirname, 'env', appEnv)).default;
} else {
  appConfig = require('./env/dev').default;
}

const defaultRedisUrl = 'redis://localhost:6379';
const commonPrefix = `simple-service-${nodeEnv}-${appEnv}`;
const logFileDir = path.join(__dirname, envObj.WINSTON_LOG_DIR || '../../log/winston', `${nodeEnv}/${appEnv}`);
const config = {
  appEnv,
  isDev,
  traceKnownErrorInDev: isDev ? (envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true') : false,
  jwt: {
    cookieKey: commonPrefix,
    issuer: 'di@gridx.cn',
    audience: 'gridx.cn',
    secret: envObj.JWT_SECRET,
    expireHour: 3,
  },
  redis: {
    main: {
      url: envObj.MAIN_REDIS_URL || defaultRedisUrl,
      prefix: `${commonPrefix}-main-`,
      expired: 3600,
    },
  },
  logger: {
    rotateOptions: {
      fileDir: logFileDir,
      maxSize: '30m',
      maxFiles: '90d',
      logInfoFileName: envObj.WINSTON_LOG_FILENAME || `info-${nodeEnv}-%DATE%.log`,
      logErrorFileName: envObj.WINSTON_LOG_ERROR_FILENAME || `error-${nodeEnv}-%DATE%.log`,
      logExceptionFileName: envObj.WINSTON_LOG_EXCEPTION_FILENAME || `exception-${nodeEnv}-%DATE%.log`,
    },
    server: {
      enabled: envObj.ENABLE_APP_LOG_SERVER === 'true',
      host: '127.0.0.1',
      port: parseInt(envObj.APP_LOG_SEVER_PORT || '2448'),
    },
    ipc: {
      enabled: envObj.ENABLE_APP_LOG_IPC === 'true',
      path: path.join(logFileDir, 'log.socket'),
    },
  },
  database: {
    main: {
      username: envObj.MAIN_DB_USER!,
      password: envObj.MAIN_DB_PASS!,
      host: envObj.MAIN_DB_HOST!,
    },
  },
  cors: {
    allowedDomain: [],
  },
  queue: {
    redis: {
      url: envObj.QUEUE_REDIS_URL || defaultRedisUrl,
    },
    options: {
      prefix: `${commonPrefix}-queue-`
    },
    dashboard: {
      enabled: envObj.QUEUE_ENABLE_DASHBOARD === 'true',
      basePath: '/admin/queues'
    }
  },
  ...appConfig
};

export default config;