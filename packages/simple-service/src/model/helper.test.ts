import { connectTo } from './helper';

test('get user list', async () => {
  const db = connectTo({
    database: 'app_share',
    username: 'root',
    password: 'Fnst.123456',
    host: 'localhost',
  });
  const User = db.models.User;
  const user = await User.findOne();
  expect(user?.Email).toBeDefined();
  await db.sequelize.close();
});
