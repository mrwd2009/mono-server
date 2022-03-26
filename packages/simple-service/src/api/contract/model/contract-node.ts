import _ from 'lodash';
import appDB from '../../../config/model/app';
import { commonListHelper } from '../helper';
import { DataError, LogicError } from '../../../lib/error';

const {
  matrix: {
    models: {
      ContractBody,
      ContractRoot,
    },
    sequelize,
  },
  main: {
    models: {
      ChargeType,
    },
  },
} = appDB;

export const getContractNode = async ({ node }: { node: string}) => {
  const body = await ContractBody.findOne({
    where: {
      __pk_contractbody: node,
    }
  });

  if (!body) {
    throw new DataError(`Contract node is not found.`);
  }
  
  let chargeType: Array<string> = [];
  if (body.Charge_Type) {
    chargeType = body.Charge_Type.split(',');
  }

  const chargeTypeList = await commonListHelper.getChargeTypeList({ ChargeType });

  return {
    isRootNode: body.Sequence_ID === '1',
    name: body.Name,
    type: body.Type,
    hiddenFlag: body.Hidden_Flag,
    chargeType,
    chargeTypeList,
    condition: [{ label: 'true', value: 'true'}],
  };
};

interface NodeUpdateParams {
  node: number;
  field: string;
  value: boolean | string | number;
}

export const updateContractNode = async ({ node, field, value }: NodeUpdateParams) => {
  const nodeInfo = await ContractBody.findOne({
    where: {
      __pk_contractbody: node,
    },
  });
  if (!nodeInfo) {
    throw new DataError('Node is not found.');
  }

  await sequelize.transaction(async (transaction) => {
    if (nodeInfo.Sequence_ID === '1' && field === 'Name') {
      await ContractRoot.update(
        {
          Name: value as string,
        },
        {
          where: {
            __pk_contractroot: nodeInfo._fk_contractroot,
          },
          transaction,
        },
      );
    }

    const [count] = await ContractBody.update(
      {
        [field]: value,
      },
      {
        where: {
          __pk_contractbody: node,
        },
        transaction,
      },
    );

    return count;
  });
};

export const deleteContractNode = async ({ node }: { node: number }) => {
  // TODO check version type
  return await ContractBody.destroy({
    where: {
      __pk_contractbody: node,
    },
  });
}

interface NodeCreateParams {
  name: string;
  type: string;
  sourceType: string;
  parent?: number | null;
}

export const createContractNode = async (params: NodeCreateParams) => {
  const {
    name,
    type,
    sourceType,
    parent,
  } = params;

  return await sequelize.transaction(async (transaction) => {
    let root: number;
    if (type === 'contract') {
      const rootNode = await ContractRoot.create(
        {
          Name: name,
          Type: 'instance',
          RootType: type,
          Status: 'active',
          ActiveVersion: 1,
        },
        {
          transaction,
        },
      );
      root = rootNode.__pk_contractroot;
    }
    
    let version = null;
    let sequenceID = null;

    if (type === 'contract') {
      version = 1;
      sequenceID = '1';
    } else {
      const node = await ContractBody.findOne({
        where: {
          __pk_contractbody: parent,
        },
        transaction,
      });

      if (!node) {
        throw new DataError('Node is not found.');
      }

      if (node.Version_Type === 'approved') {
        throw new LogicError('Adding node on approved contract is not allowed.');
      }

      version = node.Version;
      root = node._fk_contractroot;

      let parentSequenceID = node.Sequence_ID;
      if (parentSequenceID === '1') {
        parentSequenceID = '';
      }

      const rootNode = await ContractBody.findOne({
        where: {
          _fk_parent_contractbody: null,
          Version: node.Version,
          _fk_contractroot: node._fk_contractroot,
        },
        transaction,
      });

      if (!rootNode) {
        throw new DataError('Root node is not found.');
      }
      // lock current contract version root.
      await ContractBody.findOne({
        where: {
          __pk_contractbody: rootNode.__pk_contractbody,
        },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      const count = await ContractBody.count({
        where: {
          _fk_parent_contractbody: parent,
          _fk_contractroot: root,
          Version: version,
        },
        transaction,
      });

      if (count >= 99) {
        throw new LogicError('Maximum child node count is 99');
      }

      sequenceID = parentSequenceID + _.padStart(`${count + 1}`, 2, '0');
    }

    await ContractBody.create(
      {
        Name: name,
        Version_Type: 'interim',
        Hidden_Flag: false,
        Source_Type: sourceType,
        Version: version!,
        Type: type,
        Charge_Type: type === 'charge' || type === 'contract' ? 'general' : '',
        _fk_contractroot: root!,
        _fk_parent_contractbody: parent!,
        Start_Date: new Date('2000-01-01 00:00:00'),
        End_Date: new Date('2099-12-31 23:59:59'),
        Time_Sequence_ID: 1,
        Sequence_ID: sequenceID,
      },
      {
        transaction,
      },
    );

    return {
      root: root!,
      version,
    };
  });
}