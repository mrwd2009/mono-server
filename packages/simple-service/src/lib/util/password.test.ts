import { hashPassword, isPasswordEqual } from './password';

test('test hash password with plain', async () => {
  const hashVal = await hashPassword('test password');
  expect(isPasswordEqual('test password', hashVal)).toBeTruthy();
});
