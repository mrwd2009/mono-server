export type GatewayConfig = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
  MAIN_REDIS_URL?: string,
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
      prefix: `simple-deployment-${env}`,
      expired: 3600,
    },
  },
};

export default config;