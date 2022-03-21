import { Middleware } from '@koa/router';
import { systemModel } from '../model';

export const getInfoCtrl: Middleware = async (context) => {
  const info = await systemModel.getInfo(context.state);
  context.gateway!.sendJSON!(info);
};
