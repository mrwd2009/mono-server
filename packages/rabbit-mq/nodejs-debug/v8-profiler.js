const Koa = require('koa');
const Router = require('@koa/router');
const http = require('http');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();

router.get('/encrypt', (context) => {
  const {
    query: {
      password = 'test',
    },
  } = context;
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  context.body = hash
});

app.use(router.routes());

const server = http.createServer(app.callback());
server.listen(3003, () => {
  console.log(`Listen successfully on 3003. PID: ${process.pid}`);
})

// node --prof src/v8-profiler.js
// ab -k -c 10 -n 2000 "http://localhost:3003/encrypt?password=123456"
// node --prof-process isolate-0x5c04390-27256-v8.log > processed.txt