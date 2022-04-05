import _ from 'lodash';

export type GatewaySignalHandler = () => Promise<void>;


interface HandlersMap {
  cleanup: GatewaySignalHandler[],
}
const signalHandlersMap: HandlersMap = { cleanup: [] };

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

  return Promise.all(_.map(handlers, (handler) => {
    return handler();
  }))
    .then(() => {
      process.exit();
    })
    .catch(() => {
      process.exit(1);
    });
}

process.on('SIGINT', triggerCleanup);
process.on('SIGTERM', triggerCleanup);