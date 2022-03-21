import RedisFactory from './redis-factory';
import config from '../../config/config';

const {
  redis: {
    main: { url, prefix, expired },
  },
} = config;

const main = new RedisFactory(url!, prefix, expired);

export default main;
