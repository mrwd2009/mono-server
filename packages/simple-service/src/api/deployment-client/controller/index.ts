import { GatewayCtrlArray } from '../../../type';
import { validator } from '../../../middleware';
import { runnerModel } from '../model';

export const runServiceHandler: GatewayCtrlArray = [
  validator(Schema => Schema.object({
    serviceId: Schema.number().integer().min(0),
  })),
  async (context) => {
    context.gateway?.sendJSON?.(await runnerModel.runService(context.mergedParams));
  }
];