import config from '../../config/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCookieOptions = (options: any) => {
  if (config.enableDevSSL) {
    options = {
      ...options,
      sameSite: 'none',
      secure: true,
    };
  }
  return options;
};
