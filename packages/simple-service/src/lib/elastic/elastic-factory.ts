import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { registerCleanupHandler, removeCleanupHandler } from '../signal/handler';

interface Options {
  host: string;
  username: string;
  password: string;
}
export class ElasticFactory {
  private client: AxiosInstance | undefined;
  private options: Options;

  constructor(options: Options) {
    this.options = options;
    // gracefully close client.
    registerCleanupHandler(this.handleSignalClose);
  }

  // for special purpose, otherwise use instance methods directly.
  public getClient(): AxiosInstance {
    if (this.client) {
      return this.client;
    }

    const config: AxiosRequestConfig = {
      baseURL: this.options.host || 'http://localhost:9200',
      raw: true,
    };

    if (this.options.username) {
      config.auth = {
        username: this.options.username,
        password: this.options.password,
      };
    }

    this.client = axios.create(config);
    return this.client;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async search(index: string, params: any): Promise<any> {
    const client = this.getClient();
    const res = await client.post(`${index}/_search`, params);
    return res.data;
  }

  public async count(index: string, params: any) {
    const client = this.getClient();
    const res = await client.post(`${index}/_count`, params);
    return res.data;
  }

  handleSignalClose = async () => {
    if (this.client) {
      this.client = undefined;
    }
  };

  async close(): Promise<void> {
    if (this.client) {
      removeCleanupHandler(this.handleSignalClose);
      this.client = undefined;
    }
  }
}

export default ElasticFactory;
