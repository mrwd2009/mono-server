process.env.GATEWAY_DB_USER = 'xxx';
process.env.GATEWAY_DB_PASS = 'xxx';
process.env.GATEWAY_DB_HOST = 'xxx';
import { reparent } from "./database-tree-data";

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
  //   targetId: 7,
  //   position: 'child',
  //   Model: RbacPermission
  // });

  // expect(result).toBe(true);
});