import _ from 'lodash';

export type GatewaySignalHandler = () => Promise<void>;

interface HandlersMap {
  cleanup: GatewaySignalHandler[];
  init: Promise<Error | boolean>[];
}
const signalHandlersMap: HandlersMap = { cleanup: [], init: [] };

export const registerCleanupHandler = (handler: GatewaySignalHandler) => {
  signalHandlersMap.cleanup.push(handler);
};

export const removeCleanupHandler = (handler: GatewaySignalHandler) => {
  signalHandlersMap.cleanup = _.filter(signalHandlersMap.cleanup, (item) => {
    return item !== handler;
  });
};

const triggerCleanup = () => {
  if (!signalHandlersMap.cleanup.length) {
    process.exit();
  }
  const handlers = signalHandlersMap.cleanup;
  signalHandlersMap.cleanup = [];

  return Promise.all(
    _.map(handlers, (handler) => {
      return handler();
    }),
  )
    .then(() => {
      process.exit();
    })
    .catch(() => {
      process.exit(1);
    });
};

process.on('SIGINT', triggerCleanup);
process.on('SIGTERM', triggerCleanup);

export const registerInitPromise = (p: Promise<Error | boolean>) => {
  signalHandlersMap.init.push(p);
};

export const removeInitPromise = (p: Promise<Error | boolean>) => {
  signalHandlersMap.init = _.filter(signalHandlersMap.init, (item) => {
    return item !== p;
  });
};

export const triggerInit = () => {
  if (!signalHandlersMap.init.length) {
    return;
  }

  const handlers = signalHandlersMap.init;
  signalHandlersMap.init = [];

  return Promise.all(handlers)
    .then(() => {
      console.log(`API Gateway is initialized successfully.`);
    })
    .catch(() => {
      console.error(`API Gateway is initialized failed.`);
    });
};

setTimeout(triggerInit, 0);
