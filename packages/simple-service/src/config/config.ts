import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { GatewayEnvConfig } from '../types';

export type GatewayENV = NodeJS.ProcessEnv & {
  APP_ENV?: string;
  JWT_SECRET?: string;
  JWT_EXPIRED_HOUR?: string;
  TRACE_KNOWN_ERROR_IN_DEV?: string;
  MAIN_REDIS_URL?: string;
  QUEUE_REDIS_URL?: string;
  QUEUE_MODE?: string;
  QUEUE_WORKERS?: string;
  ENABLE_APP_LOG_IPC?: string;
  WINSTON_LOG_DIR?: string;
  WINSTON_LOG_FILENAME?: string;
  WINSTON_LOG_ERROR_FILENAME?: string;
  WINSTON_LOG_EXCEPTION_FILENAME?: string;
  MODEL_DB_USERNAME?: string;
  MODEL_DB_PASSWORD?: string;
  MODEL_DB_HOST?: string;
  MODEL_DB_PORT?: string;
  MODEL_DB_DATABASE?: string;
  GLOBAL_DB_USERNAME?: string;
  GLOBAL_DB_PASSWORD?: string;
  GLOBAL_DB_HOST?: string;
  GLOBAL_DB_PORT?: string;
  GLOBAL_DB_DATABASE?: string;
  GATEWAY_DB_USERNAME?: string;
  GATEWAY_DB_PASSWORD?: string;
  GATEWAY_DB_HOST?: string;
  GATEWAY_DB_PORT?: string;
  GATEWAY_DB_DATABASE?: string;
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
  APP_ETCD_URL?: string;
  APP_ENABLE_LOCALHOST_SSL?: string;
  APP_OAUTH2_KEY?: string;
  APP_OAUTH2_SECRET?: string;
  APP_OAUTH2_LOGIN_URL?: string;
  APP_OAUTH2_TOKEN_URL?: string;
  APP_OAUTH2_CALLBCK_URL?: string;
  APP_OAUTH2_USER_INFO_URL?: string;
  APP_OAUTH2_UI_HOME_URL?: string;
  APP_OAUTH2_UI_LOGIN_URL?: string;
  APP_ENABLE_CACHE?: string;
  APP_ENABLE_AUTH_EMAIL?: string;
  APP_QUEUE_ENV?: string;
  APP_GMAIL_USER?: string;
  APP_GMAIL_CLIENT_ID?: string;
  APP_GMAIL_CLIENT_SECRET?: string;
  APP_GMAIL_REFRESH_TOKEN?: string;
  APP_EMAIL_TYPE?: string;
  APP_ENABLE_EMAIL?: string;
  APP_AUTH_FORGOT_PASSWORD_PATH?: string;
  APP_AUTH_CONFIRM_ACCOUNT_PATH?: string;
  APP_AUTH_UNLOCK_ACCOUNT_PATH?: string;
  APP_AUTH_HOME_PATH?: string;
  APP_ELASTIC_HOST?: string;
  APP_ELASTIC_USERNAME?: string;
  APP_ELASTIC_PASSWORD?: string;
  APP_ELASTIC_LOG_TEMPLATE?: string;
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
const appPrefix = `simple-service-${nodeEnv}`;
const commonPrefix = `${appPrefix}-${appEnv}`;

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

// determine to enable cache in system
let enableCache = false;
if (envObj.APP_ENABLE_CACHE) {
  enableCache = envObj.APP_ENABLE_CACHE === 'true';
} else {
  enableCache = !isDev;
}

// whether enable email service
let enableAuthEmail = false;
if (envObj.APP_ENABLE_AUTH_EMAIL) {
  enableAuthEmail = envObj.APP_ENABLE_AUTH_EMAIL === 'true';
} else {
  enableAuthEmail = !isDev;
}

const config = {
  nodeEnv,
  appEnv,
  isDev,
  enableDevSSL: envObj.APP_ENABLE_LOCALHOST_SSL === 'true',
  traceKnownErrorInDev: isDev ? envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true' : false,
  cookie: {
    keys: cookieKeys,
  },
  auth: {
    traceLogin: envObj.APP_TRACE_LOGIN === 'true',
    checkExpiredPass: envObj.APP_CHECK_EXPIRED_PASS === 'true',
    enableEmailService: enableAuthEmail,
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
    pathInfo: {
      forgotPassword: envObj.APP_AUTH_FORGOT_PASSWORD_PATH || '/reset-password',
      confirmAccount: envObj.APP_AUTH_CONFIRM_ACCOUNT_PATH || '/confirm-account',
      unlockAccount: envObj.APP_AUTH_UNLOCK_ACCOUNT_PATH || '/unlock-account',
      home: envObj.APP_AUTH_HOME_PATH || '',
    },
  },
  jwt: {
    cookieKey: commonPrefix,
    issuer: 'wudi.link.me@gmail.com',
    audience: 'gmail.com',
    secret: envObj.JWT_SECRET,
    expireHour: parseInt(envObj.JWT_EXPIRED_HOUR || '3', 10),
  },
  oauth2: {
    loginUrl: envObj.APP_OAUTH2_LOGIN_URL!,
    tokenUrl: envObj.APP_OAUTH2_TOKEN_URL!,
    callbackUrl: envObj.APP_OAUTH2_CALLBCK_URL!,
    userInfoUrl: envObj.APP_OAUTH2_USER_INFO_URL!,
    uiHomeUrl: envObj.APP_OAUTH2_UI_HOME_URL!,
    uiLoginUrl: envObj.APP_OAUTH2_UI_LOGIN_URL!,
    consumerKey: envObj.APP_OAUTH2_KEY!,
    consumerSecret: envObj.APP_OAUTH2_SECRET!,
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
  systemCache: {
    enabled: enableCache,
    passportExpired: 600,
  },
  email: {
    type: envObj.APP_EMAIL_TYPE || 'gmail',
    enabled: envObj.APP_ENABLE_EMAIL === 'true',
    gmail: {
      user: envObj.APP_GMAIL_USER!,
      clientId: envObj.APP_GMAIL_CLIENT_ID!,
      clientSecret: envObj.APP_GMAIL_CLIENT_SECRET!,
      refreshToken: envObj.APP_GMAIL_REFRESH_TOKEN!,
    },
  },
  redis: {
    main: {
      url: envObj.MAIN_REDIS_URL || defaultRedisUrl,
      prefix: `${appPrefix}-main-`,
      expired: 3600,
    },
  },
  etcd: {
    main: {
      url: envObj.APP_ETCD_URL || 'http://localhost:2380',
    },
  },
  elastic: {
    main: {
      host: envObj.APP_ELASTIC_HOST!,
      username: envObj.APP_ELASTIC_USERNAME!,
      password: envObj.APP_ELASTIC_PASSWORD!,
    },
  },
  logger: {
    elastic: {
      templateName: envObj.APP_ELASTIC_LOG_TEMPLATE || 'rule-engine-modeling-ui',
    },
    rotateOptions: {
      fileDir: logFileDir,
      maxSize: '1024m',
      maxFiles: '20d',
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
    model: {
      username: envObj.MODEL_DB_USERNAME!,
      password: envObj.MODEL_DB_PASSWORD!,
      host: envObj.MODEL_DB_HOST!,
      port: envObj.MODEL_DB_PORT!,
      database: envObj.MODEL_DB_DATABASE || 'model_dev',
    },
    global: {
      username: envObj.GLOBAL_DB_USERNAME!,
      password: envObj.GLOBAL_DB_PASSWORD!,
      host: envObj.GLOBAL_DB_HOST!,
      port: envObj.GLOBAL_DB_PORT!,
      database: envObj.GLOBAL_DB_DATABASE || 'model_global',
    },
    gateway: {
      username: envObj.GATEWAY_DB_USERNAME!,
      password: envObj.GATEWAY_DB_PASSWORD!,
      host: envObj.GATEWAY_DB_HOST!,
      port: envObj.GATEWAY_DB_PORT!,
      database: envObj.GATEWAY_DB_DATABASE || 'model_global',
    },
  },
  queue: {
    mode: envObj.QUEUE_MODE || 'SINGLE_PROCESS_MODE',
    workers: parseInt(envObj.QUEUE_WORKERS || '0'),
    redis: {
      url: envObj.QUEUE_REDIS_URL || defaultRedisUrl,
    },
    options: {
      prefix: `${envObj.APP_QUEUE_ENV || appPrefix}-queue`,
    },
    dashboard: {
      basePath: '/dashboard',
    },
  },
  monitor: {
    prometheusPort: parseInt(envObj.APP_PROMETHEUS_PORT || '4000'),
    promethuesPath: envObj.APP_PROMETHEUS_PATH || '/metrics',
    promethuesLabel: envObj.APP_PROMETHEUS_LABEL || 'modeling-api',
  },
};

export type GatewayConfig = typeof config;

const mergedConfig = _.merge(config, appConfig);

export default mergedConfig;
