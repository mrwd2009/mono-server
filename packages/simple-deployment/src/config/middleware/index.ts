import Koa from 'koa';
import * as bodyParser from './body-parser';
import * as passport from './passport';
import * as formatResponse from './format-response';
import * as handleError from './handle-error';
import * as measure from './measure';
import * as mergedParams from './merged-params';

export {
  bodyParser,
  passport,
  formatResponse,
  handleError,
  measure,
  mergedParams,
};

export const initialize = async (app: Koa): Promise<void> => {
  await bodyParser.initialize(app);
  await passport.initialize(app);
  await formatResponse.initialize(app);
  await handleError.initialize(app);
  await measure.initialize(app);
  await mergedParams.initialize(app);
};

export default initialize;