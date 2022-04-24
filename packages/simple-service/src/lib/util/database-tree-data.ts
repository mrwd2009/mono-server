/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { Transaction, Op, fn, col } from '@sequelize/core';
import { RbacRoleModelDef, RbacPermissionModelDef, RbacPermissionModel } from '../../model/types';
import { DataError, LogicError } from '../error';

interface ReparentParams {
  sourceId: number;
  targetId: number;
  position: string;
  Model: RbacPermissionModelDef | RbacRoleModelDef;
  placeholderLength?: number;
  transaction?: Transaction;
}
export const reparent = async (params: ReparentParams) => {
  const {
    sourceId,
    targetId,
    transaction,
    position,
  } = params;
  const placeholderLength = params.placeholderLength || 3;
  const Model = params.Model as RbacPermissionModelDef;

  const sourceNode = await Model.findOne({
    attributes: ['id', 'parent_id', 'sequence_id'],
    where: {
      id: sourceId,
    },
    transaction,
  });

  if (!sourceNode) {
    throw new DataError('No source node.');
  }

  let parentSequenceId = sourceNode.sequence_id.slice(0, -placeholderLength);
  let currentNodes = await Model.findAll({
    attributes: ['id', 'parent_id', 'sequence_id'],
    where: {
      [Op.and]: [
        {
          sequence_id: {
            [Op.like]: `${parentSequenceId}%`,
          },
        },
        {
          sequence_id: {
            [Op.gte]: sourceNode.sequence_id,
          },
        },
      ]
    },
    transaction,
  });

  let belowChildren: RbacPermissionModel[] = [];
  let belowSiblings: RbacPermissionModel[] = [];
  const sourceNodes: RbacPermissionModel[] = [];

  _.forEach(currentNodes, (node) => {
    if (node.sequence_id > sourceNode.sequence_id && !_.startsWith(node.sequence_id, sourceNode.sequence_id)) {
      if (node.sequence_id.length === sourceNode.sequence_id.length) {
        belowSiblings.push(node);
      } else {
        belowChildren.push(node);
      }
    }

    if (_.startsWith(node.sequence_id, sourceNode.sequence_id)) {
      sourceNodes.push(node);
    }
  });

  let savedNodes: Promise<RbacPermissionModel>[] = [];

  _.forEach(belowSiblings, (sibling) => {
    const oldId = sibling.sequence_id;
    const newId = `${parentSequenceId}${_.padStart(`${parseInt(sibling.sequence_id.slice(-placeholderLength), 10) - 1}`, placeholderLength, '0')}`;
    sibling.sequence_id = newId;
    savedNodes.push(sibling.save({ transaction }));

    belowChildren = _.filter(belowChildren, (child) => {
      if (_.startsWith(child.sequence_id, oldId)) {
        child.sequence_id = child.sequence_id.replace(new RegExp(`^${oldId}`), newId);
        savedNodes.push(child.save({ transaction }));
        return false;
      }
      return true;
    });
  });

  await Promise.all(savedNodes);

  const targetNode = await Model.findOne({
    attributes: ['id', 'parent_id', 'sequence_id'],
    where: {
      id: targetId,
    },
    transaction,
  });

  if (!targetNode) {
    throw new DataError('No target node.');
  }

  if (position === 'child') {
    currentNodes = await Model.findAll({
      attributes: ['id', 'parent_id', 'sequence_id'],
      where: {
        parent_id: targetNode.id,
      },
      transaction,
    });
  } else {
    parentSequenceId = targetNode.sequence_id.slice(0, -placeholderLength);
    currentNodes = await Model.findAll({
      attributes: ['id', 'parent_id', 'sequence_id'],
      where: {
        [Op.and]: [
          {
            sequence_id: {
              [Op.like]: `${parentSequenceId}%`,
            },
          },
          {
            sequence_id: {
              [Op.gte]: targetNode.sequence_id,
            },
          }
        ]
      },
      transaction,
    });
  }

  const sourceIds = _.map(sourceNodes, 'id');

  currentNodes = _.filter(currentNodes, (node) => {
    return !_.includes(sourceIds, node.id);
  });

  belowChildren = [];
  belowSiblings = [];
  savedNodes = [];
  let insertPos: string;
  let parentId: number | null;

  if (position === 'child') {
    const count = currentNodes.length;
    insertPos = `${targetNode.sequence_id}${_.padStart(`${count + 1}`, placeholderLength, '0')}`;
    parentId = targetNode.id;
  } else {
    if (position === 'above') {
      _.forEach(currentNodes, (node) => {
        if (node.sequence_id >= targetNode.sequence_id) {
          if (node.sequence_id.length === targetNode.sequence_id.length) {
            belowSiblings.push(node);
          } else {
            belowChildren.push(node);
          }
        }
      });
      insertPos = targetNode.sequence_id;
    } else {
      _.forEach(currentNodes, (node) => {
        if (node.sequence_id > targetNode.sequence_id && !_.startsWith(node.sequence_id, targetNode.sequence_id)) {
          if (node.sequence_id.length === targetNode.sequence_id.length) {
            belowSiblings.push(node);
          } else {
            belowChildren.push(node);
          }
        }
      });
      insertPos = `${parentSequenceId}${_.padStart(`${parseInt(targetNode.sequence_id.slice(-placeholderLength), 10) + 1}`, placeholderLength, '0')}`;
    }

    parentId = targetNode.parent_id;

    _.forEach(belowSiblings, (sibling) => {
      const oldId = sibling.sequence_id;
      const newId = `${parentSequenceId}${_.padStart(`${parseInt(sibling.sequence_id.slice(-placeholderLength), 10) + 1}`, placeholderLength, '0')}`;
      sibling.sequence_id = newId;
      savedNodes.push(sibling.save({ transaction }));
      belowChildren = _.filter(belowChildren, (child) => {
        if (_.startsWith(child.sequence_id, oldId)) {
          child.sequence_id = child.sequence_id.replace(new RegExp(`^${oldId}`), newId);
          savedNodes.push(child.save({ transaction }));
          return false;
        }
        return true;
      });
    });
  }

  const oldId = sourceNode.sequence_id;
  _.forEach(sourceNodes, (node) => {
    if (node.id === sourceNode.id) {
      node.parent_id = parentId;
    }
    node.sequence_id = node.sequence_id.replace(new RegExp(`^${oldId}`), insertPos);
    savedNodes.push(node.save({ transaction }));
  });

  await Promise.all(savedNodes);

  return insertPos;
};

