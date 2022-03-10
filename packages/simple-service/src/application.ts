import 'dotenv/config';
import Koa from 'koa';
import boot from './config/boot';
const defaultPort = process.env.PORT ? parseInt(process.env.PORT) : 4100;

export interface ApplicationOption {
  port?: number;
}

export default class Application {
  public port: number;
  public app: Koa;

  constructor(opts?: ApplicationOption) {
    this.port = opts?.port || defaultPort;
    this.app = new Koa();
  }

  async initialize() {
    await boot(this.app, this.port);
  }
}
