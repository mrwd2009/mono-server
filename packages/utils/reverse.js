const http = require('http');
/**
 * Simple reverse http proxy.
 * @param {Object} params - Input parameters
 * @param {string} params.header - Http header, its value is used as key to fetch port from 'portMap'
 * @param {Object} params.portMap - Store mapping for different port like '{ headerValue1: 3001, headerValue2: 3002 }`
 * @param {(req, res) => void} params.defaultRouter - Default server handler if we don't find port to redirect.
 * @returns {(req, res) => void} Handler for http server
 */
const reverse = ({ header, portMap, defaultRouter }) => {
  const redirect = ({ path, port, method, headers, rawReq, rawRes }) => {
    let newReq, newRes;
    return new Promise((resolve, reject) => {
      // checking raw request whether available
      if (rawReq.destroyed) {
        return reject(new Error('Up request stream is destroyed.'));
      }
      const request = http.request({ host: 'localhost', family: 4, path, port, method, headers }, (res) => {
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
        [header]: modelSource,
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
      
      if (!portMap[modelSource]) {
        // let main express application process
        defaultRouter(req, res);
        resolve(false);
        return;
      }
      
      const method = req.method;
  
      return resolve({
        path: req.url,
        port: portMap[modelSource],
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
      return redirect(opts);
    })
    .catch((error) => {
      req.destroy();
      res.destroy();
      throw error;
    });
  };
  return handleRequest;
};

module.exports = reverse;