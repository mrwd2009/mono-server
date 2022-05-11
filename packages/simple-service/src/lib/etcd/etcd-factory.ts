import { Etcd3 } from 'etcd3';
import { registerCleanupHandler, removeCleanupHandler } from '../signal/handler';


export class EtcdFactory {
  private client: Etcd3 | undefined;

  constructor(private url: string) {
    // gracefully close redis client.
    registerCleanupHandler(this.handleSignalClose);
  }

  // for special purpose, otherwise use instance methods directly.
  public getClient(): Etcd3 {
    if (this.client) {
      return this.client;
    }
    this.client = new Etcd3({ hosts: this.url });
    return this.client;
  }

  // async get(key: string): Promise<string> {
  //   if (!config.enableCache) {
  //     throw new DataError('Value is not found(development).');
  //   }
  //   const client = this.getClient();
  //   const val = await client.get(key);
  //   if (val === null) {
  //     throw new DataError('Value is not found.');
  //   }
  //   return val;
  // }

  handleSignalClose = async () => {
    if (this.client) {
      this.client.close();
      this.client = undefined;
    }
  };

  async close(): Promise<void> {
    if (this.client) {
      removeCleanupHandler(this.handleSignalClose);
      this.client.close();
      this.client = undefined;
    }
  }
}

export default EtcdFactory;
