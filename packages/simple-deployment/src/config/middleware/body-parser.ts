import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(bodyParser({
    formLimit: '10mb',
    jsonLimit: '10mb',
  }));
};

export default initialize;