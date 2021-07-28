import { Middleware, RouterContext } from '@koa/router';

interface _GatewayRouterState {
  requestId?: string,
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GatewayRouterState = _GatewayRouterState & Record<string, any>;

interface _GatewayRouterContext {
  gateway?: {
    sendJSON?: (result: unknown) => void,
  },
  mergedParams?: any,
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type GatewayRouterContext = _GatewayRouterContext & RouterContext<GatewayRouterState> ;

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type GatewayController = Middleware<_GatewayRouterState & Record<string, any>, _GatewayRouterContext & {}>;

export type GatewayRouterReturn = Promise<void>;