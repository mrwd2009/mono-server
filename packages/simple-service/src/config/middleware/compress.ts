import Koa from 'koa';
import compress from 'koa-compress';

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(compress({
    threshold: 2048, // at least 2KB to trigger compression
  }));
};

export default initialize;