import { hashPassword, isPasswordEqual, randomPassword } from './password';

test('test hash password with plain', async () => {
  const hashVal = await hashPassword('test password');
  expect(isPasswordEqual('test password', hashVal)).toBeTruthy();
});

test('create random password', async () => {
  const result = randomPassword();
  expect(result).toBeTruthy();
});
