import config from '../../config/config';
import EtcdFactory from './etcd-factory';

const {
  etcd: {
    main: { url },
  },
} = config;

const main = new EtcdFactory(url);

export default main;
