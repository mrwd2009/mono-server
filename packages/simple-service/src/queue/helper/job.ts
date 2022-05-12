/* eslint-disable @typescript-eslint/no-explicit-any */
import { Job, Queue, JobOptions } from 'bull';
import { QueueGetter } from './common';
import appDB from '../../config/model/app';
import { DataError } from '../../lib/error';
import config from '../../config/config';
const {
  gateway: {
    models: {
      User,
      OAuth2User,
      UITask,
    },
  },
} = appDB;

// must define the job name at here, in order to make sure typing correctly
type JobName = 'job-1' | 'job-2' | 'auth-confirmation-email' | 'auth-forgot-email' | 'auth-lock-email';

const persistentCache: Record<string, () => Queue<any>> = {};

export const getQueue = (name: JobName) => {
  if (!persistentCache[name]) {
    persistentCache[name] = new QueueGetter(name).getQueue;
  }
  return persistentCache[name]();
};

interface Payload {
  name: string;
  description?: string;
  type: 'Job' | 'File';
  userId?: number;
  userType?: 'user' | 'oauth2',
  parameter?: any,
  [key: string]: any,
}

export const enqueue = async (name: JobName, payload: Payload, jobOptions?: JobOptions): Promise<Job> => {
  const queue = getQueue(name);
  const record: any = {
    node_env: config.nodeEnv,
    app_env: config.appEnv,
    name: payload.name,
    description: payload.description,
    type: payload.type,
    user_id: payload.userId,
    user_type: payload.userType,
    parameter: payload.parameter ? JSON.stringify(payload.parameter) : '',
  };
  if (payload.userId && payload.userType) {
    if (payload.userType === 'user') {
      const user = await User.findOne({
        attributes: ['id', 'email'],
      });
      if (!user) {
        throw new DataError('Invalid user.');
      }
      record.user_email = user.email;
    } else if (payload.userType === 'oauth2') {
      const user = await OAuth2User.findOne({
        attributes: ['id', 'email'],
      });
      if (!user) {
        throw new DataError('Invalid user.');
      }
      record.user_email = user.email;
    }
  }
  const task = await UITask.create(record);
  return await queue.add({ id: task.__pk_uitask }, {
    removeOnComplete: true,
    ...jobOptions,
  });
};
