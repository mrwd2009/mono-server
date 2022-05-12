import type { Job } from 'bull';
import type { Logger } from 'winston';
import type { UITaskModelDef } from '../../../model/types';

interface Dependencies {
  logger: Logger;
  UITask: UITaskModelDef,
}

export const process = async (dependencies: Dependencies, job: Job): Promise<void> => {
  const {
    logger,
    UITask,
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
    console.log(`task id is ${task?.__pk_uitask}`);
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
  }
};

export default process;
