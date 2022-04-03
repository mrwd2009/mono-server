import map from 'lodash/map';
import appDB from '../../../config/model/app';
import { contractTreeHelper } from '../helper';

const {
  matrix: {
    models: { ContractBody, ContractRoot },
    sequelize,
  },
} = appDB;

interface TreeParams {
  root: number;
  version: number;
}

export const getContractTree = async ({ root, version }: TreeParams) => {
  return await contractTreeHelper.constructContractTree({ root, version, ContractBody });
};

export const reparentContractTreeNode = async (payload: { position: string; sourceID: number; targetID: number }) => {
  return await sequelize.transaction(async (transaction) => {
    return await contractTreeHelper.reparentNode({ payload, transaction, ContractBody });
  });
};

export const saveContractTreeReusableNode = async (payload: { name: string; node: number; type: string }) => {
  return await sequelize.transaction(async (transaction) => {
    return await contractTreeHelper.saveReusableNode({
      node: payload.node,
      name: payload.name,
      type: payload.type,
      transaction,
      ContractBody,
      ContractRoot,
    });
  });
};

export const deleteContractTree = async ({ root }: { root: number }) => {
  const count = await ContractBody.count({
    where: {
      _fk_contractroot: root,
      _fk_parent_contractbody: null,
    },
  });
  if (count === 1) {
    await ContractRoot.destroy({
      where: {
        __pk_contractroot: root,
      },
    });
  }
  return count;
};

export const getContractVersionList = async ({ root }: { root: number }) => {
  const getVersions = ContractBody.findAll({
    attributes: ['Version', 'Version_Type', 'Time_Sequence_ID'],
    where: {
      _fk_contractroot: root,
      _fk_parent_contractbody: null,
    },
    order: [['Version', 'asc']],
  });

  const getActiveVersion = ContractRoot.findOne({
    attributes: ['ActiveVersion'],
    where: {
      __pk_contractroot: root,
    },
  });

  const [versions, active] = await Promise.all([getVersions, getActiveVersion]);

  return map(versions, (item) => {
    return {
      version: item.Version,
      type: item.Version_Type,
      active: item.Version === active?.ActiveVersion,
    };
  });
};
