export type GatewayConfig = NodeJS.ProcessEnv & {
  JWT_SECRET?: string
}

const envObj: GatewayConfig = process.env;
const env = envObj.NODE_ENV || 'development';

const config = {
  env,
  isDev: env === 'development',
  jwt: {
    cookieKey: `simple-deployment-${env}`,
    issuer: 'di@gridx.cn',
    audience: 'gridx.cn',
    secret: envObj.JWT_SECRET,
    expireHour: 3,
  },
};

export default config;