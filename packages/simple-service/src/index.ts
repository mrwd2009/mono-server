import Koa from 'koa';
import boot from './config/boot';

const port = process.env.PORT || 4100;
const app = new Koa();

boot(app, port);


