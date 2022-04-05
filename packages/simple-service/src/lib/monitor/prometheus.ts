import http from 'http';
import client, { Registry, AggregatorRegistry, register as globalRegister } from 'prom-client';
import { isWorker } from 'cluster';
import { registerCleanupHandler, registerInitPromise } from '../signal/handler';
import { ip } from '../../lib/util';
import config from '../../config/config';

export const initialize = async (appName: string, clusterMode = false) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initStep: any;
  if (clusterMode) {
    if (!isWorker) {
      initStep = new Promise<Error | boolean>((resolve, reject) => {
        const register = new AggregatorRegistry();
  
        client.collectDefaultMetrics({ register });
  
        const server = http.createServer(async (req, res) => {
          if (req.url !== config.monitor.promethuesPath) {
            req.statusCode = 404;
            res.end(JSON.stringify({ meta: { code: 404, message: 'Not supported url.' }, data: null }));
            return;
          }
  
          res.setHeader('Content-Type', register.contentType);
          const metrics = await register.clusterMetrics();
          res.end(metrics);
        });
        server.listen(config.monitor.prometheusPort, () => {
          if (config.isDev) {
            console.log('\u001b[38;5;28m--------------------- API Prometheus Cluster Serivce ---------------------\u001b[0m');
            console.log('The http endpoints are as following.\n');
            console.log(
              `\u001b[30;1mLocal:\u001b[0m            http://localhost:\u001b[30;1m${config.monitor.prometheusPort}${config.monitor.promethuesPath}\u001b[0m`,
            );
            console.log(
              `\u001b[30;1mOn Your Network:\u001b[0m  http://${ip.getLocalIPs()[0]}:\u001b[30;1m${
                config.monitor.prometheusPort
              }${config.monitor.promethuesPath}\u001b[0m`,
            );
            console.log('\n');
            resolve(true);
          } else {
            resolve(true);
          }
        });
  
        server.on('error', (error: Error): void => {
          reject(error);
          if (error) {
            console.error(error);
          }
        });
  
        registerCleanupHandler(async () => {
          await new Promise((resolve, reject) => {
            server.close((error) => {
              if (error) {
                return reject(error);
              }
              resolve(true);
            });
          });
        });
      });
    } else {
      initStep = new Promise<Error | boolean>((resolve) => {
        new AggregatorRegistry();
        globalRegister.setDefaultLabels({
          app: `app-gateway-${config.nodeEnv}-${config.appEnv}-${appName}}`,
        });
        client.collectDefaultMetrics({
          gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
        });
        resolve(true);
      });
    }
  } else {
    initStep = new Promise<Error | boolean>((resolve, reject) => {
      const register = new Registry();

      register.setDefaultLabels({
        app: `app-gateway-${config.nodeEnv}-${config.appEnv}-${appName}}`,
      });

      client.collectDefaultMetrics({ register });

      const server = http.createServer(async (req, res) => {
        if (req.url !== config.monitor.promethuesPath) {
          req.statusCode = 404;
          res.end(JSON.stringify({ meta: { code: 404, message: 'Not supported url.' }, data: null }));
          return;
        }

        res.setHeader('Content-Type', register.contentType);
        const metrics = await register.metrics();
        res.end(metrics);
      });
      server.listen(config.monitor.prometheusPort, () => {
        if (config.isDev) {
          console.log('\u001b[38;5;28m--------------------- API Prometheus Serivce ---------------------\u001b[0m');
          console.log('The http endpoints are as following.\n');
          console.log(
            `\u001b[30;1mLocal:\u001b[0m            http://localhost:\u001b[30;1m${config.monitor.prometheusPort}${config.monitor.promethuesPath}\u001b[0m`,
          );
          console.log(
            `\u001b[30;1mOn Your Network:\u001b[0m  http://${ip.getLocalIPs()[0]}:\u001b[30;1m${
              config.monitor.prometheusPort
            }${config.monitor.promethuesPath}\u001b[0m`,
          );
          console.log('\n');
          resolve(true);
        } else {
          resolve(true);
        }
      });

      server.on('error', (error: Error): void => {
        reject(error);
        if (error) {
          console.error(error);
        }
      });

      registerCleanupHandler(async () => {
        await new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) {
              return reject(error);
            }
            resolve(true);
          });
        });
      });
    });
  }
  registerInitPromise(initStep);
  await initStep;
};
