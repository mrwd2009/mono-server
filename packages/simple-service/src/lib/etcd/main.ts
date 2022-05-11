import config from '../../config/config';
import EtcdFactory from './etcd-factory';

const {
  etcd: { url },
} = config;

const main = new EtcdFactory(url);

export default main;;
