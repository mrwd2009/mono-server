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
  expect(user?.email).toBeDefined();
  await db.sequelize.close();
});
