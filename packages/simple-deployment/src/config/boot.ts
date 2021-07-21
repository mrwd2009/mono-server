import Koa from 'koa';
import http from 'http';
import initializer from './initializer';
import middleware from './middleware';
import dispatch from './dispatch';

const boot = async (app: Koa, port: number | string ): Promise<void> => {
  await initializer();
  await middleware(app);
  await dispatch(app);
  const server = http.createServer(app.callback())
    .listen(port, () => {
      console.log(`The server listened successfully on port: ${port} !`);
    });
  server.on('error', (error: Error): void => {
    if (error) {
      console.error(error);
    }
  });
};

export default boot;

