/* eslint-disable */
require('dotenv').config()
const path = require('path');
const fs = require('fs');
const logPath = process.env.SERVER_LOG || path.join(__dirname, 'log', 'pm2');
if (!fs.existsSync(logPath)) {
  // create pm2 log directory automatically
  fs.mkdirSync(logPath, { recursive: true });
}

const logFile = file => path.join(logPath, file);

module.exports = {
  apps: [
    {
      name: 'log-server',
      script: './dist/log-server.js',
      env: {
        NODE_ENV: 'production',
        APP_ENV: 'prod',
        ENABLE_APP_LOG_IPC: 'true',
      },
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('log-server-error.log'),
      out_file: logFile('log-server-out.log')
    },
    {
      name: 'simple-service-with-cluster', // cluster created by ourself
      script: './dist/cluster.js',
      env: {
        APP_ENV: 'prod',
        NODE_ENV: 'production',
        PORT: '4100',
        CLUSTER_WORKS: '2'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: logFile('simple-service-with-cluster-error.log'),
      out_file: logFile('simple-service-with-cluster-out.log')
    },
    {
      name: 'simple-service-with-log-server', // cluster created by pm2
      script: './dist/index.js',
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
      error_file: logFile('simple-service-with-log-server-error.log'),
      out_file: logFile('simple-service-with-log-server-out.log')
    },
    {
      name: 'simple-service-queue',
      script: './dist/queue.js',
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