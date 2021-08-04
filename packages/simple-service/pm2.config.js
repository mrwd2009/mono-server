/* eslint-disable */
require('dotenv').config()
const path = require('path');
const logPath = process.env.SERVER_LOG || path.join(__dirname, './log/pm2');

const logFile = file => path.join(logPath, file);

module.exports = {
  apps: [
    {
      name: 'log-server-udp',
      script: './log-server-udp.js',
      env: {
        APP_ENV: 'prod',
        NODE_ENV: 'production',
        APP_LOG_SEVER_PORT: '2000', // used by logger in pm2 cluster mode
      },
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('log-server-udp-error.log'),
      out_file: logFile('log-server-udp-out.log')
    },
    {
      name: 'log-server-ipc',
      script: './log-server-ipc.js',
      env: {
        NODE_ENV: 'production',
        APP_ENV: 'prod',
        ENABLE_APP_LOG_IPC: 'true',
      },
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('log-server-ipc-error.log'),
      out_file: logFile('log-server-ipc-out.log')
    },
    {
      name: 'simple-service',
      script: './index.js',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        APP_ENV: 'prod',
        NODE_ENV: 'production',
        ENABLE_APP_LOG_SERVER: 'true',
        APP_LOG_SEVER_PORT: '2000', // used by logger in pm2 cluster mode
        PORT: '4100',
      },
      env_development: {
        NODE_ENV: 'development'
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('simple-service-error.log'),
      out_file: logFile('simple-service-out.log')
    },
    {
      name: 'simple-service-with-ipc-log',
      script: './index.js',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        APP_ENV: 'prod',
        NODE_ENV: 'production',
        ENABLE_APP_LOG_IPC: 'true',
        PORT: '4100',
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('simple-service-with-ipc-log-error.log'),
      out_file: logFile('simple-service-with-ipc-log-out.log')
    },
    {
      name: 'simple-service-queue',
      script: './queue-starter.js',
      env: {
        APP_ENV: 'queue',
        NODE_ENV: 'production',
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('simple-deployment-queue-error.log'),
      out_file: logFile('simple-deployment-queue-out.log')
    }
  ]
};