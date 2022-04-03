/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { Transaction, Op } from '@sequelize/core';
import { ContractBodyModelDef, ContractRootModelDef } from '.././../../model/types';
import { DataError, LogicError } from '../../../lib/error';

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

interface ReparentParams {
  payload: {
    position: string;
    sourceID: number;
    targetID: number;
  };
  transaction: Transaction;
  ContractBody: ContractBodyModelDef;
}

export const reparentNode = ({ payload, transaction, ContractBody }: ReparentParams) => {
  const Model = ContractBody;

  const { sourceID, targetID, position } = payload;
  let sourceNode: any, targetNode: any, rootNode: any, sourceParentSeqID: any, targetParentSeqID: any;
  const sourceNodes: any = [];

  return Model.findAll({
    where: {
      __pk_contractbody: [sourceID, targetID],
    },
    transaction,
  })
    .then((nodes) => {
      if (nodes.length === 2) {
        sourceNode = _.find(nodes, ['__pk_contractbody', sourceID]);
        targetNode = _.find(nodes, ['__pk_contractbody', targetID]);

        if (!sourceNode._fk_parent_contractbody) {
          throw new LogicError("Dragged node can't be contract root.");
        }

        if (targetNode.Type === 'charge' && position === 'child') {
          throw new LogicError("Target charge node can't as parent node.");
        }

        return Model.findOne({
          where: {
            _fk_contractroot: sourceNode._fk_contractroot,
            Version: sourceNode.Version,
            _fk_parent_contractbody: null,
          },
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
      } else {
        throw new DataError('No data');
      }
    })
    .then((root) => {
      if (!root) {
        throw new DataError('No data');
      }
      rootNode = root;

      if (root.__pk_contractbody === targetNode.__pk_contractbody && position != 'child') {
        throw new LogicError("Contract root only support 'child' position.");
      }

      sourceParentSeqID = sourceNode.Sequence_ID.slice(0, -2);
      return Model.findAll({
        where: {
          _fk_contractroot: sourceNode._fk_contractroot,
          Version: sourceNode.Version,
          Sequence_ID: {
            [Op.like]: `${sourceParentSeqID}%`,
          },
          _fk_parent_contractbody: {
            [Op.not]: null,
          },
        },
        transaction,
      });
    })
    .then((nodes) => {
      let belowChildren: any = [];
      const belowSiblings: any = [];

      _.forEach(nodes, (node) => {
        if (
          _.startsWith(node.Sequence_ID, sourceParentSeqID) &&
          node.Sequence_ID > sourceNode.Sequence_ID &&
          !_.startsWith(node.Sequence_ID, sourceNode.Sequence_ID)
        ) {
          if (node.Sequence_ID.length === sourceNode.Sequence_ID.length) {
            belowSiblings.push(node);
          } else {
            belowChildren.push(node);
          }
        }
        if (_.startsWith(node.Sequence_ID, sourceNode.Sequence_ID)) {
          sourceNodes.push(node);
        }
      });

      const savedRecords: any = [];

      _.forEach(belowSiblings, (sibling) => {
        const oldId: any = sibling.Sequence_ID;
        const newID: any = `${sourceParentSeqID}${_.padStart(
          `${parseInt(sibling.Sequence_ID.substr(-2)) - 1}`,
          2,
          '0',
        )}`;
        sibling.Sequence_ID = newID;
        //clear cache once at last
        savedRecords.push(sibling.save({ hooks: false, transaction }));
        //filter out the changed children
        belowChildren = _.filter(belowChildren, (child) => {
          if (_.startsWith(child.Sequence_ID, oldId)) {
            child.Sequence_ID = child.Sequence_ID.replace(new RegExp(`^${oldId}`), newID);
            savedRecords.push(child.save({ hooks: false, transaction }));
            return false;
          } else {
            return true;
          }
        });
      });

      return Promise.all(savedRecords);
    })
    .then(() => {
      return Model.findOne({
        where: {
          __pk_contractbody: targetNode.__pk_contractbody,
        },
        transaction,
      });
    })
    .then((node) => {
      //refresh target node sequence id， perhaps changed
      targetNode = node;
    })
    .then(() => {
      if (targetNode._fk_parent_contractbody && position != 'child') {
        targetParentSeqID = targetNode.Sequence_ID.slice(0, -2);
        return Model.findAll({
          where: {
            _fk_contractroot: targetNode._fk_contractroot,
            Version: targetNode.Version,
            Sequence_ID: {
              [Op.like]: `${targetParentSeqID}%`,
            },
            _fk_parent_contractbody: {
              [Op.not]: null,
            },
          },
          transaction,
        });
      } else {
        return Model.findAll({
          where: {
            _fk_parent_contractbody: targetNode.__pk_contractbody,
          },
          transaction,
        });
      }
    })
    .then((nodes) => {
      const sourceIds: any = _.map(sourceNodes, '__pk_contractbody');
      //filter out source nodes
      nodes = _.filter(nodes, (node) => {
        return !_.includes(sourceIds, node.__pk_contractbody);
      });
      let belowChildren: any = [];
      const belowSiblings: any = [];
      const savedRecords: any = [];
      let insertPos: any, parentID: any;

      if (position !== 'child') {
        //if target node is root, position must be child
        if (position === 'above') {
          _.forEach(nodes, (node) => {
            if (_.startsWith(node.Sequence_ID, targetParentSeqID) && node.Sequence_ID >= targetNode.Sequence_ID) {
              if (node.Sequence_ID.length === targetNode.Sequence_ID.length) {
                belowSiblings.push(node);
              } else {
                belowChildren.push(node);
              }
            }
          });
          insertPos = targetNode.Sequence_ID;
        } else {
          _.forEach(nodes, (node) => {
            if (
              _.startsWith(node.Sequence_ID, targetParentSeqID) &&
              node.Sequence_ID > targetNode.Sequence_ID &&
              !_.startsWith(node.Sequence_ID, targetNode.Sequence_ID)
            ) {
              if (node.Sequence_ID.length === targetNode.Sequence_ID.length) {
                belowSiblings.push(node);
              } else {
                belowChildren.push(node);
              }
            }
          });
          insertPos = `${targetParentSeqID}${_.padStart(`${parseInt(targetNode.Sequence_ID.substr(-2)) + 1}`, 2, '0')}`;
        }

        parentID = targetNode._fk_parent_contractbody;

        _.forEach(belowSiblings, (sibling) => {
          const oldId: any = sibling.Sequence_ID;
          const newID: any = `${targetParentSeqID}${_.padStart(
            `${parseInt(sibling.Sequence_ID.substr(-2)) + 1}`,
            2,
            '0',
          )}`;
          sibling.Sequence_ID = newID;
          //clear cache once at last
          savedRecords.push(sibling.save({ hooks: false, transaction }));
          //filter out the changed children
          belowChildren = _.filter(belowChildren, (child) => {
            if (_.startsWith(child.Sequence_ID, oldId)) {
              child.Sequence_ID = child.Sequence_ID.replace(new RegExp(`^${oldId}`), newID);
              savedRecords.push(child.save({ hooks: false, transaction }));
              return false;
            } else {
              return true;
            }
          });
        });
      } else {
        const count: any = nodes.length;
        if (targetNode._fk_parent_contractbody) {
          insertPos = `${targetNode.Sequence_ID}${_.padStart(`${count + 1}`, 2, '0')}`;
        } else {
          //contract root only has a child position
          insertPos = _.padStart(count + 1, 2, '0');
        }
        parentID = targetNode.__pk_contractbody;
      }

      //update source nodes sequence_id
      const oldId: any = sourceNode.Sequence_ID;
      _.forEach(sourceNodes, (node) => {
        if (node.__pk_contractbody === sourceNode.__pk_contractbody) {
          node._fk_parent_contractbody = parentID;
        }
        // update branch type according to target node
        node.Branch_Type = targetNode.Branch_Type;
        node.Sequence_ID = node.Sequence_ID.replace(new RegExp(`^${oldId}`), insertPos);
        savedRecords.push(node.save({ hooks: false, transaction }));
      });

      return Promise.all(savedRecords);
    })
    .then(() => {
      return {
        root: rootNode._fk_contractroot,
        version: rootNode.Version,
      };
    });
};

interface ReusableParams {
  node: number;
  name?: string;
  type: string;
  transaction: Transaction;
  ContractRoot: ContractRootModelDef;
  ContractBody: ContractBodyModelDef;
}

export const saveReusableNode = ({ node, type, name, transaction, ContractBody, ContractRoot }: ReusableParams) => {
  let rootNode: any = null;
  let newRoot: any = null;
  const pairedNodes: any = [];
  const createRoot = (transaction: any) => {
    return ContractRoot.create(
      {
        Name: name || rootNode.Name,
        Status: 'active',
        Type: type,
        RootType: rootNode.Type,
        ActiveVersion: 1,
      },
      {
        transaction,
      },
    ).then((_r) => {
      newRoot = _r;
    });
  };

  const createBodies = (nodes: any, transaction: any) => {
    const parentIdMap: any = {};
    let prevStep: any = Promise.resolve(null);
    let nodeList = nodes;
    while (nodeList.length) {
      const remain: any = [];
      const item = nodeList.shift();
      const siblings = [item];
      _.forEach(nodeList, (nodeItem) => {
        if (nodeItem.Sequence_ID.length === item.Sequence_ID.length) {
          siblings.push(nodeItem);
        } else {
          remain.push(nodeItem);
        }
      });
      nodeList = remain;
      prevStep = prevStep.then(() => {
        const bodies = _.map(siblings, (sib) => {
          let sequenceId = '';
          let parentId = null;
          // only one root node
          if (sib.__pk_contractbody === rootNode.__pk_contractbody) {
            sequenceId = '1';
            parentId = null;
            sib.Name = name || sib.Name;
          } else {
            console.log(`${rootNode.Sequence_ID} - ${sib.Sequence_ID}`);
            if (rootNode.Sequence_ID === '1') {
              sequenceId = sib.Sequence_ID;
            } else {
              sequenceId = sib.Sequence_ID.substring(rootNode.Sequence_ID.length);
            }
            if (sequenceId.length === 2) {
              parentId = parentIdMap['1'];
            } else {
              parentId = parentIdMap[sequenceId.substring(0, sequenceId.length - 2)];
            }
          }
          return ContractBody.create(
            {
              _fk_contractroot: newRoot.__pk_contractroot,
              _fk_parent_contractbody: parentId,
              Name: sib.Name,
              Type: sib.Type,
              Branch_Type: sib.Branch_Type,
              Conditional: sib.Conditional,
              Charge_Type: sib.Charge_Type,
              Source_Contract_Root: rootNode._fk_contractroot,
              Source_Contract_Version: rootNode.Version,
              Source_Type: type,
              HasRateModel: sib.HasRateModel,
              HasAggregationModel: sib.HasAggregationModel,
              HasUsageModel: sib.HasUsageModel,
              HasGrouping: sib.HasGrouping,
              HasCategorization: sib.HasCategorization,
              Sequence_ID: sequenceId,
              Start_Date: sib.Start_Date,
              End_Date: sib.End_Date,
              Time_Sequence_ID: 1,
              Version: 1,
              Version_Type: 'interim',
              Hidden_Flag: sib.Hidden_Flag,
              Completion_Flag: sib.Completion_Flag,
              Unbundled_Flag: sib.Unbundled_Flag,
            },
            {
              transaction,
            },
          ).then((newBody) => {
            parentIdMap[newBody.Sequence_ID] = newBody.__pk_contractbody;
            pairedNodes.push([sib.__pk_contractbody, newBody.__pk_contractbody]);
          });
        });

        return Promise.all(bodies);
      });
    }
    return prevStep;
  };

  // const createParamsAndRuleModels = (transaction: any) => {
  //   const groups = _.chunk(pairedNodes, 50);
  //   let preStep: any = Promise.resolve();
  //   _.forEach(groups, list => {
  //     preStep = preStep.then(() => {
  //       const rawIds: any = [];
  //       const newIds: any = [];
  //       _.forEach(list, (ids: any) => {
  //         rawIds.push(ids[0]);
  //         newIds.push(ids[1]);
  //       });
  //       const pairedParamIds: any = [];
  //       const pairedRuleIds: any = [];
  //       return Promise.all([
  //         Parameter.findAll({
  //           where: {
  //             _fk_contractbody: rawIds,
  //           },
  //           transaction,
  //         }),
  //         RuleModel.findAll({
  //           where: {
  //             _fk_contractbody: rawIds,
  //           },
  //           transaction,
  //         }),
  //       ])
  //         .then(([parameterList, ruleModelList]) => {
  //           const createParams = () => {
  //             return Promise.all(_.map(parameterList, pItem => {
  //               const index = _.indexOf(rawIds, pItem._fk_contractbody);
  //               return Parameter.create({
  //                 _fk_contractbody: newIds[index],
  //                 Parameter_ID: pItem.Parameter_ID,
  //                 Parameter_Value: pItem.Parameter_Value,
  //                 Conditional: pItem.Conditional,
  //                 Dictionary_ID: pItem.Dictionary_ID,
  //               }, { transaction })
  //                 .then((newParam) => {
  //                   pairedParamIds.push([pItem.__pk_parameter, newParam.__pk_parameter]);
  //                   return newParam;
  //                 });
  //             }));
  //           };
  //           const createRules = () => {
  //             const groupRules = _.groupBy(ruleModelList, 'Level');
  //             const keys = _.sortBy(_.keys(groupRules));
  //             let preStep = Promise.resolve([]);
  //             _.forEach(keys, (ruleKey, i) => {
  //               preStep = preStep.then((list) => {
  //                 return Promise.all(_.map(groupRules[ruleKey], rule => {
  //                   let parentId = null;
  //                   if (ruleKey !== '1') {
  //                     const parentRuleIndex = _.findIndex(groupRules[keys[i - 1]], { __pk_rulemodel: rule._fk_parent_rulemodel });
  //                     parentId = list[parentRuleIndex].__pk_rulemodel;
  //                   }
  //                   const bodyIdIndex = _.indexOf(rawIds, rule._fk_contractbody);
  //                   return RuleModel.create({
  //                     _fk_contractbody: newIds[bodyIdIndex],
  //                     _fk_parent_rulemodel: parentId,
  //                     Level: ruleKey,
  //                     Rule_Model_Name: rule.Rule_Model_Name,
  //                     Rule_Model_Type: rule.Rule_Model_Type,
  //                     Conditional: rule.Conditional,
  //                     Rule_Text: rule.Rule_Text,
  //                     Completion_Flag: rule.Completion_Flag,
  //                     Validation_Output: rule.Validation_Output,
  //                   }, {
  //                     transaction,
  //                   })
  //                   .then((newRule) => {
  //                     pairedRuleIds.push([rule.__pk_rulemodel, newRule.__pk_rulemodel]);
  //                     return newRule;
  //                   });
  //                 }));
  //               });
  //             });
  //             return preStep;
  //           };

  //           return Promise.all([
  //             createParams(),
  //             createRules(),
  //           ]);
  //         })
  //         .then(() => {
  //           const queries = [];
  //           if (rawIds.length) {
  //             queries.push(Attribute.findAll({
  //               where: {
  //                 _fk_contractbody: rawIds,
  //                 _fk_rulemodel: null,
  //                 _fk_parameter: null,
  //               },
  //               transaction
  //             }));
  //           } else {
  //             queries.push([]);
  //           }
  //           if (pairedParamIds.length) {
  //             queries.push(Attribute.findAll({
  //               where: {
  //                 _fk_parameter: _.map(pairedParamIds, ids => ids[0]),
  //                 _fk_rulemodel: null,
  //               },
  //               transaction,
  //             }));
  //           } else {
  //             queries.push([]);
  //           }
  //           if (pairedRuleIds.length) {
  //             queries.push(Attribute.findAll({
  //               where: {
  //                 _fk_rulemodel: _.map(pairedRuleIds, ids => ids[0]),
  //                 _fk_parameter: null,
  //               },
  //               transaction,
  //             }));
  //           } else {
  //             queries.push([]);
  //           }
  //           return Promise.all(queries);
  //         })
  //         .then(([bodyAttrs, paramAttrs, ruleAttrs]) => {
  //           const createBodyAttrs = () => {
  //             return Promise.all(_.map(bodyAttrs, attr => {
  //               const index = _.indexOf(rawIds, attr._fk_contractbody);
  //               return Attribute.create({
  //                 _fk_contractbody: newIds[index],
  //                 _fk_rulemodel: null,
  //                 _fk_parameter: null,
  //                 Non_Model_Flag: attr.Non_Model_Flag,
  //                 Attribute_ID: attr.Attribute_ID,
  //               }, { transaction });
  //             }));
  //           };

  //           const createParamAttrs = () => {
  //             return Promise.all(_.map(paramAttrs, attr => {
  //               const index = _.indexOf(rawIds, attr._fk_contractbody);
  //               return Attribute.create({
  //                 _fk_contractbody: newIds[index],
  //                 _fk_rulemodel: null,
  //                 _fk_parameter: _.find(pairedParamIds, ids => ids[0] === attr._fk_parameter)[1],
  //                 Non_Model_Flag: attr.Non_Model_Flag,
  //                 Attribute_ID: attr.Attribute_ID,
  //               }, { transaction });
  //             }));
  //           };

  //           const createRuleAttrs = () => {
  //             return Promise.all(_.map(ruleAttrs, attr => {
  //               const index = _.indexOf(rawIds, attr._fk_contractbody);
  //               return Attribute.create({
  //                 _fk_contractbody: newIds[index],
  //                 _fk_rulemodel: _.find(pairedRuleIds, ids => ids[0] === attr._fk_rulemodel)[1],
  //                 _fk_parameter: null,
  //                 Non_Model_Flag: attr.Non_Model_Flag,
  //                 Attribute_ID: attr.Attribute_ID,
  //               }, { transaction });
  //             }));
  //           };

  //           return Promise.all([
  //             createBodyAttrs(),
  //             createParamAttrs(),
  //             createRuleAttrs(),
  //           ]);
  //         });
  //     })
  //   });

  //   return preStep;
  // };

  return ContractBody.findOne({
    where: {
      __pk_contractbody: node,
    },
    transaction,
  })
    .then((_rootNode) => {
      if (!_rootNode) {
        throw new DataError(`Contract node${node} is not found.`);
      }
      rootNode = _rootNode;

      const where: any = {
        _fk_contractroot: rootNode._fk_contractroot,
        Version: rootNode.Version,
      };
      if (type !== 'instance') {
        where.Sequence_ID = {
          [Op.like]: `${rootNode.Sequence_ID}%`,
        };
      }

      return ContractBody.findAll({
        where,
        order: [['Sequence_ID', 'ASC']],
        transaction,
      });
    })
    .then((nodes) => {
      return createRoot(transaction).then(() => {
        if (type === 'instance') {
          const rootIndex = _.findIndex(nodes, (item) => item.Sequence_ID === '1');
          const rootNode = nodes[rootIndex];
          nodes.splice(rootIndex, 1);
          nodes.unshift(rootNode);
        }
        return createBodies(nodes, transaction);
      });
      // .then(() => {
      //   return createParamsAndRuleModels(transaction);
      // });
    })
    .then(() => true);
};
