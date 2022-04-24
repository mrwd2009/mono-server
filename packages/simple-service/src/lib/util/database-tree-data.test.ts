process.env.GATEWAY_DB_USER = 'root';
process.env.GATEWAY_DB_PASS = 'xxx';
process.env.GATEWAY_DB_HOST = 'localhost';
import _ from 'lodash';
import { Sequelize } from '@sequelize/core';
import { reparent, getTreeData, createTreeItem, deleteTreeItem } from './database-tree-data';

test('test databaes tree data reparent', async () => {
  // const {
  //   gateway: {
  //     models: {
  //       RbacPermission,
  //     }
  //   }
  // } =  require("../../config/model/app").default;
  // const result = await reparent({
  //   sourceId: 2,
  //   targetId: 8,
  //   position: 'below',
  //   Model: RbacPermission
  // });
  // expect(result).toBe(true);
});

test('test getTreeData', async () => {
  // const {
  //   gateway: {
  //     models: {
  //       RbacPermission,
  //     }
  //   }
  // } =  require("../../config/model/app").default;
  // const items = await RbacPermission.findAll();
  // const treeItems = _.map(items, (item) => {
  //   return {
  //     id: item.id,
  //     parent_id: item.parent_id,
  //     name: item.name,
  //     sequence_id: item.sequence_id,
  //     data: {
  //       description: item.description,
  //     },
  //   };
  // });
  // const result = getTreeData({ items: treeItems });
  // console.log(JSON.stringify(result, null, 4));
});

test('test createTreeItem', async () => {
  // const {
  //   gateway: {
  //     models: {
  //       RbacPermission,
  //     },
  //     sequelize,
  //   }
  // } =  require("../../config/model/app").default;
  // await (sequelize as Sequelize).transaction(async (transaction) => {
  //   await createTreeItem({
  //     values: {
  //       type: 'permission',
  //       name: 'test create item2',
  //       description: 'create item description2',
  //     },
  //     targetId: 2,
  //     position: 'below',
  //     Model: RbacPermission,
  //     transaction,
  //   });
  // });
  // expect(true).toBe(true);
});

test('test deleteTreeItem', async () => {
  // const {
  //   gateway: {
  //     models: {
  //       RbacPermission,
  //     },
  //     sequelize,
  //   }
  // } =  require("../../config/model/app").default;
  // await (sequelize as Sequelize).transaction(async (transaction) => {
  //   await deleteTreeItem({
  //     id: 6,
  //     Model: RbacPermission,
  //     transaction,
  //   });
  // });
  // expect(true).toBe(true);
});
