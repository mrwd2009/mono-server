import path from 'path';

export type GatewayConfig = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
  MAIN_REDIS_URL?: string,
  APP_LOG_SEVER_PORT?: string,
  ENABLE_APP_LOG_SERVER?: string,
  WINSTON_LOG_DIR?: string,
  WINSTON_LOG_FILENAME?: string,
  WINSTON_LOG_ERROR_FILENAME?: string,
  WINSTON_LOG_EXCEPTION_FILENAME?: string,
}

const envObj: GatewayConfig = process.env;
const env = envObj.NODE_ENV || 'development';
const isDev = env === 'development';
const config = {
  env,
  isDev,
  traceKnownErrorInDev: isDev ? (envObj.TRACE_KNOWN_ERROR_IN_DEV === 'true') : false,
  jwt: {
    cookieKey: `simple-deployment-${env}`,
    issuer: 'di@gridx.cn',
    audience: 'gridx.cn',
    secret: envObj.JWT_SECRET,
    expireHour: 3,
  },
  redis: {
    main: {
      url: envObj.MAIN_REDIS_URL,
      prefix: `simple-deployment-${env}-`,
      expired: 3600,
    },
  },
  logger: {
    rotateOptions: {
      fileDir: path.join(__dirname, envObj.WINSTON_LOG_DIR || '../../log/winston'),
      maxSize: '30m',
      maxFiles: '90d',
      logInfoFileName: envObj.WINSTON_LOG_FILENAME || `info-${env}-%DATE%.log`,
      logErrorFileName: envObj.WINSTON_LOG_ERROR_FILENAME || `error-${env}-%DATE%.log`,
      logExceptionFileName: envObj.WINSTON_LOG_EXCEPTION_FILENAME || `exception-${env}-%DATE%.log`,
    },
    server: {
      enabled: !!envObj.ENABLE_APP_LOG_SERVER,
      host: '127.0.0.1',
      port: parseInt(envObj.APP_LOG_SEVER_PORT || '2448'),
    },
  }
};

export default config;