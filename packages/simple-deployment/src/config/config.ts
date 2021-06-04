export type GatewayConfig = NodeJS.ProcessEnv & {
  JWT_SECRET?: string,
  TRACE_KNOWN_ERROR_IN_DEV?: string,
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
};

export default config;