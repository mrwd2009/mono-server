import 'dotenv/config';
import Koa from 'koa';
import boot from './config/boot';
import { initialize } from './lib/monitor/prometheus';
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

  async initialize(skipMonitor = false) {
    await Promise.all([boot(this.app, this.port), !skipMonitor && initialize('app')]);
  }
}
