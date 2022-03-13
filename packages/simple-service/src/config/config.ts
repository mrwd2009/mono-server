import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export type GatewayENV = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
  MAIN_REDIS_URL?: string,
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
  GATEWAY_DB_USER?: string,
  GATEWAY_DB_PASS?: string,
  GATEWAY_DB_HOST?: string,
  GITHUB_USERNAME?: string,
  GITHUB_PASSWORD?: string,
  DEPLOYMENT_ADMIN_HOST?: string,
  DEPLOYMENT_CLIENT?: string,
  TEMP_FILE_DIR?: string;
}

export interface GatewayConfig {
  address: string,
}

const envObj: GatewayENV = process.env;
const nodeEnv = envObj.NODE_ENV || 'development';
const appEnv = envObj.APP_ENV || 'dev';
const isDev = nodeEnv !== 'production';

// get app config
const appConfigFiles = fs.readdirSync(path.join(__dirname, 'env'));
let appConfig: GatewayConfig;
if (_.find(appConfigFiles, item => item.includes(appEnv))) {
  appConfig = require(path.join(__dirname, 'env', appEnv)).default;
} else {
  appConfig = require('./env/dev').default;
}

const defaultRedisUrl = 'redis://localhost:6379';
const commonPrefix = `simple-service-${nodeEnv}-${appEnv}`;

// where to store winston log
const logFileDir = path.join(envObj.WINSTON_LOG_DIR || path.join(__dirname, '..', '..', 'log', 'winston'), nodeEnv, appEnv);
if (!fs.existsSync(logFileDir)) {
  // create log directory automatically
  fs.mkdirSync(logFileDir, { recursive: true });
}

// secret keys used to create signed cookie.
const cookieKeys = process.env.COOKIE_KEYS ? process.env.COOKIE_KEYS.split(',') : [];

// where to store temp file
const tempFileDir = path.join(envObj.TEMP_FILE_DIR || path.join(__dirname, '..', '..', 'temp'), nodeEnv, appEnv);
if (!fs.existsSync(tempFileDir)) {
  // create temp directory automatically
  fs.mkdirSync(tempFileDir, { recursive: true });
}

const config = {
  appEnv,
  isDev,
  traceKnownErrorInDev: isDev ? (envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true') : false,
  cookie: {
    keys: cookieKeys,
  },
  jwt: {
    cookieKey: commonPrefix,
    issuer: 'di@gridx.cn',
    audience: 'gridx.cn',
    secret: envObj.JWT_SECRET,
    expireHour: 3,
  },
  cors: {
    allowedDomain: ['localhost'],
  },
  upload: {
    path: tempFileDir,
  },
  rateLimiter: {
    keyPrefix: 'limiter',
    points: 60,
    duration: 10,
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
    gateway: {
      username: envObj.GATEWAY_DB_USER!,
      password: envObj.GATEWAY_DB_PASS!,
      host: envObj.GATEWAY_DB_HOST!,
    },
  },
  queue: {
    redis: {
      url: envObj.QUEUE_REDIS_URL || defaultRedisUrl,
    },
    options: {
      prefix: `${commonPrefix}-queue-`
    },
    dashboard: {
      basePath: '/dashboard'
    }
  },
  github:{
    username: envObj.GITHUB_USERNAME || '',
    password: envObj.GITHUB_PASSWORD || '',
  },
  deployment: {
    adminHost: envObj.DEPLOYMENT_ADMIN_HOST || '',
    isClient: envObj.DEPLOYMENT_CLIENT === 'true',
    updateInternal: 10000,
  },
  ...appConfig
};

export default config;