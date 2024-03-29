import { Etcd3 } from 'etcd3';
import { registerCleanupHandler, removeCleanupHandler } from '../signal/handler';

export class EtcdFactory {
  private client: Etcd3 | undefined;

  constructor(private url: string) {
    // gracefully close client.
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
