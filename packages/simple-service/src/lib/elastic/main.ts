import config from '../../config/config';
import ElasticFactory from './elastic-factory';

const {
  elastic: { main: mainConfig },
} = config;

const main = new ElasticFactory(mainConfig);

export default main;
