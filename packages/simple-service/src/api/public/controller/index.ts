import { GatewayController } from '../../../type';

export const healthCheckingCtrl: GatewayController = async (context) => {
  context.gateway!.sendJSON!({
    status: 200
  });
};

