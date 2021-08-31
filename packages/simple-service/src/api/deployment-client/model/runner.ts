import _ from 'lodash';
import { MergedParams } from '../../../type';
import appDB from '../../../config/model/app';
import { ip, bashRunner } from '../../../lib/util';
import { DataError } from '../../../lib/error';
import config from '../../../config/config';
import logger from '../../../lib/logger';
import {
  AgentDef,
  ServiceDef,
  Service as ServiceIns,
  DeploymentLogDef,
} from '../../../config/model/type';

const {
  gateway: {
    models,
  }
} = appDB;
const DeploymentLog = models.DeploymentLog as DeploymentLogDef;
const Service = models.Service as ServiceDef;
const Agent = models.Agent as AgentDef;

interface Command {
  type: string,
  value: string,
}


let processing = false;
export async function running() {
  if (processing) {
    return;
  }
  processing = true;
  let runner: bashRunner.BashRunner | undefined;
  try {
    const localIp = ip.getLocalIPs()[0];
    const log = await DeploymentLog.findOne({
      where: {
        status: 'ready',
      },
      order: ['created_at', 'desc'],
      include: [
        {
          model: Agent,
          where: {
            ip: localIp,
          },
          required: true,
        },
        {
          model: Service,
          required: true,
        },
      ],
    });
    if (!log) {
      return;
    }
    await log.update({
      status: 'in progress',
    });
    const commands: Array<Command> = JSON.parse((log.Service as ServiceIns).command);
    runner = new bashRunner.BashRunner();
    const { github: { username, password } } = config;
    let output = '';
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      let result = '';
      try {
        if (command.type === 'git-pull') {
          result = await runner.exec(command.value.replace('USERNAME', username).replace('PASSWORD', password));
        } else if (command.type === 'bash') {
          result = await runner.exec(command.value);
        }
        output = `${output}${output ? '\n' : ''}${command.value}\n${result}`;
        if (i >= commands.length - 1) {
          await log.update({
            output,
            percentage: 100,
            status: 'completed',
          });
        } else {
          await log.update({
            output,
            percentage: Math.floor((i + 1) / commands.length * 100),
          });
        }
      } catch (error) {
        // stderr output
        if (_.isString(error)) {
          output = `${output}${output ? '\n' : ''}${command.value}\n${error}`;
          await log.update({
            output,
            percentage: Math.floor((i + 1) / commands.length * 100),
            status: 'failed',
          });
          break;
        }
        await log.update({
          status: 'failed',
          output: `${output}${output ? '\n' : ''}${command.value}\n${error.message}`
        });
        logger.error(error.message, { response: error });
        break;
      }
    }
  } catch (error) {
    logger.error(error.message, { response: error });
    throw error;
  } finally {
    processing = false;
    runner?.close();
  }
  await running();
}


export async function runService(params: MergedParams): Promise<void> {
  const {
    serviceId,
    email,
  } = params;
  const localIp = ip.getLocalIPs()[0];
  const [agent, service] = await Promise.all([
    Agent.findOne({
      where: {
        ip: localIp,
      }
    }),
    Service.findOne({
      where: {
        id: serviceId,
      }
    })
  ]);
  if (!agent) {
    throw new DataError(`Agent(${localIp}) is not found.`);
  }
  if (!service) {
    throw new DataError(`Service(${serviceId}) is not found.`);
  }
  await DeploymentLog.create({
    agent_id: agent.id,
    service_id: service.id,
    email,
    status: 'ready',
    percentage: 0,
  });
  // trigger local running
  running();
}