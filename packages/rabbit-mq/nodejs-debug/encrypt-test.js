const Koa = require('koa');
const Router = require('@koa/router');
const http = require('http');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();

const users = {};
router.get('/newUser', (context) => {
  const {
    query: {
      username = 'test',
      password = 'test',
    },
  } = context;
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  users[username] = { salt, hash };
  context.body = 'Created';
});

router.get('/auth', (context) => {
  const {
    query: {
      username = 'test',
      password = 'test',
    },
  } = context;
  if (!users[username]) {
    context.status = 500;
    context.body = 'Unknown';
    return;
  }
  const hash = crypto.pbkdf2Sync(password, users[username].salt, 10000, 64, 'sha512').toString('hex');
  if (users[username].hash === hash) {
    context.body = 'Correct';
  } else {
    context.status = 401;
    context.body = 'Failed';
  }
});

app.use(router.routes());

const server = http.createServer(app.callback());
server.listen(3002, () => {
  console.log(`Listen successfully on 3002. PID: ${process.pid}`);
})

// curl "localhost:3002/newUser?username=admin&password=123456"
// ab -k -c 10 -n 2000 "http://localhost:3002/auth?username=admin&password=123456"
// sudo perf record -F 99 -p 26824 -g sleep 30
// sudo perf script > perf.stacks

// ./FlameGraph/stackcollapse-perf.pl --kernel <~/perf.stacks | ./FlameGraph/flamegraph.pl --color=js --hash > ./flamegraph.svg