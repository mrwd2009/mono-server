import { connectTo } from './helper';
import { UserDef } from './type';

test('get user list', async () => {
  const db = connectTo({
    database: 'gridx',
    username: 'root',
    password: 'Fnst.123456',
    host: 'localhost',
  });
  const UserModel = db.models.User as UserDef;
  const user = await UserModel.findOne();
  expect(user?.Email).toBeDefined();
  await db.sequelize.close();
})

