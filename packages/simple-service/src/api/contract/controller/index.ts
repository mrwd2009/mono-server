import { Middleware } from '@koa/router';
import { validator } from '../../../middleware';
import { contractListModel } from '../model';


export const getContractListHandler: Middleware = async (context) => {
  context.gateway!.sendJSON!(contractListModel.getContractList());
};