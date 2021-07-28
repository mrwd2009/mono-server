import { systemModel } from '../model';
import { GatewayController } from '../../../type';

export const getInfoCtrl: GatewayController = async (context) => {
  const info = await systemModel.getInfo();
  context.gateway!.sendJSON!(info);
};

