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

export const deleteContractTreeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      root: Joi.number().integer().required(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractTreeModel.deleteContractTree(context.mergedParams));
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

export const updateContractNodeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      node: Joi.number().integer().required(),
      field: Joi.string().valid('Name').required(),
      value: Joi.alternatives().try(Joi.number(), Joi.string(), Joi.boolean()).required()
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractNodeModel.updateContractNode(context.mergedParams));
  },
];

export const deleteContractNodeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      node: Joi.number().integer().required(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractNodeModel.deleteContractNode(context.mergedParams));
  },
];

export const createContractNodeHandler: Middleware[] = [
  validator((Joi) => {
    return Joi.object({
      name: Joi.string().allow('').max(100).optional(),
      type: Joi.string().required().valid('contract', 'subcontract', 'reroute', 'charge'),
      sourceType: Joi.string().required().valid('instance', 'pcc', 'umc'),
      parent: Joi.number().integer().optional(),
    });
  }),
  async (context) => {
    context.gateway!.sendJSON!(await contractNodeModel.createContractNode(context.mergedParams));
  },
];