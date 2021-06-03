import { Middleware } from '@koa/router';

interface _GatewayRouterState {
  jwt?: string,
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GatewayRouterState = _GatewayRouterState & any;

interface _GatewayRouterContext {
  gateway?: {

  }
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type GatewayRouterContext = _GatewayRouterContext & {};

export type GatewayController = Middleware<GatewayRouterState, GatewayRouterContext>;