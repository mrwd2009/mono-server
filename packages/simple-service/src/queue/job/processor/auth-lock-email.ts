import type { Job } from 'bull';
import type { Logger } from 'winston';
import type { UITaskModelDef } from '../../../model/types';
import type { SendLockAccountEmailFn } from '../../../lib/email';

interface Dependencies {
  logger: Logger;
  UITask: UITaskModelDef;
  sendLockAccountEmail: SendLockAccountEmailFn;
  unlockAccountPath: string;
}

export const process = async (dependencies: Dependencies, job: Job): Promise<void> => {
  const {
    logger,
    UITask,
    sendLockAccountEmail,
    unlockAccountPath,
  } = dependencies;
  const id: number = job.data.id;
  const task = await UITask.findOne({
    where: {
      __pk_uitask: id,
    },
  });

  if (!task) {
    return;
  }

  try {
    const {
      origin,
      token,
      email,
    } = JSON.parse(task.parameter);
    await sendLockAccountEmail({
      email,
      token_url: `${origin}${unlockAccountPath}?token=${encodeURIComponent(token)}`,
    });
    await task.update({
      status: 'Succeeded',
      percentage: 10000
    });
  } catch (error) {
    const err = (error as Error);
    logger.error(err.message, {
      response: err,
      user: task.user_email || 'queue@cfex.com'
    });
    await task.update({
      error: err.stack,
      status: 'Failed',
    });
    throw error;
  }
};

export default process;
