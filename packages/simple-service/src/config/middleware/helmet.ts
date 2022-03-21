import Koa from 'koa';
import helmet from 'koa-helmet';

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(helmet());
};

export default initialize;
