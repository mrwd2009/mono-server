/* eslint-disable */
require('dotenv').config()
const path = require('path');
const logPath = process.env.SERVER_LOG || path.join(__dirname, './log/pm2');

const logFile = file => path.join(logPath, file);

module.exports = {
  apps: [
    {
      name: 'simple-deployment-log-server',
      script: './log-server.js',
      env: {
        NODE_ENV: 'production',
        APP_LOG_SEVER_PORT: '2000', // used by logger in pm2 cluster mode
      },
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('log-server-error.log'),
      out_file: logFile('log-server-out.log')
    },
    {
      name: 'simple-deployment',
      script: './index.js',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        NODE_ENV: 'production',
        ENABLE_APP_LOG_SERVER: 'true',
        APP_LOG_SEVER_PORT: '2000', // used by logger in pm2 cluster mode
      },
      env_development: {
        NODE_ENV: 'development'
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('simple-deployment-error.log'),
      out_file: logFile('simple-deployment-out.log')
    }
  ]
};