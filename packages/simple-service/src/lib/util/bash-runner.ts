/* eslint-disable @typescript-eslint/no-explicit-any */
import { spawn, ChildProcess } from 'child_process';
import { randomBytes } from 'crypto';
import drop from 'lodash/drop';
import trim from 'lodash/trim';

export class BashRunner {
  private bash: ChildProcess;
  private creating: Promise<void> | null; // wait until process created
  private queue: Array<any> = [];
  private boundary = randomBytes(16).toString('hex');

  constructor() {
    this.bash = spawn('bash');
    this.creating = new Promise((resolve, reject) => {
      this.bash
        .on('error', (error) => {
          reject(error);
        })
        .on('spawn', () => {
          resolve();
        });
    });
    let outStr = '';
    let errStr = '';
    this.bash.stdout?.on('data', (data) => {
      outStr += data.toString();
      let index = outStr.indexOf(this.boundary);
      while (index !== -1) {
        const commandOut = trim(outStr.slice(0, index));
        const item = this.queue[0];
        this.queue = drop(this.queue);
        item[1](commandOut);
        outStr = outStr.slice(index + this.boundary.length);
        index = outStr.indexOf(this.boundary);
      }
    });
    this.bash.stderr?.on('data', (data) => {
      errStr += data.toString();
      let index = errStr.indexOf(this.boundary);
      while (index !== -1) {
        const commandErr = trim(errStr.slice(0, index));
        const item = this.queue[0];
        this.queue = drop(this.queue);
        item[2](commandErr);
        errStr = errStr.slice(index + this.boundary.length);
        index = errStr.indexOf(this.boundary);
      }
    });
  }

  async exec(command: string): Promise<string> {
    if (this.creating) {
      await this.creating;
      this.creating = null;
    }
    return await new Promise((resolve, reject) => {
      this.queue.push([command, resolve, reject]);
      this.bash.stdin?.write(
        `${command}\nretVal=$?\nif [ $retVal -ne 0 ]; then\necho ${this.boundary} >&2\nelse\necho ${this.boundary}\nfi\n`,
      );
    });
  }

  close(): void {
    this.bash.kill();
  }
}
