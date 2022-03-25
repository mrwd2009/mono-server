import { Middleware } from '@koa/router';
import { validator } from '../../../middleware';
import { contractListModel, contractTreeModel, contractNodeModel } from '../model';

export const getContractListHandler: Middleware = async (context) => {
  context.gateway!.sendJSON!(await contractListModel.getContractList());
};

export const getSavedNodeListHandler: Middleware = async (context) => {
  context.gateway!.sendJSON!(await contractListModel.getSavedNodeList());
};

export const getContractTreeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      root: Joi.number().integer().required(),
      version: Joi.number().integer().required(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractTreeModel.getContractTree(context.mergedParams));
  },
];

export const getContractVersionsHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      root: Joi.number().integer().required(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractTreeModel.getContractVersionList(context.mergedParams));
  },
];

export const getContractNodeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      node: Joi.number().integer().required(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractNodeModel.getContractNode(context.mergedParams));
  },
];