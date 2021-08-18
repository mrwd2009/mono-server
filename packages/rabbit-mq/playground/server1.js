const http = require('http');

const proxyServer = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  console.log('request to server1', req.headers, req.url, req.method);
  res.end(JSON.stringify({
    message: 'hello from server1',
  }));
  req.on('data', (data) => console.log(data.toString()));
});

proxyServer.listen(3101, () => {
  console.log('listen successfully on 3101.');
});