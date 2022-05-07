import { Etcd3 } from 'etcd3';
import config from '../../config/config';

const {
  etcd: {
    url,
  },
} = config;

let main: Etcd3 | null = null;
const getMainEtcd = () => {
  if (main) {
    return main;
  }
  main =  new Etcd3({ hosts: url });
  return main;
}

export {
  getMainEtcd,
};
