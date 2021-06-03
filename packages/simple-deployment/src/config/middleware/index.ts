import Koa from 'koa';
import * as bodyParser from './body-parser';
import * as passport from './passport';
import * as formatResponse from './format-response';

export {
  bodyParser,
  passport,
  formatResponse,
};

export const initialize = async (app: Koa): Promise<void> => {
  await bodyParser.initialize(app);
  await passport.initialize(app);
  await formatResponse.initialize(app);
};

export default initialize;