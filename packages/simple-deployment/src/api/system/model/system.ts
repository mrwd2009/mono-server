import config from '../../../config';

const getInfo = async (): Promise<{appEnv: string}> => {
  return {
    appEnv: config.appEnv,
  };
};

export {
  getInfo,
};
