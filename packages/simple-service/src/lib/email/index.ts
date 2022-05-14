import { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { template } from 'lodash';
import config from '../../config/config';

let transporter: Transporter;

// eslint-disable-next-line @typescript-eslint/no-empty-function
let initialize = async () => {};

if (config.email.enabled) {
  if (config.email.type === 'gmail') {
    initialize = async () => {
      await require('./gmail').initialize();
      transporter = require('./gmail').default.transporter;
    };
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
};

export const send = async (msg: Message) => {
  checkServiceStatus();
  await transporter.sendMail(msg);
};

const confirmTemplate = template(fs.readFileSync(path.join(__dirname, 'template', 'confirm-account.html'), { encoding: 'utf-8' }));
interface ConfirmParams {
  token_url: string;
  home_url: string;
  email: string;
}
export const sendConfirmAccountEmail = async (params: ConfirmParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Confirm CEFX Account',
    html: confirmTemplate({
      token_url: params.token_url,
      home_url: params.home_url,
      email: params.email,
      year: (new Date()).getUTCFullYear(),
    }),
  }
  await transporter.sendMail(msg);
};

const forgotTemplate = template(fs.readFileSync(path.join(__dirname, 'template', 'forgot-password.html'), { encoding: 'utf-8' }));
interface ForgotPasswordParams {
  token_url: string;
  email: string;
}
export const sendForgotPasswordEmail = async (params: ForgotPasswordParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Reset CEFX Account Password',
    html: forgotTemplate({
      token_url: params.token_url,
      year: (new Date()).getUTCFullYear(),
    }),
  }
  await transporter.sendMail(msg);
};

const lockTemplate = template(fs.readFileSync(path.join(__dirname, 'template', 'lock-account.html'), { encoding: 'utf-8' }));
interface LockAccountParams {
  token_url: string;
  email: string;
}
export const sendLockAccountEmail = async (params: LockAccountParams) => {
  checkServiceStatus();
  const msg = {
    to: params.email,
    subject: 'Unlock CEFX Account',
    html: lockTemplate({
      token_url: params.token_url,
      year: (new Date()).getUTCFullYear(),
    }),
  }
  await transporter.sendMail(msg);
};

export {
  initialize,
};