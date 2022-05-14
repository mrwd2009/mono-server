import 'dotenv/config';
import { sendForgotPasswordEmail, initialize, sendConfirmAccountEmail, sendLockAccountEmail } from './index';

jest.setTimeout(1000 * 600);
beforeAll(async () => {
  await initialize();
});

// test('test send forgot password email', async () => {
//   await sendForgotPasswordEmail({
//     email: 'wudi.link.me@gmail.com',
//     token_url: 'http://localhost:4200',
//   });
// });

// test('test send confirm email', async () => {
//   await sendConfirmAccountEmail({
//     email: 'wudi.link.me@gmail.com',
//     token_url: 'http://localhost:4200',
//     home_url: 'http://localhost:4200',
//   });
// });

// test('test send unlock email', async () => {
//   await sendLockAccountEmail({
//     email: 'wudi.link.me@gmail.com',
//     token_url: 'http://localhost:4200',
//   });
// });