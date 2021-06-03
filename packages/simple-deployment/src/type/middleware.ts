import { Next } from 'koa';
import {GatewayRouterContext } from './router';

export type GatewayMiddleware<ReturnType = void> = (context: GatewayRouterContext, next: Next) => Promise<ReturnType>;