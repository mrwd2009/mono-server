import _ from 'lodash';
import { QueryTypes } from '@sequelize/core';
import appDB from '../../../config/model/app';
import { ContractBodyModel } from '../../../model/types';

const {
  model: {
    sequelize,
    models: { ContractBody },
  },
} = appDB;

export interface ContractItem {
  id: number;
  name: string;
  root: number;
  version: number;
  type: string;
}

export const getContractList = async () => {
  const sql = `
  select __pk_contractbody, contractbody.Name, contractbody._fk_contractroot, SubMarketplace, contractbody.Time_Sequence_ID, contractbody.Version, contractbody.Last_Modified_Date
  from (
    select _fk_contractroot, max(version) as version from contractbody
    where _fk_parent_contractbody is null and source_type = 'instance' group by _fk_contractroot
  ) contract_list 
    inner join contractbody on contract_list._fk_contractroot = contractbody._fk_contractroot and contract_list.version = contractbody.version and _fk_parent_contractbody is null
    inner join contractroot on contractroot.__pk_contractroot = contractbody._fk_contractroot
    order by contractbody.Creation_Date desc
  `;

  interface DbItem {
    __pk_contractbody: number;
    Name: string;
    _fk_contractroot: number;
    Version: number;
  }

  const list: DbItem[] = await sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });

  return _.map<DbItem, ContractItem>(list, (item) => {
    return {
      id: item.__pk_contractbody,
      name: item.Name,
      type: 'contract',
      root: item._fk_contractroot,
      version: item.Version,
    };
  });
};

export const getSavedNodeList = async () => {
  const list = await ContractBody.findAll({
    attributes: ['__pk_contractbody', 'Name', '_fk_contractroot', 'Version', 'Type'],
    where: {
      _fk_parent_contractbody: null,
      Source_Type: 'umc',
      Version_Type: 'interim',
    },
    order: [['Creation_Date', 'DESC']],
  });

  return _.map<ContractBodyModel, ContractItem>(list, (item) => {
    return {
      id: item.__pk_contractbody,
      name: item.Name,
      type: item.Type,
      root: item._fk_contractroot,
      version: item.Version,
    };
  });
};
