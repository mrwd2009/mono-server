import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export type GatewayENV = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
  MAIN_REDIS_URL?: string,
  APP_LOG_SEVER_PORT?: string,
  ENABLE_APP_LOG_SERVER?: string,
  WINSTON_LOG_DIR?: string,
  WINSTON_LOG_FILENAME?: string,
  WINSTON_LOG_ERROR_FILENAME?: string,
  WINSTON_LOG_EXCEPTION_FILENAME?: string,
  APP_ENV?: string,
  MAIN_DB_USER?: string,
  MAIN_DB_PASS?: string,
  MAIN_DB_HOST?: string,
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

const config = {
  appEnv,
  isDev,
  traceKnownErrorInDev: isDev ? (envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true') : false,
  jwt: {
    cookieKey: `simple-deployment-${nodeEnv}`,
    issuer: 'di@gridx.cn',
    audience: 'gridx.cn',
    secret: envObj.JWT_SECRET,
    expireHour: 3,
  },
  redis: {
    main: {
      url: envObj.MAIN_REDIS_URL,
      prefix: `simple-deployment-${nodeEnv}-`,
      expired: 3600,
    },
  },
  logger: {
    rotateOptions: {
      fileDir: path.join(__dirname, envObj.WINSTON_LOG_DIR || '../../log/winston'),
      maxSize: '30m',
      maxFiles: '90d',
      logInfoFileName: envObj.WINSTON_LOG_FILENAME || `info-${nodeEnv}-%DATE%.log`,
      logErrorFileName: envObj.WINSTON_LOG_ERROR_FILENAME || `error-${nodeEnv}-%DATE%.log`,
      logExceptionFileName: envObj.WINSTON_LOG_EXCEPTION_FILENAME || `exception-${nodeEnv}-%DATE%.log`,
    },
    server: {
      enabled: !!envObj.ENABLE_APP_LOG_SERVER,
      host: '127.0.0.1',
      port: parseInt(envObj.APP_LOG_SEVER_PORT || '2448'),
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
  ...appConfig
};

export default config;