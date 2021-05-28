import Koa from 'koa';
import deployRuby from '../api/deploy-ruby';

const dispatch = async (app: Koa): Promise<void> => {
  app
  .use(deployRuby.routes());
};

export default dispatch;