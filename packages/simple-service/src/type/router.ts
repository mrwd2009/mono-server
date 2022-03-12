/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, RouterContext } from '@koa/router';
import { DefaultState, DefaultContext } from 'koa';

export interface GatewayRouterState extends DefaultState {
  requestId?: string,
}

export type MergedParams = any;

export interface PageParams {
  filter?: any,
  sorter?: {
    field: string,
    order: string
  },
  pagination: {
    current: number,
    pageSize: number,
  },
  [otherKey: string]: any,
}

export interface GatewayRouterContext extends RouterContext<DefaultState, DefaultContext> {
  gateway?: {
    sendJSON?: (result: unknown) => void,
  },
  mergedParams?: any,
}

export type GatewayController = Middleware<GatewayRouterState, GatewayRouterContext>;

export type GatewayCtrl = GatewayController;

export type GatewayCtrlArray = Array<GatewayController>;

export type GatewayRouterReturn = Promise<void>;