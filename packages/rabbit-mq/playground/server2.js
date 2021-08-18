const http = require('http');

const proxyServer = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  console.log('request to server2', req.headers, req.url, req.method);
  
  setTimeout(() => {
    res.end(JSON.stringify({
      message: 'hello from server2',
    }));
  }, 3000);
  req.on('data', (data) => console.log(data.toString()));
});

proxyServer.listen(3102, () => {
  console.log('listen successfully on 3102.');
});