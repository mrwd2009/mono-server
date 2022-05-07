import { getMainEtcd } from "./main";

const etcd = {
  get mainEtcd() {
    return getMainEtcd();
  }
};

export default etcd;