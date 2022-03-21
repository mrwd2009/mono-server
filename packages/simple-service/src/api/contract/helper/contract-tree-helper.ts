/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { ContractBodyModelDef } from '.././../../model/types';
import { DataError } from '../../../lib/error';

interface TreeParams {
  root: number;
  version: number;
  ContractBody: ContractBodyModelDef;
}

export const constructContractTree = async ({ root: rootId, version, ContractBody }: TreeParams) => {
  const iconType = (type: string, sequenceID: string, rootType = '') => {
    let icon = '';
    if (type === 'contract') {
      if (rootType === 'umc') {
        icon = 'umcRoot';
      } else if (rootType === 'pcc') {
        icon = 'pccRoot';
      } else {
        icon = 'root';
      }
    } else if (type === 'subcontract') {
      if (sequenceID === '1') {
        if (rootType === 'umc') {
          icon = 'umcSubContractRoot';
        } else if (rootType === 'pcc') {
          icon = 'pccSubContractRoot';
        }
      } else {
        icon = 'subContract';
      }
    } else if (type === 'reroute') {
      icon = 'reroute';
    } else if (type === 'charge') {
      if (sequenceID === '1') {
        if (rootType === 'umc') {
          icon = 'umcChargeRoot';
        } else if (rootType === 'pcc') {
          icon = 'pccChargeRoot';
        }
      } else {
        icon = 'charge';
      }
    }

    return icon;
  };
  const nodes = await ContractBody.findAll({
    attributes: [
      '__pk_contractbody',
      '_fk_parent_contractbody',
      'Name',
      'Sequence_ID',
      'Type',
      'Branch_Type',
      'Hidden_Flag',
      'Source_Type',
    ],
    where: {
      _fk_contractroot: rootId,
      Version: version,
      Time_Sequence_ID: '1',
    },
    order: [['Sequence_ID', 'ASC']],
  });

  if (!nodes.length) {
    throw new DataError('No available nodes.');
  }
  // change root node position.
  const rootIndex = _.findIndex(nodes, ['Sequence_ID', '1']);
  const rootNode = nodes[rootIndex];
  nodes.splice(rootIndex, 1);
  nodes.unshift(rootNode);

  let root: any = null;
  const parentNodeSequenceIDMap: any = {};
  const parentNodeIDMap: any = {};
  _.forEach(nodes, (node) => {
    const newNode: any = {
      id: node.__pk_contractbody, // because we use sequence_id as id before
      name: node.Name,
      hidden: node.Hidden_Flag,
      type: iconType(node.Type, node.Sequence_ID),
      extraData: {
        type: node.Type,
        contractBody: node.__pk_contractbody,
      },
      children: [],
    };
    // because branch_type is only used by second level tree node.
    if ((node.Sequence_ID || '').length === 2) {
      newNode.extraData.branchType = node.Branch_Type;
    }
    // root node sequence_id is not regular
    if (node.Sequence_ID === '1') {
      newNode.type = iconType(node.Type, node.Sequence_ID, node.Source_Type);
      root = newNode;
      return;
    }

    parentNodeSequenceIDMap[node.Sequence_ID] = newNode;
    parentNodeIDMap[node.__pk_contractbody] = newNode;

    if (node.Sequence_ID.length === 2) {
      root.children.push(newNode);
    } else {
      // get parent sequence id, then get parent object, then push child.
      // because sequence_id perhaps not right.
      const parentNode =
        parentNodeSequenceIDMap[node.Sequence_ID.slice(0, -2)] || parentNodeIDMap[node._fk_parent_contractbody];
      parentNode.children.push(newNode);
    }
  });

  return root;
};
