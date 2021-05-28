import Router from '@koa/router';
import { Context } from 'koa';

const router = new Router({
  prefix: '/deploy-ruby',
});

router.get('/', async(context: Context): Promise<void> => {
  context.body = 'test';
});

export default router;


// const child_process = require('child_process');
// import * as fs from 'fs';
// import { promisify } from 'util';
// import * as path from 'path';
// import { execFile, spawn, exec } from 'child_process';

// const filename = path.join(__dirname, './temp.sh');
// const write = promisify(fs.write);

// const writeScript = async (name: string) => {
//   const fd = await promisify(fs.open)(name, 'w');
//   await write(fd, '#!/bin/bash\n');
//   await write(fd, 'echo "hello word"\n');
//   await promisify(fs.close)(fd);
//   await promisify(fs.chmod)(filename, '777');
// };


// const runTempScript = async () => {
//   try {
//     await writeScript(filename);
//     const { stdout } = await promisify(execFile)(filename);
//     console.log(stdout);
//   } catch (error) {
//     console.log(error);
//   }
// }
// const runStepByStep = async () => {
//   const bash = spawn('bash');
//   bash.stdout.on('data', data => {
//     console.log(data.toString());
//     bash.kill();
//   });
//   setTimeout(() => {
//     bash.stdin.write('echo "toto"\n');
//   });
// };

// runStepByStep();
// const { spawn, exec } = child_process;

// const sudoSu = exec('which expect');
// sudoSu.stdout.on('data', (data: string) => {
//   console.log(`stdout: ${data}`);
// });
// sudoSu.stdin.on('drain', () => {
//   console.log('drain');
// });
// sudoSu.on('close', (code: number) => {
//   console.log(`Close code ${code}`);
// });
// sudoSu.on('exit', (code: number) => {
//   console.log(`Exit code ${code}`);
// });
// sudoSu.on('error', (error: Error) => {
//   console.log(`Error :${error.message}`);
// });
// sudoSu.on('message', (msg: { message: string }) => {
//   console.log(`Error :${msg}`);
// });
// sudoSu.on('disconnect', () => {
//   console.log('Disconnect');
// });