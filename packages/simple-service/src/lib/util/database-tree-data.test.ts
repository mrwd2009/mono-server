process.env.GATEWAY_DB_USER = 'root';
process.env.GATEWAY_DB_PASS = 'xxx';
process.env.GATEWAY_DB_HOST = 'localhost';
import _ from 'lodash';
import { reparent, getTreeData } from "./database-tree-data";

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