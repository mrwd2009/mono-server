import cookie from 'cookie';
import { IncomingMessage } from 'http';
import config from '../../config/config';

export async function delay(ms: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

export const getJwtTokenSignature = (token?: string | null) => {
  if (!token) {
    return '';
  }

  return token.split('.')[2];
};

export const getJwtTokenFromReq = (req: IncomingMessage) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[config.jwt.cookieKey];
};
