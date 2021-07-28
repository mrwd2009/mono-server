import Koa from 'koa';
import boot from './config/boot';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4100;
const app = new Koa();

boot(app, port);


