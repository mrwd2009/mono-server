import { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { template } from 'lodash';
import config from '../../config/config';

let transporter: Transporter;

// eslint-disable-next-line @typescript-eslint/no-empty-function
let initialize = async () => {};

const loadEmailService = (moduleName: string) => {
  return async () => {
    await require(moduleName).initialize();
    transporter = require(moduleName).default.transporter;
  };
};

if (config.email.enabled) {
  if (config.email.type === 'gmail') {
    initialize = loadEmailService('./gmail');
  }
}
const checkServiceStatus = () => {
  if (!config.email.enabled) {
    throw new Error('Email service is not enabled.');
  }
  if (!transporter) {
    throw new Error('Email service is configured.');
  }
};

interface Message {
  from?: string;
  to?: string;
  subject: string;
  text?: string;
  html?: string;
}

export const send = async (msg: Message) => {
  checkServiceStatus();
  await transporter.sendMail(msg);
};

const confirmTemplate = template(
  fs.readFileSync(path.join(__dirname, 'template', 'confirm-account.html'), { encoding: 'utf-8' }),
);
interface ConfirmParams {
  token_url: string;
  home_url: string;
  email: string;
}
export const sendConfirmAccountEmail = async (params: ConfirmParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Confirm CFEX Account',
    html: confirmTemplate({
      token_url: params.token_url,
      home_url: params.home_url,
      email: params.email,
      year: new Date().getUTCFullYear(),
    }),
  };
  await transporter.sendMail(msg);
};
export type SendConfirmAccountEmailFn = typeof sendConfirmAccountEmail;

const forgotTemplate = template(
  fs.readFileSync(path.join(__dirname, 'template', 'forgot-password.html'), { encoding: 'utf-8' }),
);
interface ForgotPasswordParams {
  token_url: string;
  email: string;
}
export const sendForgotPasswordEmail = async (params: ForgotPasswordParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Reset CFEX Account Password',
    html: forgotTemplate({
      token_url: params.token_url,
      year: new Date().getUTCFullYear(),
    }),
  };
  await transporter.sendMail(msg);
};
export type SendForgotPasswordEmailFn = typeof sendForgotPasswordEmail;

const lockTemplate = template(
  fs.readFileSync(path.join(__dirname, 'template', 'lock-account.html'), { encoding: 'utf-8' }),
);
interface LockAccountParams {
  token_url: string;
  email: string;
}
export const sendLockAccountEmail = async (params: LockAccountParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Unlock CFEX Account',
    html: lockTemplate({
      token_url: params.token_url,
      year: new Date().getUTCFullYear(),
    }),
  };
  await transporter.sendMail(msg);
};
export type SendLockAccountEmailFn = typeof sendLockAccountEmail;

export { initialize };
