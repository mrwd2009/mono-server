import nodemailer, { Transporter } from 'nodemailer';
import config from '../../config/config';

const email: {
  transporter?: Transporter;
} = {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
let initialize = async () => {};

if (config.email.enabled) {
  if (!config.email.gmail.clientId) {
    throw new Error('You need to configure gmail related environment variables.');
  }

  initialize = async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: config.email.gmail.user,
        clientId: config.email.gmail.clientId,
        clientSecret: config.email.gmail.clientSecret,
        refreshToken: config.email.gmail.refreshToken,
      },
    });
    email.transporter = transporter;
  };
}

export { initialize };

export default email;
