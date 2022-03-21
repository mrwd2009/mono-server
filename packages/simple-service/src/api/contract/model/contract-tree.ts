import appDB from '../../../config/model/app';
import { contractTreeHelper } from '../helper';

const {
  matrix: {
    models: {
      ContractBody,
    },
  },
} = appDB;

interface TreeParams {
  root: number;
  version: number;
}

export const getContractTree = async ({ root, version }: TreeParams) => {
  return await contractTreeHelper.constructContractTree({ root, version, ContractBody});
};