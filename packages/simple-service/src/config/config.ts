import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { GatewayEnvConfig } from '../types';

export type GatewayENV = NodeJS.ProcessEnv & {
  JWT_SECRET?: string;
  JWT_EXPIRED_HOUR?: string;
  TRACE_KNOWN_ERROR_IN_DEV?: string;
  MAIN_REDIS_URL?: string;
  ENABLE_APP_LOG_IPC?: string;
  WINSTON_LOG_DIR?: string;
  WINSTON_LOG_FILENAME?: string;
  WINSTON_LOG_ERROR_FILENAME?: string;
  WINSTON_LOG_EXCEPTION_FILENAME?: string;
  APP_ENV?: string;
  MAIN_DB_USER?: string;
  MAIN_DB_PASS?: string;
  MAIN_DB_HOST?: string;
  MAIN_DB_PORT?: string;
  QUEUE_REDIS_URL?: string;
  GATEWAY_DB_USER?: string;
  GATEWAY_DB_PASS?: string;
  GATEWAY_DB_HOST?: string;
  GATEWAY_DB_PORT?: string;
  GITHUB_USERNAME?: string;
  GITHUB_PASSWORD?: string;
  DEPLOYMENT_ADMIN_HOST?: string;
  DEPLOYMENT_CLIENT?: string;
  TEMP_FILE_DIR?: string;
  COOKIE_KEYS?: string;
  ALLOWED_DOMAINS?: string;
  APP_MYSQL_PORT?: string;
  APP_VALID_EMAIL_DOMAINS?: string;
  APP_TRACE_LOGIN?: string;
  APP_CHECK_EXPIRED_PASS?: string;
  APP_PROMETHEUS_PORT?: string;
  APP_PROMETHEUS_PATH?: string;
  APP_PROMETHEUS_LABEL?: string;
  APP_SESSION_AUTO_EXTEND?: string;
  APP_SESSION_IGNORED_ROUTE?: string;
  APP_SESSION_RESET_HOUR?: string;
};

const envObj: GatewayENV = process.env;
const nodeEnv = envObj.NODE_ENV || 'development';
const appEnv = envObj.APP_ENV || 'dev';
const isDev = nodeEnv !== 'production';

// get app config
const appConfigFiles = fs.readdirSync(path.join(__dirname, 'env'));
let appConfig: GatewayEnvConfig;
if (_.find(appConfigFiles, (item) => item.includes(appEnv))) {
  appConfig = require(path.join(__dirname, 'env', appEnv)).default;
} else {
  appConfig = require('./env/dev').default;
}

const defaultRedisUrl = 'redis://localhost:6379';
const commonPrefix = `simple-service-${nodeEnv}-${appEnv}`;

// where to store winston log
const logFileDir = path.join(
  envObj.WINSTON_LOG_DIR || path.join(__dirname, '..', '..', 'log', 'winston'),
  nodeEnv,
  appEnv,
);
if (!fs.existsSync(logFileDir)) {
  // create log directory automatically
  fs.mkdirSync(logFileDir, { recursive: true });
}

// secret keys used to create signed cookie.
const cookieKeys = envObj.COOKIE_KEYS ? envObj.COOKIE_KEYS.split(',') : [];

// where to store temp file
const tempFileDir = path.join(envObj.TEMP_FILE_DIR || path.join(__dirname, '..', '..', 'temp'), nodeEnv, appEnv);
if (!fs.existsSync(tempFileDir)) {
  // create temp directory automatically
  fs.mkdirSync(tempFileDir, { recursive: true });
}

const config = {
  nodeEnv,
  appEnv,
  isDev,
  traceKnownErrorInDev: isDev ? envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true' : false,
  cookie: {
    keys: cookieKeys,
  },
  auth: {
    traceLogin: envObj.APP_TRACE_LOGIN === 'true',
    checkExpiredPass: envObj.APP_CHECK_EXPIRED_PASS === 'true',
    maxStrLen: 50, // email, password, display name
    passwordResetCycle: 180, //days
    failedAttemptCount: 5,
    autoUnlockTime: 30, // minutes
    validEmailDomains: envObj.APP_VALID_EMAIL_DOMAINS ? envObj.APP_VALID_EMAIL_DOMAINS.split(',') : [],
    zxcvbn: {
      score: 2,
      randomPasswordLoop: 4,
    },
    session: {
      autoExtend: envObj.APP_SESSION_AUTO_EXTEND === 'true',
      ignoredRoute: envObj.APP_SESSION_IGNORED_ROUTE || 'auto-refresh',
      restHour: parseInt(envObj.APP_SESSION_RESET_HOUR || '1', 10),
    },
  },
  jwt: {
    cookieKey: commonPrefix,
    issuer: 'wudi.link.me@gmail.com',
    audience: 'gmail.com',
    secret: envObj.JWT_SECRET,
    expireHour: parseInt(envObj.JWT_EXPIRED_HOUR || '3', 10),
  },
  cors: {
    allowedDomain: envObj.ALLOWED_DOMAINS ? envObj.ALLOWED_DOMAINS.split(',') : [],
  },
  upload: {
    path: tempFileDir,
  },
  rateLimiter: {
    keyPrefix: 'limiter',
    cookieKey: `${commonPrefix}-rl`,
    cookieExpiredDay: 7,
    points: 60,
    duration: 10,
    byIP: {
      // limited by ip
      points: 40 * 60, // times
      duration: 60, // second
    },
    byID: {
      // limited by id from cookie
      points: 10 * 60, // times
      duration: 60, // second
    },
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
    basic: {
      port: envObj.APP_MYSQL_PORT || '3306',
    },
    poolConfig: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    main: {
      username: envObj.MAIN_DB_USER!,
      password: envObj.MAIN_DB_PASS!,
      host: envObj.MAIN_DB_HOST!,
      port: envObj.MAIN_DB_PORT!,
    },
    gateway: {
      username: envObj.GATEWAY_DB_USER!,
      password: envObj.GATEWAY_DB_PASS!,
      host: envObj.GATEWAY_DB_HOST!,
      port: envObj.GATEWAY_DB_PORT!,
    },
  },
  queue: {
    redis: {
      url: envObj.QUEUE_REDIS_URL || defaultRedisUrl,
    },
    options: {
      prefix: `${commonPrefix}-queue-`,
    },
    dashboard: {
      basePath: '/dashboard',
    },
  },
  monitor: {
    prometheusPort: parseInt(envObj.APP_PROMETHEUS_PORT || '4000'),
    promethuesPath: envObj.APP_PROMETHEUS_PATH || '/metrics',
    promethuesLabel: envObj.APP_PROMETHEUS_LABEL || 'app-gateway',
  },
  github: {
    username: envObj.GITHUB_USERNAME || '',
    password: envObj.GITHUB_PASSWORD || '',
  },
  deployment: {
    adminHost: envObj.DEPLOYMENT_ADMIN_HOST || '',
    isClient: envObj.DEPLOYMENT_CLIENT === 'true',
    updateInternal: 10000,
  },
};

export type GatewayConfig = typeof config;

const mergedConfig = _.merge(config, appConfig);

export default mergedConfig;
