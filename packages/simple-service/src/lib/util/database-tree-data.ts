import _ from 'lodash';
import { Transaction, Op } from '@sequelize/core';
import { RbacRoleModelDef, RbacPermissionModelDef, RbacPermissionModel } from '../../model/types';
import { DataError } from '../error';


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
      sequence_id: {
        [Op.like]: `${parentSequenceId}%`,
      },
    },
    transaction,
  });

  let belowChildren: RbacPermissionModel[] = [];
  let belowSiblings: RbacPermissionModel[] = [];
  const sourceNodes: RbacPermissionModel[] = [];

  _.forEach(currentNodes, (node) => {
    if (_.startsWith(node.sequence_id, parentSequenceId) && node.sequence_id > sourceNode.sequence_id && !_.startsWith(node.sequence_id, sourceNode.sequence_id)) {
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
        sequence_id: {
          [Op.like]: `${parentSequenceId}%`,
        },
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
        if (_.startsWith(node.sequence_id, parentSequenceId) && node.sequence_id >= targetNode.sequence_id) {
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
        if (_.startsWith(node.sequence_id, parentSequenceId) && node.sequence_id > targetNode.sequence_id && !_.startsWith(node.sequence_id, targetNode.sequence_id)) {
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

  return true;
};