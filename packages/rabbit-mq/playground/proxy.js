const http = require('http');

const redirectPortMap = {
  server1: 3101,
  server2: 3102,
  server3: 3103,
};

const redirect = ({ url, method, headers, rawReq, rawRes }) => {
  let newReq, newRes;
  return new Promise((resolve, reject) => {
    // checking raw request whether available
    if (rawReq.destroyed) {
      return reject(new Error('Up request stream is destroyed.'));
    }
    const request = http.request(url, { method, headers }, (res) => {
      newRes = res;
      // checking raw request whether available
      if (rawRes.destroyed) {
        return reject(new Error('Up response stream is destroyed.'));
      }
      res.on('error', (error) => {
        reject(error);
      });
      res.on('aborted', () => {
        reject(new Error('aborted'));
      });
      rawRes.writeHead(res.statusCode, res.statusMessage, res.headers);
      res
        .on('end', () => {
          resolve();
        })
        .pipe(rawRes);
    });
    newReq = request;
    request
      .on('error', (error) => {
        reject(error);
      })
      .on('abort', () => {
        reject(new Error('abort'));
      });
    rawReq.pipe(request);
  })
    .catch((error) => {
      newReq && newReq.destroy();
      newRes && newRes.destroy();
      throw error;
    });
};

const handleRequest = (req, res) => {
  return new Promise((resolve, reject) => {
    const {
      'gridx-model-source': modelSource,
      ...headers
    } = req.headers;
    req
      .on('error', (error) => {
        reject(error);
      })
      .on('aborted', () => {
        reject(new Error('aborted'));
      });
    res
      .on('error', (error) => {
        reject(error);
      });
    if (!redirectPortMap[modelSource]) {
      req.resume();
      return res.end(JSON.stringify({
        message: 'unkown model source',
      }), () => {
        resolve(false);
      });
    }
    
    const url = new URL(req.url, `http://localhost:${redirectPortMap[modelSource]}`);
    const method = req.method;

    return resolve({
      url,
      method,
      headers,
      rawReq: req,
      rawRes: res,
    });
  })
  .then((opts) => {
    if (!opts) {
      return;
    }
    redirect(opts);
  })
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    req.destroy();
    res.destroy();
    console.log(error);
  });
};

const proxyServer = http.createServer(handleRequest);

proxyServer.listen(3100);