interface TreeDataParams {
  items: Array<{
    id: number;
    parent_id: number | null;
    name: string;
    sequence_id: string;
    data: any;
  }>;
}

interface TreeItem {
  key: number;
  title: string;
  data: any;
  children?: TreeItem[];
}

export const getTreeData = (params: TreeDataParams) => {
  const items = _.orderBy(params.items, ['sequence_id'], 'asc');
  const parentMap = new Map<number, TreeItem>();
  const results: TreeItem[] = [];
  const keys: number[] = [];
  
  _.forEach(items, (item) => {
    const newItem = {
      key: item.id,
      title: item.name,
      data: item.data,
      children: [],
    };
    keys.push(item.id);
    if (item.parent_id === null) {
      results.push(newItem);
      parentMap.set(item.id, newItem);
    } else {
      parentMap.get(item.parent_id)?.children?.push(newItem);
    }
  });

  return {
    keys,
    roots: results,
  };
};

interface CreateParams {
  targetId: number;
  values: any;
  position: string;
  Model: RbacPermissionModelDef | RbacRoleModelDef;
  placeholderLength?: number;
  transaction?: Transaction;
}
export const createTreeItem = async (params: CreateParams) => {
  const {
    targetId,
    values,
    position,
    transaction,
    placeholderLength = 3,
  } = params;
  const Model = params.Model as RbacPermissionModelDef;
  const sequenceRecord = await Model.findOne({
    attributes: [[fn('max', col('sequence_id')), 'maxSequenceId']],
    where: {
      parent_id: null,
    },
    transaction,
  });

  let sequenceId = '001';
  if (sequenceRecord) {
    const nextId: number = parseInt(sequenceRecord.get('maxSequenceId') as string) + 1;
    if (nextId >= Math.pow(10, placeholderLength)) {
      throw new LogicError('Sequence id reached the limitation.');
    }
    sequenceId = _.padStart(`${nextId}`, placeholderLength, '0');
  }

  const newItem = await Model.create({
    ...values,
    parent_id: null,
    sequence_id: sequenceId,
  }, {
    transaction,
  });

  await reparent({
    sourceId: newItem.id,
    targetId,
    position,
    Model,
    placeholderLength,
    transaction,
  });
}

interface DeleteParams {
  id: number;
  Model: RbacPermissionModelDef | RbacRoleModelDef;
  placeholderLength?: number;
  transaction?: Transaction;
}
export const deleteTreeItem = async (params: DeleteParams) => {
  const {
    id,
    placeholderLength = 3,
    transaction,
  } = params;
  const Model = params.Model as RbacPermissionModelDef;

  const count = await Model.count({
    where: {
      parent_id: null,
    },
    transaction,
  });

  if (count === 0) {
    throw new DataError('No available data to delete.');
  }
  const sequenceId = _.padStart(`${count}`, placeholderLength, '0');

  const targetNode = await Model.findOne({
    attributes: ['id'],
    where: {
      parent_id: null,
      sequence_id: sequenceId,
    },
    transaction,
  });

  if (!targetNode) {
    throw new DataError('No available target node.');
  }

  const insertedSeq = await reparent({
    sourceId: id,
    targetId: targetNode.id,
    position: 'below',
    Model,
    placeholderLength,
    transaction,
  });

  await Model.destroy({
    where: {
      sequence_id: {
        [Op.like]: `${insertedSeq}%`,
      },
    },
    transaction,
  });

  return true;
};


