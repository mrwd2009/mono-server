import appDB from '../../../config/model/app';
import { commonListHelper } from '../helper';
import { DataError } from '../../../lib/error';
import { number, string } from 'joi';

const {
  matrix: {
    models: {
      ContractBody,
    },
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

interface NodeParams {
  node: number;
  field: string;
  value: boolean | string | number;
}

export const updateContractNode = async ({ node, field, value }: NodeParams ) => {
  const [count] = await ContractBody.update({
    [field]: value
  }, {
    where: {
      __pk_contractbody: node,
    },
  });

  return count;
};
