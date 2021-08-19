const v8 = require('v8');
const path = require('path');
const fs = require('fs');

let leakObject = null;
let count = 0;

const createSnapshot = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, `../${Date.now()}.heapsnapshot`));
  v8.getHeapSnapshot().pipe(writeStream);
};

process.on('SIGUSR2', (signal) => {
  console.log(`signal snapshot: ${signal}`);
  createSnapshot();
});

setInterval(() => {
  let originLeakObject = leakObject;
  const unused = () => {
    if (originLeakObject) {
      console.log('originLeakObject');
    }
  };
  leakObject = {
    count: String(count++),
    leakStr: new Array(1e7).join('*'),
    leakMethod: () => {
      console.log('leakMethod');
    }
  };
  originLeakObject = null;
  console.log('in progress');
}, 1000);
console.log(`PID: ${process.pid}`);

// kill -s USR2 8817