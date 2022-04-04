import _ from 'lodash';

export type GatewaySignalHandler = () => Promise<void>;

type GatewaySignal = 'SIGINT';

interface HandlersMap {
  SIGINT?: GatewaySignalHandler[],
}
const signalHandlersMap: HandlersMap = {};

export const registerSignalHandler = (signalName: GatewaySignal, handler: GatewaySignalHandler) => {
  if (!signalHandlersMap[signalName]) {
    signalHandlersMap[signalName] = [];
  }
  signalHandlersMap[signalName]?.push(handler);
};

export const removeSingalHandler = (signalName: GatewaySignal, handler: GatewaySignalHandler) => {
  if (!signalHandlersMap[signalName]) {
    return;
  }
  signalHandlersMap[signalName] = _.filter(signalHandlersMap[signalName], (item) => {
    return item !== handler;
  });
};

process.on('SIGINT', () => {
  if (!signalHandlersMap.SIGINT) {
    process.exit();
  }
  return Promise.all(_.map(signalHandlersMap.SIGINT!, (handler) => {
    return handler();
  }))
    .then(() => {
      process.exit();
    })
    .catch(() => {
      process.exit(1);
    });
});